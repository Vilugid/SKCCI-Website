import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Users, MapPin, Calendar, Clock, Plus, X, Upload, Image as ImageIcon, Edit, CheckCircle, FileText, History, CheckSquare, Square, Percent, Trash2, Activity, TrendingUp } from 'lucide-react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { isCellLeaderAdmin } from '../utils/roles';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCellGroups, createCellGroup, updateCellGroup, removeCellGroup, updateCellGroupLogs } from '../api/db';
import imageCompression from 'browser-image-compression';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface MeetingLog {
  id: string;
  date: string;
  photoUrl: string | null;
  attendedMembers: string[];
  createdAt: string;
}

interface CellGroupData {
  id: string;
  leaderId?: string;
  leaderName: string;
  members: string[];
  location: string;
  scheduleDay: string;
  scheduleTime: string;
  photoUrl: string | null;
  proofPhotoUrl?: string | null;
  lastProofUploadAt?: string;
  meetingLogs?: MeetingLog[];
  createdByUid?: string;
  createdByEmail?: string;
}

export default function CellGroup() {
  const { user } = useAuth();
  const isAdmin = isCellLeaderAdmin(user?.email);
  const queryClient = useQueryClient();

  const { data: groupsRaw = [] } = useQuery({
    queryKey: ['cell_groups'],
    queryFn: fetchCellGroups,
  });

  const groups = groupsRaw as CellGroupData[];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);

  // Modals for Meeting Logs
  const [isLogMeetingModalOpen, setIsLogMeetingModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<CellGroupData | null>(null);
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteGroupConfirmId, setDeleteGroupConfirmId] = useState<string | null>(null);

  // Main Form State
  const [leaderName, setLeaderName] = useState('');
  const [location, setLocation] = useState('');
  const [scheduleDay, setScheduleDay] = useState('Friday');
  const [scheduleTime, setScheduleTime] = useState('19:00');
  const [memberInput, setMemberInput] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  
  // Latest Report / Meeting Log state
  const [meetingDate, setMeetingDate] = useState(new Date().toISOString().split('T')[0]);
  const [meetingPhotoUrl, setMeetingPhotoUrl] = useState<string | null>(null);
  const [attendedMembers, setAttendedMembers] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const meetingPhotoInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleAddMember = () => {
    if (memberInput.trim()) {
      setMembers([...members, memberInput.trim()]);
      setMemberInput('');
    }
  };



  const processAndUploadImage = async (file: File, type: 'group' | 'meeting') => {
    if (!user) {
      toast.error('You must be logged in to upload images');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File exceeds 5MB limit');
      return;
    }
    
    try {
      setUploadProgress(prev => ({ ...prev, [type]: 10 }));
      
      const options = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 800,
        useWebWorker: true
      };
      
      const compressedFile = await imageCompression(file, options);
      setUploadProgress(prev => ({ ...prev, [type]: 60 }));
      
      const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(compressedFile);
      });
      
      setUploadProgress(prev => ({ ...prev, [type]: 100 }));
      
      setTimeout(() => {
        setUploadProgress(prev => {
          const next = { ...prev };
          delete next[type];
          return next;
        });
        
        if (type === 'group') {
          setPhotoUrl(base64);
        } else {
          setMeetingPhotoUrl(base64);
        }
        toast.success('Image uploaded successfully!');
      }, 500);

    } catch (error) {
      console.error('Error uploading image', error);
      toast.error('Failed to upload image. Please try again.');
      setUploadProgress(prev => {
        const next = { ...prev };
        delete next[type];
        return next;
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndUploadImage(file, 'group');
    }
  };

  const handleMeetingPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndUploadImage(file, 'meeting');
    }
  };

  const handleEditClick = (group: CellGroupData) => {
    setEditingGroupId(group.id);
    setLeaderName(group.leaderName);
    setLocation(group.location);
    setScheduleDay(group.scheduleDay);
    setScheduleTime(group.scheduleTime);
    setMembers(group.members);
    setPhotoUrl(group.photoUrl);
    setMeetingPhotoUrl(group.proofPhotoUrl || null);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setLeaderName('');
    setLocation('');
    setScheduleDay('Friday');
    setScheduleTime('19:00');
    setMembers([]);
    setPhotoUrl(null);
    setMeetingPhotoUrl(null);
    setEditingGroupId(null);
    setAttendedMembers([]);
    setMeetingDate(new Date().toISOString().split('T')[0]);
    setIsModalOpen(false);
  };

  const openLogMeetingModal = (group: CellGroupData, logToEdit?: MeetingLog) => {
    setSelectedGroup(group);
    if (logToEdit) {
      setEditingLogId(logToEdit.id);
      setMeetingDate(logToEdit.date);
      setMeetingPhotoUrl(logToEdit.photoUrl);
      setAttendedMembers(logToEdit.attendedMembers);
    } else {
      setEditingLogId(null);
      setMeetingDate(new Date().toISOString().split('T')[0]);
      setMeetingPhotoUrl(null);
      setAttendedMembers([]);
    }
    setIsLogMeetingModalOpen(true);
  };

  const deleteLogMutation = useMutation({
    mutationFn: async ({ groupId, updatedLogs }: { groupId: string, updatedLogs: any[] }) => {
      await updateCellGroupLogs(groupId, updatedLogs);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cell_groups'] });
      toast.success('Meeting log deleted');
      setSelectedGroup(prev => prev ? { ...prev, meetingLogs: variables.updatedLogs } : null);
      setDeleteConfirmId(null);
    },
    onError: (error) => {
      console.error('Error deleting log', error);
      toast.error('Failed to delete log');
    }
  });

  const deleteMeetingLog = (group: CellGroupData, logId: string) => {
    const updatedLogs = (group.meetingLogs || []).filter(l => l.id !== logId);
    deleteLogMutation.mutate({ groupId: group.id, updatedLogs });
  };

  const deleteGroupMutation = useMutation({
    mutationFn: removeCellGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cell_groups'] });
      setDeleteGroupConfirmId(null);
      toast.success('Cell group deleted successfully');
    },
    onError: (error) => {
      console.error("Error deleting group", error);
      toast.error("Failed to delete: Permission denied or document ID missing");
    }
  });

  const deleteCellGroup = (groupId: string) => {
    deleteGroupMutation.mutate(groupId);
  };

  const submitLogMutation = useMutation({
    mutationFn: async ({ groupId, updatedLogs, proofPhotoUrl, lastProofUploadAt }: { groupId: string, updatedLogs: any[], proofPhotoUrl?: string | null, lastProofUploadAt?: string }) => {
      await updateCellGroupLogs(groupId, updatedLogs, proofPhotoUrl, lastProofUploadAt);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cell_groups'] });
      toast.success(editingLogId ? 'Meeting updated!' : 'Meeting logged successfully!');
      setSelectedGroup(prev => prev ? { ...prev, meetingLogs: variables.updatedLogs } : null);
      setIsLogMeetingModalOpen(false);
    },
    onError: (error) => {
      console.error('Error logging meeting', error);
      toast.error('Failed to save meeting');
    }
  });

  const submitMeetingLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroup || !user) return;

    let updatedLogs = [...(selectedGroup.meetingLogs || [])];
    
    if (editingLogId) {
      updatedLogs = updatedLogs.map(log => 
        log.id === editingLogId 
          ? { ...log, date: meetingDate, photoUrl: meetingPhotoUrl, attendedMembers } 
          : log
      );
    } else {
      const newLog: MeetingLog = {
        id: Date.now().toString(),
        date: meetingDate,
        photoUrl: meetingPhotoUrl,
        attendedMembers: attendedMembers,
        createdAt: new Date().toISOString()
      };
      updatedLogs.push(newLog);
    }

    submitLogMutation.mutate({
      groupId: selectedGroup.id,
      updatedLogs,
      proofPhotoUrl: meetingPhotoUrl || selectedGroup.proofPhotoUrl,
      lastProofUploadAt: new Date().toISOString()
    });
  };

  const saveGroupMutation = useMutation({
    mutationFn: async (groupData: Partial<CellGroupData> & { id?: string, meetingLog?: MeetingLog }) => {
      let finalGroupId = groupData.id;
      const dataToSave = { ...groupData };
      delete dataToSave.id;
      delete dataToSave.meetingLog;
      
      if (finalGroupId) {
        await updateCellGroup(finalGroupId, dataToSave);
      } else {
        finalGroupId = await createCellGroup(dataToSave);
      }

      if (groupData.meetingLog && finalGroupId) {
        const currentGroup = groups.find(g => g.id === finalGroupId);
        const updatedLogs = [...(currentGroup?.meetingLogs || []), groupData.meetingLog];
        await updateCellGroupLogs(finalGroupId, updatedLogs);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cell_groups'] });
      toast.success(editingGroupId ? 'Group updated successfully!' : 'Group created successfully!');
      resetForm();
    },
    onError: (error) => {
      console.error("Error saving group:", error);
      toast.error("Failed to save group. You might not have permission.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaderName || !location || members.length === 0 || !user) {
      toast.error('Please fill in all required fields and ensure you are logged in.');
      return;
    }

    const groupData: Partial<CellGroupData> & { id?: string, meetingLog?: MeetingLog } = {
      id: editingGroupId || undefined,
      leaderName,
      location,
      scheduleDay,
      scheduleTime,
      members,
      photoUrl,
    };

    if (meetingPhotoUrl) {
      groupData.proofPhotoUrl = meetingPhotoUrl;
      groupData.lastProofUploadAt = new Date().toISOString();
    }

    if (!editingGroupId) {
      groupData.leaderId = user.uid;
      groupData.createdByUid = user.uid;
      if (user.email) {
        groupData.createdByEmail = user.email;
      }
    }

    if (attendedMembers.length > 0 || meetingPhotoUrl) {
      groupData.meetingLog = {
        id: Date.now().toString(),
        date: meetingDate,
        photoUrl: meetingPhotoUrl,
        attendedMembers: attendedMembers,
        createdAt: new Date().toISOString()
      };
    }

    saveGroupMutation.mutate(groupData);
  };

  const totalMembers = groups.reduce((acc, group) => acc + group.members.length + 1, 0); // +1 for leader

  // Dashboard Analytics
  const activeGroupsThisWeek = useMemo(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return groups.filter(g => 
      g.meetingLogs?.some(log => new Date(log.date) >= oneWeekAgo)
    ).length;
  }, [groups]);

  const disciplesAttendedThisWeek = useMemo(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    let total = 0;
    groups.forEach(g => {
      g.meetingLogs?.forEach(log => {
        if (new Date(log.date) >= oneWeekAgo) {
          total += log.attendedMembers?.length || 0;
        }
      });
    });
    return total;
  }, [groups]);

  const monthlyChartData = useMemo(() => {
    const monthCounts: Record<string, { name: string; activeGroups: Set<string>; attendance: number }> = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = `${months[d.getMonth()]} '${d.getFullYear().toString().substring(2)}`;
      monthCounts[monthKey] = { name: monthKey, activeGroups: new Set(), attendance: 0 };
    }
    
    groups.forEach(group => {
      group.meetingLogs?.forEach(log => {
        const logDate = new Date(log.date);
        const monthKey = `${months[logDate.getMonth()]} '${logDate.getFullYear().toString().substring(2)}`;
        if (monthCounts[monthKey]) {
          monthCounts[monthKey].activeGroups.add(group.id);
          monthCounts[monthKey].attendance += (log.attendedMembers?.length || 0);
        }
      });
    });

    return Object.values(monthCounts).map(data => ({
      name: data.name,
      ActiveGroups: data.activeGroups.size,
      Attendance: data.attendance
    }));
  }, [groups]);

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <img src="/logos/churchlogo4.png" alt="Savior-King Commission Church" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-8 w-auto mb-4" />
            <h1 className="text-3xl font-extrabold text-[#0F2C59] font-serif mb-2">Cell Groups</h1>
            <p className="text-gray-600 text-lg">Grow together in faith, community, and purpose.</p>
          </div>
          {user && (
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-[#C82323] hover:bg-[#a11b1b] transition-colors shadow-sm"
            >
              <Plus size={18} className="mr-2" />
              Register New Group
            </button>
          )}
        </div>

        {/* Dashboard Analytics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className="w-12 h-12 rounded-full bg-[#D4A373]/20 flex items-center justify-center text-[#D4A373] mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Cell Groups</p>
              <p className="text-2xl font-bold text-[#0F2C59]">{groups.length}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className="w-12 h-12 rounded-full bg-[#0F2C59]/10 flex items-center justify-center text-[#0F2C59] mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Disciples</p>
              <p className="text-2xl font-bold text-[#0F2C59]">{totalMembers}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Groups This Week</p>
              <p className="text-2xl font-bold text-[#0F2C59]">{activeGroupsThisWeek}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Disciples Attended This Week</p>
              <p className="text-2xl font-bold text-[#0F2C59]">{disciplesAttendedThisWeek}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Chart 1: Active Cell Groups Trend */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full min-h-[300px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Activity size={20} className="mr-2 text-green-600" />
                Active Cell Groups Trend (Last 6 Months)
              </h3>
            </div>
            {monthlyChartData.every(d => d.ActiveGroups === 0) ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                No activity recorded yet
              </div>
            ) : (
              <div className="flex-1 w-full min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} allowDecimals={false} />
                    <Tooltip 
                      cursor={{ fill: '#f9fafb' }}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Bar dataKey="ActiveGroups" name="Active Groups" fill="#16a34a" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Chart 2: Disciples Attendance Trend */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full min-h-[300px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <TrendingUp size={20} className="mr-2 text-blue-600" />
                Disciples Attendance Trend (Last 6 Months)
              </h3>
            </div>
            {monthlyChartData.every(d => d.Attendance === 0) ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                No activity recorded yet
              </div>
            ) : (
              <div className="flex-1 w-full min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} allowDecimals={false} />
                    <Tooltip 
                      cursor={{ fill: '#f9fafb' }}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Line type="monotone" dataKey="Attendance" name="Disciples Attended" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group) => {
            const canEdit = isAdmin || group.leaderId === user?.uid || group.createdByUid === user?.uid || (!!group.createdByEmail && !!user?.email && group.createdByEmail.toLowerCase() === user.email.toLowerCase());
            const canDelete = isAdmin || group.createdByUid === user?.uid || (!!group.createdByEmail && !!user?.email && group.createdByEmail.toLowerCase() === user.email.toLowerCase());

            return (
            <div key={group.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow relative">
              {/* Photo */}
              <div className="h-48 bg-gray-200 relative group/photo">
                {group.photoUrl ? (
                  <img src={group.photoUrl} alt={`${group.leaderName}'s Cell Group`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ImageIcon size={48} opacity={0.5} />
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#a11b1b] shadow-sm flex items-center gap-2">
                  {group.proofPhotoUrl && <span title="Recent Meeting Proof Uploaded"><CheckCircle size={14} className="text-green-600" /></span>}
                  {group.members.length + 1} Members
                </div>
                {(canEdit || canDelete) && (
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover/photo:opacity-100 transition-opacity">
                    {canEdit && (
                      <button 
                        onClick={() => handleEditClick(group)}
                        className="bg-white/90 backdrop-blur p-2 rounded-full text-[#0F2C59] hover:text-[#0F2C59] hover:bg-gray-100 shadow-sm transition-colors"
                        title="Edit Group"
                      >
                        <Edit size={18} />
                      </button>
                    )}
                    {canDelete && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setDeleteGroupConfirmId(group.id); }}
                        className="bg-white/90 backdrop-blur p-2 rounded-full text-[#C82323] hover:text-[#a11b1b] hover:bg-red-50 shadow-sm transition-colors"
                        title="Delete Group"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{group.leaderName}'s Group</h3>
                  {(canEdit || canDelete) && (
                    <div className="flex gap-3 md:hidden text-gray-400">
                      {canEdit && (
                        <button onClick={() => handleEditClick(group)} className="hover:text-[#0F2C59] transition-colors">
                          <Edit size={18} />
                        </button>
                      )}
                      {canDelete && (
                        <button onClick={(e) => { e.stopPropagation(); setDeleteGroupConfirmId(group.id); }} className="hover:text-[#C82323] transition-colors">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin size={18} className="mr-2 text-[#C82323] shrink-0 mt-0.5" />
                    <span>{group.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={18} className="mr-2 text-[#C82323] shrink-0" />
                    <span>{group.scheduleDay}s</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={18} className="mr-2 text-[#C82323] shrink-0" />
                    <span>{group.scheduleTime}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Members</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D4A373]/20 text-[#0F2C59]">
                      {group.leaderName} (Leader)
                    </span>
                    {group.members.map((member, idx) => (
                      <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4 flex gap-2">
                  {canEdit && (
                    <button 
                      onClick={() => openLogMeetingModal(group)} 
                      className="flex-1 bg-[#0F2C59] text-white text-sm font-medium py-2 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <FileText size={16} />
                      Log Meeting
                    </button>
                  )}
                  <button 
                    onClick={() => { setSelectedGroup(group); setIsHistoryModalOpen(true); }} 
                    className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <History size={16} />
                    History
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>

      </div>

      {/* Registration / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={resetForm}></div>
          
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 my-8">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-20 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900 font-serif">
                {editingGroupId ? "Edit Cell Group" : "Register New Cell Group"}
              </h2>
              <button 
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              
              <div className="space-y-6">
                
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Cell Group Photo <span className="text-gray-500 font-normal">(JPG format only)</span></label>
                  <div 
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl ${photoUrl ? 'border-[#D4A373] bg-[#FAFAFA]' : 'border-gray-300 hover:border-gray-400 bg-[#FAFAFA]'}`}
                    onClick={() => fileInputRef.current?.click()}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="space-y-1 text-center w-full">
                      {uploadProgress['group'] !== undefined ? (
                        <div className="w-full max-w-sm mx-auto">
                          <div className="flex justify-between text-sm mb-1 text-[#0F2C59]">
                            <span>Uploading...</span>
                            <span>{Math.round(uploadProgress['group'])}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-[#C82323] h-2 rounded-full" style={{ width: `${uploadProgress['group']}%` }}></div>
                          </div>
                        </div>
                      ) : photoUrl ? (
                        <div className="relative w-full max-w-sm mx-auto h-40 rounded-lg overflow-hidden">
                          <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white text-sm font-medium flex items-center"><Upload size={16} className="mr-2"/> Change Photo</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600 justify-center">
                            <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-[#C82323] hover:text-[#D4A373] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#D4A373]">
                              Upload a file
                            </span>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </>
                      )}
                    </div>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/jpeg, image/jpg"
                    onChange={handleImageUpload}
                  />
                </div>

                {/* Latest Meeting Report Section */}
                <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 mt-6">
                  <label className="block text-sm font-bold text-amber-900 mb-2 flex items-center">
                    <FileText size={16} className="mr-2" />
                    Latest Meeting Report (Optional)
                  </label>
                  <p className="text-xs text-amber-700 mb-4">You can log attendance and a photo for your most recent meeting here.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="meetingDate" className="block text-sm font-medium text-amber-900 mb-1">Date of Last Meeting</label>
                      <input
                        type="date"
                        id="meetingDate"
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        className="w-full rounded-xl border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-white px-4 py-2 text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-1">Upload Meeting Photo <span className="text-amber-700 font-normal">(JPG format only)</span></label>
                      <div 
                        className={`flex justify-center px-6 py-4 border-2 border-dashed rounded-xl ${meetingPhotoUrl ? 'border-amber-400 bg-white' : 'border-amber-300 hover:border-amber-400 bg-white'}`}
                        onClick={() => meetingPhotoInputRef.current?.click()}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="space-y-1 text-center w-full">
                          {uploadProgress['meeting'] !== undefined ? (
                            <div className="w-full max-w-sm mx-auto">
                              <div className="flex justify-between text-sm mb-1 text-amber-900">
                                <span>Uploading...</span>
                                <span>{Math.round(uploadProgress['meeting'])}%</span>
                              </div>
                              <div className="w-full bg-amber-200 rounded-full h-2">
                                <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${uploadProgress['meeting']}%` }}></div>
                              </div>
                            </div>
                          ) : meetingPhotoUrl ? (
                            <div className="relative w-full max-w-sm mx-auto h-32 rounded-lg overflow-hidden">
                              <img src={meetingPhotoUrl} alt="Meeting Proof" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <span className="text-white text-sm font-medium flex items-center"><Upload size={16} className="mr-2"/> Change Photo</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <Upload className="h-8 w-8 text-amber-600 mb-2" />
                              <span className="text-sm font-medium text-amber-800">Upload Meeting Photo</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <input 
                        type="file" 
                        ref={meetingPhotoInputRef} 
                        className="hidden" 
                        accept="image/jpeg, image/jpg"
                        onChange={handleMeetingPhotoUpload}
                      />
                    </div>
                  </div>
                </div>

                {/* Leader Name */}
                <div>
                  <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700 mb-1">Leader Name</label>
                  <input
                    type="text"
                    id="leaderName"
                    required
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#D4A373] focus:ring-[#D4A373] bg-[#FAFAFA] px-4 py-3 text-gray-900"
                    placeholder="e.g. John Doe"
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Meeting Location</label>
                  <input
                    type="text"
                    id="location"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#D4A373] focus:ring-[#D4A373] bg-[#FAFAFA] px-4 py-3 text-gray-900"
                    placeholder="e.g. BGC, Taguig"
                  />
                </div>

                {/* Schedule */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="scheduleDay" className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                    <select
                      id="scheduleDay"
                      value={scheduleDay}
                      onChange={(e) => setScheduleDay(e.target.value)}
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#D4A373] focus:ring-[#D4A373] bg-[#FAFAFA] px-4 py-3 text-gray-900"
                    >
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="scheduleTime" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      id="scheduleTime"
                      required
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#D4A373] focus:ring-[#D4A373] bg-[#FAFAFA] px-4 py-3 text-gray-900"
                    />
                  </div>
                </div>

                {/* Members */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Members</label>
                  <div className="flex mt-1">
                    <input
                      type="text"
                      value={memberInput}
                      onChange={(e) => setMemberInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddMember();
                        }
                      }}
                      className="w-full rounded-l-xl border-gray-300 shadow-sm focus:border-[#D4A373] focus:ring-[#D4A373] bg-[#FAFAFA] px-4 py-3 text-gray-900 border-r-0"
                      placeholder="Add member name..."
                    />
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-r-xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none"
                    >
                      Add
                    </button>
                  </div>
                  
                  {members.length > 0 && (
                    <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden bg-white">
                      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-500 uppercase">Member List</span>
                        <span className="text-xs text-gray-500">Check to mark attended</span>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {/* Leader is always in the list but not removable */}
                        <label className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 text-[#C82323] focus:ring-[#C82323] border-gray-300 rounded cursor-pointer"
                            checked={attendedMembers.includes(leaderName || 'Leader')}
                            onChange={(e) => {
                              if (e.target.checked) setAttendedMembers([...attendedMembers, leaderName || 'Leader']);
                              else setAttendedMembers(attendedMembers.filter(m => m !== (leaderName || 'Leader')));
                            }}
                          />
                          <div className="ml-3 flex-1 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-900">{leaderName || 'Leader'} (Leader)</span>
                          </div>
                        </label>
                        
                        {members.map((member, idx) => (
                          <label key={idx} className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 text-[#C82323] focus:ring-[#C82323] border-gray-300 rounded cursor-pointer"
                              checked={attendedMembers.includes(member)}
                              onChange={(e) => {
                                if (e.target.checked) setAttendedMembers([...attendedMembers, member]);
                                else setAttendedMembers(attendedMembers.filter(m => m !== member));
                              }}
                            />
                            <div className="ml-3 flex-1 flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-900">{member}</span>
                              <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); handleRemoveMember(idx); }}
                                className="text-gray-400 hover:text-[#C82323] p-1 rounded-md hover:bg-red-50"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  {members.length === 0 && (
                    <p className="mt-2 text-sm text-gray-500">Add at least one member to create the group.</p>
                  )}
                </div>

              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-[#FAFAFA] focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!leaderName || !location || members.length === 0}
                  className="px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-[#C82323] hover:bg-[#a11b1b] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingGroupId ? "Save Changes" : "Create Group"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Log Meeting Modal */}
      {isLogMeetingModalOpen && selectedGroup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsLogMeetingModalOpen(false)}></div>
          
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10 my-8">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-20 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900 font-serif">
                {editingLogId ? "Edit Meeting Report" : "Log Meeting Report"}
              </h2>
              <button 
                onClick={() => setIsLogMeetingModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={submitMeetingLog} className="p-6">
              <div className="space-y-6">
                
                <div>
                  <label htmlFor="modalMeetingDate" className="block text-sm font-medium text-gray-700 mb-1">Date of Meeting</label>
                  <input
                    type="date"
                    id="modalMeetingDate"
                    required
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#D4A373] focus:ring-[#D4A373] bg-[#FAFAFA] px-4 py-3 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Meeting Photo <span className="text-gray-500 font-normal">(JPG format only)</span></label>
                  <div 
                    className={`flex justify-center px-6 py-4 border-2 border-dashed rounded-xl ${meetingPhotoUrl ? 'border-amber-400 bg-white' : 'border-gray-300 hover:border-gray-400 bg-[#FAFAFA]'}`}
                    onClick={() => meetingPhotoInputRef.current?.click()}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="space-y-1 text-center w-full">
                      {uploadProgress['meeting'] !== undefined ? (
                        <div className="w-full max-w-sm mx-auto">
                          <div className="flex justify-between text-sm mb-1 text-amber-900">
                            <span>Uploading...</span>
                            <span>{Math.round(uploadProgress['meeting'])}%</span>
                          </div>
                          <div className="w-full bg-amber-200 rounded-full h-2">
                            <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${uploadProgress['meeting']}%` }}></div>
                          </div>
                        </div>
                      ) : meetingPhotoUrl ? (
                        <div className="relative w-full max-w-sm mx-auto h-40 rounded-lg overflow-hidden">
                          <img src={meetingPhotoUrl} alt="Meeting Proof" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white text-sm font-medium flex items-center"><Upload size={16} className="mr-2"/> Change Photo</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <span className="text-sm font-medium text-[#C82323]">Upload a photo from the meeting</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <input 
                    type="file" 
                    ref={meetingPhotoInputRef} 
                    className="hidden" 
                    accept="image/jpeg, image/jpg"
                    onChange={handleMeetingPhotoUpload}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-medium text-gray-700">Attendance Checklist</label>
                    <button 
                      type="button"
                      onClick={() => {
                        const allMembers = [selectedGroup.leaderName, ...selectedGroup.members];
                        if (attendedMembers.length === allMembers.length) {
                          setAttendedMembers([]);
                        } else {
                          setAttendedMembers(allMembers);
                        }
                      }}
                      className="text-xs font-medium text-[#0F2C59] hover:text-[#C82323]"
                    >
                      {attendedMembers.length === (selectedGroup.members.length + 1) ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-white divide-y divide-gray-100 max-h-60 overflow-y-auto">
                    {[selectedGroup.leaderName, ...selectedGroup.members].map((member, idx) => (
                      <label key={idx} className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-[#C82323] focus:ring-[#C82323] border-gray-300 rounded cursor-pointer"
                          checked={attendedMembers.includes(member)}
                          onChange={(e) => {
                            if (e.target.checked) setAttendedMembers([...attendedMembers, member]);
                            else setAttendedMembers(attendedMembers.filter(m => m !== member));
                          }}
                        />
                        <div className="ml-3 flex-1">
                          <span className="text-sm font-medium text-gray-900">
                            {member} {idx === 0 && <span className="text-xs text-gray-500 font-normal ml-1">(Leader)</span>}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsLogMeetingModalOpen(false)}
                  className="px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-[#FAFAFA] focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!meetingDate}
                  className="px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-[#C82323] hover:bg-[#a11b1b] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingLogId ? "Update Report" : "Save Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View History Modal */}
      {isHistoryModalOpen && selectedGroup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsHistoryModalOpen(false)}></div>
          
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col z-10 my-8">
            <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-20 rounded-t-2xl shrink-0">
              <h2 className="text-xl font-bold text-gray-900 font-serif">
                History & Attendance
              </h2>
              <button 
                onClick={() => setIsHistoryModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-[#FAFAFA]">
              
              {/* Summary Stats */}
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm mb-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#0F2C59]/10 text-[#0F2C59] flex items-center justify-center shrink-0">
                  <Percent size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase">Total Meetings Logged</p>
                  <p className="text-2xl font-extrabold text-[#0F2C59]">{selectedGroup.meetingLogs?.length || 0}</p>
                </div>
              </div>

              {selectedGroup.meetingLogs && selectedGroup.meetingLogs.length > 0 && (
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm mb-6">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Member Attendance Summary</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[selectedGroup.leaderName, ...selectedGroup.members].map((member, idx) => {
                      const totalMeetings = selectedGroup.meetingLogs!.length;
                      const attendedMeetings = selectedGroup.meetingLogs!.filter(log => log.attendedMembers.includes(member)).length;
                      const percentage = Math.round((attendedMeetings / totalMeetings) * 100);
                      
                      return (
                        <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-900">{member} {idx === 0 && <span className="text-xs text-gray-500 font-normal">(Leader)</span>}</span>
                          <div className="text-right">
                            <span className={`text-sm font-bold ${percentage >= 80 ? 'text-green-600' : percentage >= 50 ? 'text-amber-600' : 'text-[#C82323]'}`}>
                              {percentage}%
                            </span>
                            <p className="text-xs text-gray-500">{attendedMeetings} / {totalMeetings} meetings</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {(!selectedGroup.meetingLogs || selectedGroup.meetingLogs.length === 0) ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed">
                  <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No meetings logged yet</h3>
                  <p className="text-sm text-gray-500">Log your first meeting to start tracking attendance.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {selectedGroup.meetingLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(log => {
                    const allMembers = [selectedGroup.leaderName, ...selectedGroup.members];
                    const presentCount = log.attendedMembers.length;
                    
                    return (
                      <div key={log.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
                        {log.photoUrl ? (
                          <div className="md:w-48 h-48 md:h-auto bg-gray-100 shrink-0">
                            <img src={log.photoUrl} alt={`Meeting on ${log.date}`} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="md:w-48 h-48 md:h-auto bg-gray-50 flex items-center justify-center shrink-0 border-r border-gray-100">
                            <ImageIcon className="text-gray-300 h-12 w-12" />
                          </div>
                        )}
                        
                        <div className="p-5 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center text-gray-900 font-bold text-lg">
                              <Calendar size={18} className="mr-2 text-[#C82323]" />
                              {new Date(log.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full">
                                {presentCount} / {allMembers.length} Present
                              </span>
                              {(isAdmin || selectedGroup.leaderId === user?.uid) && (
                                <div className="flex items-center gap-1 border-l border-gray-200 pl-2 ml-1">
                                  <button 
                                    onClick={() => {
                                      setIsHistoryModalOpen(false);
                                      openLogMeetingModal(selectedGroup, log);
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-[#0F2C59] hover:bg-gray-100 rounded transition-colors"
                                    title="Edit log"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  {deleteConfirmId === log.id ? (
                                    <div className="flex items-center gap-1">
                                      <button 
                                        onClick={() => deleteMeetingLog(selectedGroup, log.id)}
                                        className="text-xs font-bold text-white bg-[#C82323] px-2 py-1 rounded hover:bg-[#a11b1b] transition-colors"
                                      >
                                        Delete
                                      </button>
                                      <button 
                                        onClick={() => setDeleteConfirmId(null)}
                                        className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <button 
                                      onClick={() => setDeleteConfirmId(log.id)}
                                      className="p-1.5 text-gray-400 hover:text-[#C82323] hover:bg-red-50 rounded transition-colors"
                                      title="Delete log"
                                    >
                                      <X size={14} />
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-auto">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Attendance</p>
                            <div className="flex flex-wrap gap-2">
                              {allMembers.map((member, i) => {
                                const isPresent = log.attendedMembers.includes(member);
                                return (
                                  <span key={i} className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${isPresent ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200 opacity-75'}`}>
                                    {isPresent ? <CheckSquare size={12} className="mr-1.5" /> : <X size={12} className="mr-1.5" />}
                                    {member}
                                  </span>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Group Confirmation Modal */}
      {deleteGroupConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={() => setDeleteGroupConfirmId(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm flex flex-col z-10 p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Cell Group?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this cell group? This action cannot be undone and will remove all meeting logs associated with it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setDeleteGroupConfirmId(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => deleteCellGroup(deleteGroupConfirmId)}
                className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-xl font-medium transition-colors shadow-sm"
              >
                Delete Group
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
