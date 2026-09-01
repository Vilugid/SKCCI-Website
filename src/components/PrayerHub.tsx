import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { isPrayerAdmin } from '../utils/roles';
import { submitPrayerRequest, fetchPrayerRequests, updatePrayerStatus, deletePrayerRequest, logPrayerAction, subscribeToPrayerLogs, PrayerLog } from '../api/prayer';
import { Heart, HeartHandshake, CalendarClock, Trash2, CheckCircle2, Circle, UtensilsCrossed, Send, Calendar, Users, Activity, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import SamplePrayerModal from './SamplePrayerModal';

// PHT Date Utilities
const getPHTDate = () => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * 8));
};

const getWeekIdPHT = () => {
  const d = getPHTDate();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay()); // Go to Sunday
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getMonthIdPHT = () => {
  const d = getPHTDate();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

const WEEKLY_SCHEDULE = {
  Monday: [
    "Church Leadership, Pastoral Guidance & Spiritual Protection",
    "Unity, Sound Doctrine & Biblical Integrity in the Body",
    "Deeper Discipleship & Spiritual Growth in Local Congregations"
  ],
  Tuesday: [
    "Marriages, Family Restoration & Youth Guidance",
    "Emotional Healing, Mental Health & Freedom from Addiction",
    "Financial Breakthroughs, Job Provision & Wise Stewardship"
  ],
  Wednesday: [
    "Local Community Outreach & Neighborhood Evangelism",
    "Public Servants, Schools, Local Government & Justice",
    "Compassion Ministries for the Homeless, Poor & Vulnerable"
  ],
  Thursday: [
    "Global Missions & Safety for Persecuted Christians Worldwide",
    "Reaching Unreached People Groups & Bible Translation",
    "National Revival, Spiritual Awakening & Biblical Worldview"
  ],
  Friday: [
    "Physical Healing, Medical Miracles & Comfort for the Sick",
    "Deliverance, Spiritual Warfare & Breaking Generational Chains",
    "Personal Sanction, Purity & Habitual Prayer Lives"
  ],
  Saturday: [
    "Preparation for Sunday Services & Anointing on Worship/Preaching",
    "Next-Generation Ministries (Children, Teens & College Students)",
    "Thanksgiving, Praise & Celebrating Answered Prayers"
  ]
};

export default function PrayerHub() {
  const { user, signInWithGoogle } = useAuth();
  const isAdmin = isPrayerAdmin(user?.email);
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<'public' | 'admin'>('public');

  // Active AI Sample Prayer Guide State
  const [activePrayerGuide, setActivePrayerGuide] = useState<{ topic: string; day: string; itemId: string } | null>(null);

  // Fasting State
  const [fastingCommitment, setFastingCommitment] = useState<string | null>(() => {
    return localStorage.getItem('sk_fasting_commitment');
  });

  // Global Prayer Logs
  const [prayerLogs, setPrayerLogs] = useState<PrayerLog[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToPrayerLogs(setPrayerLogs);
    return () => unsubscribe();
  }, []);

  // Compute Current Context Data
  const currentWeekId = getWeekIdPHT();
  const currentMonthId = getMonthIdPHT();
  
  const currentWeekLogs = prayerLogs.filter(log => log.week === currentWeekId);
  
  const globalCounters = currentWeekLogs.reduce((acc, log) => {
    acc[log.prayerItemId] = (acc[log.prayerItemId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const myChecked = currentWeekLogs
    .filter(log => log.userId === user?.uid)
    .reduce((acc, log) => {
      acc[log.prayerItemId] = true;
      return acc;
    }, {} as Record<string, boolean>);

  const uniqueWarriorsThisWeek = new Set(currentWeekLogs.map(log => log.userId)).size;

  // Helper to format week label e.g., "Aug 30–Sep 5"
  const formatWeekLabel = (weekStr: string) => {
    try {
      const parts = weekStr.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const startDate = new Date(year, month, day);
        const endDate = new Date(year, month, day + 6);
        
        const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
        const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
        
        if (startMonth === endMonth) {
          return `${startMonth} ${startDate.getDate()}–${endDate.getDate()}`;
        } else {
          return `${startMonth} ${startDate.getDate()} – ${endMonth} ${endDate.getDate()}`;
        }
      }
    } catch (e) {
      // fallback
    }
    return weekStr;
  };

  // Weekly Chart Data
  const weeksMap: Record<string, { warriors: Set<string>; prayersCount: number }> = {};
  
  prayerLogs.forEach(log => {
    const w = log.week || currentWeekId;
    if (!weeksMap[w]) {
      weeksMap[w] = { warriors: new Set(), prayersCount: 0 };
    }
    weeksMap[w].warriors.add(log.userId);
    weeksMap[w].prayersCount += 1;
  });

  // Always ensure current week exists in chart
  if (!weeksMap[currentWeekId]) {
    weeksMap[currentWeekId] = { warriors: new Set(), prayersCount: 0 };
  }

  const weeklyData = Object.keys(weeksMap).sort().map(weekStr => {
    return {
      weekKey: weekStr,
      name: formatWeekLabel(weekStr),
      warriors: weeksMap[weekStr].warriors.size,
      prayers: weeksMap[weekStr].prayersCount
    };
  });

  // Request Form State
  const [requestForm, setRequestForm] = useState({ name: '', category: 'Personal', details: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: adminRequests = [], isLoading: isLoadingRequests } = useQuery({
    queryKey: ['prayer_requests'],
    queryFn: fetchPrayerRequests,
    enabled: isAdmin && activeTab === 'admin'
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'pending' | 'prayed' }) => updatePrayerStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prayer_requests'] });
      toast.success('Status updated');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePrayerRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prayer_requests'] });
      toast.success('Request deleted');
    }
  });

  const handleTogglePrayer = async (day: string, idx: number) => {
    if (!user) {
      toast.error("Please sign in to log your prayer");
      signInWithGoogle();
      return;
    }
    
    const prayerItemId = `${day}_${idx}`;
    const isPrayed = !myChecked[prayerItemId];
    
    try {
      await logPrayerAction(user.uid, prayerItemId, currentWeekId, currentMonthId, isPrayed);
    } catch (e) {
      toast.error("Failed to sync prayer counter");
    }
  };

  const handleCommitFast = (type: string) => {
    setFastingCommitment(type);
    localStorage.setItem('sk_fasting_commitment', type);
    toast.success(`Committed to: ${type}!`);
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestForm.details.trim()) return;

    setIsSubmitting(true);
    try {
      await submitPrayerRequest({
        name: requestForm.name.trim() || 'Anonymous',
        category: requestForm.category,
        details: requestForm.details
      });
      toast.success('Prayer request submitted successfully');
      setRequestForm({ name: '', category: 'Personal', details: '' });
    } catch (error) {
      toast.error('Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFastingButtons = () => {
    const types = ["Skip Breakfast", "Skip Lunch", "Skip Dinner", "24-Hour Fast", "Daniel's Fast"];
    return (
      <div className="flex flex-wrap gap-3 mt-4">
        {types.map(type => (
          <button
            key={type}
            onClick={() => handleCommitFast(type)}
            className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-colors ${
              fastingCommitment === type 
                ? 'bg-[#D4A373] border-[#D4A373] text-white' 
                : 'bg-white border-[#D4A373] text-[#D4A373] hover:bg-amber-50'
            }`}
          >
            {type}
          </button>
        ))}
        {fastingCommitment && (
          <button
            onClick={() => { setFastingCommitment(null); localStorage.removeItem('sk_fasting_commitment'); }}
            className="px-4 py-2 rounded-xl text-sm font-bold border-2 border-gray-200 text-gray-500 hover:bg-gray-100"
          >
            Clear
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#0F2C59] p-3 rounded-2xl">
              <HeartHandshake className="h-8 w-8 text-[#D4A373]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0F2C59] font-serif">Prayer Warrior Hub</h1>
              <p className="mt-1 text-gray-500">Uniting the body in daily prayer and fasting.</p>
            </div>
          </div>
          
          {isAdmin && (
            <div className="flex bg-white rounded-full p-1 border border-gray-200 shadow-sm">
              <button 
                onClick={() => setActiveTab('public')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'public' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Public Warrior View
              </button>
              <button 
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'admin' ? 'bg-[#0F2C59] text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Prayer Admin View
              </button>
            </div>
          )}
        </div>

        {activeTab === 'public' && (
          <div className="space-y-12">
            
            {/* Weekly Schedule */}
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <h2 className="text-2xl font-bold text-[#0F2C59] font-serif flex items-center gap-2">
                  <CalendarClock className="text-[#C82323]" /> Weekly Prayer Focus
                </h2>
                
                {/* Stat Card */}
                <div className="bg-gradient-to-br from-[#0F2C59] to-[#1a4a8f] rounded-2xl px-6 py-4 shadow-md text-white flex items-center gap-6">
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-2 text-blue-100">
                      <Users size={16} className="text-[#D4A373]" /> Active Prayer Warriors This Week
                    </h3>
                    <p className="text-[10px] text-blue-200 mt-1 uppercase tracking-wider">Resetting Sunday 12:00 AM PHT</p>
                  </div>
                  <div className="text-3xl font-bold text-[#D4A373] bg-white/10 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm">
                    {uniqueWarriorsThisWeek}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(WEEKLY_SCHEDULE).map(([day, items]) => (
                  <div key={day} className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-[#C82323] mb-4 pb-2 border-b border-gray-100">{day}</h3>
                    <div className="space-y-4">
                      {items.map((item, idx) => {
                        const prayerItemId = `${day}_${idx}`;
                        const isChecked = !!myChecked[prayerItemId];
                        const count = globalCounters[prayerItemId] || 0;
                        const isGuideActive = activePrayerGuide?.itemId === prayerItemId;
                        
                        return (
                          <div 
                            key={idx} 
                            className={`flex gap-3 items-start p-2.5 rounded-xl transition-all ${
                              isGuideActive 
                                ? 'bg-amber-50/90 border border-amber-300 ring-2 ring-amber-200/50 shadow-xs' 
                                : 'hover:bg-slate-50/70 border border-transparent'
                            }`}
                          >
                            <button 
                              onClick={() => handleTogglePrayer(day, idx)}
                              className={`mt-1 flex-shrink-0 transition-colors cursor-pointer ${isChecked ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'}`}
                              title={isChecked ? "Mark as unprayed" : "I prayed for this"}
                            >
                              {isChecked ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                            </button>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm leading-snug ${isChecked ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>{item}</p>
                              
                              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                                {count > 0 && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0F2C59] border border-blue-100">
                                    <Heart size={10} className={isChecked ? "fill-current text-[#C82323]" : ""} /> {count} Warriors Prayed
                                  </span>
                                )}

                                <button
                                  type="button"
                                  onClick={() => setActivePrayerGuide({ topic: item, day, itemId: prayerItemId })}
                                  className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 active:scale-95 transition-all cursor-pointer shadow-2xs group"
                                  title="Open AI Sample Prayer Guide"
                                >
                                  <Sparkles size={11} className="text-amber-600 group-hover:scale-110 transition-transform" />
                                  <span>Sample Prayer</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Trend Chart */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm col-span-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#0F2C59] font-serif flex items-center gap-2">
                    <Activity className="text-[#C82323]" /> Weekly Prayer Engagement
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Tracking weekly active prayer warriors and congregation intercession over time
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto bg-blue-50/70 border border-blue-100 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0F2C59]">
                  <Users size={14} className="text-[#C82323]" />
                  <span>{uniqueWarriorsThisWeek} active this week</span>
                </div>
              </div>

              {weeklyData.length > 0 ? (
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: any, name: string) => [value, name === 'warriors' ? 'Active Prayer Warriors' : name]}
                        labelFormatter={(label: string) => `Week of: ${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="warriors" 
                        stroke="#C82323" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#C82323', strokeWidth: 2, stroke: '#fff' }} 
                        activeDot={{ r: 6 }} 
                        name="Active Warriors" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-72 w-full flex items-center justify-center text-gray-400 text-sm">
                  No weekly engagement data available yet.
                </div>
              )}
            </div>

            {/* Fasting & Prayer Request Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Monthly Fasting */}
              <div className="bg-[#0F2C59] text-white rounded-3xl p-8 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <UtensilsCrossed size={120} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold font-serif mb-2 text-[#D4A373]">Monthly Prayer & Fasting</h2>
                  <p className="text-blue-200 mb-6 font-medium">(3rd Week: Wednesday to Friday)</p>
                  
                  <blockquote className="border-l-4 border-[#D4A373] pl-4 italic text-blue-100 mb-8 text-sm">
                    "But this kind does not go out except by prayer and fasting." — Matthew 17:21
                  </blockquote>
                  
                  {fastingCommitment ? (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                      <div className="flex items-center gap-3 text-green-400 mb-2">
                        <CheckCircle2 size={24} />
                        <span className="font-bold">Commitment Locked!</span>
                      </div>
                      <p className="text-blue-100 mb-4 text-sm">You are committed to a <strong className="text-white">{fastingCommitment}</strong> for this week's fast.</p>
                      <button
                        onClick={() => { setFastingCommitment(null); localStorage.removeItem('sk_fasting_commitment'); }}
                        className="text-xs text-blue-300 hover:text-white underline"
                      >
                        Change Commitment
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium mb-2">Select your fasting commitment:</p>
                      {renderFastingButtons()}
                    </div>
                  )}
                </div>
              </div>

              {/* Public Prayer Request Form */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-[#0F2C59] font-serif mb-2 flex items-center gap-2">
                  <Send className="text-[#C82323]" /> Submit Prayer Request
                </h2>
                <p className="text-gray-500 mb-6 text-sm">Share your burdens so we can pray with you.</p>
                
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name (Optional)</label>
                    <input 
                      type="text" 
                      value={requestForm.name}
                      onChange={e => setRequestForm({...requestForm, name: e.target.value})}
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#C82323] focus:ring-[#C82323]" 
                      placeholder="Leave blank to remain anonymous"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      value={requestForm.category}
                      onChange={e => setRequestForm({...requestForm, category: e.target.value})}
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#C82323] focus:ring-[#C82323]"
                    >
                      <option>Personal</option>
                      <option>Healing</option>
                      <option>Family</option>
                      <option>Guidance</option>
                      <option>Thanksgiving</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prayer Request Details *</label>
                    <textarea 
                      required
                      rows={4}
                      value={requestForm.details}
                      onChange={e => setRequestForm({...requestForm, details: e.target.value})}
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#C82323] focus:ring-[#C82323]" 
                      placeholder="How can we pray for you?"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#C82323] text-white font-bold rounded-xl hover:bg-[#a11b1b] transition-colors flex justify-center items-center gap-2 shadow-sm"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}

        {/* Admin View */}
        {activeTab === 'admin' && isAdmin && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-[#0F2C59] flex items-center gap-2"><HeartHandshake /> Manage Prayer Requests</h2>
            </div>
            
            {isLoadingRequests ? (
              <div className="p-12 text-center text-gray-500">Loading requests...</div>
            ) : adminRequests.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No prayer requests submitted yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-100/50 text-gray-500">
                    <tr>
                      <th className="px-6 py-4 font-medium w-48">Date / Name</th>
                      <th className="px-6 py-4 font-medium w-32">Category</th>
                      <th className="px-6 py-4 font-medium">Details</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {adminRequests.map(req => {
                      const isPrayed = req.status === 'prayed';
                      
                      return (
                        <tr key={req.id} className={`hover:bg-gray-50 transition-colors ${isPrayed ? 'bg-gray-50/50 opacity-75' : ''}`}>
                          <td className="px-6 py-4">
                            <div className={`font-bold ${isPrayed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{req.name}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              {req.createdAt?.toDate ? req.createdAt.toDate().toLocaleDateString() : 'Just now'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded text-xs font-bold bg-[#D4A373]/10 text-[#D4A373]">
                              {req.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-normal min-w-[300px]">
                            <p className={`text-sm ${isPrayed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                              {req.details}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-3 items-center">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  checked={isPrayed}
                                  onChange={(e) => statusMutation.mutate({ id: req.id, status: e.target.checked ? 'prayed' : 'pending' })}
                                  className="rounded border-gray-300 text-green-600 focus:ring-green-600 cursor-pointer w-4 h-4"
                                />
                                <span className={`text-xs font-bold ${isPrayed ? 'text-green-600' : 'text-gray-400'}`}>Prayed</span>
                              </label>
                              <button 
                                onClick={() => { if(confirm('Delete this request?')) deleteMutation.mutate(req.id); }} 
                                className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                                title="Delete Request"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* AI-Powered Sample Prayer Guide Modal */}
        {activePrayerGuide && (
          <SamplePrayerModal
            isOpen={!!activePrayerGuide}
            onClose={() => setActivePrayerGuide(null)}
            topic={activePrayerGuide.topic}
            day={activePrayerGuide.day}
          />
        )}

      </div>
    </div>
  );
}
