import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { 
  MessageCircle, 
  X, 
  Minus, 
  Send, 
  Loader2, 
  Sparkles, 
  User, 
  Globe,
  Calendar,
  HeartHandshake,
  MapPin,
  BookOpen,
  Users,
  Compass,
  Video,
  GraduationCap,
  Plus,
  Edit,
  FileText,
  Upload,
  CheckCircle2,
  CheckSquare,
  Square,
  Mic,
  MicOff,
  LogIn,
  Camera
} from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import { TabItem } from '../types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCellGroups, createCellGroup, updateCellGroup, updateCellGroupLogs } from '../api/db';
import { compressMobileImageToSafePayload, optimizeMeetingLogsForFirestore } from '../utils/imageUpload';
import toast from 'react-hot-toast';

export type ChatLanguage = 'tl' | 'en';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface QuickAction {
  label: string;
  prompt: string;
  icon?: string;
  cellMode?: 'register' | 'update' | 'log_meeting';
}

interface HannahChatProps {
  handleTabClick?: (tab: TabItem) => void;
}

export type CellHelperMode = 'register' | 'update' | 'log_meeting';

export interface CellAssistantDraft {
  mode: CellHelperMode;
  groupId: string;
  leaderName: string;
  location: string;
  scheduleDay: string;
  scheduleTime: string;
  members: string[];
  photoUrl: string | null;
  meetingDate: string;
  meetingPhotoUrl: string | null;
  attendedMembers: string[];
}

const HANNAH_FELLOWSHIP_PRESETS = [
  {
    id: 'bible-study',
    labelTl: 'Bible Study',
    labelEn: 'Bible Study',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'prayer-circle',
    labelTl: 'Panalangin',
    labelEn: 'Prayer Circle',
    url: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'worship-gathering',
    labelTl: 'Pagsamba',
    labelEn: 'Worship',
    url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'community-youth',
    labelTl: 'Pamilya / Grupo',
    labelEn: 'Community',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  }
];

const DAYS_OF_WEEK = [
  { value: 'Sunday', tl: 'Linggo', en: 'Sun' },
  { value: 'Monday', tl: 'Lunes', en: 'Mon' },
  { value: 'Tuesday', tl: 'Martes', en: 'Tue' },
  { value: 'Wednesday', tl: 'Miyerkules', en: 'Wed' },
  { value: 'Thursday', tl: 'Huwebes', en: 'Thu' },
  { value: 'Friday', tl: 'Biyernes', en: 'Fri' },
  { value: 'Saturday', tl: 'Sabado', en: 'Sat' },
];

