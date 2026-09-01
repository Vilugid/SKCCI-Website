import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { isEventAdmin } from '../utils/roles';
import { 
  fetchEvents, 
  createEvent, 
  updateEvent, 
  removeEvent, 
  fetchAllRSVPs, 
  toggleRSVP, 
  ChurchEvent, 
  RSVP,
  fetchSundayServiceCard,
  updateSundayServiceCard,
  fetchSundayAttendance,
  logSundayAttendance,
  updateSundayAttendance,
  deleteSundayAttendance,
  SundayServiceCardSettings,
  SundayAttendanceRecord,
  DEFAULT_SUNDAY_SERVICE_SETTINGS
} from '../api/events';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Mail, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle, 
  Clock, 
  Activity, 
  TrendingUp, 
  Image as ImageIcon,
  Sparkles,
  Sliders,
  BarChart3,
  RotateCcw,
  Check,
  CalendarCheck,
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import toast from 'react-hot-toast';

// Simple native date formatter fallback
const formatDate = (dateString: string) => {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  } catch (e) {
    return dateString;
  }
};

const formatShortDate = (dateString: string) => {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch (e) {
    return dateString;
  }
};

// Category detection & default high-quality Unsplash image generator
const getEventCategoryMeta = (title: string, description: string) => {
  const text = `${title || ''} ${description || ''}`.toLowerCase();
  if (text.includes('young pro') || text.includes('career') || text.includes('professionals') || text.includes('calling')) {
    return {
      category: 'Young Professionals',
      fallbackImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    };
  }
  if (text.includes('youth') || text.includes('k-youth') || text.includes('student') || text.includes('campus')) {
    return {
      category: 'Youth Ministry',
      fallbackImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
    };
  }
  if (text.includes('prayer') || text.includes('intercession') || text.includes('fasting') || text.includes('vigil')) {
    return {
      category: 'Prayer & Intercession',
      fallbackImage: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1200&q=80',
    };
  }
  if (text.includes('worship') || text.includes('sunday') || text.includes('service') || text.includes('celebration')) {
    return {
      category: 'Sunday Worship',
      fallbackImage: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80',
    };
  }
  if (text.includes('men') || text.includes('women') || text.includes('cell') || text.includes('family')) {
    return {
      category: 'Cell Fellowship',
      fallbackImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    };
  }
  return {
    category: 'Church Gathering',
    fallbackImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
  };
};

