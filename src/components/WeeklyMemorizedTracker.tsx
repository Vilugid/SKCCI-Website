import React, { useState, useMemo } from 'react';
import { Sparkles, TrendingUp, Calendar, CheckCircle2, ChevronRight, Award, BarChart2 } from 'lucide-react';

export interface ServiceRecordForTracker {
  id: string;
  dateLabel: string;
  dateValue: string;
  messageTitle?: string;
  memorizedUserIds?: string[];
  memoryVerse?: {
    reference?: string;
    text?: string;
    translation?: string;
    memorizedUserIds?: string[];
  };
}

interface WeeklyMemorizedTrackerProps {
  records: ServiceRecordForTracker[];
  selectedRecordId: string | null;
  onSelectRecord: (recordId: string) => void;
  currentUserId?: string;
  fallbackVerseMemorizedCount?: number;
  fallbackVerseReference?: string;
  fallbackMemorizedUserIds?: string[];
}

export const WeeklyMemorizedTracker: React.FC<WeeklyMemorizedTrackerProps> = ({
  records,
  selectedRecordId,
  onSelectRecord,
  currentUserId,
  fallbackVerseReference,
  fallbackMemorizedUserIds = [],
}) => {
  const [viewCount, setViewCount] = useState<number>(8);
  const [hoveredRecordId, setHoveredRecordId] = useState<string | null>(null);

  // Compute stats and chronological order (oldest to newest for visual timeline)
  const timelineData = useMemo(() => {
    if (!records || records.length === 0) return [];

    // Sort chronologically ascending for the chart (left to right: earliest to latest)
    const sorted = [...records].sort((a, b) => {
      const valA = a.dateValue || a.id;
      const valB = b.dateValue || b.id;
      return valA.localeCompare(valB);
    });

    // Determine the latest record id for fallback inheritance
    const latestRecordId = records[0]?.id;

    return sorted.map((record, index) => {
      // Get memorized user IDs for this record
      let memorizedList: string[] = [];
      if (Array.isArray(record.memorizedUserIds) && record.memorizedUserIds.length > 0) {
        memorizedList = record.memorizedUserIds;
      } else if (Array.isArray(record.memoryVerse?.memorizedUserIds) && record.memoryVerse.memorizedUserIds.length > 0) {
        memorizedList = record.memoryVerse.memorizedUserIds;
      } else if (record.id === latestRecordId || record.id === '2026-08-23') {
        // Inherit global fallback if not set yet on this active record
        memorizedList = fallbackMemorizedUserIds;
      }

      const count = memorizedList.length;
      const userHasMemorized = Boolean(currentUserId && memorizedList.includes(currentUserId));

      // Parse friendly short date (e.g., "Aug 23")
      let shortDate = record.dateLabel || record.dateValue;
      if (shortDate.includes(',')) {
        // e.g. "Aug 23, 2026" -> "Aug 23"
        shortDate = shortDate.split(',')[0].trim();
      }

      const verseRef = record.memoryVerse?.reference || (record.id === latestRecordId ? fallbackVerseReference : '') || 'Memory Verse';

      return {
        id: record.id,
        dateLabel: record.dateLabel || record.dateValue,
        shortDate,
        verseRef,
        count,
        userHasMemorized,
        isSelected: record.id === selectedRecordId,
        index,
      };
    });
  }, [records, selectedRecordId, currentUserId, fallbackVerseReference, fallbackMemorizedUserIds]);

  // Sliced timeline according to viewCount (show the most recent N weeks)
  const displayItems = useMemo(() => {
    if (timelineData.length <= viewCount) return timelineData;
    return timelineData.slice(timelineData.length - viewCount);
  }, [timelineData, viewCount]);

  // Overall statistics
  const stats = useMemo(() => {
    if (timelineData.length === 0) {
      return { total: 0, average: 0, peak: 0, peakDate: '' };
    }
    let total = 0;
    let peak = 0;
    let peakDate = '';

    timelineData.forEach((item) => {
      total += item.count;
      if (item.count > peak) {
        peak = item.count;
        peakDate = item.shortDate;
      }
    });

    const average = (total / timelineData.length).toFixed(1);
    return { total, average, peak, peakDate };
  }, [timelineData]);

  // Scale calculations for bar height
  const maxCount = useMemo(() => {
    const highestInDisplay = Math.max(...displayItems.map((d) => d.count), 0);
    return Math.max(highestInDisplay, 4); // minimum ceiling of 4 for aesthetic height
  }, [displayItems]);

  const selectedItem = timelineData.find((item) => item.isSelected);

  if (timelineData.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-sky-50/50 via-white to-amber-50/30 rounded-2xl border border-sky-100/80 p-4 sm:p-5 shadow-xs transition-all">
      {/* Header & Metric Highlights */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#0F2C59] text-[#D4A373] flex items-center justify-center flex-shrink-0 shadow-xs">
            <BarChart2 size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#0F2C59] tracking-tight">
                Leaders Memorized per Service Date
              </h3>
              <span className="text-[11px] font-semibold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                Weekly Visual
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Track scripture memorization engagement across each week's service
            </p>
          </div>
        </div>

        {/* Quick Range Filter */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-gray-100/80 p-1 rounded-xl text-xs font-medium text-gray-600">
          <button
            type="button"
            onClick={() => setViewCount(6)}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              viewCount === 6 ? 'bg-white text-[#0F2C59] font-bold shadow-xs' : 'hover:text-gray-900'
            }`}
          >
            6 Wks
          </button>
          <button
            type="button"
            onClick={() => setViewCount(8)}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              viewCount === 8 ? 'bg-white text-[#0F2C59] font-bold shadow-xs' : 'hover:text-gray-900'
            }`}
          >
            8 Wks
          </button>
          <button
            type="button"
            onClick={() => setViewCount(timelineData.length)}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              viewCount >= timelineData.length ? 'bg-white text-[#0F2C59] font-bold shadow-xs' : 'hover:text-gray-900'
            }`}
          >
            All ({timelineData.length})
          </button>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3.5">
        <div className="bg-white/90 border border-gray-150 rounded-xl px-3 py-2">
          <span className="text-[11px] font-semibold text-gray-400 block uppercase tracking-wider">
            Selected Date
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-base font-extrabold text-[#0F2C59]">
              {selectedItem ? selectedItem.count : 0}
            </span>
            <span className="text-xs font-medium text-gray-600">
              {selectedItem?.count === 1 ? 'Leader' : 'Leaders'}
            </span>
          </div>
        </div>

        <div className="bg-white/90 border border-gray-150 rounded-xl px-3 py-2">
          <span className="text-[11px] font-semibold text-gray-400 block uppercase tracking-wider">
            Total All Weeks
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-base font-extrabold text-[#0F2C59]">
              {stats.total}
            </span>
            <span className="text-xs font-medium text-gray-600">Memorizations</span>
          </div>
        </div>

        <div className="bg-white/90 border border-gray-150 rounded-xl px-3 py-2">
          <span className="text-[11px] font-semibold text-gray-400 block uppercase tracking-wider">
            Weekly Average
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-base font-extrabold text-sky-700">
              {stats.average}
            </span>
            <span className="text-xs font-medium text-gray-600">Per Week</span>
          </div>
        </div>

        <div className="bg-white/90 border border-gray-150 rounded-xl px-3 py-2">
          <span className="text-[11px] font-semibold text-gray-400 block uppercase tracking-wider">
            Peak Week
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-base font-extrabold text-amber-600">
              {stats.peak}
            </span>
            <span className="text-xs font-medium text-gray-500 truncate">
              {stats.peakDate ? `(${stats.peakDate})` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Mini Visual Bar Chart */}
      <div className="relative pt-6 pb-2">
        <div className="flex items-end justify-between gap-2 sm:gap-3 h-36 sm:h-40 px-1">
          {displayItems.map((item) => {
            const heightPercent = Math.max(Math.round((item.count / maxCount) * 100), 12);
            const isHovered = hoveredRecordId === item.id;

            return (
              <div
                key={item.id}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                onClick={() => onSelectRecord(item.id)}
                onMouseEnter={() => setHoveredRecordId(item.id)}
                onMouseLeave={() => setHoveredRecordId(null)}
                title={`Click to view ${item.dateLabel}: ${item.count} leaders memorized "${item.verseRef}"`}
              >
                {/* Count and indicator above bar */}
                <div className="mb-1.5 flex flex-col items-center transition-transform group-hover:-translate-y-0.5">
                  {item.userHasMemorized && (
                    <span className="text-[10px] text-sky-600 font-extrabold leading-none mb-0.5">
                      ✓
                    </span>
                  )}
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded-md transition-colors ${
                      item.isSelected
                        ? 'bg-[#0F2C59] text-white shadow-xs'
                        : item.count > 0
                        ? 'bg-sky-100 text-sky-900 group-hover:bg-sky-200'
                        : 'text-gray-400'
                    }`}
                  >
                    {item.count}
                  </span>
                </div>

                {/* Vertical Bar */}
                <div className="w-full max-w-[42px] sm:max-w-[52px] h-full flex items-end justify-center">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-lg transition-all duration-300 relative ${
                      item.isSelected
                        ? 'bg-gradient-to-t from-[#0F2C59] to-[#1E4D8C] ring-2 ring-[#0F2C59] ring-offset-2 shadow-md'
                        : item.count > 0
                        ? 'bg-gradient-to-t from-sky-400 to-sky-300 group-hover:from-sky-500 group-hover:to-sky-400 shadow-xs'
                        : 'bg-gray-200 group-hover:bg-gray-300'
                    }`}
                  >
                    {/* Selected Badge highlight inside bar */}
                    {item.isSelected && (
                      <div className="absolute inset-x-0 top-1 flex justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Date Label below bar */}
                <div className="mt-2 text-center w-full">
                  <span
                    className={`block text-[11px] sm:text-xs font-bold leading-tight truncate transition-colors ${
                      item.isSelected
                        ? 'text-[#C82323] underline decoration-[#C82323] decoration-2 underline-offset-2'
                        : 'text-gray-700 group-hover:text-[#0F2C59]'
                    }`}
                  >
                    {item.shortDate}
                  </span>
                  <span className="block text-[9px] sm:text-[10px] text-gray-600 truncate max-w-[55px] sm:max-w-[70px] mx-auto">
                    {item.verseRef}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Marker Banner */}
        {selectedItem && (
          <div className="mt-2 pt-2 border-t border-gray-150/70 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-gray-700">
              <span className="inline-block w-2 h-2 rounded-full bg-[#C82323]" />
              <span className="font-semibold text-gray-900">{selectedItem.dateLabel}</span>
              <span className="text-gray-600">—</span>
              <span className="text-gray-600 font-medium">"{selectedItem.verseRef}"</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 font-semibold text-sky-900 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md text-[11px]">
                <span>🧠</span> {selectedItem.count} {selectedItem.count === 1 ? 'Leader Memorized' : 'Leaders Memorized'}
              </span>
              {selectedItem.userHasMemorized && (
                <span className="inline-flex items-center text-[10px] font-bold text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded-md">
                  ✓ You Memorized
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
