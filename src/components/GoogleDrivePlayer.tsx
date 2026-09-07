import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Edit3, 
  Save, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Loader2, 
  ShieldCheck, 
  ExternalLink,
  Plus
} from 'lucide-react';
import toast from 'react-hot-toast';
import { parseVideoSource } from '../utils/googleDrive';
import { saveBibleExplainerVideo, deleteBibleExplainerVideo } from '../api/bibleVideos';

interface GoogleDrivePlayerProps {
  dayNumber: number;
  planId?: 'plan_100' | 'plan_365';
  dayTitle?: string;
  videoUrl?: string | null;
  canEdit?: boolean;
  adminEmail?: string;
  theme?: 'light' | 'dark';
  onVideoUpdated?: (newUrl: string | null) => void;
}

export default function GoogleDrivePlayer({
  dayNumber,
  planId = 'plan_365',
  dayTitle,
  videoUrl,
  canEdit = false,
  adminEmail = '',
  theme = 'light',
  onVideoUpdated
}: GoogleDrivePlayerProps) {
  const [currentUrl, setCurrentUrl] = useState<string>(videoUrl || '');
  const [isEditing, setIsEditing] = useState(false);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCurrentUrl(videoUrl || '');
    setInputUrl(videoUrl || '');
  }, [videoUrl, dayNumber]);

  // Parse current video source for direct opening link
  const videoSource = parseVideoSource(currentUrl);
  const hasVideo = Boolean(videoSource.directUrl || currentUrl.trim());
  const directLink = videoSource.directUrl || currentUrl.trim();

  // Real-time parsing for edit modal
  const inputParsed = parseVideoSource(inputUrl);

  const handleOpenEdit = () => {
    setInputUrl(currentUrl);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setInputUrl(currentUrl);
  };

  const handleSave = async () => {
    if (!canEdit) {
      toast.error("Unauthorized. Only the super admin can edit explainer videos.");
      return;
    }

    const trimmed = inputUrl.trim();
    if (trimmed && !inputParsed.directUrl && !inputParsed.embedUrl && !trimmed.startsWith('http')) {
      toast.error("Please enter a valid Google Drive or YouTube link.");
      return;
    }

    setIsSaving(true);
    try {
      if (!trimmed) {
        await deleteBibleExplainerVideo(dayNumber, planId);
        setCurrentUrl('');
        onVideoUpdated?.(null);
        toast.success(`Explainer video link for Day ${dayNumber} removed`);
      } else {
        await saveBibleExplainerVideo(dayNumber, trimmed, adminEmail || 'captainmarkvil@gmail.com', planId);
        setCurrentUrl(trimmed);
        onVideoUpdated?.(trimmed);
        toast.success(`Explainer video link for Day ${dayNumber} updated!`);
      }
      setIsEditing(false);
    } catch (err: any) {
      console.error("Failed to save explainer video:", err);
      toast.error("Failed to save video link. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!canEdit) return;
    if (!window.confirm(`Are you sure you want to remove the video link for Day ${dayNumber}?`)) {
      return;
    }

    setIsSaving(true);
    try {
      await deleteBibleExplainerVideo(dayNumber, planId);
      setCurrentUrl('');
      setInputUrl('');
      onVideoUpdated?.(null);
      setIsEditing(false);
      toast.success(`Video link for Day ${dayNumber} removed.`);
    } catch (err) {
      toast.error("Failed to remove video link.");
    } finally {
      setIsSaving(false);
    }
  };

  const isDarkMode = theme === 'dark';

  // If no video exists and user is not an admin, we don't clutter the UI
  if (!hasVideo && !canEdit) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Simple, Non-Intrusive Video Link Card */}
      {hasVideo ? (
        <div 
          className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all ${
            isDarkMode 
              ? 'bg-red-950/20 border-red-500/20 hover:border-red-500/40 text-white' 
              : 'bg-red-500/5 border-red-500/20 hover:border-red-500/30 text-gray-900'
          }`}
        >
          {/* Left: Icon & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#C82323]/15 text-[#C82323] dark:text-[#E63946] flex items-center justify-center flex-shrink-0">
              <Video size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#C82323] dark:text-[#E63946]">
                  Daily Explainer Video
                </p>
                {videoSource.platformName && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10 text-gray-500 dark:text-gray-400 font-medium">
                    {videoSource.platformName}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold truncate text-gray-900 dark:text-gray-100">
                {dayTitle || `Day ${dayNumber} Reading Lesson`}
              </p>
            </div>
          </div>

          {/* Right: Watch Video Button & Optional Admin Edit */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {canEdit && (
              <button
                type="button"
                onClick={handleOpenEdit}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                title="Edit Video Link (Super Admin)"
              >
                <Edit3 size={15} />
              </button>
            )}

            <a
              href={directLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#C82323] hover:bg-[#a51b1b] text-white text-xs font-bold transition-all shadow-xs cursor-pointer group"
            >
              <span>Watch Video</span>
              <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      ) : (
        /* Empty State for Super Admin (Add Video Link) */
        canEdit && (
          <div className={`p-3.5 rounded-xl border border-dashed flex items-center justify-between gap-3 text-xs ${
            isDarkMode 
              ? 'border-gray-800 bg-gray-950/40 text-gray-400' 
              : 'border-gray-300 bg-gray-50 text-gray-600'
          }`}>
            <div className="flex items-center gap-2.5">
              <Video size={16} className="text-gray-400" />
              <span>No explainer video link added for Day {dayNumber}.</span>
            </div>
            <button
              type="button"
              onClick={handleOpenEdit}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#D4A373] hover:bg-[#c49262] text-slate-950 font-bold transition-colors cursor-pointer"
            >
              <Plus size={13} /> Add Video Link
            </button>
          </div>
        )
      )}

      {/* Super Admin Edit Link Modal */}
      {isEditing && canEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#D4A373]/20 text-[#D4A373]">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Set Explainer Video Link</h3>
                  <p className="text-xs text-gray-400">
                    Day {dayNumber} of {planId === 'plan_100' ? '100-Day Plan' : '365 Reading Plan'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseEdit}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                  Video URL (Google Drive or YouTube)
                </label>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/... or https://youtu.be/..."
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs font-mono focus:border-[#C82323] focus:ring-1 focus:ring-[#C82323] outline-none transition-all"
                />
              </div>

              {/* Status Feedback */}
              {inputUrl.trim() && (
                <div className={`p-3 rounded-xl border text-xs ${
                  inputParsed.directUrl || inputUrl.trim().startsWith('http')
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200' 
                    : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                }`}>
                  {inputParsed.directUrl || inputUrl.trim().startsWith('http') ? (
                    <div className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Ready to link ({inputParsed.platformName || 'Web Link'})</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <AlertCircle size={14} className="text-rose-600 dark:text-rose-400 flex-shrink-0" />
                      <span>Please enter a full URL (e.g. starting with https://)</span>
                    </div>
                  )}
                </div>
              )}

              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                When members click <strong>&quot;Watch Video&quot;</strong>, it will cleanly open this link directly in their Google Drive app or browser without any black screens or navigation issues.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-3">
              {currentUrl ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 size={14} /> Remove Link
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#0F2C59] hover:bg-[#1A365D] dark:bg-[#D4A373] dark:hover:bg-[#c49262] text-white dark:text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  <span>{isSaving ? 'Saving...' : 'Save Link'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
