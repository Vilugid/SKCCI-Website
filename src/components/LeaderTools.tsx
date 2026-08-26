import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { isCellLeaderAdmin } from '../utils/roles';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchLeaderTools, createLeaderTool, updateLeaderTool, removeLeaderTool } from '../api/db';
import { FileText, Youtube, Music, Edit, Save, Plus, X, Trash, Calendar as CalendarIcon, ChevronDown, List as ListIcon, Library, Search, Copy, Check, Bookmark, Sparkles, ChevronsUpDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

const StructuredOutlineViewer = ({ text, isFormatted }: { text: string, isFormatted: boolean }) => {
  if (!isFormatted) {
    return (
      <div className="whitespace-pre-wrap font-mono text-sm text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-200 overflow-x-auto">
        {text}
      </div>
    );
  }

  const lines = text.split('\n');
  const markdownComponents = { p: ({children}: any) => <span>{children}</span> };
  
  return (
    <div className="space-y-3 text-gray-800 text-base leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2" />;
        
        // 1. Header Fields (Badges/Cards)
        const headerMatch = trimmed.match(/^([a-zA-Z\s\/]+):\s*(.*)/);
        if (headerMatch) {
          const title = headerMatch[1].trim();
          const content = headerMatch[2].trim();
          const knownHeaders = [
            "Sermon Outline", "Big Idea / Main Theme", "Scripture Reference", 
            "Objective", "Why this message matters today", "The Question", 
            "The Problem", "Transition", "Special Performance"
          ];
          
          if (knownHeaders.some(h => title.toLowerCase() === h.toLowerCase())) {
            return (
              <div key={idx} className="bg-[#FAFAFA] border border-gray-200 rounded-xl p-5 my-5 shadow-sm">
                <span className="font-bold text-[#0F2C59] block mb-2 text-sm uppercase tracking-wider">{title}</span>
                <span className="text-gray-800 font-medium">
                  <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
                </span>
              </div>
            );
          }
        }

        // 2. Roman Numerals (I. II. III.)
        if (trimmed.match(/^([IVX]+\.)\s+(.+)/)) {
          const match = trimmed.match(/^([IVX]+\.)\s+(.+)/)!;
          return (
            <div key={idx} className="mt-8 mb-4 border-b border-gray-200 pb-3">
              <h3 className="text-xl font-bold text-[#C82323] flex items-start gap-3">
                <span className="text-[#0F2C59] min-w-[2rem]">{match[1]}</span>
                <span><ReactMarkdown components={markdownComponents}>{match[2]}</ReactMarkdown></span>
              </h3>
            </div>
          );
        }

        // 3. Letters for sub-points (A. B. C.)
        if (trimmed.match(/^([A-Z]\.)\s+(.+)/)) {
          const match = trimmed.match(/^([A-Z]\.)\s+(.+)/)!;
          return (
            <div key={idx} className="mt-5 mb-2 ml-4">
              <h4 className="text-lg font-bold text-[#0F2C59] flex items-start gap-3">
                <span className="text-[#D4A373] min-w-[1.5rem]">{match[1]}</span>
                <span><ReactMarkdown components={markdownComponents}>{match[2]}</ReactMarkdown></span>
              </h4>
            </div>
          );
        }

        // 4. Numbers (1. 2. 3.) or Bullets (* or -)
        const listMatch = trimmed.match(/^(\d+\.|[*-])\s+(.*)/);
        if (listMatch) {
          return (
            <div key={idx} className="flex items-start gap-3 ml-8 my-2">
              <span className="font-bold text-[#D4A373] mt-0.5 min-w-[1.2rem]">{listMatch[1]}</span>
              <div className="flex-1 text-gray-700">
                <ReactMarkdown components={markdownComponents}>{listMatch[2]}</ReactMarkdown>
              </div>
            </div>
          );
        }

        // Default Paragraph
        return (
          <div key={idx} className="ml-4 text-gray-700">
            <ReactMarkdown components={markdownComponents}>{trimmed}</ReactMarkdown>
          </div>
        );
      })}
    </div>
  );
};

interface Song {
  title: string;
  lyrics: string;
}

interface ServiceRecord {
  id: string;
  dateLabel: string;
  dateValue: string;
  messageTitle: string;
  messageOutline: string;
  youtubeVideoIds: string[];
  songs: Song[];
  createdAt: any;
}

