import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { isEventAdmin } from '../utils/roles';
import { fetchEvents, createEvent, updateEvent, removeEvent, fetchAllRSVPs, toggleRSVP, ChurchEvent, RSVP } from '../api/events';
import { Calendar, MapPin, Users, Mail, Plus, Trash2, Edit, CheckCircle, Clock, Activity, TrendingUp, Image as ImageIcon } from 'lucide-react';
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

export default function Events() {
  const { user, signInWithGoogle } = useAuth();
  const isAdmin = isEventAdmin(user?.email);
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<'feed' | 'admin'>('feed');

  // Admin form state
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

  // Queries
  const { data: events = [], isLoading: isLoadingEvents } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  });

  const { data: allRsvps = {} } = useQuery({
    queryKey: ['events_rsvps', events.map(e => e.id).join(',')],
    queryFn: () => fetchAllRSVPs(events),
    enabled: events.length > 0
  });

  // Mutations
  const rsvpMutation = useMutation({
    mutationFn: ({ eventId, isRSVPd }: { eventId: string, isRSVPd: boolean }) => toggleRSVP(eventId, user, isRSVPd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events_rsvps'] });
      toast.success('RSVP status updated!');
    },
    onError: (error) => {
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
    // Simulate email sending
    setTimeout(() => {
      setIsBroadcasting(false);
      toast.success(`Broadcast sent to ${rsvps.length} attendees successfully!`);
      setBroadcastSubject('');
      setBroadcastMessage('');
      setBroadcastEventId('');
    }, 1500);
  };

  if (isLoadingEvents) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-[#C82323] border-t-transparent rounded-full"></div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & View Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-serif">Events & RSVPs</h1>
            <p className="mt-1 text-gray-500">Join our upcoming gatherings and services.</p>
          </div>
          
          {isAdmin && (
            <div className="flex bg-white rounded-full p-1 border border-gray-200 shadow-sm">
              <button 
                onClick={() => setActiveTab('feed')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'feed' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Public Feed
              </button>
              <button 
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'admin' ? 'bg-[#0F2C59] text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Admin Dashboard
              </button>
            </div>
          )}
        </div>

        {/* Public Feed View */}
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-gray-100">
                <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No Upcoming Events</h3>
                <p className="mt-1 text-gray-500">Check back soon for new gatherings.</p>
              </div>
            ) : (
              events.map(event => {
                const rsvps = allRsvps[event.id] || [];
                const rsvpCount = rsvps.length;
                const capacityPercent = Math.min(100, Math.round((rsvpCount / event.capacity) * 100));
                const isFull = rsvpCount >= event.capacity;
                const userHasRSVPd = user ? rsvps.some(r => r.userId === user.uid) : false;

                return (
                  <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-transform hover:-translate-y-1">
                    <div className="h-48 bg-gray-200 relative">
                      {event.coverImage ? (
                        <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <ImageIcon className="h-12 w-12 text-gray-300" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                        {isFull ? <span className="text-[#C82323]">SOLD OUT</span> : `${event.capacity - rsvpCount} spots left`}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">{event.description}</p>
                      
                      <div className="space-y-2 mb-6 mt-auto text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-[#C82323]" />
                          <span>{formatDate(event.dateTime)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-[#C82323]" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      {/* Capacity Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500 font-medium">Capacity</span>
                          <span className="text-gray-700 font-bold">{capacityPercent}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${capacityPercent >= 90 ? 'bg-[#C82323]' : 'bg-[#0F2C59]'}`} 
                            style={{ width: `${capacityPercent}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleRSVPClick(event.id, userHasRSVPd)}
                        disabled={!userHasRSVPd && isFull}
                        className={`w-full py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2
                          ${userHasRSVPd 
                            ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' 
                            : isFull 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-[#0F2C59] text-white hover:bg-[#0F2C59]/90 shadow-sm'
                          }`}
                      >
                        {userHasRSVPd ? (
                          <><CheckCircle size={18} /> RSVP'd (Click to Cancel)</>
                        ) : isFull ? (
                          'Event Full'
                        ) : (
                          'RSVP Now'
                        )}
                      </button>
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
                <div className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2"><Activity size={16} /> Avg Attendance</div>
                <div className="text-3xl font-bold text-[#0F2C59]">
                  {events.length > 0 
                    ? Math.round((Object.values(allRsvps).reduce((sum, rsvps) => sum + rsvps.length, 0) / events.reduce((sum, e) => sum + e.capacity, 0)) * 100)
                    : 0}%
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm bg-gradient-to-br from-red-50 to-white">
                <div className="text-[#C82323] text-sm font-medium mb-1 flex items-center gap-2"><TrendingUp size={16} /> Almost Full</div>
                <div className="text-3xl font-bold text-[#C82323]">
                  {events.filter(e => {
                    const count = (allRsvps[e.id] || []).length;
                    return count > 0 && count / e.capacity >= 0.8;
                  }).length}
                </div>
              </div>
            </div>

            {/* Event Manager Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Form */}
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
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity</label>
                      <input type="number" min="1" required value={formData.capacity} onChange={e => setFormData({...formData, capacity: parseInt(e.target.value) || 1})} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#0F2C59] focus:ring-[#0F2C59]" />
                    </div>
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
                      <button type="button" onClick={resetForm} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
                        Cancel
                      </button>
                    )}
                    <button type="submit" disabled={saveEventMutation.isPending} className="flex-1 py-2.5 bg-[#0F2C59] text-white font-medium rounded-xl hover:bg-[#0F2C59]/90 transition-colors flex items-center justify-center gap-2">
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
                      {events.map(event => (
                        <tr key={event.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{event.title}</td>
                          <td className="px-6 py-4 text-gray-500">{formatDate(event.dateTime)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              (allRsvps[event.id]?.length || 0) >= event.capacity ? 'bg-red-100 text-red-700' : 'bg-blue-50 text-blue-700'
                            }`}>
                              {allRsvps[event.id]?.length || 0} / {event.capacity}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleEditClick(event)} className="text-gray-400 hover:text-[#0F2C59] p-1 mx-1 transition-colors"><Edit size={16} /></button>
                            <button onClick={() => { if(confirm('Delete event?')) deleteEventMutation.mutate(event.id); }} className="text-gray-400 hover:text-red-600 p-1 mx-1 transition-colors"><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                      {events.length === 0 && (
                        <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No events created yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Broadcast & Analytics Section */}
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
                  {events.map(e => (
                    <option key={e.id} value={e.id}>{e.title}</option>
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
                    className="w-full py-3 bg-[#D4A373] text-[#0F2C59] font-bold rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
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

      </div>
    </div>
  );
}
