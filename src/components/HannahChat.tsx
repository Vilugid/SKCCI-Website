import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
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
  Video
} from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import { TabItem } from '../types';

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
}

interface HannahChatProps {
  handleTabClick?: (tab: TabItem) => void;
}

export default function HannahChat({ handleTabClick }: HannahChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<ChatLanguage | null>(() => {
    try {
      const saved = localStorage.getItem('hannah_language');
      if (saved === 'tl' || saved === 'en') {
        return saved;
      }
    } catch {
      // ignore localStorage error
    }
    return null;
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  const formatCurrentTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const tagalogQuickActions: QuickAction[] = [
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
      label: "Cell Groups / Small Groups", 
      prompt: "Ano-ano po ang mga Cell Groups at paano makakasali?" 
    },
    { 
      label: "Ang Ebanghelyo at Debosyon", 
      prompt: "Maaari po bang ibahagi ang mensahe ng Ebanghelyo at mga gabay sa debosyon?" 
    },
    { 
      label: "Hiling sa Panalangin at Pagkakaloob", 
      prompt: "Nais ko po magpadala ng prayer request at malaman ang mga paraan ng pagkakaloob." 
    },
    { 
      label: "Lokasyon at Online Service", 
      prompt: "Saan po matatagpuan ang simbahan at paano mapapanood ang online Facebook livestream?" 
    },
  ];

  const englishQuickActions: QuickAction[] = [
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
      label: "Cell Groups", 
      prompt: "What small groups/cell groups are available and how can I connect?" 
    },
    { 
      label: "The Gospel & Devotionals", 
      prompt: "Could you share the message of the Gospel and available daily devotional guides?" 
    },
    { 
      label: "Prayer Requests & Giving", 
      prompt: "How do I submit a prayer request and what are the giving options?" 
    },
    { 
      label: "Church Location & Streaming", 
      prompt: "Where is the church located and where can I watch the online Facebook livestream?" 
    },
  ];

  const tagalogGreeting = "Maligayang pagdating! Ako si Hannah, ang inyong AI virtual church usher. Paano po kita matutulungan ngayon?";
  const englishGreeting = "Welcome! I'm Hannah, your AI virtual church usher. How can I assist you today?";

  // When language is selected or changed
  const handleSelectLanguage = (lang: ChatLanguage) => {
    setSelectedLanguage(lang);
    try {
      localStorage.setItem('hannah_language', lang);
    } catch {
      // ignore
    }

    const greetingText = lang === 'tl' ? tagalogGreeting : englishGreeting;
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content: greetingText,
        timestamp: formatCurrentTime()
      }
    ]);
  };

  // Switch language via header toggle
  const handleHeaderLanguageSwitch = (newLang: ChatLanguage) => {
    if (selectedLanguage === newLang) return;
    setSelectedLanguage(newLang);
    try {
      localStorage.setItem('hannah_language', newLang);
    } catch {
      // ignore
    }

    const switchNotification = newLang === 'tl'
      ? "Pinalitan ang wika sa **Tagalog / Filipino**. Paano po kita matutulungan?"
      : "Switched language to **English**. How can I assist you today?";

    setMessages(prev => [
      ...prev,
      {
        id: `switch-${Date.now()}`,
        role: 'model',
        content: switchNotification,
        timestamp: formatCurrentTime()
      }
    ]);
  };

  // If chat is opened and user already had a saved language, ensure initial greeting exists
  useEffect(() => {
    if (isOpen && selectedLanguage && messages.length === 0) {
      setMessages([
        {
          id: 'initial-welcome',
          role: 'model',
          content: selectedLanguage === 'tl' ? tagalogGreeting : englishGreeting,
          timestamp: formatCurrentTime()
        }
      ]);
    }
  }, [isOpen, selectedLanguage, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen, selectedLanguage]);

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
    const buttons: { tab?: TabItem; href?: string; label: string; icon: React.ReactNode }[] = [];

    if (lower.includes('1bpfgoffo67') || lower.includes('1bpfgoff') || lower.includes('stream') || lower.includes('online service') || lower.includes('livestream') || lower.includes('panoorin ang online') || lower.includes('facebook')) {
      buttons.push({
        href: 'https://www.facebook.com/share/g/1BpFgffo67/',
        label: isTagalog ? 'Panoorin ang Online Service' : 'Watch Online Service',
        icon: <Video size={13} className="text-[#1877F2]" />
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
          label: isTagalog ? 'Pumunta sa Cell Groups' : 'View Cell Groups',
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

  return (
    <aside 
      aria-label="Hannah Virtual Church Usher"
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans"
    >
      {/* 1. OPEN STATE: Expandable Chat Window */}
      {isOpen ? (
        <section 
          aria-label="Hannah Chat Window"
          className="w-[360px] sm:w-[410px] h-[560px] max-h-[85vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
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
                <p className="text-[11px] text-amber-200 font-medium">Virtual Church Usher</p>
              </div>
            </div>

            {/* Right Header: Language Switcher & Controls */}
            <div className="flex items-center gap-1.5">
              {/* Header Language Switcher Toggle */}
              {selectedLanguage && (
                <div className="flex items-center bg-black/25 rounded-full p-0.5 border border-white/10 text-xs font-semibold mr-1">
                  <button
                    onClick={() => handleHeaderLanguageSwitch('tl')}
                    className={`px-2 py-0.5 rounded-full transition-all text-[11px] ${
                      selectedLanguage === 'tl'
                        ? 'bg-[#C82323] text-white font-bold shadow-xs'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    title="Switch to Tagalog / Filipino"
                  >
                    🇵🇭 TL
                  </button>
                  <button
                    onClick={() => handleHeaderLanguageSwitch('en')}
                    className={`px-2 py-0.5 rounded-full transition-all text-[11px] ${
                      selectedLanguage === 'en'
                        ? 'bg-white text-[#0F2C59] font-bold shadow-xs'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    title="Switch to English"
                  >
                    🇺🇸 EN
                  </button>
                </div>
              )}

              {/* Minimize and Close Buttons */}
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
            {/* If NO Language has been chosen yet, show onboarding card */}
            {!selectedLanguage ? (
              <div className="h-full flex flex-col items-center justify-center p-4 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-2xl bg-[#0F2C59] text-amber-300 flex items-center justify-center shadow-md mb-4">
                  <Globe size={28} />
                </div>
                
                <h4 className="text-base font-bold text-gray-900 font-serif mb-1.5">
                  Kumusta! Welcome to SKCCI
                </h4>
                
                <div className="bg-gray-100 rounded-full px-3 py-1 mb-6 border border-gray-200">
                  <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">Hannah • AI Virtual Church Usher | Powered by Gemini</span>
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

                <p className="text-[11px] text-gray-400 mt-6">
                  You can change your language anytime inside the chat header.
                </p>
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
                      {/* Hannah Avatar */}
                      {!isUser && (
                        <div className="w-7 h-7 rounded-full bg-[#0F2C59] text-amber-300 flex items-center justify-center text-xs font-bold shrink-0 mt-1 shadow-sm">
                          H
                        </div>
                      )}

                      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%]`}>
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

                        {/* Interactive Direct Navigation / Link Action Buttons */}
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
                                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-blue-50 hover:bg-blue-100 text-[#1877F2] hover:text-blue-800 border border-blue-200 hover:border-blue-300 px-2.5 py-1 rounded-lg shadow-2xs transition-all active:scale-95 cursor-pointer no-underline"
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
                                    if (btn.tab && handleTabClick) {
                                      handleTabClick(btn.tab);
                                    }
                                  }}
                                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-white hover:bg-red-50 text-gray-800 hover:text-[#C82323] border border-gray-300 hover:border-red-300 px-2.5 py-1 rounded-lg shadow-2xs transition-all active:scale-95 cursor-pointer"
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

                      {/* User Avatar */}
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
                    {selectedLanguage === 'tl' ? 'Pumili ng Paksa (Quick Topics):' : 'Quick Action Topics:'}
                  </span>
                </div>
                
                {/* Horizontal scrollable / wrapping chip grid */}
                <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto pr-1">
                  {activeQuickActions.map((qa, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(qa.prompt)}
                      disabled={isLoading}
                      className="text-[11px] sm:text-xs bg-white hover:bg-red-50 text-[#0F2C59] hover:text-[#C82323] border border-gray-200 hover:border-red-200 font-medium px-2.5 py-1 rounded-full transition-all text-left shadow-2xs active:scale-95 disabled:opacity-50 whitespace-nowrap"
                    >
                      {qa.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input Area */}
              <div className="p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      selectedLanguage === 'tl' 
                        ? "Magtanong o mag-type rito..." 
                        : "Ask Hannah a question..."
                    }
                    className="flex-1 bg-gray-50 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C82323] focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-9 h-9 rounded-full bg-[#C82323] hover:bg-[#a11b1b] disabled:bg-gray-200 disabled:text-gray-400 text-white flex items-center justify-center shrink-0 transition-all shadow-sm active:scale-95 disabled:cursor-not-allowed"
                    title={selectedLanguage === 'tl' ? "Ipadala" : "Send"}
                    aria-label={selectedLanguage === 'tl' ? "Ipadala" : "Send"}
                  >
                    <Send size={15} className={input.trim() ? "translate-x-0.5" : ""} />
                  </button>
                </form>
              </div>
              <div className="px-3 pb-2 text-center">
                <p className="text-[10px] sm:text-[11px] text-gray-400 leading-tight">
                  {selectedLanguage === 'tl'
                    ? "Si Hannah ay isang AI assistant na pinapagana ng Gemini. Bagamat nilikha upang tumulong at magpalakas ng loob, ang AI ay maaaring magkamali. Mangyaring sumangguni sa pamunuan ng simbahan para sa mahahalagang detalye tungkol sa Bibliya, pastoral, o iskedyul."
                    : "Hannah is an AI assistant powered by Gemini. While designed to encourage and assist, AI can make mistakes. Please verify important biblical, pastoral, or schedule details with church leadership."
                  }
                </p>
              </div>
            </div>
          )}
        </section>
      ) : (
        /* 2. CLOSED STATE: Pulsing Circular FAB */
        <div className="relative group">
          {/* Subtle Ambient Pulse Wave */}
          <span className="absolute -inset-1 rounded-full bg-[#C82323] opacity-30 animate-ping pointer-events-none"></span>
          
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#0F2C59] to-[#1E3E62] hover:from-[#C82323] hover:to-[#a11b1b] text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-amber-300/40"
            aria-label="Open Hannah Church Usher Chat"
            title="Chat with Hannah"
          >
            {/* Chat Icon & Sparkle badge */}
            <MessageCircle size={26} className="text-white group-hover:scale-110 transition-transform" />
            
            {/* Small Online Status Badge */}
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border-2 border-white"></span>
            </span>
          </button>

          {/* Hover Tooltip Label */}
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