export default function LeaderTools() {
  const { user } = useAuth();
  const isAdmin = isCellLeaderAdmin(user?.email);
  const queryClient = useQueryClient();
  
  const { data: recordsRaw = [] } = useQuery({
    queryKey: ['leader_tools'],
    queryFn: fetchLeaderTools,
  });

  const records = (recordsRaw as ServiceRecord[]).filter((r) => r.id !== 'current');

  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  
  useEffect(() => {
    if (!selectedRecordId && records.length > 0) {
      setSelectedRecordId(records[0].id);
    }
  }, [records, selectedRecordId]);

  const [isEditing, setIsEditing] = useState(false);
  const [isFormattedView, setIsFormattedView] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Edit State
  const [editDateValue, setEditDateValue] = useState('');
  const [editDateLabel, setEditDateLabel] = useState('');
  const [editMessageTitle, setEditMessageTitle] = useState('');
  const [editOutline, setEditOutline] = useState('');
  const [editVideoIds, setEditVideoIds] = useState<string[]>([]);
  const [editSongs, setEditSongs] = useState<Song[]>([]);
  const [expandedSongIdx, setExpandedSongIdx] = useState<number | null>(null);

  // Quick Navigator, Collapsible Sections & Song Bank State
  const [activeSection, setActiveSection] = useState<string>('sunday-service');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    'sunday-service': true,
    'worship-videos': true,
    'song-lyrics': true,
    'song-bank': true,
  });
  const [songBankSearch, setSongBankSearch] = useState('');
  const [expandedBankSongKey, setExpandedBankSongKey] = useState<string | null>(null);
  const [copiedSongKey, setCopiedSongKey] = useState<string | null>(null);

  const toggleSectionCollapse = (sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const areAllSectionsCollapsed = useMemo(() => {
    return Object.values(collapsedSections).every(Boolean);
  }, [collapsedSections]);

  const toggleAllSections = () => {
    if (areAllSectionsCollapsed) {
      setCollapsedSections({
        'sunday-service': false,
        'worship-videos': false,
        'song-lyrics': false,
        'song-bank': false,
      });
    } else {
      setCollapsedSections({
        'sunday-service': true,
        'worship-videos': true,
        'song-lyrics': true,
        'song-bank': true,
      });
    }
  };

  const selectedRecord = records.find(r => r.id === selectedRecordId);

  // Master Song Bank Aggregation (Deduplicated, Case-Insensitive, Alphabetical A-Z)
  interface MasterSong {
    key: string;
    title: string;
    lyrics: string;
    dates: string[];
  }

  const masterSongs: MasterSong[] = useMemo(() => {
    const map = new Map<string, MasterSong>();
    records.forEach(r => {
      (r.songs || []).forEach(s => {
        const cleanTitle = (s.title || '').trim();
        if (!cleanTitle) return;
        const key = cleanTitle.toLowerCase();
        const cleanLyrics = (s.lyrics || '').trim();
        const dateTag = r.dateLabel || r.dateValue || '';
        
        if (!map.has(key)) {
          map.set(key, {
            key,
            title: cleanTitle,
            lyrics: cleanLyrics,
            dates: dateTag ? [dateTag] : []
          });
        } else {
          const existing = map.get(key)!;
          if (!existing.lyrics && cleanLyrics) {
            existing.lyrics = cleanLyrics;
          }
          if (dateTag && !existing.dates.includes(dateTag)) {
            existing.dates.push(dateTag);
          }
        }
      });
    });

    return Array.from(map.values()).sort((a, b) => 
      a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
    );
  }, [records]);

  const filteredBankSongs = useMemo(() => {
    if (!songBankSearch.trim()) return masterSongs;
    const q = songBankSearch.toLowerCase().trim();
    return masterSongs.filter(s => 
      s.title.toLowerCase().includes(q) || s.lyrics.toLowerCase().includes(q)
    );
  }, [masterSongs, songBankSearch]);

  const handleCopyLyrics = (song: { title: string; lyrics: string; key?: string }, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!song.lyrics?.trim()) {
      toast.error('No lyrics available to copy');
      return;
    }
    const textToCopy = `${song.title}\n\n${song.lyrics.trim()}`;
    navigator.clipboard.writeText(textToCopy);
    const identifier = song.key || song.title.toLowerCase().trim();
    setCopiedSongKey(identifier);
    setTimeout(() => setCopiedSongKey(null), 2500);
    toast.success(`Copied lyrics for "${song.title}"`);
  };

  // ScrollSpy for Quick-Navigator
  useEffect(() => {
    const sectionIds = ['sunday-service', 'worship-videos', 'song-lyrics', 'song-bank'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedRecord, masterSongs, collapsedSections]);

  const scrollToSection = (id: string) => {
    // Automatically expand the section if it is collapsed so user can see the content
    setCollapsedSections(prev => ({
      ...prev,
      [id]: false
    }));
    setActiveSection(id);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -90;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  const navSections = [
    { id: 'sunday-service', label: 'Sunday Service', subtitle: 'Outline & Theme', icon: FileText },
    { id: 'worship-videos', label: 'Worship Videos', subtitle: 'Video Recordings', icon: Youtube },
    { id: 'song-lyrics', label: 'Song Lyrics', subtitle: 'Weekly Setlist', icon: Music },
    { id: 'song-bank', label: 'Song Bank', subtitle: 'Master Archive', icon: Library, count: masterSongs.length },
  ];

  const handleEditInit = () => {
    if (selectedRecord) {
      setEditDateValue(selectedRecord.dateValue);
      setEditDateLabel(selectedRecord.dateLabel);
      setEditMessageTitle(selectedRecord.messageTitle || '');
      setEditOutline(selectedRecord.messageOutline || '');
      setEditVideoIds([...(selectedRecord.youtubeVideoIds || [])]);
      setEditSongs([...(selectedRecord.songs || [])]);
    } else {
      // New record defaults
      const today = new Date();
      const nextSunday = new Date();
      nextSunday.setDate(today.getDate() + ((7 - today.getDay()) % 7));
      
      const yyyy = nextSunday.getFullYear();
      const mm = String(nextSunday.getMonth() + 1).padStart(2, '0');
      const dd = String(nextSunday.getDate()).padStart(2, '0');
      
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
      
      setEditDateValue(`${yyyy}-${mm}-${dd}`);
      setEditDateLabel(nextSunday.toLocaleDateString('en-US', options));
      setEditMessageTitle('Sunday Service');
      setEditOutline('# Sunday Message\n\nOutline will be posted here.');
      setEditVideoIds([]);
      setEditSongs([]);
    }
    // Uncollapse all sections so user can immediately edit
    setCollapsedSections({
      'sunday-service': false,
      'worship-videos': false,
      'song-lyrics': false,
      'song-bank': false,
    });
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    setSelectedRecordId(null);
    const today = new Date();
    const nextSunday = new Date();
    nextSunday.setDate(today.getDate() + ((7 - today.getDay()) % 7));
    
    const yyyy = nextSunday.getFullYear();
    const mm = String(nextSunday.getMonth() + 1).padStart(2, '0');
    const dd = String(nextSunday.getDate()).padStart(2, '0');
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    
    setEditDateValue(`${yyyy}-${mm}-${dd}`);
    setEditDateLabel(nextSunday.toLocaleDateString('en-US', options));
    setEditMessageTitle('Sunday Service');
    setEditOutline('# Sunday Message\n\nOutline will be posted here.');
    setEditVideoIds([]);
    setEditSongs([]);
    setCollapsedSections({
      'sunday-service': false,
      'worship-videos': false,
      'song-lyrics': false,
      'song-bank': false,
    });
    setIsEditing(true);
  };

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      // We are using setDoc in updateLeaderTool, which allows creating or updating based on dateValue ID
      await updateLeaderTool(data.id, data.payload);
      return data.id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['leader_tools'] });
      setSelectedRecordId(id);
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Error saving tools data:", error);
      alert("Failed to save changes.");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: removeLeaderTool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leader_tools'] });
      setSelectedRecordId(records.length > 1 ? records[0].id : null);
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Error deleting record:", error);
      alert("Failed to delete record.");
    }
  });

  const handleSave = () => {
    if (!isAdmin) return;
    saveMutation.mutate({
      id: editDateValue,
      payload: {
        dateValue: editDateValue,
        dateLabel: editDateLabel,
        messageTitle: editMessageTitle,
        messageOutline: editOutline,
        youtubeVideoIds: editVideoIds.filter(id => id.trim() !== ''),
        songs: editSongs,
        createdAt: new Date()
      }
    });
  };

  const handleDelete = () => {
    if (!isAdmin || !selectedRecordId) return;
    if (confirm('Are you sure you want to delete this service record?')) {
      deleteMutation.mutate(selectedRecordId);
    }
  };

  const addVideoId = () => {
    setEditVideoIds([...editVideoIds, '']);
  };

  const removeVideoId = (index: number) => {
    setEditVideoIds(editVideoIds.filter((_, i) => i !== index));
  };

  const updateVideoId = (index: number, value: string) => {
    const updated = [...editVideoIds];
    updated[index] = value;
    setEditVideoIds(updated);
  };

  const addSong = () => {
    setEditSongs([...editSongs, { title: '', lyrics: '' }]);
  };

  const removeSong = (index: number) => {
    setEditSongs(editSongs.filter((_, i) => i !== index));
  };

  const updateSong = (index: number, field: 'title' | 'lyrics', value: string) => {
    const updated = [...editSongs];
    updated[index][field] = value;
    setEditSongs(updated);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0F2C59] font-serif mb-2">Cell Leader Tools</h1>
            <p className="text-gray-600 text-lg">Resources for Sunday gatherings and cell groups.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {isAdmin && !isEditing && (
              <>
                <button
                  onClick={handleCreateNew}
                  className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-[#0F2C59] hover:bg-[#1a3d75] transition-colors shadow-sm"
                >
                  <Plus size={18} className="mr-2" />
                  New Record
                </button>
                <button
                  onClick={handleEditInit}
                  disabled={!selectedRecordId}
                  className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
                >
                  <Edit size={18} className="mr-2" />
                  Edit Current
                </button>
              </>
            )}
            {isAdmin && isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-[#FAFAFA] focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm"
                >
                  <Save size={18} className="mr-2" />
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        {/* Quick-Navigation Pills Bar */}
        <div className="mb-8 border-b border-gray-200/80 pb-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 pl-1">
                <Bookmark size={16} className="text-[#C82323]" /> JUMP:
              </span>
              <button
                onClick={toggleAllSections}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors border border-gray-200/80"
              >
                <ChevronsUpDown size={12} />
                <span>{areAllSectionsCollapsed ? 'Expand All' : 'Collapse All'}</span>
              </button>
            </div>
            
            <div className="flex flex-col gap-2">
              {navSections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                const isSecCollapsed = collapsedSections[sec.id];
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-full text-sm font-semibold transition-all shadow-sm ${
                      isActive
                        ? 'bg-[#0F2C59] text-white ring-2 ring-[#0F2C59]/20'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={16} className={isActive ? 'text-[#D4A373]' : 'text-gray-500'} />
                      <span>{sec.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isSecCollapsed && (
                        <span className="w-2 h-2 rounded-full bg-amber-400" title="Section collapsed" />
                      )}
                      {sec.count !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                          {sec.count}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row xl:flex-row gap-8 items-start">
          
          {/* Left Sidebar / Service Dates Archive */}
          <div className="w-full lg:w-64 xl:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div 
                className="bg-[#FAFAFA] px-6 py-4 flex items-center justify-between border-b border-gray-100 cursor-pointer lg:cursor-default"
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              >
                <div className="flex items-center text-[#0F2C59]">
                  <CalendarIcon className="mr-2" size={20} />
                  <h2 className="text-lg font-bold font-serif">Service Dates</h2>
                </div>
                <ChevronDown size={20} className={`text-gray-500 transition-transform lg:hidden ${isMobileSidebarOpen ? 'rotate-180' : ''}`} />
              </div>
              
              <div className={`${isMobileSidebarOpen ? 'block' : 'hidden'} lg:block max-h-[60vh] overflow-y-auto`}>
                {records.length > 0 ? (
                  <ul className="divide-y divide-gray-50">
                    {records.map((record) => (
                      <li key={record.id}>
                        <button
                          onClick={() => {
                            setSelectedRecordId(record.id);
                            setIsMobileSidebarOpen(false);
                            setIsEditing(false);
                          }}
                          className={`w-full text-left px-5 py-3.5 transition-colors hover:bg-gray-50 ${selectedRecordId === record.id ? 'bg-[#FAFAFA] border-l-4 border-[#C82323]' : 'border-l-4 border-transparent'}`}
                        >
                          <div className={`font-medium text-sm ${selectedRecordId === record.id ? 'text-[#C82323] font-bold' : 'text-gray-900'}`}>
                            {record.dateLabel}
                          </div>
                          {record.messageTitle && (
                            <div className="text-xs text-gray-500 mt-0.5 truncate">{record.messageTitle}</div>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-6 py-8 text-center text-gray-500 text-sm">
                    No records found.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 space-y-8 w-full">
            
            {/* 1. Sunday Service (Outline Component) */}
            <div id="sunday-service" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-24">
              <div className="bg-[#0F2C59] px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center min-w-0">
                  <FileText className="text-white mr-3 flex-shrink-0" />
                  <h2 className="text-xl font-bold text-white font-serif truncate">
                    {isEditing ? "Edit Message Outline" : (selectedRecord?.messageTitle || "Sunday Service Outline")}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  {isAdmin && isEditing && selectedRecordId && (
                    <button onClick={handleDelete} className="text-red-400 hover:text-red-300 flex items-center text-sm mr-1" title="Delete Record">
                      <Trash size={16} className="mr-1" /> Delete
                    </button>
                  )}
                  {!isEditing && selectedRecord && (
                    <button 
                      onClick={() => setIsFormattedView(!isFormattedView)} 
                      className="text-white hover:text-blue-100 flex items-center text-xs sm:text-sm bg-white/10 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {isFormattedView ? "Raw Text" : "Formatted View"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleSectionCollapse('sunday-service')}
                    className="text-white hover:text-blue-100 flex items-center gap-1 text-xs sm:text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
                    title={collapsedSections['sunday-service'] ? "Expand section" : "Collapse section"}
                  >
                    <span>{collapsedSections['sunday-service'] ? "Expand" : "Collapse"}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${collapsedSections['sunday-service'] ? '-rotate-90' : 'rotate-0'}`} />
                  </button>
                </div>
              </div>

              {!collapsedSections['sunday-service'] ? (
                <div className="p-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date Value (YYYY-MM-DD)</label>
                          <input
                            type="date"
                            value={editDateValue}
                            onChange={(e) => {
                              setEditDateValue(e.target.value);
                              // Auto-update label
                              const date = new Date(e.target.value);
                              const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' };
                              setEditDateLabel(date.toLocaleDateString('en-US', options));
                            }}
                            className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#C82323] focus:ring-[#C82323]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date Label</label>
                          <input
                            type="text"
                            value={editDateLabel}
                            onChange={(e) => setEditDateLabel(e.target.value)}
                            className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#C82323] focus:ring-[#C82323]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message Title</label>
                        <input
                          type="text"
                          value={editMessageTitle}
                          onChange={(e) => setEditMessageTitle(e.target.value)}
                          className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#C82323] focus:ring-[#C82323]"
                          placeholder="e.g. The Power of Faith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message Outline (Markdown)</label>
                        <textarea
                          value={editOutline}
                          onChange={(e) => setEditOutline(e.target.value)}
                          rows={12}
                          className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#C82323] focus:ring-[#C82323] font-mono text-sm"
                          placeholder="Enter outline using Markdown..."
                        />
                      </div>
                    </div>
                  ) : (
                    selectedRecord ? (
                      <StructuredOutlineViewer text={selectedRecord.messageOutline} isFormatted={isFormattedView} />
                    ) : (
                      <p className="text-gray-500 text-center py-12">Select a date from the sidebar to view the outline.</p>
                    )
                  )}
                </div>
              ) : (
                <div 
                  onClick={() => toggleSectionCollapse('sunday-service')}
                  className="px-6 py-3.5 bg-gray-50/80 hover:bg-gray-100 text-xs text-gray-600 cursor-pointer flex items-center justify-between transition-colors border-t border-gray-100"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="w-2 h-2 rounded-full bg-[#0F2C59] flex-shrink-0" />
                    <span className="font-medium text-gray-700 truncate">
                      {selectedRecord?.messageTitle ? `Message: "${selectedRecord.messageTitle}"` : "Sunday Service Outline"}
                    </span>
                    <span className="text-gray-400 hidden sm:inline flex-shrink-0">• Click to view sermon outline & scriptures</span>
                  </div>
                  <span className="font-semibold text-[#0F2C59] hover:underline flex items-center gap-1 flex-shrink-0">
                    Expand Section &rarr;
                  </span>
                </div>
              )}
            </div>

            {/* 2. Worship Songs Videos */}
            <div id="worship-videos" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-24">
              <div className="bg-[#C82323] px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center min-w-0">
                  <Youtube className="text-white mr-3 flex-shrink-0" />
                  <h2 className="text-xl font-bold text-white font-serif">Worship Songs Videos</h2>
                </div>
                <div className="flex items-center gap-2">
                  {isEditing && (
                    <button onClick={addVideoId} className="text-white hover:text-red-100 flex items-center text-sm mr-1">
                      <Plus size={16} className="mr-1" /> Add Video
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleSectionCollapse('worship-videos')}
                    className="text-white hover:text-red-100 flex items-center gap-1 text-xs sm:text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
                    title={collapsedSections['worship-videos'] ? "Expand section" : "Collapse section"}
                  >
                    <span>{collapsedSections['worship-videos'] ? "Expand" : "Collapse"}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${collapsedSections['worship-videos'] ? '-rotate-90' : 'rotate-0'}`} />
                  </button>
                </div>
              </div>

              {!collapsedSections['worship-videos'] ? (
                <div className="p-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      {editVideoIds.map((id, idx) => (
                        <div key={idx} className="flex gap-2 items-start">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video ID {idx + 1}</label>
                            <input
                              type="text"
                              value={id}
                              onChange={(e) => updateVideoId(idx, e.target.value)}
                              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#C82323] focus:ring-[#C82323]"
                              placeholder="e.g. dQw4w9WgXcQ"
                            />
                          </div>
                          <button 
                            onClick={() => removeVideoId(idx)}
                            className="mt-7 text-red-500 hover:text-red-700 p-2"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      ))}
                      {editVideoIds.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">No videos added.</p>
                      )}
                      <p className="mt-2 text-xs text-gray-500">Extract the ID from the YouTube URL (e.g. watch?v=ID)</p>
                    </div>
                  ) : (
                    selectedRecord?.youtubeVideoIds && selectedRecord.youtubeVideoIds.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6">
                        {selectedRecord.youtubeVideoIds.map((id, idx) => (
                          <div key={idx} className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-sm bg-gray-100">
                            <iframe
                              src={`https://www.youtube.com/embed/${id}`}
                              title={`YouTube video player ${idx + 1}`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full min-h-[300px]"
                            ></iframe>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No worship videos linked for this week.</p>
                    )
                  )}
                </div>
              ) : (
                <div 
                  onClick={() => toggleSectionCollapse('worship-videos')}
                  className="px-6 py-3.5 bg-gray-50/80 hover:bg-gray-100 text-xs text-gray-600 cursor-pointer flex items-center justify-between transition-colors border-t border-gray-100"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="w-2 h-2 rounded-full bg-[#C82323] flex-shrink-0" />
                    <span className="font-medium text-gray-700 truncate">
                      {selectedRecord?.youtubeVideoIds && selectedRecord.youtubeVideoIds.length > 0 
                        ? `${selectedRecord.youtubeVideoIds.length} Worship Video${selectedRecord.youtubeVideoIds.length === 1 ? '' : 's'} linked for this service` 
                        : "No worship videos linked for this week"}
                    </span>
                    <span className="text-gray-400 hidden sm:inline flex-shrink-0">• Click to expand & play</span>
                  </div>
                  <span className="font-semibold text-[#C82323] hover:underline flex items-center gap-1 flex-shrink-0">
                    Expand Videos &rarr;
                  </span>
                </div>
              )}
            </div>
            
            {/* 3. Weekly Song Lyrics */}
            <div id="song-lyrics" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-24">
              <div className="bg-[#D4A373] px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center min-w-0">
                  <Music className="text-white mr-3 flex-shrink-0" />
                  <h2 className="text-xl font-bold text-white font-serif">Song Lyrics (Weekly Setlist)</h2>
                </div>
                <div className="flex items-center gap-2">
                  {isEditing && (
                    <button onClick={addSong} className="text-white hover:text-amber-100 flex items-center text-sm mr-1">
                      <Plus size={16} className="mr-1" /> Add Song
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleSectionCollapse('song-lyrics')}
                    className="text-white hover:text-amber-100 flex items-center gap-1 text-xs sm:text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
                    title={collapsedSections['song-lyrics'] ? "Expand section" : "Collapse section"}
                  >
                    <span>{collapsedSections['song-lyrics'] ? "Expand" : "Collapse"}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${collapsedSections['song-lyrics'] ? '-rotate-90' : 'rotate-0'}`} />
                  </button>
                </div>
              </div>
              
              {!collapsedSections['song-lyrics'] ? (
                <div className="p-4 sm:p-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      {editSongs.map((song, idx) => (
                        <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-[#FAFAFA]">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-sm text-gray-500">Song {idx + 1}</span>
                            <button onClick={() => removeSong(idx)} className="text-red-500 hover:text-red-700">
                              <Trash size={16} />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={song.title}
                            onChange={(e) => updateSong(idx, 'title', e.target.value)}
                            placeholder="Song Title"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#C82323] focus:ring-[#C82323] mb-3 text-sm"
                          />
                          <textarea
                            value={song.lyrics}
                            onChange={(e) => updateSong(idx, 'lyrics', e.target.value)}
                            placeholder="Lyrics here..."
                            rows={6}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#C82323] focus:ring-[#C82323] text-sm font-mono"
                          />
                        </div>
                      ))}
                      {editSongs.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No songs added.</p>}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedRecord?.songs && selectedRecord.songs.length > 0 ? (
                        selectedRecord.songs.map((song, idx) => {
                          const songKey = `weekly-${idx}-${song.title.toLowerCase().trim()}`;
                          const isCopied = copiedSongKey === (song.title.toLowerCase().trim()) || copiedSongKey === songKey;

                          return (
                            <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
                              <div
                                onClick={() => setExpandedSongIdx(expandedSongIdx === idx ? null : idx)}
                                className="w-full px-5 py-4 bg-[#FAFAFA] hover:bg-gray-100 font-medium text-[#0F2C59] flex justify-between items-center transition-colors cursor-pointer"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded-full bg-[#D4A373]/20 text-[#0F2C59] flex items-center justify-center text-xs font-bold flex-shrink-0">
                                    {idx + 1}
                                  </span>
                                  <span className="text-base font-semibold">{song.title}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {song.lyrics && (
                                    <button
                                      type="button"
                                      onClick={(e) => handleCopyLyrics({ title: song.title, lyrics: song.lyrics, key: songKey }, e)}
                                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                        isCopied
                                          ? 'bg-green-50 text-green-700 border-green-200 font-bold shadow-sm'
                                          : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 shadow-sm'
                                      }`}
                                      title="Copy lyrics"
                                    >
                                      {isCopied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                                      <span>{isCopied ? 'Copied!' : 'Copy Lyrics'}</span>
                                    </button>
                                  )}
                                  <span className="text-[#C82323] font-bold text-xl px-2">
                                    {expandedSongIdx === idx ? '−' : '+'}
                                  </span>
                                </div>
                              </div>
                              {expandedSongIdx === idx && (
                                <div className="p-6 bg-white border-t border-gray-100">
                                  <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    <Music size={14} className="text-[#D4A373]" /> Lyrics
                                  </div>
                                  <div className="whitespace-pre-wrap text-sm sm:text-base text-gray-700 font-mono leading-relaxed bg-[#FAFAFA] p-5 rounded-xl border border-gray-100">
                                    {song.lyrics}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-gray-500 text-center py-6">No song lyrics available for this week.</p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div 
                  onClick={() => toggleSectionCollapse('song-lyrics')}
                  className="px-6 py-3.5 bg-gray-50/80 hover:bg-gray-100 text-xs text-gray-600 cursor-pointer flex items-center justify-between transition-colors border-t border-gray-100"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4A373] flex-shrink-0" />
                    <span className="font-medium text-gray-700 truncate">
                      {selectedRecord?.songs && selectedRecord.songs.length > 0 
                        ? `${selectedRecord.songs.length} Song${selectedRecord.songs.length === 1 ? '' : 's'} in Weekly Setlist (${selectedRecord.songs.map(s => s.title).join(', ')})` 
                        : "No weekly songs listed"}
                    </span>
                    <span className="text-gray-400 hidden sm:inline flex-shrink-0">• Click to view & copy lyrics</span>
                  </div>
                  <span className="font-semibold text-[#D4A373] hover:underline flex items-center gap-1 flex-shrink-0">
                    Expand Lyrics &rarr;
                  </span>
                </div>
              )}
            </div>

            {/* 4. Song Bank (Master Lyrics Archive) */}
            <div id="song-bank" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-24">
              <div className="bg-[#0F2C59] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center min-w-0">
                  <Library className="text-[#D4A373] mr-3 flex-shrink-0" size={24} />
                  <div>
                    <h2 className="text-xl font-bold text-white font-serif">Song Bank</h2>
                    <p className="text-xs text-blue-200 mt-0.5">Master Lyrics Archive across all services</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full border border-white/15 backdrop-blur-sm">
                    {masterSongs.length} Total Songs (A–Z)
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSectionCollapse('song-bank')}
                    className="text-white hover:text-blue-100 flex items-center gap-1 text-xs sm:text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
                    title={collapsedSections['song-bank'] ? "Expand section" : "Collapse section"}
                  >
                    <span>{collapsedSections['song-bank'] ? "Expand" : "Collapse"}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${collapsedSections['song-bank'] ? '-rotate-90' : 'rotate-0'}`} />
                  </button>
                </div>
              </div>

              {!collapsedSections['song-bank'] ? (
                <div className="p-6">
                  {/* Search Bar */}
                  <div className="relative mb-6">
                    <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={songBankSearch}
                      onChange={(e) => setSongBankSearch(e.target.value)}
                      placeholder="Search song titles or lyrics in the master archive..."
                      className="w-full pl-11 pr-10 py-3 bg-[#FAFAFA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-[#0F2C59] focus:ring-2 focus:ring-[#0F2C59]/20 transition-all placeholder:text-gray-400"
                    />
                    {songBankSearch && (
                      <button
                        onClick={() => setSongBankSearch('')}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 p-0.5"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {/* Filter info */}
                  {songBankSearch && (
                    <div className="mb-4 flex items-center justify-between text-xs text-gray-500 px-1">
                      <span>
                        Found <strong className="text-[#0F2C59]">{filteredBankSongs.length}</strong> {filteredBankSongs.length === 1 ? 'song' : 'songs'} matching "{songBankSearch}"
                      </span>
                      <button
                        onClick={() => setSongBankSearch('')}
                        className="text-[#C82323] hover:underline font-medium"
                      >
                        Clear search
                      </button>
                    </div>
                  )}

                  {/* Master Song List */}
                  {filteredBankSongs.length > 0 ? (
                    <div className="space-y-3">
                      {filteredBankSongs.map((song) => {
                        const isExpanded = expandedBankSongKey === song.key;
                        const isCopied = copiedSongKey === song.key;

                        return (
                          <div
                            key={song.key}
                            className={`border rounded-xl transition-all bg-white overflow-hidden shadow-sm ${
                              isExpanded ? 'border-[#0F2C59]/30 ring-1 ring-[#0F2C59]/10' : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div
                              onClick={() => setExpandedBankSongKey(isExpanded ? null : song.key)}
                              className="w-full px-5 py-4 bg-[#FAFAFA] hover:bg-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-colors"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-7 h-7 rounded-lg bg-[#0F2C59] text-[#D4A373] flex items-center justify-center text-xs font-bold flex-shrink-0">
                                    {song.title.charAt(0).toUpperCase()}
                                  </span>
                                  <h3 className="font-bold text-[#0F2C59] text-base truncate">
                                    {song.title}
                                  </h3>
                                </div>
                                {song.dates && song.dates.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                                    {song.dates.map((d, i) => (
                                      <span key={i} className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-md bg-blue-50 text-[#0F2C59] font-medium border border-blue-100">
                                        {d}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-center ml-9 sm:ml-0">
                                <button
                                  type="button"
                                  onClick={(e) => handleCopyLyrics(song, e)}
                                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                    isCopied
                                      ? 'bg-green-50 text-green-700 border-green-200 font-bold'
                                      : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 shadow-sm'
                                  }`}
                                  title="Copy full lyrics"
                                >
                                  {isCopied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                                  <span>{isCopied ? 'Copied!' : 'Copy Lyrics'}</span>
                                </button>

                                <span className="text-[#0F2C59] font-bold text-xl px-1">
                                  {isExpanded ? '−' : '+'}
                                </span>
                              </div>
                            </div>

                            {isExpanded && (
                              <div className="p-6 bg-white border-t border-gray-100">
                                <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                  <Music size={14} className="text-[#D4A373]" /> Full Lyrics
                                </div>
                                {song.lyrics ? (
                                  <div className="whitespace-pre-wrap text-sm sm:text-base text-gray-700 font-mono leading-relaxed bg-[#FAFAFA] p-5 rounded-xl border border-gray-100 overflow-x-auto">
                                    {song.lyrics}
                                  </div>
                                ) : (
                                  <p className="text-gray-400 italic text-sm py-3">No lyrics stored for this song.</p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      <Library className="mx-auto h-10 w-10 text-gray-300 mb-2" />
                      <p className="text-gray-600 font-medium text-sm">
                        {songBankSearch ? 'No songs match your search query.' : 'No songs archived in the system yet.'}
                      </p>
                      {songBankSearch && (
                        <button
                          onClick={() => setSongBankSearch('')}
                          className="mt-3 inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Reset search filter
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div 
                  onClick={() => toggleSectionCollapse('song-bank')}
                  className="px-6 py-3.5 bg-gray-50/80 hover:bg-gray-100 text-xs text-gray-600 cursor-pointer flex items-center justify-between transition-colors border-t border-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0F2C59]" />
                    <span className="font-medium text-gray-700">
                      Master Archive: {masterSongs.length} unique songs cataloged (A–Z)
                    </span>
                    <span className="text-gray-400 hidden sm:inline">• Click to search, view & copy lyrics</span>
                  </div>
                  <span className="font-semibold text-[#0F2C59] hover:underline flex items-center gap-1">
                    Expand Song Bank &rarr;
                  </span>
                </div>
              )}
            </div>
            
          </div>

        </div>

      </div>
    </div>
  );
}