const TIME_PRESETS = [
  { value: '09:00', label: '9:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '19:00', label: '7:00 PM' },
];

const LOCATION_PRESETS = [
  'Bagong Tanyag, Taguig',
  'Bicutan, Taguig',
  'Signal Village, Taguig',
  'SKCCI Sanctuary',
  'Sa Tahanan / Home',
];

export default function HannahChat({ handleTabClick }: HannahChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const selectedLanguage: ChatLanguage = language === 'fil' ? 'tl' : 'en';
  const isTagalog = selectedLanguage === 'tl';

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { user, signInWithGoogle } = useAuth();
  const queryClient = useQueryClient();

  // Fetch existing cell groups so Hannah can help mothers select, update, or log attendance
  const { data: cellGroupsRaw = [] } = useQuery({
    queryKey: ['cell_groups'],
    queryFn: fetchCellGroups,
  });
  const cellGroups = cellGroupsRaw as any[];

  // Senior-Friendly Cell Group Helper State
  const [isCellHelperActive, setIsCellHelperActive] = useState(false);
  const [memberTextInput, setMemberTextInput] = useState('');
  const [isSavingCell, setIsSavingCell] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatPhotoInputRef = useRef<HTMLInputElement>(null);

  const [cellDraft, setCellDraft] = useState<CellAssistantDraft>({
    mode: 'register',
    groupId: '',
    leaderName: '',
    location: '',
    scheduleDay: 'Friday',
    scheduleTime: '18:00',
    members: [],
    photoUrl: HANNAH_FELLOWSHIP_PRESETS[0].url,
    meetingDate: new Date().toISOString().split('T')[0],
    meetingPhotoUrl: null,
    attendedMembers: [],
  });

  const formatCurrentTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleChatPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const compressedBase64 = await compressMobileImageToSafePayload(file, {
        maxDimension: 640,
        targetMaxChars: 50000,
      });
      if (cellDraft.mode === 'log_meeting') {
        setCellDraft(prev => ({ ...prev, meetingPhotoUrl: compressedBase64 }));
      } else {
        setCellDraft(prev => ({ ...prev, photoUrl: compressedBase64 }));
      }
      toast.success(
        isTagalog
          ? 'Na-upload na po ang litrato! Pindutin ang Save sa ibaba.'
          : 'Photo attached! Tap Save below when ready.'
      );
    } catch (err) {
      console.error('Photo upload error in Hannah:', err);
      toast.error(
        isTagalog
          ? 'Hindi po nabasa ang litrato. Subukan po ang ibang larawan.'
          : 'Could not process photo. Please try another image.'
      );
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Start guided Cell Group helper inside Hannah
  const activateCellHelper = (mode: CellHelperMode, group?: any) => {
    setIsOpen(true);
    setIsCellHelperActive(true);
    const todayStr = new Date().toISOString().split('T')[0];

    if (mode === 'register') {
      setCellDraft({
        mode: 'register',
        groupId: '',
        leaderName: user?.displayName || '',
        location: '',
        scheduleDay: 'Friday',
        scheduleTime: '18:00',
        members: [],
        photoUrl: HANNAH_FELLOWSHIP_PRESETS[0].url,
        meetingDate: todayStr,
        meetingPhotoUrl: null,
        attendedMembers: [],
      });
    } else if (mode === 'update') {
      const targetGroup = group || cellGroups[0] || null;
      setCellDraft({
        mode: 'update',
        groupId: targetGroup?.id || '',
        leaderName: targetGroup?.leaderName || '',
        location: targetGroup?.location || '',
        scheduleDay: targetGroup?.scheduleDay || 'Friday',
        scheduleTime: targetGroup?.scheduleTime || '18:00',
        members: Array.isArray(targetGroup?.members) ? [...targetGroup.members] : [],
        photoUrl: targetGroup?.photoUrl || HANNAH_FELLOWSHIP_PRESETS[0].url,
        meetingDate: todayStr,
        meetingPhotoUrl: targetGroup?.proofPhotoUrl || null,
        attendedMembers: [],
      });
    } else if (mode === 'log_meeting') {
      const targetGroup = group || cellGroups[0] || null;
      const allPresentDefault = targetGroup
        ? [targetGroup.leaderName, ...(targetGroup.members || [])].filter(Boolean)
        : [];
      setCellDraft({
        mode: 'log_meeting',
        groupId: targetGroup?.id || '',
        leaderName: targetGroup?.leaderName || '',
        location: targetGroup?.location || '',
        scheduleDay: targetGroup?.scheduleDay || 'Friday',
        scheduleTime: targetGroup?.scheduleTime || '18:00',
        members: Array.isArray(targetGroup?.members) ? [...targetGroup.members] : [],
        photoUrl: targetGroup?.photoUrl || null,
        meetingDate: todayStr,
        meetingPhotoUrl: null,
        attendedMembers: allPresentDefault,
      });
    }

    const helperIntro =
      mode === 'register'
        ? isTagalog
          ? `**Tutulungan ko po kayong mag-register ng bagong Cell Group!** 💐\n\nMaaari niyo pong **i-type o sabihin sa akin** ang detalye (halimbawa: *"Leader po si Nanay Elena, sa Bagong Tanyag, tuwing Sabado 3pm, members sina Lita, Nena, at Rosa"*), o kaya ay **pindutin lamang ang malalaking buttons sa form sa ibaba**!`
          : `**I'd love to help you register a new Cell Group!** 💐\n\nYou can **type or speak** your details in chat (e.g., *"Leader is Sis. Elena, in Bagong Tanyag, Saturday 3pm, members are Lita, Nena, Rosa"*), or simply **tap the easy buttons on the card below**!`
        : mode === 'update'
        ? isTagalog
          ? `**Tutulungan ko po kayong i-update ang inyong Cell Group!** ✏️\n\nPiliin lamang po ang pangalan ng inyong Cell Group sa ibaba, o sabihin sa akin kung ano ang nais ninyong idagdag o baguhin.`
          : `**Let's update your Cell Group together!** ✏️\n\nSimply tap your Cell Group below, or tell me what changes or new members you'd like to add.`
        : isTagalog
        ? `**Mag-log po tayo ng Meeting Report at Attendance!** 📸\n\nNilagyan ko na po ng check ang mga miyembro para mas madali! Piliin lang po ang inyong Cell Group sa ibaba, mag-upload ng litrato kung mayroon, at pindutin ang **"I-save ang Report"**.`
        : `**Let's log your Meeting Report & Attendance!** 📸\n\nI've pre-checked your members to make it super fast! Just select your group below, attach a meeting photo if you have one, and tap **"Save Report"**.`;

    setMessages(prev => [
      ...prev,
      {
        id: `hannah-helper-${Date.now()}`,
        role: 'model',
        content: helperIntro,
        timestamp: formatCurrentTime(),
      }
    ]);
  };

  // Listen for custom events dispatched from CellGroup.tsx buttons/modals
  useEffect(() => {
    const handleOpenHelperEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode?: CellHelperMode; group?: any }>;
      const mode = customEvent.detail?.mode || 'register';
      const group = customEvent.detail?.group;
      activateCellHelper(mode, group);
    };

    window.addEventListener('open-hannah-cell-helper', handleOpenHelperEvent);
    return () => {
      window.removeEventListener('open-hannah-cell-helper', handleOpenHelperEvent);
    };
  }, [cellGroups, isTagalog, user]);

  // Select a specific group inside Update / Log Meeting helper
  const handleSelectExistingGroup = (groupId: string) => {
    const found = cellGroups.find(g => g.id === groupId);
    if (!found) return;
    const allMembers = [found.leaderName, ...(found.members || [])].filter(Boolean);
    setCellDraft(prev => ({
      ...prev,
      groupId: found.id,
      leaderName: found.leaderName || '',
      location: found.location || '',
      scheduleDay: found.scheduleDay || 'Friday',
      scheduleTime: found.scheduleTime || '18:00',
      members: Array.isArray(found.members) ? [...found.members] : [],
      photoUrl: found.photoUrl || HANNAH_FELLOWSHIP_PRESETS[0].url,
      attendedMembers: prev.mode === 'log_meeting' ? allMembers : prev.attendedMembers,
    }));
  };

  // Add one or comma-separated members to cellDraft
  const handleAddDraftMembers = () => {
    if (!memberTextInput.trim()) return;
    const names = memberTextInput
      .replace(/\b(?:at|and)\b/gi, ',')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    if (names.length > 0) {
      setCellDraft(prev => ({
        ...prev,
        members: Array.from(new Set([...prev.members, ...names])),
      }));
      setMemberTextInput('');
    }
  };

  // Save Cell Group or Meeting Report directly to Firestore
  const handleSaveCellAssistant = async () => {
    if (!user) {
      toast.error(
        isTagalog
          ? 'Mag-sign in po muna gamit ang Google button sa ibaba.'
          : 'Please sign in with Google first using the button below.'
      );
      return;
    }

    setIsSavingCell(true);
    try {
      if (cellDraft.mode === 'log_meeting') {
        const targetGroup = cellGroups.find(g => g.id === cellDraft.groupId);
        if (!targetGroup) {
          toast.error(
            isTagalog
              ? 'Pumili po muna ng Cell Group sa listahan.'
              : 'Please select a Cell Group from the list first.'
          );
          setIsSavingCell(false);
          return;
        }

        const newLog = {
          id: Date.now().toString(),
          date: cellDraft.meetingDate || new Date().toISOString().split('T')[0],
          photoUrl: cellDraft.meetingPhotoUrl || null,
          attendedMembers: cellDraft.attendedMembers,
          createdAt: new Date().toISOString(),
        };

        const rawUpdatedLogs = [...(targetGroup.meetingLogs || []), newLog];
        const safeUpdatedLogs = await optimizeMeetingLogsForFirestore(rawUpdatedLogs, 550000);
        await updateCellGroupLogs(
          targetGroup.id,
          safeUpdatedLogs,
          cellDraft.meetingPhotoUrl || targetGroup.proofPhotoUrl || null,
          new Date().toISOString()
        );

        await queryClient.invalidateQueries({ queryKey: ['cell_groups'] });
        toast.success(
          isTagalog
            ? 'Matagumpay na na-save ang inyong Meeting Report!'
            : 'Meeting Report saved successfully!'
        );

        setMessages(prev => [
          ...prev,
          {
            id: `saved-${Date.now()}`,
            role: 'model',
            content: isTagalog
              ? `✅ **Purihin ang PANGINOON! Na-save na po ang Meeting Report para sa grupo ni ${targetGroup.leaderName}!**\n- 📅 Petsa: **${newLog.date}**\n- 👥 Bilang ng Dumalo: **${newLog.attendedMembers.length} miyembro**\n\nMakikita na po ito agad sa **Cell Groups** page!`
              : `✅ **Praise GOD! The Meeting Report for ${targetGroup.leaderName}'s Group has been saved!**\n- 📅 Date: **${newLog.date}**\n- 👥 Attendance: **${newLog.attendedMembers.length} present**\n\nIt is now live on the **Cell Groups** page!`,
            timestamp: formatCurrentTime(),
          }
        ]);
        setIsCellHelperActive(false);
      } else {
        // Register or Update Cell Group
        const pendingNames = memberTextInput
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);
        const finalMembers = Array.from(new Set([...cellDraft.members, ...pendingNames]));

        if (!cellDraft.leaderName.trim()) {
          toast.error(
            isTagalog
              ? 'Pakilagay po ang Pangalan ng Leader.'
              : 'Please enter the Leader Name.'
          );
          setIsSavingCell(false);
          return;
        }
        if (!cellDraft.location.trim()) {
          toast.error(
            isTagalog
              ? 'Pakilagay po o pumili ng Lokasyon ng meeting.'
              : 'Please enter or tap a Meeting Location.'
          );
          setIsSavingCell(false);
          return;
        }
        if (finalMembers.length === 0) {
          toast.error(
            isTagalog
              ? 'Magdagdag po ng kahit isang (1) miyembro sa grupo.'
              : 'Please add at least one (1) member to the group.'
          );
          setIsSavingCell(false);
          return;
        }

        const payload: Record<string, any> = {
          leaderName: cellDraft.leaderName.trim(),
          location: cellDraft.location.trim(),
          scheduleDay: cellDraft.scheduleDay || 'Friday',
          scheduleTime: cellDraft.scheduleTime || '18:00',
          members: finalMembers,
          photoUrl: cellDraft.photoUrl || HANNAH_FELLOWSHIP_PRESETS[0].url,
        };

        if (cellDraft.mode === 'update' && cellDraft.groupId) {
          await updateCellGroup(cellDraft.groupId, payload);
          await queryClient.invalidateQueries({ queryKey: ['cell_groups'] });
          toast.success(
            isTagalog
              ? 'Na-update na po ang inyong Cell Group!'
              : 'Your Cell Group has been updated!'
          );
          setMessages(prev => [
            ...prev,
            {
              id: `saved-${Date.now()}`,
              role: 'model',
              content: isTagalog
                ? `✅ **Matagumpay na na-update ang Cell Group ni ${payload.leaderName}!**\n- 📍 Lokasyon: **${payload.location}**\n- 🗓️ Araw at Oras: **${payload.scheduleDay}, ${payload.scheduleTime}**\n- 👥 Mga Miyembro (${finalMembers.length}): **${finalMembers.join(', ')}**`
                : `✅ **Successfully updated ${payload.leaderName}'s Cell Group!**\n- 📍 Location: **${payload.location}**\n- 🗓️ Schedule: **${payload.scheduleDay} at ${payload.scheduleTime}**\n- 👥 Members (${finalMembers.length}): **${finalMembers.join(', ')}**`,
              timestamp: formatCurrentTime(),
            }
          ]);
        } else {
          payload.leaderId = user.uid;
          payload.createdByUid = user.uid;
          if (user.email) payload.createdByEmail = user.email;
          await createCellGroup(payload);
          await queryClient.invalidateQueries({ queryKey: ['cell_groups'] });
          toast.success(
            isTagalog
              ? 'Na-register na po ang inyong bagong Cell Group!'
              : 'New Cell Group registered successfully!'
          );
          setMessages(prev => [
            ...prev,
            {
              id: `saved-${Date.now()}`,
              role: 'model',
              content: isTagalog
                ? `🎉 **Purihin ang DIYOS! Na-register na po ang bagong Cell Group ni ${payload.leaderName}!**\n- 📍 Lokasyon: **${payload.location}**\n- 🗓️ Araw at Oras: **${payload.scheduleDay}, ${payload.scheduleTime}**\n- 👥 Mga Miyembro (${finalMembers.length}): **${finalMembers.join(', ')}**`
                : `🎉 **Praise GOD! ${payload.leaderName}'s new Cell Group is now registered!**\n- 📍 Location: **${payload.location}**\n- 🗓️ Schedule: **${payload.scheduleDay} at ${payload.scheduleTime}**\n- 👥 Members (${finalMembers.length}): **${finalMembers.join(', ')}**`,
              timestamp: formatCurrentTime(),
            }
          ]);
        }
        setMemberTextInput('');
        setIsCellHelperActive(false);
      }
    } catch (err: any) {
      console.error('Error saving cell group from Hannah:', err);
      toast.error(
        isTagalog
          ? 'Nagkaroon po ng aberya sa pag-save. Pakisubukan pong muli.'
          : 'Could not save right now. Please try tapping Save again.'
      );
    } finally {
      setIsSavingCell(false);
    }
  };

  // Voice Dictation (Web Speech API) for older members & mothers
  const toggleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error(
        isTagalog
          ? 'Hindi po suportado ang voice mic sa browser na ito. Maaari po kayong mag-type o pumindot sa mga buttons.'
          : 'Voice dictation is not supported on this browser. Please type or tap the buttons.'
      );
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = isTagalog ? 'fil-PH' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        toast(
          isTagalog
            ? '🎤 Nakikinig po si Hannah... Magsalita na po kayo.'
            : '🎤 Hannah is listening... Please speak now.',
          { duration: 3000 }
        );
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript || '';
        if (transcript) {
          setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const tagalogQuickActions: QuickAction[] = [
    {
      label: "➕ Mag-register ng Cell Group",
      prompt: "Gusto ko pong mag-register ng bagong Cell Group",
      cellMode: 'register'
    },
    {
      label: "✏️ I-update ang Cell Group",
      prompt: "Gusto ko pong i-update ang aming Cell Group",
      cellMode: 'update'
    },
    {
      label: "📸 Mag-log ng Meeting / Attendance",
      prompt: "Gusto ko pong mag-log ng meeting report at attendance ng Cell Group",
      cellMode: 'log_meeting'
    },
    { 
      label: "Planuhin ang Pagbisita", 
      prompt: "Maaari po bang malaman ang schedule at detalye para planuhin ang pagbisita sa Sunday service?" 
    },
    { 
      label: "Mga Kaganapan at RSVP", 
      prompt: "Maaari po bang magbigay ng walkthrough sa Events page at paano mag-RSVP sa mga aktibidad?" 
    },
    { 
      label: "Balangkas ng Sermon", 
      prompt: "Saan ko po makikita ang balangkas ng sermon (Sermon Outlines) sa ilalim ng Grow > Leader Tools?" 
    },
    { 
      label: "Consolidation Manuals", 
      prompt: "Paano po puntahan ang Consolidation manuals sa ilalim ng Grow > Manuals?" 
    },
    { 
      label: "Hiling sa Panalangin at Pagkakaloob", 
      prompt: "Nais ko po magpadala ng prayer request at malaman ang mga paraan ng pagkakaloob." 
    },
  ];

  const englishQuickActions: QuickAction[] = [
    {
      label: "➕ Register New Cell Group",
      prompt: "I want to register a new Cell Group",
      cellMode: 'register'
    },
    {
      label: "✏️ Update My Cell Group",
      prompt: "I want to update my existing Cell Group",
      cellMode: 'update'
    },
    {
      label: "📸 Log Meeting & Attendance",
      prompt: "I want to log a Cell Group meeting report and attendance",
      cellMode: 'log_meeting'
    },
    { 
      label: "Plan My Visit", 
      prompt: "What are the Sunday service schedules, what to expect, and parking details to plan my visit?" 
    },
    { 
      label: "Events & RSVP", 
      prompt: "Can you give me a walkthrough of the Events page and explain how to RSVP for upcoming activities?" 
    },
    { 
      label: "Sermon Outlines", 
      prompt: "Where can I find the Sermon Outlines in the Leader Tools page under Grow?" 
    },
    { 
      label: "Consolidation Manuals", 
      prompt: "How do I access the Consolidation manuals under Grow > Manuals?" 
    },
    { 
      label: "Prayer Requests & Giving", 
      prompt: "How do I submit a prayer request and what are the giving options?" 
    },
  ];

  const tagalogGreeting = "Maligayang pagdating po! Ako si Hannah, ang inyong AI virtual church usher. Maaari ko po kayong tulungang **mag-register ng Cell Group**, **mag-update ng miyembro**, o **mag-log ng meeting attendance**—sabihin lang po sa akin o pindutin ang mga buttons sa ibaba!";
  const englishGreeting = "Welcome! I'm Hannah, your AI virtual church usher. I can easily help you **register a Cell Group**, **update your group**, or **log meeting attendance**—just tell me or tap a button below!";

  // When language is selected or changed
  const handleSelectLanguage = (lang: ChatLanguage) => {
    setLanguage(lang === 'tl' ? 'fil' : 'en');
  };

  // Keep greeting synced to active language
  useEffect(() => {
    const greetingText = selectedLanguage === 'tl' ? tagalogGreeting : englishGreeting;
    if (messages.length === 0) {
      if (isOpen) {
        setMessages([
          {
            id: 'initial-welcome',
            role: 'model',
            content: greetingText,
            timestamp: formatCurrentTime()
          }
        ]);
      }
    } else if (messages.length === 1 && messages[0].id.includes('welcome')) {
      if (messages[0].content !== greetingText) {
        setMessages([
          {
            id: 'initial-welcome',
            role: 'model',
            content: greetingText,
            timestamp: formatCurrentTime()
          }
        ]);
      }
    }
  }, [isOpen, selectedLanguage, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen, selectedLanguage, isCellHelperActive]);

  // Check if a free-text message is asking to register/update/log a cell group
  const isCellGroupActionMessage = (text: string): boolean => {
    const lower = text.toLowerCase();
    if (isCellHelperActive) return true;
    const hasCellKeyword =
      lower.includes('cell') ||
      lower.includes('group') ||
      lower.includes('grupo') ||
      lower.includes('leader') ||
      lower.includes('attendance') ||
      lower.includes('meeting report') ||
      lower.includes('dumalo') ||
      lower.includes('miyembro');
    const hasActionKeyword =
      lower.includes('register') ||
      lower.includes('new') ||
      lower.includes('bagong') ||
      lower.includes('gumawa') ||
      lower.includes('update') ||
      lower.includes('baguhin') ||
      lower.includes('edit') ||
      lower.includes('idagdag') ||
      lower.includes('add') ||
      lower.includes('log') ||
      lower.includes('present') ||
      lower.includes('report') ||
      lower.includes('tulungan') ||
      lower.includes('help');
    return hasCellKeyword && hasActionKeyword;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : input).trim();
    if (!text || isLoading) return;

    const currentLang = selectedLanguage || 'tl';

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: formatCurrentTime()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // If user is interacting with Cell Group Assistant or asking to register/update/log a cell group
    if (isCellGroupActionMessage(text)) {
      try {
        const res = await fetch('/api/cell-assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            language: currentLang,
            existingGroups: cellGroups,
            currentDraft: cellDraft,
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.draft) {
            setIsCellHelperActive(true);
            setCellDraft(prev => ({
              ...prev,
              ...data.draft,
              photoUrl: data.draft.photoUrl || prev.photoUrl || HANNAH_FELLOWSHIP_PRESETS[0].url,
              meetingPhotoUrl: data.draft.meetingPhotoUrl !== undefined ? data.draft.meetingPhotoUrl : prev.meetingPhotoUrl,
            }));
          }
          const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            role: 'model',
            content: data.reply || (currentLang === 'tl' ? 'Inihanda ko na po ang form sa ibaba!' : 'I have updated the form below for you!'),
            timestamp: formatCurrentTime()
          };
          setMessages([...newMessages, aiMessage]);
          setIsLoading(false);
          return;
        }
      } catch (cellErr) {
        console.warn('Cell assistant fallback:', cellErr);
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({
            role: m.role,
            parts: [{ text: m.content }]
          })),
          language: currentLang
        })
      });
      clearTimeout(timeoutId);

      let replyText = "";
      if (response.ok) {
        const data = await response.json();
        replyText = data.reply || "";
      } else {
        replyText = currentLang === 'tl'
          ? "Paumanhin po, sandaling nagkaroon ng aberya. Maaari po bang ulitin ang inyong tanong?"
          : "Sorry, I ran into a brief connection issue. Could you please ask that again?";
      }

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'model',
        content: replyText,
        timestamp: formatCurrentTime()
      };

      const updated = [...newMessages, aiMessage];
      setMessages(updated);

      // Save to Firestore if user is authenticated
      if (db && user) {
        try {
          await addDoc(collection(db, `users/${user.uid}/conversations`), {
            userId: user.uid,
            messages: updated.map(m => ({ role: m.role, content: m.content })),
            createdAt: Date.now(),
            updatedAt: Date.now()
          });
        } catch (dbErr) {
          console.warn("Firestore logging skipped:", dbErr);
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      const fallbackMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'model',
        content: currentLang === 'tl'
          ? "Paumanhin po, sandaling nagkaroon ng aberya. Maaari po bang ulitin ang inyong tanong?"
          : "Sorry, I ran into a brief connection issue. Could you please ask that again?",
        timestamp: formatCurrentTime()
      };
      setMessages([...newMessages, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const activeQuickActions = selectedLanguage === 'tl' ? tagalogQuickActions : englishQuickActions;

  const getActionButtonsForMessage = (content: string, isTagalog: boolean) => {
    const lower = content.toLowerCase();
    const buttons: { tab?: TabItem; href?: string; label: string; icon: React.ReactNode; onClick?: () => void }[] = [];

    if (lower.includes('1bpfgoffo67') || lower.includes('1bpfgoff') || lower.includes('stream') || lower.includes('online service') || lower.includes('livestream') || lower.includes('panoorin ang online') || lower.includes('facebook')) {
      buttons.push({
        href: 'https://www.facebook.com/share/g/1BpFgffo67/',
        label: isTagalog ? 'Panoorin ang Online Service' : 'Watch Online Service',
        icon: <Video size={13} className="text-[#1877F2]" />
      });
    }

    if (lower.includes('cell group') || lower.includes('small group') || lower.includes('cell fellowship') || lower.includes('cell')) {
      buttons.push({
        label: isTagalog ? '➕ Mag-register ng Cell Group' : '➕ Register Cell Group',
        icon: <Plus size={13} className="text-[#C82323]" />,
        onClick: () => activateCellHelper('register')
      });
      buttons.push({
        label: isTagalog ? '✏️ I-update ang Cell Group' : '✏️ Update Cell Group',
        icon: <Edit size={13} className="text-[#0F2C59]" />,
        onClick: () => activateCellHelper('update')
      });
      buttons.push({
        label: isTagalog ? '📸 Mag-log ng Attendance' : '📸 Log Meeting Report',
        icon: <FileText size={13} className="text-emerald-700" />,
        onClick: () => activateCellHelper('log_meeting')
      });
    }

    if (handleTabClick) {
      if (lower.includes('event') || lower.includes('rsvp') || lower.includes('kaganapan')) {
        buttons.push({
          tab: 'Events',
          label: isTagalog ? 'Pumunta sa Events Page' : 'Go to Events Page',
          icon: <Calendar size={13} className="text-[#C82323]" />
        });
      }

      if (lower.includes('leader tools') || lower.includes('balangkas ng sermon') || lower.includes('sermon outline') || lower.includes('sermon series')) {
        buttons.push({
          tab: 'Leader Tools',
          label: isTagalog ? 'Buksan ang Leader Tools (Grow)' : 'Open Leader Tools (Grow)',
          icon: <BookOpen size={13} className="text-[#0F2C59]" />
        });
      }

      if (lower.includes('seminary') || lower.includes('seminaryo') || lower.includes('theology') || lower.includes('theological') || lower.includes('teolohiya') || lower.includes('formal education') || lower.includes('degree') || lower.includes('ats') || lower.includes('cli')) {
        buttons.push({
          tab: 'Formal Education',
          label: isTagalog ? 'Pormal na Edukasyon (Grow)' : 'Formal Education (Grow)',
          icon: <GraduationCap size={13} className="text-[#C82323]" />
        });
      }

      if (lower.includes('manual') || lower.includes('consolidation') || lower.includes('konsolidasyon')) {
        buttons.push({
          tab: 'Manuals',
          label: isTagalog ? 'Buksan ang Manuals (Grow)' : 'Open Manuals (Grow)',
          icon: <BookOpen size={13} className="text-emerald-700" />
        });
      }

      if (lower.includes('cell group') || lower.includes('small group') || lower.includes('cell fellowship') || lower.includes('cell')) {
        buttons.push({
          tab: 'Cell Group',
          label: isTagalog ? 'Pumunta sa Cell Groups Page' : 'View Cell Groups Page',
          icon: <Users size={13} className="text-blue-600" />
        });
      }

      if (lower.includes('100 day') || lower.includes('100 days') || lower.includes('first 100')) {
        buttons.push({
          tab: '100 Days Bible Plan',
          label: isTagalog ? '100 Days Bible Plan' : '100 Days Bible Plan',
          icon: <BookOpen size={13} className="text-amber-600" />
        });
      }

      if (lower.includes('365') || lower.includes('365-day') || lower.includes('buong bibliya')) {
        buttons.push({
          tab: '365 Bible Reading Guide',
          label: isTagalog ? '365 Bible Reading Guide' : '365 Bible Reading Guide',
          icon: <BookOpen size={13} className="text-indigo-600" />
        });
      }

      if (lower.includes('ebanghelyo') || lower.includes('gospel') || lower.includes('spiritual truths') || lower.includes('espiritwal na katotohanan')) {
        buttons.push({
          tab: 'Gospel',
          label: isTagalog ? 'Tingnan ang Gospel Page' : 'View Gospel Page',
          icon: <BookOpen size={13} className="text-red-600" />
        });
      }

      if (lower.includes('prayer hub') || lower.includes('prayer request') || (lower.includes('prayer') && lower.includes('hub')) || lower.includes('panalangin')) {
        buttons.push({
          tab: 'Prayer Hub',
          label: isTagalog ? 'Pumunta sa Prayer Hub' : 'Go to Prayer Hub',
          icon: <HeartHandshake size={13} className="text-purple-600" />
        });
      }

      if (lower.includes('giving') || lower.includes('tithe') || lower.includes('handog') || lower.includes('kaloob') || lower.includes('gcash')) {
        buttons.push({
          tab: 'Giving',
          label: isTagalog ? 'Pumunta sa Giving Page' : 'Go to Giving Page',
          icon: <HeartHandshake size={13} className="text-amber-600" />
        });
      }

      if (lower.includes('contact') || lower.includes('lokasyon') || lower.includes('location') || lower.includes('map') || lower.includes('mañalac') || lower.includes('direksyon') || lower.includes('planuhin ang pagbisita') || lower.includes('plan my visit')) {
        buttons.push({
          tab: 'Contact',
          label: isTagalog ? 'Tingnan ang Lokasyon & Map' : 'View Location & Map',
          icon: <MapPin size={13} className="text-red-600" />
        });
      }
    }

    return buttons;
  };

  const selectedExistingGroup = cellGroups.find(g => g.id === cellDraft.groupId);
  const allMembersForAttendance = selectedExistingGroup
    ? [selectedExistingGroup.leaderName, ...(selectedExistingGroup.members || [])].filter(Boolean)
    : [];

  return (
    <aside 
      aria-label="Hannah Virtual Church Usher"
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans"
    >
      {/* 1. OPEN STATE: Expandable Chat Window */}
      {isOpen ? (
        <section 
          aria-label="Hannah Chat Window"
          className={`w-[360px] ${isCellHelperActive ? 'sm:w-[460px] h-[640px]' : 'sm:w-[410px] h-[560px]'} max-h-[88vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 transition-all`}
        >
          {/* Header Bar */}
          <div className="bg-[#0F2C59] text-white px-4 py-3.5 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C82323] to-[#D4A373] p-0.5 shadow-sm flex items-center justify-center">
                  <div className="w-full h-full bg-[#0F2C59] rounded-full flex items-center justify-center text-white">
                    <Sparkles size={16} className="text-amber-300" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0F2C59] rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base leading-tight tracking-wide font-serif text-white">
                  Hannah Chat
                </h3>
                <p className="text-[11px] text-amber-200 font-medium">
                  {isTagalog ? 'Kaagapay sa Simbahan at Cell Group' : 'Virtual Church & Cell Group Helper'}
                </p>
              </div>
            </div>

            {/* Right Header: Language Switcher & Controls */}
            <div className="flex items-center gap-1.5">
              <LanguageToggle theme="dark" id="hannah-lang-toggle" className="mr-1 scale-90 sm:scale-100 origin-right" />

              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-white/15 flex items-center justify-center text-gray-200 hover:text-white transition-colors"
                title="Minimize chat"
                aria-label="Minimize chat"
              >
                <Minus size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-white/15 flex items-center justify-center text-gray-200 hover:text-white transition-colors"
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat Body Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFAFA]">
            {!selectedLanguage ? (
              <div className="h-full flex flex-col items-center justify-center p-4 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-2xl bg-[#0F2C59] text-amber-300 flex items-center justify-center shadow-md mb-4">
                  <Globe size={28} />
                </div>
                
                <h4 className="text-base font-bold text-gray-900 font-serif mb-1.5">
                  Kumusta! Welcome to SKCCI
                </h4>
                
                <div className="bg-gray-100 rounded-full px-3 py-1 mb-6 border border-gray-200">
                  <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">Hannah • AI Virtual Church Usher</span>
                </div>
                
                <p className="text-xs text-gray-600 mb-6 leading-relaxed max-w-[260px]">
                  Please choose your preferred language / Piliin ang inyong wika upang masimulan ang pakikipag-usap:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-[300px]">
                  <button
                    onClick={() => handleSelectLanguage('tl')}
                    className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-white hover:bg-red-50 text-[#C82323] border-2 border-[#C82323] hover:border-[#a11b1b] rounded-2xl font-bold text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="text-lg">🇵🇭</span>
                    <span className="text-left leading-tight">
                      Tagalog <span className="block text-[10px] text-gray-500 font-normal">Filipino</span>
                    </span>
                  </button>

                  <button
                    onClick={() => handleSelectLanguage('en')}
                    className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-[#0F2C59] hover:bg-[#1E3E62] text-white border-2 border-[#0F2C59] rounded-2xl font-bold text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="text-lg">🇺🇸</span>
                    <span className="text-left leading-tight">
                      English <span className="block text-[10px] text-amber-200 font-normal">US / Global</span>
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Regular Message History */}
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  const actionButtons = !isUser ? getActionButtonsForMessage(msg.content, selectedLanguage === 'tl') : [];
                  
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-full bg-[#0F2C59] text-amber-300 flex items-center justify-center text-xs font-bold shrink-0 mt-1 shadow-sm">
                          H
                        </div>
                      )}

                      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[88%]`}>
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
                            isUser
                              ? 'bg-[#C82323] text-white rounded-br-xs shadow-sm font-normal'
                              : 'bg-white text-gray-800 border border-gray-200/80 rounded-bl-xs shadow-xs prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-gray-900'
                          }`}
                        >
                          {isUser ? (
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                          ) : (
                            <div className="markdown-body">
                              <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                          )}
                        </div>

                        {actionButtons.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {actionButtons.map((btn, bIdx) => {
                              if (btn.href) {
                                return (
                                  <a
                                    key={bIdx}
                                    href={btn.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-[#1877F2] hover:text-blue-800 border border-blue-200 hover:border-blue-300 px-3 py-1.5 rounded-xl shadow-2xs transition-all active:scale-95 cursor-pointer no-underline"
                                  >
                                    {btn.icon}
                                    <span>{btn.label}</span>
                                  </a>
                                );
                              }

                              return (
                                <button
                                  key={bIdx}
                                  onClick={() => {
                                    if (btn.onClick) {
                                      btn.onClick();
                                    } else if (btn.tab && handleTabClick) {
                                      handleTabClick(btn.tab);
                                    }
                                  }}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-red-50 text-gray-800 hover:text-[#C82323] border border-gray-300 hover:border-red-300 px-3 py-1.5 rounded-xl shadow-2xs transition-all active:scale-95 cursor-pointer"
                                >
                                  {btn.icon}
                                  <span>{btn.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        <span className="text-[10px] text-gray-400 mt-1 px-1">
                          {msg.timestamp}
                        </span>
                      </div>

                      {isUser && (
                        <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs shrink-0 mt-1 shadow-sm overflow-hidden">
                          {user?.photoURL ? (
                            <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                          ) : (
                            <User size={14} />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* SENIOR-FRIENDLY INTERACTIVE CELL GROUP ASSISTANT CARD */}
                {isCellHelperActive && (
                  <div className="bg-white rounded-2xl border-2 border-[#0F2C59] shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {/* Card Header */}
                    <div className="bg-[#0F2C59] text-white px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-amber-300 shrink-0" />
                        <span className="font-bold text-sm sm:text-base">
                          {isTagalog ? 'Madaling Cell Group Helper' : 'Easy Cell Group Helper'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsCellHelperActive(false)}
                        className="text-xs bg-white/15 hover:bg-white/25 text-white px-2.5 py-1 rounded-lg font-medium transition-colors"
                      >
                        {isTagalog ? 'Isara' : 'Close'}
                      </button>
                    </div>

                    {/* 3 Big Mode Switcher Buttons */}
                    <div className="grid grid-cols-3 gap-1.5 p-2.5 bg-gray-100 border-b border-gray-200">
                      <button
                        type="button"
                        onClick={() => activateCellHelper('register')}
                        className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          cellDraft.mode === 'register'
                            ? 'bg-[#C82323] text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <Plus size={15} />
                        <span>{isTagalog ? 'Bagong Group' : 'New Group'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => activateCellHelper('update', selectedExistingGroup)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          cellDraft.mode === 'update'
                            ? 'bg-[#0F2C59] text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <Edit size={15} />
                        <span>{isTagalog ? 'I-update' : 'Update Group'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => activateCellHelper('log_meeting', selectedExistingGroup)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          cellDraft.mode === 'log_meeting'
                            ? 'bg-emerald-700 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <FileText size={15} />
                        <span>{isTagalog ? 'Mag-log Report' : 'Log Report'}</span>
                      </button>
                    </div>

                    <div className="p-4 space-y-4 text-sm">
                      {/* Group Selector when Updating or Logging Meeting */}
                      {(cellDraft.mode === 'update' || cellDraft.mode === 'log_meeting') && (
                        <div>
                          <label className="block text-xs font-bold text-[#0F2C59] uppercase tracking-wide mb-2">
                            {isTagalog ? '1. Piliin ang Inyong Cell Group:' : '1. Tap Your Cell Group:'}
                          </label>
                          {cellGroups.length === 0 ? (
                            <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl">
                              {isTagalog
                                ? 'Wala pa pong naka-register na Cell Group. Pindutin ang "Bagong Group" sa itaas.'
                                : 'No Cell Groups found yet. Tap "New Group" above to register one.'}
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
                              {cellGroups.map((g) => {
                                const isSelected = cellDraft.groupId === g.id;
                                return (
                                  <button
                                    key={g.id}
                                    type="button"
                                    onClick={() => handleSelectExistingGroup(g.id)}
                                    className={`w-full text-left px-3.5 py-2.5 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                                      isSelected
                                        ? 'border-[#C82323] bg-red-50/70 text-[#0F2C59] font-bold'
                                        : 'border-gray-200 hover:border-gray-300 bg-gray-50/60 text-gray-800'
                                    }`}
                                  >
                                    <div>
                                      <p className="text-sm font-bold">{g.leaderName}&apos;s Group</p>
                                      <p className="text-xs text-gray-500">
                                        {g.location} • {g.scheduleDay}s ({(g.members?.length || 0) + 1} members)
                                      </p>
                                    </div>
                                    {isSelected && (
                                      <CheckCircle2 size={20} className="text-[#C82323] shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}

                      {/* MODE A: REGISTER OR UPDATE GROUP */}
                      {(cellDraft.mode === 'register' || cellDraft.mode === 'update') && (
                        <>
                          {/* Leader Name */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-xs font-bold text-gray-700 uppercase">
                                {isTagalog ? 'Pangalan ng Cell Leader *' : 'Cell Leader Name *'}
                              </label>
                              {user?.displayName && cellDraft.leaderName !== user.displayName && (
                                <button
                                  type="button"
                                  onClick={() => setCellDraft(prev => ({ ...prev, leaderName: user.displayName || '' }))}
                                  className="text-xs font-bold text-[#C82323] hover:underline cursor-pointer"
                                >
                                  {isTagalog ? 'Gamitin ang Pangalan Ko' : 'Use My Name'}
                                </button>
                              )}
                            </div>
                            <input
                              type="text"
                              value={cellDraft.leaderName}
                              onChange={(e) => setCellDraft(prev => ({ ...prev, leaderName: e.target.value }))}
                              placeholder={isTagalog ? 'Halimbawa: Nanay Maria Santos' : 'e.g. Sis. Maria Santos'}
                              className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-base font-medium text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C82323]"
                            />
                          </div>

                          {/* Location with 1-tap chips */}
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                              {isTagalog ? 'Saan Nagmi-meeting? (Lokasyon) *' : 'Meeting Location *'}
                            </label>
                            <input
                              type="text"
                              value={cellDraft.location}
                              onChange={(e) => setCellDraft(prev => ({ ...prev, location: e.target.value }))}
                              placeholder={isTagalog ? 'Halimbawa: Bagong Tanyag, Taguig' : 'e.g. Bagong Tanyag, Taguig'}
                              className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-base font-medium text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C82323] mb-2"
                            />
                            <div className="flex flex-wrap gap-1.5">
                              {LOCATION_PRESETS.map((loc) => (
                                <button
                                  key={loc}
                                  type="button"
                                  onClick={() => setCellDraft(prev => ({ ...prev, location: loc }))}
                                  className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold border transition-all cursor-pointer ${
                                    cellDraft.location === loc
                                      ? 'bg-[#0F2C59] text-white border-[#0F2C59]'
                                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                                  }`}
                                >
                                  📍 {loc}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Schedule Day (Big 1-tap buttons) */}
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                              {isTagalog ? 'Anong Araw? (Pumili ng Araw)' : 'Meeting Day (Tap Day)'}
                            </label>
                            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                              {DAYS_OF_WEEK.map((d) => {
                                const active = cellDraft.scheduleDay === d.value;
                                return (
                                  <button
                                    key={d.value}
                                    type="button"
                                    onClick={() => setCellDraft(prev => ({ ...prev, scheduleDay: d.value }))}
                                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                      active
                                        ? 'bg-[#C82323] text-white border-[#C82323] shadow-xs'
                                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                                    }`}
                                  >
                                    {isTagalog ? d.tl : d.en}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Schedule Time (Big 1-tap presets + input) */}
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                              {isTagalog ? 'Anong Oras?' : 'Meeting Time'}
                            </label>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {TIME_PRESETS.map((t) => {
                                const active = cellDraft.scheduleTime === t.value;
                                return (
                                  <button
                                    key={t.value}
                                    type="button"
                                    onClick={() => setCellDraft(prev => ({ ...prev, scheduleTime: t.value }))}
                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                                      active
                                        ? 'bg-[#0F2C59] text-white border-[#0F2C59]'
                                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                                    }`}
                                  >
                                    ⏰ {t.label}
                                  </button>
                                );
                              })}
                            </div>
                            <input
                              type="time"
                              value={cellDraft.scheduleTime}
                              onChange={(e) => setCellDraft(prev => ({ ...prev, scheduleTime: e.target.value }))}
                              className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-base font-medium text-gray-900 bg-gray-50"
                            />
                          </div>

                          {/* Members List */}
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                              {isTagalog ? 'Mga Miyembro ng Cell Group *' : 'Cell Group Members *'}
                            </label>
                            <p className="text-xs text-gray-500 mb-2">
                              {isTagalog
                                ? 'I-type ang pangalan (maaaring marami na may kuwit) at pindutin ang "+ Idagdag":'
                                : 'Type member names (you can separate with commas) and tap "+ Add":'}
                            </p>
                            <div className="flex gap-2 mb-2.5">
                              <input
                                type="text"
                                value={memberTextInput}
                                onChange={(e) => setMemberTextInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddDraftMembers();
                                  }
                                }}
                                placeholder={isTagalog ? 'Hal. Nanay Rosa, Ate Lorna, Tess' : 'e.g. Rosa, Lorna, Tess'}
                                className="flex-1 rounded-xl border border-gray-300 px-3.5 py-2.5 text-base text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C82323]"
                              />
                              <button
                                type="button"
                                onClick={handleAddDraftMembers}
                                className="px-4 py-2.5 bg-[#0F2C59] hover:bg-[#1E3E62] text-white font-bold text-xs sm:text-sm rounded-xl shrink-0 cursor-pointer active:scale-95"
                              >
                                {isTagalog ? '+ Idagdag' : '+ Add'}
                              </button>
                            </div>

                            {cellDraft.members.length > 0 ? (
                              <div className="flex flex-wrap gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                                {cellDraft.members.map((m, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white text-[#0F2C59] border border-gray-300 shadow-2xs"
                                  >
                                    {m}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setCellDraft(prev => ({
                                          ...prev,
                                          members: prev.members.filter((_, i) => i !== idx),
                                        }))
                                      }
                                      className="text-gray-400 hover:text-[#C82323] p-0.5 cursor-pointer"
                                      title={isTagalog ? 'Alisin' : 'Remove'}
                                    >
                                      <X size={14} />
                                    </button>
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                                {isTagalog
                                  ? '💡 Wala pa pong miyembro sa listahan. Mag-type ng pangalan sa itaas at pindutin ang "+ Idagdag".'
                                  : '💡 No members added yet. Type a name above and tap "+ Add".'}
                              </p>
                            )}
                          </div>

                          {/* Group Photo Upload or Preset */}
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                              {isTagalog ? 'Litrato ng Grupo (Pumili o Mag-upload)' : 'Group Photo (Upload or Tap Preset)'}
                            </label>
                            <div className="flex items-center gap-3 mb-2.5">
                              <label className="flex-1 py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border-2 border-dashed border-amber-400 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer">
                                {isUploadingPhoto ? (
                                  <Loader2 size={16} className="animate-spin text-[#C82323]" />
                                ) : (
                                  <Camera size={17} className="text-[#C82323]" />
                                )}
                                <span>
                                  {isUploadingPhoto
                                    ? isTagalog
                                      ? 'Inaayos ang Litrato...'
                                      : 'Optimizing Photo...'
                                    : isTagalog
                                    ? 'Mag-upload ng Litrato'
                                    : 'Upload / Take Photo'}
                                </span>
                                <input
                                  type="file"
                                  className="sr-only"
                                  accept="image/*"
                                  disabled={isUploadingPhoto}
                                  onChange={handleChatPhotoChange}
                                />
                              </label>
                            </div>
                            <div className="grid grid-cols-4 gap-1.5">
                              {HANNAH_FELLOWSHIP_PRESETS.map((p) => {
                                const selected = cellDraft.photoUrl === p.url;
                                return (
                                  <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => setCellDraft(prev => ({ ...prev, photoUrl: p.url }))}
                                    className={`rounded-xl overflow-hidden border-2 p-0.5 flex flex-col items-center cursor-pointer ${
                                      selected ? 'border-[#C82323] bg-red-50' : 'border-gray-200 bg-white'
                                    }`}
                                  >
                                    <img src={p.url} alt={p.labelEn} className="w-full h-11 object-cover rounded-lg" />
                                    <span className="text-[10px] font-bold text-gray-700 mt-0.5 truncate w-full text-center">
                                      {isTagalog ? p.labelTl : p.labelEn}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      )}

                      {/* MODE B: LOG MEETING REPORT & ATTENDANCE */}
                      {cellDraft.mode === 'log_meeting' && selectedExistingGroup && (
                        <>
                          {/* Date of Meeting */}
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                              {isTagalog ? '2. Petsa ng Meeting:' : '2. Date of Meeting:'}
                            </label>
                            <div className="flex gap-2 mb-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setCellDraft(prev => ({
                                    ...prev,
                                    meetingDate: new Date().toISOString().split('T')[0],
                                  }))
                                }
                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border cursor-pointer ${
                                  cellDraft.meetingDate === new Date().toISOString().split('T')[0]
                                    ? 'bg-[#0F2C59] text-white border-[#0F2C59]'
                                    : 'bg-gray-50 text-gray-700 border-gray-200'
                                }`}
                              >
                                📅 {isTagalog ? 'Ngayong Araw (Today)' : 'Today'}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const y = new Date();
                                  y.setDate(y.getDate() - 1);
                                  setCellDraft(prev => ({
                                    ...prev,
                                    meetingDate: y.toISOString().split('T')[0],
                                  }));
                                }}
                                className="flex-1 py-2 px-3 rounded-xl text-xs font-bold border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 cursor-pointer"
                              >
                                📅 {isTagalog ? 'Kahapon (Yesterday)' : 'Yesterday'}
                              </button>
                            </div>
                            <input
                              type="date"
                              value={cellDraft.meetingDate}
                              onChange={(e) => setCellDraft(prev => ({ ...prev, meetingDate: e.target.value }))}
                              className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-base font-medium text-gray-900 bg-gray-50"
                            />
                          </div>

                          {/* Upload Meeting Photo */}
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                              {isTagalog ? '3. Litrato ng Meeting (Opsyonal):' : '3. Upload Meeting Photo (Optional):'}
                            </label>
                            <label className="w-full py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-900 border-2 border-dashed border-amber-400 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer">
                              {isUploadingPhoto ? (
                                <Loader2 size={18} className="animate-spin text-[#C82323]" />
                              ) : (
                                <Upload size={18} className="text-[#C82323]" />
                              )}
                              <span>
                                {isUploadingPhoto
                                  ? isTagalog
                                    ? 'Inaayos ang Litrato...'
                                    : 'Optimizing Photo...'
                                  : cellDraft.meetingPhotoUrl
                                  ? isTagalog
                                    ? 'Palitan ang Litrato ng Meeting'
                                    : 'Change Meeting Photo'
                                  : isTagalog
                                  ? 'Pindutin para Mag-upload ng Litrato'
                                  : 'Tap to Upload Meeting Photo'}
                              </span>
                              <input
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                disabled={isUploadingPhoto}
                                onChange={handleChatPhotoChange}
                              />
                            </label>
                            {cellDraft.meetingPhotoUrl && (
                              <div className="mt-2 relative rounded-xl overflow-hidden h-32 border border-amber-300">
                                <img
                                  src={cellDraft.meetingPhotoUrl}
                                  alt="Meeting Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>

                          {/* Attendance Checklist (Large Senior-Friendly Tap Targets) */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-xs font-bold text-gray-700 uppercase">
                                {isTagalog ? '4. Sino po ang mga Dumalo?' : '4. Who Attended? (Tap Names)'}
                              </label>
                              <button
                                type="button"
                                onClick={() => {
                                  if (cellDraft.attendedMembers.length === allMembersForAttendance.length) {
                                    setCellDraft(prev => ({ ...prev, attendedMembers: [] }));
                                  } else {
                                    setCellDraft(prev => ({ ...prev, attendedMembers: [...allMembersForAttendance] }));
                                  }
                                }}
                                className="text-xs font-bold text-[#C82323] hover:underline cursor-pointer"
                              >
                                {cellDraft.attendedMembers.length === allMembersForAttendance.length
                                  ? isTagalog
                                    ? 'Alisin Lahat'
                                    : 'Deselect All'
                                  : isTagalog
                                  ? 'Piliin Lahat (Select All)'
                                  : 'Select All Present'}
                              </button>
                            </div>
                            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                              {allMembersForAttendance.map((member, idx) => {
                                const isChecked = cellDraft.attendedMembers.includes(member);
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                      setCellDraft(prev => ({
                                        ...prev,
                                        attendedMembers: isChecked
                                          ? prev.attendedMembers.filter(m => m !== member)
                                          : [...prev.attendedMembers, member],
                                      }));
                                    }}
                                    className={`w-full px-4 py-3 rounded-xl border-2 flex items-center justify-between text-left transition-all cursor-pointer ${
                                      isChecked
                                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                  >
                                    <span className="text-base">
                                      {member}{' '}
                                      {idx === 0 && (
                                        <span className="text-xs font-normal text-gray-500">(Leader)</span>
                                      )}
                                    </span>
                                    {isChecked ? (
                                      <CheckSquare size={22} className="text-emerald-600 shrink-0" />
                                    ) : (
                                      <Square size={22} className="text-gray-400 shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      )}

                      {/* Big Save or Sign-In Button */}
                      <div className="pt-2">
                        {!user ? (
                          <button
                            type="button"
                            onClick={signInWithGoogle}
                            className="w-full py-3.5 px-4 bg-[#0F2C59] hover:bg-[#1E3E62] text-white font-bold text-base rounded-2xl shadow-md flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer"
                          >
                            <LogIn size={20} />
                            <span>
                              {isTagalog
                                ? 'Mag-Sign In sa Google para Ma-save'
                                : 'Sign In with Google to Save'}
                            </span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSaveCellAssistant}
                            disabled={isSavingCell || isUploadingPhoto}
                            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold text-base rounded-2xl shadow-md flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer"
                          >
                            {isSavingCell || isUploadingPhoto ? (
                              <>
                                <Loader2 size={20} className="animate-spin" />
                                <span>
                                  {isUploadingPhoto
                                    ? isTagalog
                                      ? 'Inaayos pa ang litrato...'
                                      : 'Optimizing photo...'
                                    : isTagalog
                                    ? 'Sini-save na po...'
                                    : 'Saving...'}
                                </span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 size={20} />
                                <span>
                                  {cellDraft.mode === 'register'
                                    ? isTagalog
                                      ? 'I-save ang Bagong Cell Group'
                                      : 'Save New Cell Group'
                                    : cellDraft.mode === 'update'
                                    ? isTagalog
                                      ? 'I-save ang Pagbabago'
                                      : 'Save Group Updates'
                                    : isTagalog
                                    ? 'I-save ang Meeting Report'
                                    : 'Save Meeting Report'}
                                </span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 text-gray-400 text-xs py-1">
                    <div className="w-6 h-6 rounded-full bg-[#0F2C59] text-amber-300 flex items-center justify-center text-[10px] font-bold">
                      H
                    </div>
                    <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-2xs text-gray-500">
                      <Loader2 size={13} className="animate-spin text-[#C82323]" />
                      <span>
                        {selectedLanguage === 'tl' ? 'Sumasagot si Hannah...' : 'Hannah is typing...'}
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Area: Dynamic Quick-Action Chips & Text Input */}
          {selectedLanguage && (
            <div className="bg-white border-t border-gray-200 shrink-0 flex flex-col">
              {/* Dynamic Quick-Action Chips Tray */}
              <div className="px-3 pt-2 pb-1.5 border-b border-gray-100 bg-[#FAFAFA]/80">
                <div className="flex items-center justify-between mb-1.5 px-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                    <Compass size={11} className="text-[#C82323]" />
                    {selectedLanguage === 'tl' ? 'Pindutin para sa Madaling Tulong:' : 'Tap for Quick Help:'}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1.5 max-h-[82px] overflow-y-auto pr-1">
                  {activeQuickActions.map((qa, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (qa.cellMode) {
                          activateCellHelper(qa.cellMode);
                        } else {
                          handleSendMessage(qa.prompt);
                        }
                      }}
                      disabled={isLoading}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all text-left shadow-2xs active:scale-95 disabled:opacity-50 whitespace-nowrap cursor-pointer ${
                        qa.cellMode
                          ? 'bg-red-50 hover:bg-[#C82323] text-[#C82323] hover:text-white border border-red-200'
                          : 'bg-white hover:bg-red-50 text-[#0F2C59] hover:text-[#C82323] border border-gray-200 hover:border-red-200 font-medium'
                      }`}
                    >
                      {qa.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text & Voice Input Area */}
              <div className="p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={toggleVoiceInput}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all shadow-xs cursor-pointer ${
                      isListening
                        ? 'bg-[#C82323] text-white animate-pulse ring-4 ring-red-200'
                        : 'bg-gray-100 hover:bg-gray-200 text-[#0F2C59]'
                    }`}
                    title={isTagalog ? 'Magsalita gamit ang Mic' : 'Speak with Microphone'}
                    aria-label={isTagalog ? 'Magsalita gamit ang Mic' : 'Speak with Microphone'}
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      selectedLanguage === 'tl' 
                        ? "Mag-type o pindutin ang 🎤 para magsalita..." 
                        : "Type or tap 🎤 to speak to Hannah..."
                    }
                    className="flex-1 bg-gray-50 border border-gray-300 rounded-full px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C82323] focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 rounded-full bg-[#C82323] hover:bg-[#a11b1b] disabled:bg-gray-200 disabled:text-gray-400 text-white flex items-center justify-center shrink-0 transition-all shadow-sm active:scale-95 disabled:cursor-not-allowed"
                    title={selectedLanguage === 'tl' ? "Ipadala" : "Send"}
                    aria-label={selectedLanguage === 'tl' ? "Ipadala" : "Send"}
                  >
                    <Send size={16} className={input.trim() ? "translate-x-0.5" : ""} />
                  </button>
                </form>
              </div>
              <div className="px-3 pb-2 text-center">
                <p className="text-[10px] sm:text-[11px] text-gray-400 leading-tight">
                  {selectedLanguage === 'tl'
                    ? "Si Hannah ay ang inyong AI church assistant. Maaari ninyo siyang kausapin sa Tagalog o English para sa madaling pag-register at pag-update ng Cell Group."
                    : "Hannah is your AI church assistant. Chat or tap above in Tagalog or English for easy Cell Group registration and updates."
                  }
                </p>
              </div>
            </div>
          )}
        </section>
      ) : (
        /* 2. CLOSED STATE: Pulsing Circular FAB */
        <div className="relative group">
          <span className="absolute -inset-1 rounded-full bg-[#C82323] opacity-30 animate-ping pointer-events-none"></span>
          
          <button
            id="hannah-chat-launcher"
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#0F2C59] to-[#1E3E62] hover:from-[#C82323] hover:to-[#a11b1b] text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-amber-300/40"
            aria-label="Open Hannah Church Usher Chat"
            title="Chat with Hannah"
          >
            <MessageCircle size={26} className="text-white group-hover:scale-110 transition-transform" />
            
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border-2 border-white"></span>
            </span>
          </button>

          <div className="absolute left-16 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center">
            <div className="bg-[#0F2C59] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap border border-white/10 flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2 duration-150">
              <Sparkles size={12} className="text-amber-300" />
              <span>
                {selectedLanguage === 'en' ? 'Chat with Hannah' : 'Kausapin si Hannah'}
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
