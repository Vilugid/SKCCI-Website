import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Video, 
  Edit3, 
  Save, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Loader2, 
  ShieldCheck, 
  Info,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';
import { extractGoogleDriveFileId, getGoogleDriveEmbedUrl } from '../utils/googleDrive';
import { saveBibleExplainerVideo, deleteBibleExplainerVideo } from '../api/bibleVideos';

interface GoogleDrivePlayerProps {
  dayNumber: number;
  dayTitle?: string;
  videoUrl?: string | null;
  canEdit?: boolean;
  adminEmail?: string;
  theme?: 'light' | 'dark';
  onVideoUpdated?: (newUrl: string | null) => void;
}

export default function GoogleDrivePlayer({
  dayNumber,
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
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setCurrentUrl(videoUrl || '');
    setInputUrl(videoUrl || '');
    setIframeLoaded(false);
  }, [videoUrl, dayNumber]);

  const fileId = extractGoogleDriveFileId(currentUrl);
  const embedUrl = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;

  // Real-time extraction for edit input modal
  const inputParsedId = extractGoogleDriveFileId(inputUrl);
  const inputParsedEmbed = inputParsedId ? `https://drive.google.com/file/d/${inputParsedId}/preview` : null;

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
    if (trimmed && !inputParsedId) {
      toast.error("Invalid Google Drive link. Please enter a valid share URL, preview link, or iframe embed code.");
      return;
    }

    setIsSaving(true);
    try {
      if (!trimmed) {
        await deleteBibleExplainerVideo(dayNumber);
        setCurrentUrl('');
        onVideoUpdated?.(null);
        toast.success(`Explainer video for Day ${dayNumber} removed`);
      } else {
        await saveBibleExplainerVideo(dayNumber, trimmed, adminEmail || 'captainmarkvil@gmail.com');
        setCurrentUrl(trimmed);
        onVideoUpdated?.(trimmed);
        toast.success(`Explainer video for Day ${dayNumber} updated!`);
      }
      setIsEditing(false);
    } catch (err: any) {
      console.error("Failed to save explainer video:", err);
      toast.error("Failed to save video. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!canEdit) return;
    if (!window.confirm(`Are you sure you want to remove the explainer video for Day ${dayNumber}?`)) {
      return;
    }

    setIsSaving(true);
    try {
      await deleteBibleExplainerVideo(dayNumber);
      setCurrentUrl('');
      setInputUrl('');
      onVideoUpdated?.(null);
      setIsEditing(false);
      toast.success(`Video for Day ${dayNumber} removed.`);
    } catch (err) {
      toast.error("Failed to remove video.");
    } finally {
      setIsSaving(false);
    }
  };

  const isDarkMode = theme === 'dark';

  return (
    <div className="w-full">
      {/* Main Video Card */}
      <div 
        className={`rounded-2xl overflow-hidden border shadow-md transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-950 border-gray-800 text-gray-100 ring-1 ring-white/5' 
            : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        {/* Header Bar */}
        <div className="px-3.5 py-2.5 sm:px-5 sm:py-3.5 flex items-center justify-between gap-2 border-b border-white/10 bg-black/25">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
            <div className="w-7 h-7 sm:w-8 h-8 rounded-lg bg-[#C82323]/20 border border-[#C82323]/30 flex items-center justify-center text-[#E63946] flex-shrink-0">
              <Video size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D4A373] truncate">
                  Daily Explainer Video
                </span>
              </div>
              {dayTitle && (
                <p className="text-[11px] sm:text-xs text-gray-400 font-medium truncate mt-0.5">
                  {dayTitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Super Admin Edit Button */}
            {canEdit && (
              <button
                type="button"
                onClick={handleOpenEdit}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg bg-[#D4A373] hover:bg-[#c49262] text-slate-950 transition-all shadow-xs cursor-pointer active:scale-95 whitespace-nowrap"
                title="Edit Google Drive Video (Super Admin)"
              >
                <Edit3 size={13} />
                <span>{currentUrl ? 'Edit Video' : 'Add Video'}</span>
              </button>
            )}
          </div>
        </div>

        {/* 16:9 Zero-Layout-Shift Responsive Video Container */}
        <div className="p-2 sm:p-3 bg-black/40">
          <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-black flex items-center justify-center">
            {embedUrl ? (
              <>
                {/* Shimmer / Skeleton while loading */}
                {!iframeLoaded && (
                  <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-gray-950 text-gray-400 gap-3">
                    <Loader2 size={28} className="animate-spin text-[#D4A373]" />
                    <span className="text-xs font-medium tracking-wide">Loading video explainer...</span>
                  </div>
                )}

                <iframe
                  src={embedUrl}
                  title={`Bible Reading Explainer - Day ${dayNumber}`}
                  className="absolute inset-0 w-full h-full border-0 z-10"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                  onLoad={() => setIframeLoaded(true)}
                />

                {/* Top-Right Mask to hide redundant Google Drive embed pop-out button */}
                <div 
                  className="absolute top-0 right-0 w-16 h-12 z-20 pointer-events-auto bg-gradient-to-l from-black via-black/80 to-transparent" 
                  aria-hidden="true" 
                />
              </>
            ) : (
              /* Empty State Placeholder */
              <div className="absolute inset-0 p-4 sm:p-8 text-center flex flex-col items-center justify-center max-w-md mx-auto">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 mb-2 sm:mb-3 shadow-inner">
                  <Play size={20} className="ml-0.5 text-[#D4A373]" />
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-gray-200">
                  Today&apos;s Video Explainer
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-400 mt-1 mb-3 line-clamp-2 leading-relaxed">
                  {canEdit 
                    ? "As Super Admin, you can add today's Google Drive video lesson for the congregation."
                    : "The video explanation for this reading will be posted shortly. Please check back later!"}
                </p>

                {canEdit && (
                  <button
                    type="button"
                    onClick={handleOpenEdit}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#D4A373] hover:bg-[#c49262] text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95"
                  >
                    <Sparkles size={13} /> Set Video for Day {dayNumber}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Subtle Footer Note & Full Screen Quick Action */}
        {embedUrl && (
          <div className="px-3.5 py-2.5 sm:px-5 bg-black/40 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5 min-w-0 truncate text-[11px]">
              <Info size={12} className="text-[#D4A373] flex-shrink-0" />
              <span className="truncate">Audio and video stream directly from Google Drive</span>
            </span>
            
            <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-[#D4A373] hover:text-[#e2b484] hover:underline font-medium transition-colors"
                title="Open video in new tab / full screen"
              >
                <ExternalLink size={11} />
                <span>Tap to open full screen</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Super Admin Edit Modal */}
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
                  <h3 className="text-sm font-bold">Manage Explainer Video</h3>
                  <p className="text-xs text-gray-400">Day {dayNumber} of 365 Reading Plan</p>
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
                  Google Drive Video Link or Embed Code
                </label>
                <textarea
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  rows={3}
                  placeholder="Paste Google Drive share URL, preview link, or <iframe> embed code..."
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs font-mono focus:border-[#0F2C59] dark:focus:border-[#D4A373] focus:ring-1 focus:ring-[#0F2C59] outline-none transition-all resize-none"
                />
              </div>

              {/* Real-time Regex Parser Feedback */}
              {inputUrl.trim() && (
                <div className={`p-3 rounded-xl border text-xs ${
                  inputParsedId 
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200' 
                    : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                }`}>
                  {inputParsedId ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                        <span>Valid Google Drive File ID Detected</span>
                      </div>
                      <p className="font-mono text-[11px] opacity-90 truncate">
                        ID: {inputParsedId}
                      </p>
                      <p className="font-mono text-[10px] opacity-75 truncate">
                        Embed: {inputParsedEmbed}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-1.5">
                      <AlertCircle size={14} className="text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                      <span>Could not find a valid Google Drive File ID. Please verify the URL or share link.</span>
                    </div>
                  )}
                </div>
              )}

              {/* Live Preview Box */}
              {inputParsedEmbed && (
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Live Preview
                  </label>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black border border-gray-300 dark:border-gray-700">
                    <iframe
                      src={inputParsedEmbed}
                      title="Video Preview"
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Instructions Callout */}
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-xs flex items-start gap-2.5">
                <Info size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 leading-relaxed text-[11px]">
                  <p className="font-semibold">Important Drive Sharing Setting:</p>
                  <p>In Google Drive, ensure the file permission is set to <strong>&quot;Anyone with the link can view&quot;</strong> so church members can watch without login requests.</p>
                </div>
              </div>
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
                  <Trash2 size={14} /> Remove Video
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
                  disabled={isSaving || (inputUrl.trim().length > 0 && !inputParsedId)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#0F2C59] hover:bg-[#1A365D] dark:bg-[#D4A373] dark:hover:bg-[#c49262] text-white dark:text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  <span>{isSaving ? 'Saving...' : 'Save Video'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
