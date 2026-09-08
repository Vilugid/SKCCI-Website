import React, { useState, useMemo } from 'react';
import { 
  Library, 
  ChevronDown, 
  Search, 
  X, 
  Check, 
  Copy, 
  Music, 
  Sparkles,
  Loader2
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchLeaderTools } from '../api/db';

export interface MasterSong {
  key: string;
  title: string;
  lyrics: string;
  dates: string[];
}

interface SongBankSectionProps {
  isTagalog?: boolean;
  theme?: 'light' | 'dark';
  initialCollapsed?: boolean;
  className?: string;
}

export default function SongBankSection({
  isTagalog = false,
  theme = 'light',
  initialCollapsed = true,
  className = ''
}: SongBankSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [songBankSearch, setSongBankSearch] = useState('');
  const [expandedBankSongKey, setExpandedBankSongKey] = useState<string | null>(null);
  const [copiedSongKey, setCopiedSongKey] = useState<string | null>(null);

  const { data: recordsRaw = [], isLoading } = useQuery({
    queryKey: ['leader_tools'],
    queryFn: fetchLeaderTools,
  });

  const records = useMemo(() => {
    return ((recordsRaw || []) as any[]).filter((r) => r.id !== 'current');
  }, [recordsRaw]);

  // Master Song Bank Aggregation (Deduplicated, Case-Insensitive, Alphabetical A-Z)
  const masterSongs: MasterSong[] = useMemo(() => {
    const map = new Map<string, MasterSong>();
    records.forEach((r) => {
      (r.songs || []).forEach((s: any) => {
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
    return masterSongs.filter(
      (s) => s.title.toLowerCase().includes(q) || s.lyrics.toLowerCase().includes(q)
    );
  }, [masterSongs, songBankSearch]);

  const handleCopyLyrics = async (song: MasterSong, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!song.lyrics?.trim()) {
      toast.error(isTagalog ? 'Walang lyrics para sa awit na ito' : 'No lyrics available to copy');
      return;
    }

    const textToCopy = `${song.title}\n\n${song.lyrics.trim()}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedSongKey(song.key);
      setTimeout(() => setCopiedSongKey(null), 2000);
      toast.success(
        isTagalog
          ? `Nakopya ang lyrics ng "${song.title}"`
          : `Copied lyrics for "${song.title}"`
      );
    } catch {
      toast.error(isTagalog ? 'Hindi makopya ang lyrics' : 'Failed to copy lyrics');
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
      id="daily-song-bank"
      className={`rounded-2xl shadow-sm border overflow-hidden transition-all ${
        isDark 
          ? 'bg-gray-900/90 border-gray-800' 
          : 'bg-white border-gray-200/90'
      } ${className}`}
    >
      {/* Header bar */}
      <div 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="bg-[#0F2C59] px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3 cursor-pointer select-none"
      >
        <div className="flex items-center min-w-0">
          <Library className="text-[#D4A373] mr-2.5 sm:mr-3 flex-shrink-0" size={22} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white font-serif tracking-tight truncate">
                Song Bank
              </h3>
              <span className="hidden min-[480px]:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#D4A373]/20 text-[#D4A373] border border-[#D4A373]/30 font-medium">
                <Music size={10} />
                {isTagalog ? 'Umawit ng 1–2 awit' : 'Sing 1–2 songs'}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-blue-200/90 truncate mt-0.5">
              {isTagalog 
                ? 'Master Lyrics Archive • Magpuri at sumamba bago magbasa' 
                : 'Master Lyrics Archive • Praise & worship before reading the Word'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="px-2.5 sm:px-3 py-1 bg-white/10 text-white text-[11px] sm:text-xs font-semibold rounded-full border border-white/15 backdrop-blur-sm">
            {masterSongs.length} {isTagalog ? 'Awit' : 'Songs'} (A–Z)
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
            className="text-white hover:text-blue-100 flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-2.5 sm:px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand Song Bank' : 'Collapse Song Bank'}
          >
            <span className="hidden min-[380px]:inline">{isCollapsed ? 'Expand' : 'Collapse'}</span>
            <ChevronDown
              size={15}
              className={`transition-transform duration-200 ${
                isCollapsed ? '-rotate-90' : 'rotate-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Collapsed State Bar (Matches LeaderTools exactly) */}
      {isCollapsed ? (
        <div
          onClick={() => setIsCollapsed(false)}
          className={`px-4 sm:px-6 py-3 text-xs cursor-pointer flex items-center justify-between transition-colors border-t ${
            isDark
              ? 'bg-gray-800/60 hover:bg-gray-800 text-gray-300 border-gray-800'
              : 'bg-gray-50/90 hover:bg-gray-100 text-gray-600 border-gray-100'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#0F2C59] flex-shrink-0" />
            <span className={`font-medium truncate ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {isTagalog
                ? `Master Archive: ${masterSongs.length} awit na nakatala (A–Z)`
                : `Master Archive: ${masterSongs.length} unique songs cataloged (A–Z)`}
            </span>
            <span className="text-gray-400 hidden sm:inline flex-shrink-0">
              {isTagalog
                ? '• Pindutin upang maghanap, tumingin at kopyahin ang lyrics'
                : '• Click to search, view & copy lyrics'}
            </span>
          </div>
          <span className="font-semibold text-[#0F2C59] dark:text-blue-400 hover:underline flex items-center gap-1 flex-shrink-0 ml-2">
            {isTagalog ? 'Buksan ang Song Bank' : 'Expand Song Bank'} &rarr;
          </span>
        </div>
      ) : (
        /* Expanded State */
        <div className="p-4 sm:p-6">
          {/* Devotional guidance note */}
          <div className={`mb-4 p-3 sm:p-3.5 rounded-xl border flex items-start gap-2.5 ${
            isDark
              ? 'bg-amber-950/30 border-amber-800/40 text-amber-200'
              : 'bg-amber-50/70 border-amber-200/80 text-amber-900'
          }`}>
            <Sparkles size={16} className="text-[#D4A373] mt-0.5 flex-shrink-0" />
            <div className="text-xs leading-relaxed">
              <p className="font-bold">
                {isTagalog 
                  ? 'Banal na Paghahanda: Umawit ng Isa o Dalawang Awit ng Pagsamba' 
                  : 'Heart Preparation: Sing a Song or Two of Praise & Worship'}
              </p>
              <p className={`mt-0.5 ${isDark ? 'text-amber-300/80' : 'text-amber-800/90'}`}>
                {isTagalog
                  ? 'Bago pumasok sa pagbabasa ng Salita ng Diyos, ialay ang iyong puso sa Panginoon sa pamamagitan ng pag-awit ng papuri mula sa talaan sa ibaba.'
                  : 'Before opening the Scriptures, lift your voice and surrender your focus to the Lord. Choose a song below to view and sing along with full lyrics.'}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-5">
            <Search className="absolute left-3.5 top-3 text-gray-400" size={17} />
            <input
              type="text"
              value={songBankSearch}
              onChange={(e) => setSongBankSearch(e.target.value)}
              placeholder={
                isTagalog
                  ? 'Maghanap ng pamagat ng awit o linya ng lyrics...'
                  : 'Search song titles or lyrics in the master archive...'
              }
              className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373]'
                  : 'bg-[#FAFAFA] border border-gray-200 text-[#0F2C59] placeholder:text-gray-400 focus:bg-white focus:border-[#0F2C59] focus:ring-2 focus:ring-[#0F2C59]/10'
              }`}
            />
            {songBankSearch && (
              <button
                type="button"
                onClick={() => setSongBankSearch('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5 cursor-pointer"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Filter count & reset */}
          {songBankSearch && (
            <div className="mb-3.5 flex items-center justify-between text-xs text-gray-500 px-1">
              <span>
                {isTagalog ? 'Nahanap: ' : 'Found '}
                <strong className={isDark ? 'text-white' : 'text-[#0F2C59]'}>
                  {filteredBankSongs.length}
                </strong>{' '}
                {filteredBankSongs.length === 1 
                  ? (isTagalog ? 'awit' : 'song') 
                  : (isTagalog ? 'mga awit' : 'songs')
                }{' '}
                {isTagalog ? 'na tumutugma sa' : 'matching'} "{songBankSearch}"
              </span>
              <button
                type="button"
                onClick={() => setSongBankSearch('')}
                className="text-[#C82323] dark:text-red-400 hover:underline font-medium cursor-pointer"
              >
                {isTagalog ? 'Burahin ang search' : 'Clear search'}
              </button>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && records.length === 0 && (
            <div className="py-8 flex flex-col items-center justify-center gap-2 text-gray-500">
              <Loader2 size={24} className="animate-spin text-[#D4A373]" />
              <p className="text-xs">
                {isTagalog ? 'Ikinakarga ang mga awit...' : 'Loading song catalog...'}
              </p>
            </div>
          )}

          {/* Master Song List */}
          {filteredBankSongs.length > 0 ? (
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredBankSongs.map((song) => {
                const isExpanded = expandedBankSongKey === song.key;
                const isCopied = copiedSongKey === song.key;

                return (
                  <div
                    key={song.key}
                    className={`border rounded-xl transition-all overflow-hidden ${
                      isDark
                        ? isExpanded
                          ? 'bg-gray-800/90 border-[#D4A373]/50 ring-1 ring-[#D4A373]/20'
                          : 'bg-gray-800/40 border-gray-700/80 hover:border-gray-600'
                        : isExpanded
                          ? 'bg-white border-[#0F2C59]/30 ring-1 ring-[#0F2C59]/10 shadow-xs'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Song Item Header */}
                    <div
                      onClick={() => setExpandedBankSongKey(isExpanded ? null : song.key)}
                      className={`w-full px-3.5 sm:px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 cursor-pointer transition-colors ${
                        isDark 
                          ? 'hover:bg-gray-700/40' 
                          : 'bg-[#FAFAFA] hover:bg-gray-100/80'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#0F2C59] text-[#D4A373] flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {song.title.charAt(0).toUpperCase()}
                          </span>
                          <h4 className={`font-bold text-sm sm:text-base truncate ${
                            isDark ? 'text-white' : 'text-[#0F2C59]'
                          }`}>
                            {song.title}
                          </h4>
                        </div>
                        {song.dates && song.dates.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5 ml-8 sm:ml-9">
                            {song.dates.slice(0, 3).map((d, i) => (
                              <span
                                key={i}
                                className={`inline-flex items-center text-[10px] px-1.5 py-0.2 rounded-md font-medium border ${
                                  isDark
                                    ? 'bg-blue-950/40 text-blue-300 border-blue-900/60'
                                    : 'bg-blue-50 text-[#0F2C59] border-blue-100'
                                }`}
                              >
                                {d}
                              </span>
                            ))}
                            {song.dates.length > 3 && (
                              <span className="text-[10px] text-gray-400 self-center">
                                +{song.dates.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center ml-8 sm:ml-0">
                        <button
                          type="button"
                          onClick={(e) => handleCopyLyrics(song, e)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                            isCopied
                              ? 'bg-green-50 text-green-700 border-green-200 font-bold dark:bg-green-950/40 dark:text-green-300 dark:border-green-800'
                              : isDark
                                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700'
                                : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200 shadow-2xs'
                          }`}
                          title={isTagalog ? 'Kopyahin ang buong lyrics' : 'Copy full lyrics'}
                        >
                          {isCopied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                          <span>{isCopied ? (isTagalog ? 'Nakopya!' : 'Copied!') : (isTagalog ? 'Kopyahin' : 'Copy')}</span>
                        </button>

                        <span className="text-[#0F2C59] dark:text-[#D4A373] font-bold text-lg px-1">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </div>
                    </div>

                    {/* Full Lyrics View */}
                    {isExpanded && (
                      <div className={`p-4 sm:p-5 border-t ${
                        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
                      }`}>
                        <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-gray-100 dark:border-gray-800 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <Music size={13} className="text-[#D4A373]" />
                            {isTagalog ? 'Buong Lyrics' : 'Full Lyrics'}
                          </span>
                          <span className="text-[10px] text-gray-400 font-normal">
                            {isTagalog ? 'Umawit nang may kagalakan sa puso' : 'Sing with joy and gratitude'}
                          </span>
                        </div>

                        {song.lyrics ? (
                          <div className={`whitespace-pre-wrap text-xs sm:text-sm font-mono leading-relaxed p-4 rounded-xl border overflow-x-auto ${
                            isDark
                              ? 'bg-gray-950 text-gray-200 border-gray-800'
                              : 'bg-[#FAFAFA] text-gray-800 border-gray-100'
                          }`}>
                            {song.lyrics}
                          </div>
                        ) : (
                          <p className="text-gray-400 italic text-xs py-3">
                            {isTagalog ? 'Walang nakatalang lyrics para sa awit na ito.' : 'No lyrics stored for this song.'}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            !isLoading && (
              <div className={`text-center py-8 rounded-xl border border-dashed ${
                isDark ? 'bg-gray-800/40 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'
              }`}>
                <Library className="mx-auto h-8 w-8 text-gray-300 dark:text-gray-600 mb-2" />
                <p className="font-medium text-xs sm:text-sm">
                  {songBankSearch 
                    ? (isTagalog ? 'Walang awit na tumugma sa iyong hinanap.' : 'No songs match your search query.') 
                    : (isTagalog ? 'Wala pang mga awit na naka-archive sa sistema.' : 'No songs archived in the system yet.')}
                </p>
                {songBankSearch && (
                  <button
                    type="button"
                    onClick={() => setSongBankSearch('')}
                    className="mt-2.5 inline-flex items-center px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    {isTagalog ? 'I-reset ang filter' : 'Reset search filter'}
                  </button>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