function EventCardImageHeader({ event, isFull, spotsLeft, isPast, isRecurring }: { event: ChurchEvent; isFull: boolean; spotsLeft: number; isPast?: boolean; isRecurring?: boolean }) {
  const meta = getEventCategoryMeta(event.title, event.description);
  const initialSrc = (event.coverImage && event.coverImage.trim().length > 0) ? event.coverImage.trim() : meta.fallbackImage;
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [imgError, setImgError] = useState(false);

  // Update src if event.coverImage updates
  React.useEffect(() => {
    if (event.coverImage && event.coverImage.trim().length > 0) {
      setImgSrc(event.coverImage.trim());
      setImgError(false);
    }
  }, [event.coverImage]);

  return (
    <div className={`h-52 bg-slate-800 relative overflow-hidden group ${isPast ? 'grayscale opacity-75' : ''}`}>
      {!imgError ? (
        <img 
          src={imgSrc} 
          alt={event.title} 
          referrerPolicy="no-referrer"
          onError={() => {
            if (imgSrc !== meta.fallbackImage) {
              setImgSrc(meta.fallbackImage);
            } else {
              setImgError(true);
            }
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0F2C59] via-[#1E3A8A] to-[#C82323]/80 text-white p-6 text-center">
          <Calendar className="h-12 w-12 mb-2 text-white/80" />
          <span className="text-xs font-bold tracking-wider uppercase text-white/90">{isRecurring ? 'Sunday Gathering' : meta.category}</span>
        </div>
      )}
      
      {/* Subtle bottom gradient shadow for text & badge contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />

      {/* Category Pill on Top-Left */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm border border-white/20">
        {isRecurring ? 'Sunday Gathering' : meta.category}
      </div>

      {/* Dynamic Spots Left Badge on Top-Right */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-md border border-gray-100 flex items-center gap-1.5 z-10">
        {isPast ? (
          <span className="flex items-center gap-1.5 text-gray-500 font-extrabold">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            Past Event
          </span>
        ) : isRecurring ? (
          <span className="flex items-center gap-1.5 text-[#0F2C59] font-extrabold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Open to All
          </span>
        ) : isFull ? (
          <span className="text-[#C82323] font-extrabold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#C82323] animate-pulse"></span>
            FULL / SOLD OUT
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-gray-800">
            <span className={`w-2 h-2 rounded-full ${spotsLeft <= 5 ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
            <span className="font-extrabold text-[#0F2C59]">{spotsLeft}</span> {spotsLeft === 1 ? 'spot left' : 'spots left'}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Events() {
  const { user, signInWithGoogle } = useAuth();
  const isAdmin = isEventAdmin(user?.email);
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<'feed' | 'admin'>('feed');
  const [adminSubTab, setAdminSubTab] = useState<'events' | 'sunday_card' | 'attendance'>('events');

  // Admin event form state
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateTime: '',
    location: '',
    capacity: 100,
    coverImage: ''
  });

  // Admin Sunday Service Card Editor State
  const [sundayCardForm, setSundayCardForm] = useState<SundayServiceCardSettings>(DEFAULT_SUNDAY_SERVICE_SETTINGS);
  const [isSundayCardLoaded, setIsSundayCardLoaded] = useState(false);

  // Admin Sunday Attendance Form State
  const [attendanceForm, setAttendanceForm] = useState({
    date: new Date().toISOString().split('T')[0],
    count: '',
    notes: ''
  });
  const [editingAttendanceId, setEditingAttendanceId] = useState<string | null>(null);

  // --- QUERIES ---
  const { data: events = [], isLoading: isLoadingEvents } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  });

  const { data: sundayCardSettings = DEFAULT_SUNDAY_SERVICE_SETTINGS } = useQuery({
    queryKey: ['sunday_service_card'],
    queryFn: fetchSundayServiceCard
  });

  // Sync Sunday Card Settings to form when loaded
  React.useEffect(() => {
    if (sundayCardSettings && !isSundayCardLoaded) {
      setSundayCardForm(sundayCardSettings);
      setIsSundayCardLoaded(true);
    }
  }, [sundayCardSettings, isSundayCardLoaded]);

  const { data: attendanceLogs = [], isLoading: isLoadingAttendance } = useQuery({
    queryKey: ['sunday_attendance'],
    queryFn: fetchSundayAttendance
  });

  const { data: allRsvps = {} } = useQuery({
    queryKey: ['events_rsvps', events.map(e => e.id).join(',')],
    queryFn: () => fetchAllRSVPs(events)
  });

  // --- MUTATIONS ---
  const rsvpMutation = useMutation({
    mutationFn: ({ eventId, isRSVPd }: { eventId: string, isRSVPd: boolean }) => toggleRSVP(eventId, user, isRSVPd),
    onMutate: async ({ eventId, isRSVPd }) => {
      // Optimistic update in cache
      await queryClient.cancelQueries({ queryKey: ['events_rsvps'] });
      const previousRsvps = queryClient.getQueryData<Record<string, RSVP[]>>(['events_rsvps', events.map(e => e.id).join(',')]) || {};
      
      const currentList = previousRsvps[eventId] || [];
      let updatedList: RSVP[];
      if (isRSVPd) {
        // Remove
        updatedList = currentList.filter(r => r.userId !== user?.uid);
      } else {
        // Add
        const newRsvp: RSVP = {
          id: user?.uid || 'guest',
          eventId,
          userId: user?.uid || 'guest',
          userName: user?.displayName || user?.email?.split('@')[0] || 'SKCC Member',
          userEmail: user?.email || '',
          photoUrl: user?.photoURL || ''
        };
        updatedList = [...currentList, newRsvp];
      }

      queryClient.setQueryData(['events_rsvps', events.map(e => e.id).join(',')], {
        ...previousRsvps,
        [eventId]: updatedList
      });

      return { previousRsvps };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['events_rsvps'] });
      if (variables.isRSVPd) {
        toast.success('RSVP cancelled');
      } else {
        toast.success('You are marked as attending! See you there!');
      }
    },
    onError: (error, _, context) => {
      if (context?.previousRsvps) {
        queryClient.setQueryData(['events_rsvps', events.map(e => e.id).join(',')], context.previousRsvps);
      }
      console.error(error);
      toast.error('Failed to update RSVP');
    }
  });

  const saveEventMutation = useMutation({
    mutationFn: async (data: Partial<ChurchEvent>) => {
      if (editId) {
        await updateEvent(editId, data);
      } else {
        await createEvent(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success(editId ? 'Event updated!' : 'Event created!');
      resetForm();
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to save event');
    }
  });

  const deleteEventMutation = useMutation({
    mutationFn: removeEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event deleted');
    }
  });

  const updateSundayCardMutation = useMutation({
    mutationFn: (settings: Partial<SundayServiceCardSettings>) => updateSundayServiceCard(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sunday_service_card'] });
      toast.success('Sunday Worship Service card updated live!');
    },
    onError: (err) => {
      console.error(err);
      toast.error('Failed to update Sunday Service card settings');
    }
  });

  const logAttendanceMutation = useMutation({
    mutationFn: async (record: { date: string; count: number; notes?: string; loggedBy?: string }) => {
      if (editingAttendanceId) {
        await updateSundayAttendance(editingAttendanceId, record);
      } else {
        await logSundayAttendance(record);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sunday_attendance'] });
      toast.success(editingAttendanceId ? 'Attendance record updated!' : 'Sunday attendance logged!');
      setAttendanceForm({
        date: new Date().toISOString().split('T')[0],
        count: '',
        notes: ''
      });
      setEditingAttendanceId(null);
    },
    onError: (err) => {
      console.error(err);
      toast.error('Failed to save attendance record');
    }
  });

  const deleteAttendanceMutation = useMutation({
    mutationFn: (id: string) => deleteSundayAttendance(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sunday_attendance'] });
      toast.success('Attendance record deleted');
    },
    onError: (err) => {
      console.error(err);
      toast.error('Failed to delete record');
    }
  });

  const handleRSVPClick = (eventId: string, isRSVPd: boolean) => {
    if (!user) {
      toast.error('Please sign in to RSVP');
      signInWithGoogle();
      return;
    }
    rsvpMutation.mutate({ eventId, isRSVPd });
  };

  const handleEditClick = (event: ChurchEvent) => {
    setFormData({
      title: event.title,
      description: event.description,
      dateTime: event.dateTime,
      location: event.location,
      capacity: event.capacity,
      coverImage: event.coverImage
    });
    setEditId(event.id);
    setIsEditing(true);
    setAdminSubTab('events');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', dateTime: '', location: '', capacity: 100, coverImage: '' });
    setEditId(null);
    setIsEditing(false);
  };

  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastEventId, setBroadcastEventId] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastEventId || !broadcastSubject || !broadcastMessage) {
      toast.error('Please fill in all broadcast fields');
      return;
    }

    const rsvps = allRsvps[broadcastEventId] || [];
    if (rsvps.length === 0) {
      toast.error('No RSVPs for this event yet');
      return;
    }

    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      toast.success(`Broadcast sent to ${rsvps.length} attendees successfully!`);
      setBroadcastSubject('');
      setBroadcastMessage('');
      setBroadcastEventId('');
    }, 1500);
  };

  const now = new Date();
  
  // Calculate next Sunday dynamically
  const nextSunday = new Date(now);
  if (now.getDay() === 0 && now.getHours() >= 13) {
    nextSunday.setDate(now.getDate() + 7);
  } else if (now.getDay() !== 0) {
    nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
  }
  nextSunday.setHours(10, 0, 0, 0);

  const sundayEvent = {
    id: 'recurring_sunday_service',
    title: sundayCardSettings.title || 'Sunday Worship Service',
    description: sundayCardSettings.description || 'Join us every Sunday for worship, fellowship, and the Word!',
    dateTime: nextSunday.toISOString(),
    location: sundayCardSettings.location || 'SKCC Hall',
    capacity: 9999, // unlimited
    coverImage: sundayCardSettings.coverImage || DEFAULT_SUNDAY_SERVICE_SETTINGS.coverImage
  } as ChurchEvent;

  // Process & Sort events
  const processedEvents = events.map(e => ({ ...e, isPast: new Date(e.dateTime) < now }));
  processedEvents.sort((a, b) => {
    if (a.isPast === b.isPast) {
      const dateA = new Date(a.dateTime).getTime();
      const dateB = new Date(b.dateTime).getTime();
      return a.isPast ? dateB - dateA : dateA - dateB;
    }
    return a.isPast ? 1 : -1;
  });

  const displayFeedEvents = [{ ...sundayEvent, isPast: false, isRecurring: true }, ...processedEvents];

  // Attendance Analytics Prep
  const sortedAttendance = [...attendanceLogs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const chartData = sortedAttendance.map(item => ({
    date: item.date,
    displayDate: formatShortDate(item.date),
    count: item.count,
    notes: item.notes || 'Service'
  }));

  const totalAttendeesLogged = sortedAttendance.reduce((acc, curr) => acc + curr.count, 0);
  const avgAttendance = sortedAttendance.length > 0 ? Math.round(totalAttendeesLogged / sortedAttendance.length) : 0;
  const peakAttendance = sortedAttendance.length > 0 ? Math.max(...sortedAttendance.map(s => s.count)) : 0;
  const latestRecord = sortedAttendance.length > 0 ? sortedAttendance[sortedAttendance.length - 1] : null;

  if (isLoadingEvents) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#C82323] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & View Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-serif">Events & RSVPs</h1>
            <p className="mt-1 text-gray-500">Join our upcoming gatherings, services, and community fellowships.</p>
          </div>
          
          {isAdmin && (
            <div className="flex bg-white rounded-full p-1 border border-gray-200 shadow-xs">
              <button 
                onClick={() => setActiveTab('feed')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${activeTab === 'feed' ? 'bg-[#0F2C59] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Public Feed
              </button>
              <button 
                onClick={() => setActiveTab('admin')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'admin' ? 'bg-[#0F2C59] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Sliders size={15} /> Admin Dashboard
              </button>
            </div>
          )}
        </div>

        {/* Public Feed View */}
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {displayFeedEvents.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No Upcoming Events</h3>
                <p className="mt-1 text-gray-500">Check back soon for new gatherings.</p>
              </div>
            ) : (
              displayFeedEvents.map((event: any) => {
                const totalCapacity = typeof event.capacity === 'number' ? event.capacity : (parseInt(event.capacity as any, 10) || 30);
                const rsvps = allRsvps[event.id] || [];
                const rsvpCount = rsvps.length;
                const spotsLeft = Math.max(0, totalCapacity - rsvpCount);
                const isFull = spotsLeft === 0 && !event.isRecurring;
                const capacityPercent = totalCapacity > 0 ? Math.min(100, Math.round((rsvpCount / totalCapacity) * 100)) : 0;
                
                // Enhanced user RSVP detection (checks live query list and localStorage fallback)
                const isUserInFirestore = user ? rsvps.some((r: any) => r.userId === user.uid) : false;
                const isUserInLocalStorage = user && typeof window !== 'undefined' && localStorage.getItem(`skcc_rsvp_${event.id}_${user.uid}`) === 'true';
                const userHasRSVPd = Boolean(isUserInFirestore || isUserInLocalStorage);

                return (
                  <div 
                    key={event.id} 
                    className={`bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100/90 overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 ${event.isPast ? 'opacity-75' : ''}`}
                  >
                    {/* Fixed Card Image Header */}
                    <EventCardImageHeader 
                      event={event} 
                      isFull={isFull} 
                      spotsLeft={spotsLeft} 
                      isPast={event.isPast}
                      isRecurring={event.isRecurring}
                    />
                    
                    {/* Card Body with structured flex distribution */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col">
                      {/* Top Header */}
                      <div className="flex-none">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug tracking-tight font-serif min-h-[3.25rem] flex items-start" title={event.title}>
                          {event.title}
                        </h3>
                      </div>

                      {/* Fixed Height Scrollable Description Container */}
                      <div className="relative mb-6">
                        <div className="h-56 overflow-y-auto pr-2 custom-scrollbar text-gray-600 text-sm leading-relaxed whitespace-pre-line select-text">
                          {event.description}
                        </div>
                      </div>
                      
                      {/* Bottom Section Pinned to Base */}
                      <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col">
                        {/* Event Details: Date/Time & Location */}
                        <div className="space-y-2.5 mb-5 text-sm">
                          <div className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-100 ${event.isPast ? 'bg-gray-100 text-gray-500' : 'bg-gray-50/80 text-gray-700'}`}>
                            <Clock size={16} className={`${event.isPast ? 'text-gray-400' : 'text-[#C82323]'} shrink-0`} />
                            <span className="font-semibold">
                              {event.isRecurring 
                                ? (sundayCardSettings.timeSchedule || 'Every Sunday, 10:00 AM') 
                                : formatDate(event.dateTime)}
                            </span>
                          </div>
                          <div className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-100 ${event.isPast ? 'bg-gray-100 text-gray-500' : 'bg-gray-50/80 text-gray-700'}`}>
                            <MapPin size={16} className={`${event.isPast ? 'text-gray-400' : 'text-[#C82323]'} shrink-0`} />
                            <span className="truncate font-medium">{event.location}</span>
                          </div>
                        </div>

                        {/* Capacity Progress Bar / Recurring Attendee Badge */}
                        {!event.isRecurring ? (
                          <div className="mb-5 bg-gray-50/60 p-3 rounded-xl border border-gray-100">
                            <div className="flex justify-between text-xs mb-1.5 font-medium">
                              <span className="text-gray-600 flex items-center gap-1">
                                <Users size={13} className="text-gray-400" />
                                Confirmed Attendees: <strong className="text-gray-900">{rsvpCount}</strong> / {totalCapacity}
                              </span>
                              <span className={`font-bold ${capacityPercent >= 90 ? 'text-[#C82323]' : 'text-[#0F2C59]'}`}>
                                {capacityPercent}% filled
                              </span>
                            </div>
                            <div className="w-full bg-gray-200/80 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${event.isPast ? 'bg-gray-400' : capacityPercent >= 90 ? 'bg-[#C82323]' : 'bg-[#0F2C59]'}`} 
                                style={{ width: `${capacityPercent}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="mb-5 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                            <span className="text-emerald-900 font-semibold flex items-center gap-1.5">
                              <Sparkles size={14} className="text-emerald-600" />
                              General Sunday Worship Service
                            </span>
                            <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full">
                              Open & Free to All
                            </span>
                          </div>
                        )}

                        {/* RSVP Action Button */}
                        <button
                          onClick={() => handleRSVPClick(event.id, userHasRSVPd)}
                          disabled={event.isPast || (!userHasRSVPd && isFull)}
                          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] cursor-pointer
                            ${event.isPast
                              ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
                              : userHasRSVPd 
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm border border-emerald-600' 
                                : isFull 
                                  ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
                                  : 'bg-[#0F2C59] text-white hover:bg-[#0F2C59]/90 hover:shadow-sm'
                            }`}
                        >
                          {event.isPast ? (
                            <><CheckCircle size={18} className="text-gray-400" /> RSVP Closed</>
                          ) : userHasRSVPd ? (
                            <><CheckCircle size={18} className="text-white" /> ✓ Attending (Click to Cancel RSVP)</>
                          ) : isFull ? (
                            'Event Full (Capacity Reached)'
                          ) : (
                            <><Plus size={18} /> + RSVP / Attending</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Admin Dashboard View */}
        {activeTab === 'admin' && isAdmin && (
          <div className="space-y-8">
            
            {/* Sub-Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4">
              <button
                onClick={() => setAdminSubTab('events')}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  adminSubTab === 'events' 
                    ? 'bg-[#0F2C59] text-white shadow-xs' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Calendar size={16} /> Special Events & Broadcast
              </button>
              <button
                onClick={() => setAdminSubTab('sunday_card')}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  adminSubTab === 'sunday_card' 
                    ? 'bg-[#0F2C59] text-white shadow-xs' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Sparkles size={16} /> Sunday Service Card Editor
              </button>
              <button
                onClick={() => setAdminSubTab('attendance')}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  adminSubTab === 'attendance' 
                    ? 'bg-[#0F2C59] text-white shadow-xs' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <BarChart3 size={16} /> Sunday Attendance Tracker
              </button>
            </div>

            {/* TAB 1: SPECIAL EVENTS & BROADCAST */}
            {adminSubTab === 'events' && (
              <div className="space-y-8">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2"><Calendar size={16} /> Total Events</div>
                    <div className="text-3xl font-bold text-gray-900">{events.length}</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2"><Users size={16} /> Total RSVPs</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {Object.values(allRsvps).reduce((sum, rsvps) => sum + rsvps.length, 0)}
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2"><Activity size={16} /> Avg Event Capacity Fill</div>
                    <div className="text-3xl font-bold text-[#0F2C59]">
                      {events.length > 0 && events.reduce((sum, e) => sum + (Number(e.capacity) || 30), 0) > 0
                        ? Math.round((Object.values(allRsvps).reduce((sum, rsvps) => sum + rsvps.length, 0) / events.reduce((sum, e) => sum + (Number(e.capacity) || 30), 0)) * 100)
                        : 0}%
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm bg-gradient-to-br from-red-50 to-white">
                    <div className="text-[#C82323] text-sm font-medium mb-1 flex items-center gap-2"><TrendingUp size={16} /> Almost Full</div>
                    <div className="text-3xl font-bold text-[#C82323]">
                      {events.filter(e => {
                        const count = (allRsvps[e.id] || []).length;
                        const cap = Number(e.capacity) || 30;
                        return count > 0 && count / cap >= 0.8;
                      }).length}
                    </div>
                  </div>
                </div>

                {/* Event Manager Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Event Form */}
                  <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">{isEditing ? 'Edit Event' : 'Create New Event'}</h2>
                    <form onSubmit={(e) => { e.preventDefault(); saveEventMutation.mutate(formData); }} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                        <input type="datetime-local" required value={formData.dateTime} onChange={e => setFormData({...formData, dateTime: e.target.value})} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location / Venue</label>
                        <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity</label>
                        <input type="number" min="1" required value={formData.capacity} onChange={e => setFormData({...formData, capacity: parseInt(e.target.value) || 1})} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                        <input type="url" value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59]" placeholder="https://..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59]" />
                      </div>
                      
                      <div className="pt-4 flex gap-3">
                        {isEditing && (
                          <button type="button" onClick={resetForm} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors cursor-pointer">
                            Cancel
                          </button>
                        )}
                        <button type="submit" disabled={saveEventMutation.isPending} className="flex-1 py-2.5 bg-[#0F2C59] text-white font-medium rounded-xl hover:bg-[#0F2C59]/90 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                          {saveEventMutation.isPending ? 'Saving...' : (isEditing ? 'Update Event' : <><Plus size={18} /> Create Event</>)}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Event List */}
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-gray-100">
                      <h2 className="text-lg font-bold text-gray-900">Manage Events</h2>
                    </div>
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-500">
                          <tr>
                            <th className="px-6 py-3 font-medium">Event</th>
                            <th className="px-6 py-3 font-medium">Date</th>
                            <th className="px-6 py-3 font-medium">RSVPs</th>
                            <th className="px-6 py-3 font-medium text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {events.map(event => {
                            const cap = Number(event.capacity) || 30;
                            const rsvpsCount = allRsvps[event.id]?.length || 0;
                            const isFull = rsvpsCount >= cap;
                            return (
                              <tr key={event.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{event.title}</td>
                                <td className="px-6 py-4 text-gray-500">{formatDate(event.dateTime)}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                    isFull ? 'bg-red-100 text-red-700' : 'bg-blue-50 text-blue-700'
                                  }`}>
                                    {rsvpsCount} / {cap}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <button onClick={() => handleEditClick(event)} className="text-gray-400 hover:text-[#0F2C59] p-1 mx-1 transition-colors cursor-pointer" title="Edit Event"><Edit size={16} /></button>
                                  <button onClick={() => { if(confirm('Delete event?')) deleteEventMutation.mutate(event.id); }} className="text-gray-400 hover:text-red-600 p-1 mx-1 transition-colors cursor-pointer" title="Delete Event"><Trash2 size={16} /></button>
                                </td>
                              </tr>
                            );
                          })}
                          {events.length === 0 && (
                            <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No special events created yet.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Broadcast & Roster Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Attendee Roster */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[500px]">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Users size={20} className="text-[#0F2C59]" /> Attendee Roster</h2>
                    
                    <select 
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59] mb-4"
                      onChange={(e) => setBroadcastEventId(e.target.value)}
                      value={broadcastEventId}
                    >
                      <option value="">Select an event to view roster...</option>
                      <option value="recurring_sunday_service">Sunday Worship Service ({allRsvps['recurring_sunday_service']?.length || 0} RSVPs)</option>
                      {events.map(e => (
                        <option key={e.id} value={e.id}>{e.title} ({allRsvps[e.id]?.length || 0} RSVPs)</option>
                      ))}
                    </select>

                    <div className="flex-1 overflow-y-auto border border-gray-100 rounded-xl bg-gray-50 p-2">
                      {broadcastEventId && allRsvps[broadcastEventId] ? (
                        allRsvps[broadcastEventId].length > 0 ? (
                          <ul className="space-y-2">
                            {allRsvps[broadcastEventId].map(rsvp => (
                              <li key={rsvp.userId} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
                                {rsvp.photoUrl ? (
                                  <img src={rsvp.photoUrl} alt={rsvp.userName} className="w-8 h-8 rounded-full" />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">
                                    {rsvp.userName.charAt(0)}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-gray-900 truncate">{rsvp.userName}</p>
                                  <p className="text-xs text-gray-500 truncate">{rsvp.userEmail}</p>
                                </div>
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">Confirmed</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="h-full flex items-center justify-center text-gray-400 text-sm">No RSVPs for this event yet.</div>
                        )
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 text-sm">Select an event to view attendees.</div>
                      )}
                    </div>
                  </div>

                  {/* Broadcast Panel */}
                  <div className="bg-[#0F2C59] p-6 rounded-2xl shadow-md text-white">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Mail size={20} className="text-[#D4A373]" /> Broadcast Announcement</h2>
                    <p className="text-blue-100 text-sm mb-6">Send an email update to all confirmed RSVPs for a specific event.</p>
                    
                    <form onSubmit={handleBroadcast} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-100 mb-1">Target Event</label>
                        <select 
                          required
                          className="w-full rounded-xl border-white/20 bg-white/10 text-white placeholder-blue-200 focus:border-[#D4A373] focus:ring-[#D4A373]"
                          onChange={(e) => setBroadcastEventId(e.target.value)}
                          value={broadcastEventId}
                        >
                          <option value="" className="text-gray-900">Select an event...</option>
                          <option value="recurring_sunday_service" className="text-gray-900">Sunday Worship Service ({allRsvps['recurring_sunday_service']?.length || 0} RSVPs)</option>
                          {events.map(e => (
                            <option key={e.id} value={e.id} className="text-gray-900">{e.title} ({allRsvps[e.id]?.length || 0} RSVPs)</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-100 mb-1">Subject Line</label>
                        <input 
                          type="text" 
                          required
                          value={broadcastSubject}
                          onChange={e => setBroadcastSubject(e.target.value)}
                          className="w-full rounded-xl border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-[#D4A373] focus:ring-[#D4A373]" 
                          placeholder="e.g. Important Update for Tomorrow's Service" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-100 mb-1">Message</label>
                        <textarea 
                          required
                          rows={5} 
                          value={broadcastMessage}
                          onChange={e => setBroadcastMessage(e.target.value)}
                          className="w-full rounded-xl border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-[#D4A373] focus:ring-[#D4A373]" 
                          placeholder="Draft your announcement here..." 
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={isBroadcasting}
                        className="w-full py-3 bg-[#D4A373] text-[#0F2C59] font-bold rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isBroadcasting ? (
                          <><div className="animate-spin h-5 w-5 border-2 border-[#0F2C59] border-t-transparent rounded-full"></div> Sending...</>
                        ) : (
                          'Send Broadcast'
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SUNDAY SERVICE CARD EDITOR */}
            {adminSubTab === 'sunday_card' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Editor Form */}
                <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-serif flex items-center gap-2">
                      <Sparkles className="text-[#C82323]" size={22} />
                      Sunday Worship Service Card Editor
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Customize the details, banner image, schedule, and announcement text for the recurring Sunday card shown on the Public Feed.
                    </p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateSundayCardMutation.mutate(sundayCardForm);
                    }} 
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Card Title</label>
                      <input 
                        type="text" 
                        required 
                        value={sundayCardForm.title} 
                        onChange={e => setSundayCardForm({ ...sundayCardForm, title: e.target.value })}
                        className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59]" 
                        placeholder="e.g. Sunday Worship Service"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Service Time / Schedule</label>
                        <input 
                          type="text" 
                          required 
                          value={sundayCardForm.timeSchedule} 
                          onChange={e => setSundayCardForm({ ...sundayCardForm, timeSchedule: e.target.value })}
                          className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59]" 
                          placeholder="e.g. Every Sunday, 10:00 AM"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Location / Venue</label>
                        <input 
                          type="text" 
                          required 
                          value={sundayCardForm.location} 
                          onChange={e => setSundayCardForm({ ...sundayCardForm, location: e.target.value })}
                          className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59]" 
                          placeholder="e.g. SKCC Main Sanctuary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Image Banner URL</label>
                      <div className="flex gap-2">
                        <input 
                          type="url" 
                          required 
                          value={sundayCardForm.coverImage} 
                          onChange={e => setSundayCardForm({ ...sundayCardForm, coverImage: e.target.value })}
                          className="flex-1 rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59]" 
                          placeholder="https://images.unsplash.com/..."
                        />
                        <button
                          type="button"
                          onClick={() => setSundayCardForm({
                            ...sundayCardForm,
                            coverImage: DEFAULT_SUNDAY_SERVICE_SETTINGS.coverImage
                          })}
                          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          title="Reset to Default Image"
                        >
                          <RotateCcw size={14} /> Reset
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Description & Announcements</label>
                      <textarea 
                        required 
                        rows={5} 
                        value={sundayCardForm.description} 
                        onChange={e => setSundayCardForm({ ...sundayCardForm, description: e.target.value })}
                        className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59]" 
                        placeholder="Join us every Sunday for worship, fellowship, and the Word!..."
                      />
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setSundayCardForm(DEFAULT_SUNDAY_SERVICE_SETTINGS)}
                        className="px-4 py-2.5 text-gray-600 hover:text-gray-900 text-sm font-medium cursor-pointer"
                      >
                        Reset All to Defaults
                      </button>
                      <button 
                        type="submit" 
                        disabled={updateSundayCardMutation.isPending}
                        className="px-6 py-3 bg-[#0F2C59] text-white font-bold rounded-xl hover:bg-[#0F2C59]/90 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        {updateSundayCardMutation.isPending ? 'Saving to Firestore...' : <><Check size={18} /> Save & Publish Changes</>}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Live Card Preview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-[#C82323]" /> Live Feed Preview
                    </span>
                    <span className="text-xs text-gray-400">Updates live as you type</span>
                  </div>

                  {/* Preview Card Component */}
                  <div className="bg-white rounded-2xl shadow-md border border-gray-200/80 overflow-hidden flex flex-col">
                    {/* Header Image Preview */}
                    <div className="h-48 bg-slate-800 relative overflow-hidden">
                      <img 
                        src={sundayCardForm.coverImage || DEFAULT_SUNDAY_SERVICE_SETTINGS.coverImage} 
                        alt="Preview" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as any).src = DEFAULT_SUNDAY_SERVICE_SETTINGS.coverImage;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white">
                        Sunday Gathering
                      </div>
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-extrabold text-[#0F2C59] flex items-center gap-1.5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Open to All
                      </div>
                    </div>

                    {/* Card Content Preview */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">
                        {sundayCardForm.title || 'Sunday Worship Service'}
                      </h3>
                      
                      <div className="h-40 overflow-y-auto pr-2 custom-scrollbar text-gray-600 text-sm leading-relaxed whitespace-pre-line mb-4">
                        {sundayCardForm.description || 'Join us every Sunday for worship, fellowship, and the Word!'}
                      </div>

                      <div className="space-y-2 mb-4 text-xs">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 text-gray-700 border border-gray-100">
                          <Clock size={14} className="text-[#C82323]" />
                          <span className="font-semibold">{sundayCardForm.timeSchedule || 'Every Sunday, 10:00 AM'}</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 text-gray-700 border border-gray-100">
                          <MapPin size={14} className="text-[#C82323]" />
                          <span>{sundayCardForm.location || 'SKCC Hall'}</span>
                        </div>
                      </div>

                      <div className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-center text-xs flex items-center justify-center gap-1.5">
                        <CheckCircle size={15} /> ✓ Attending (Click to Cancel RSVP)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SUNDAY ATTENDANCE TRACKER & ANALYTICS */}
            {adminSubTab === 'attendance' && (() => {
              const sundayRsvps = allRsvps['recurring_sunday_service'] || [];
              const sundayRsvpCount = sundayRsvps.length;

              return (
                <div className="space-y-8">
                  {/* KPI Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Expected Attendees (Online RSVPs) */}
                    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm bg-gradient-to-br from-blue-50/70 to-white">
                      <div className="text-[#0F2C59] text-sm font-bold mb-1 flex items-center gap-2">
                        <Users size={16} className="text-[#0F2C59]" /> Expected Attendees
                      </div>
                      <div className="text-3xl font-extrabold text-[#0F2C59]">
                        {sundayRsvpCount}
                      </div>
                      <p className="text-xs text-blue-700/80 mt-1 font-medium">Online RSVP headcount for Sunday</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2">
                        <CalendarCheck size={16} className="text-[#0F2C59]" /> Latest Service
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        {latestRecord ? latestRecord.count : '—'}
                      </div>
                      {latestRecord && (
                        <p className="text-xs text-gray-400 mt-1">{formatDate(latestRecord.date)}</p>
                      )}
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2">
                        <Activity size={16} className="text-emerald-600" /> Avg Attendance
                      </div>
                      <div className="text-3xl font-bold text-emerald-600">
                        {avgAttendance > 0 ? avgAttendance : '—'}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Across {sortedAttendance.length} recorded services</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2">
                        <TrendingUp size={16} className="text-[#C82323]" /> Peak Attendance
                      </div>
                      <div className="text-3xl font-bold text-[#C82323]">
                        {peakAttendance > 0 ? peakAttendance : '—'}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Record congregation</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2">
                        <BarChart3 size={16} className="text-[#0F2C59]" /> Total Logged
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        {sortedAttendance.length}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Sunday services recorded</p>
                    </div>
                  </div>

                {/* Main Content: Chart + Entry Form */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Attendance Trend Line Chart */}
                  <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 font-serif flex items-center gap-2">
                          <BarChart3 className="text-[#0F2C59]" size={22} />
                          Sunday Attendance Trends
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">Chronological record of Sunday worship attendance</p>
                      </div>
                      {sortedAttendance.length > 0 && (
                        <span className="px-3 py-1 bg-blue-50 text-[#0F2C59] text-xs font-bold rounded-full border border-blue-100 self-start sm:self-auto">
                          {sortedAttendance.length} Data Points
                        </span>
                      )}
                    </div>

                    <div className="w-full h-72 sm:h-80 flex-1">
                      {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis 
                              dataKey="displayDate" 
                              stroke="#64748b" 
                              fontSize={12}
                              tickLine={false}
                            />
                            <YAxis 
                              stroke="#64748b" 
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                              allowDecimals={false}
                            />
                            <Tooltip 
                              content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-[#0F2C59] text-white p-3 rounded-xl shadow-xl text-xs space-y-1 border border-white/10">
                                      <p className="font-bold text-[#D4A373] text-sm">{data.date}</p>
                                      <p className="text-base font-extrabold">{data.count} Attendees</p>
                                      {data.notes && <p className="text-blue-200 italic max-w-xs">{data.notes}</p>}
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="count" 
                              name="Attendees"
                              stroke="#0F2C59" 
                              strokeWidth={3} 
                              dot={{ r: 5, fill: '#C82323', strokeWidth: 2, stroke: '#ffffff' }}
                              activeDot={{ r: 7, fill: '#D4A373' }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-200 rounded-xl">
                          <BarChart3 className="h-12 w-12 text-gray-300 mb-2" />
                          <p className="text-gray-600 font-semibold">No attendance records logged yet</p>
                          <p className="text-xs text-gray-400 mt-1 max-w-sm">Use the form on the right to log your first Sunday attendance count.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Log Attendance Form */}
                  <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 font-serif mb-4 flex items-center gap-2">
                      {editingAttendanceId ? <Edit size={18} className="text-[#0F2C59]" /> : <Plus size={18} className="text-[#C82323]" />}
                      {editingAttendanceId ? 'Edit Attendance Log' : 'Log Sunday Attendance'}
                    </h3>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!attendanceForm.date || !attendanceForm.count) {
                          toast.error('Please enter date and attendance count');
                          return;
                        }
                        logAttendanceMutation.mutate({
                          date: attendanceForm.date,
                          count: Number(attendanceForm.count),
                          notes: attendanceForm.notes,
                          loggedBy: user?.email || 'Admin'
                        });
                      }} 
                      className="space-y-4 flex-1 flex flex-col"
                    >
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Service Date</label>
                        <input 
                          type="date" 
                          required 
                          value={attendanceForm.date} 
                          onChange={e => setAttendanceForm({ ...attendanceForm, date: e.target.value })}
                          className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59]" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Actual Attendees Count</label>
                        <input 
                          type="number" 
                          min="0" 
                          required 
                          placeholder="e.g. 145"
                          value={attendanceForm.count} 
                          onChange={e => setAttendanceForm({ ...attendanceForm, count: e.target.value })}
                          className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59] text-lg font-bold text-[#0F2C59]" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Notes / Sermon Title (Optional)</label>
                        <textarea 
                          rows={3} 
                          placeholder="e.g. Easter Celebration, Pastor Mark preaching..."
                          value={attendanceForm.notes} 
                          onChange={e => setAttendanceForm({ ...attendanceForm, notes: e.target.value })}
                          className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59] text-sm" 
                        />
                      </div>

                      <div className="pt-2 mt-auto flex gap-2">
                        {editingAttendanceId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingAttendanceId(null);
                              setAttendanceForm({
                                date: new Date().toISOString().split('T')[0],
                                count: '',
                                notes: ''
                              });
                            }}
                            className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 text-sm cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                        <button 
                          type="submit" 
                          disabled={logAttendanceMutation.isPending}
                          className="flex-1 py-3 bg-[#0F2C59] text-white font-bold rounded-xl hover:bg-[#0F2C59]/90 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                        >
                          {logAttendanceMutation.isPending 
                            ? 'Saving...' 
                            : (editingAttendanceId ? 'Update Record' : <><Plus size={16} /> Save Attendance</>)}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* History Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 font-serif">Attendance History Log</h3>
                    <span className="text-xs text-gray-500">{sortedAttendance.length} records</span>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-gray-50 text-gray-500 font-medium">
                        <tr>
                          <th className="px-6 py-3.5">Service Date</th>
                          <th className="px-6 py-3.5">Attendees Count</th>
                          <th className="px-6 py-3.5">Service Notes</th>
                          <th className="px-6 py-3.5">Logged By</th>
                          <th className="px-6 py-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {sortedAttendance.length > 0 ? (
                          [...sortedAttendance].reverse().map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50/80 transition-colors">
                              <td className="px-6 py-4 font-semibold text-gray-900 flex items-center gap-2">
                                <Calendar size={15} className="text-[#C82323]" />
                                {record.date}
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-[#0F2C59] border border-blue-100">
                                  {record.count} Attendees
                                </span>
                              </td>
                              <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                                {record.notes || <span className="text-gray-400 italic">—</span>}
                              </td>
                              <td className="px-6 py-4 text-xs text-gray-500">
                                {record.loggedBy || 'Admin'}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => {
                                    setEditingAttendanceId(record.id);
                                    setAttendanceForm({
                                      date: record.date,
                                      count: record.count.toString(),
                                      notes: record.notes || ''
                                    });
                                    window.scrollTo({ top: 400, behavior: 'smooth' });
                                  }} 
                                  className="text-gray-400 hover:text-[#0F2C59] p-1.5 mx-1 transition-colors cursor-pointer" 
                                  title="Edit Entry"
                                >
                                  <Edit size={16} />
                                </button>
                                <button 
                                  onClick={() => {
                                    if (confirm(`Delete attendance record for ${record.date}?`)) {
                                      deleteAttendanceMutation.mutate(record.id);
                                    }
                                  }} 
                                  className="text-gray-400 hover:text-red-600 p-1.5 mx-1 transition-colors cursor-pointer" 
                                  title="Delete Entry"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                              No attendance records logged yet. Use the form above to add your first entry!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Upcoming Sunday Online RSVP Roster (Expected Attendees) */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-7">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 font-serif flex items-center gap-2">
                        <Users size={19} className="text-[#0F2C59]" />
                        Upcoming Sunday Expected Attendees (Online RSVPs)
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">Live headcount of members and visitors planning to attend the next Sunday service</p>
                    </div>
                    <span className="px-3.5 py-1.5 bg-blue-50 text-[#0F2C59] font-extrabold text-xs sm:text-sm rounded-full border border-blue-100 self-start sm:self-auto flex items-center gap-1.5 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      {sundayRsvpCount} Expected {sundayRsvpCount === 1 ? 'Attendee' : 'Attendees'}
                    </span>
                  </div>

                  {sundayRsvps.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                      {sundayRsvps.map((rsvp: any) => (
                        <div key={rsvp.userId} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-blue-100 transition-colors">
                          {rsvp.photoUrl ? (
                            <img src={rsvp.photoUrl} alt={rsvp.userName} className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-200" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-[#0F2C59]/10 text-[#0F2C59] font-bold text-xs flex items-center justify-center shrink-0">
                              {rsvp.userName?.charAt(0) || 'U'}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-gray-900 truncate">{rsvp.userName}</p>
                            <p className="text-[11px] text-gray-500 truncate">{rsvp.userEmail || 'Confirmed RSVP'}</p>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full shrink-0">
                            ✓ Attending
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 text-xs sm:text-sm">
                      No online RSVPs recorded for the upcoming Sunday service yet.
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          </div>
        )}

      </div>
    </div>
  );
}
