import React from 'react';
import { LessonData } from '../lessonsData';
import { PrintScope } from '../utils/manualPdfExport';
import {
  ManualLanguage,
  MANUAL_UI_TEXT,
  getCategoryLabel,
} from '../utils/manualTranslation';

export interface PrintPayload {
  lessons: LessonData[];
  scope: PrintScope;
  sectionCategory?: string;
  language: ManualLanguage;
  largePrint: boolean;
  includeWritingLines: boolean;
}

interface ManualPrintDocumentProps {
  payload: PrintPayload | null;
}

export default function ManualPrintDocument({ payload }: ManualPrintDocumentProps) {
  if (!payload || payload.lessons.length === 0) return null;

  const { lessons, scope, sectionCategory, language, largePrint, includeWritingLines } = payload;
  const ui = MANUAL_UI_TEXT[language];
  const hasCover = scope === 'section' || scope === 'all';
  const categoriesInOrder = Array.from(new Set(lessons.map((l) => l.category)));

  const bodyTextClass = largePrint ? 'text-[14pt] leading-[1.7]' : 'text-[11pt] leading-[1.6]';
  const headingTextClass = largePrint ? 'text-[17pt]' : 'text-[14pt]';
  const lessonTitleClass = largePrint ? 'text-[24pt]' : 'text-[20pt]';
  const quoteTextClass = largePrint ? 'text-[14.5pt] leading-[1.65]' : 'text-[12pt] leading-[1.6]';

  let lastCategory = '';

  return (
    <div id="manuals-print-root" className="hidden print:block bg-white text-gray-900 font-sans">
      {/* Cover Page & Table of Contents for Section or Complete Manual */}
      {hasCover && (
        <>
          <section className="min-h-[245mm] flex flex-col items-center justify-between text-center border-2 border-[#B48246] p-10">
            <div className="pt-10 flex flex-col items-center">
              <img
                src="/churchlogo2.png"
                alt={ui.churchName}
                className="h-20 w-auto object-contain mb-6"
              />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#B91C1C] mb-1">
                {ui.churchName}
              </p>
              <p className="text-sm italic text-gray-500">"{ui.churchMotto}"</p>
            </div>

            <div className="my-auto py-8 max-w-xl">
              <div className="w-24 h-0.5 bg-[#B48246] mx-auto mb-8" />
              <h1 className="font-serif font-extrabold text-4xl text-[#0F2C59] leading-tight mb-4">
                {scope === 'section' && sectionCategory
                  ? `${getCategoryLabel(sectionCategory, language)} ${ui.manualsSuffix}`
                  : ui.discipleshipManualsTitle}
              </h1>
              <p className="text-base text-gray-700 font-medium">
                {scope === 'all'
                  ? `${getCategoryLabel('Evangelism', language)}  •  ${getCategoryLabel('Consolidation', language)}  •  ${getCategoryLabel('Envisioning', language)}`
                  : ui.printModal.lessonsCount(lessons.length)}
              </p>
              {largePrint && (
                <p className="mt-4 inline-block px-4 py-1 border border-[#B91C1C] text-[#B91C1C] text-xs font-bold tracking-widest uppercase">
                  {language === 'fil' ? 'Malaking Letra na Edisyon' : 'Large Print Edition'}
                </p>
              )}
              <div className="w-24 h-0.5 bg-[#B48246] mx-auto mt-8" />
            </div>

            <div className="pb-4 text-xs text-gray-500 space-y-1">
              <p>2nd Floor 158 Mañalac Avenue, Bagong Tanyag, Taguig City</p>
              <p>
                {language === 'fil'
                  ? 'Para sa Pag-aaral ng Salita ng DIYOS at Cell Group'
                  : 'For Personal Discipleship & Cell Group Study'}
              </p>
            </div>
          </section>

          {/* Table of Contents */}
          <section className="print-page-break pt-4">
            <h2 className="font-serif font-bold text-2xl text-[#0F2C59] pb-2 border-b-2 border-[#B48246] mb-6">
              {ui.tableOfContents}
            </h2>
            <div className="space-y-6">
              {categoriesInOrder.map((cat) => {
                const catLessons = lessons.filter((l) => l.category === cat);
                return (
                  <div key={cat} className="print-avoid-break">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#B91C1C] mb-2">
                      {getCategoryLabel(cat, language)} {ui.manualsSuffix}
                    </h3>
                    <ul className={`space-y-1.5 pl-4 ${largePrint ? 'text-[12.5pt]' : 'text-[10.5pt]'}`}>
                      {catLessons.map((item) => (
                        <li key={item.id} className="text-gray-800">
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* Lesson Pages */}
      {lessons.map((lesson, lessonIdx) => {
        const showDivider = scope === 'all' && lesson.category !== lastCategory;
        lastCategory = lesson.category;
        const needsPageBreakBeforeLesson = hasCover || lessonIdx > 0;

        return (
          <React.Fragment key={lesson.id}>
            {showDivider && (
              <section className="print-page-break min-h-[235mm] flex flex-col items-center justify-center text-center">
                <div className="w-24 h-0.5 bg-[#B48246] mb-6" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B91C1C] mb-3">
                  {ui.churchName}
                </p>
                <h2 className="font-serif font-extrabold text-3xl text-[#0F2C59] mb-2">
                  {getCategoryLabel(lesson.category, language)} {ui.manualsSuffix}
                </h2>
                <p className="text-sm text-gray-500">
                  {ui.printModal.lessonsCount(
                    lessons.filter((l) => l.category === lesson.category).length
                  )}
                </p>
                <div className="w-24 h-0.5 bg-[#B48246] mt-6" />
              </section>
            )}

            <article className={needsPageBreakBeforeLesson ? 'print-page-break' : ''}>
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-5">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/churchlogo2.png"
                    alt={ui.churchName}
                    className="h-7 w-auto object-contain"
                  />
                  <span className="text-[9pt] font-bold uppercase tracking-wider text-gray-500">
                    {ui.churchName}
                  </span>
                </div>
                <span className="text-[9pt] font-bold uppercase tracking-wider text-[#B91C1C]">
                  {getCategoryLabel(lesson.category, language)} &bull; {lesson.readingTime}
                </span>
              </div>

              {/* Lesson Title */}
              <h1 className={`font-serif font-extrabold text-[#0F2C59] leading-tight mb-5 ${lessonTitleClass}`}>
                {lesson.title}
              </h1>

              {/* Scripture Focus */}
              <div className="print-avoid-break border-l-4 border-[#B48246] bg-[#FAF8F5] px-5 py-4 rounded-r-lg mb-6">
                <p className="text-[9pt] font-bold uppercase tracking-widest text-[#B91C1C] mb-2">
                  {ui.scriptureFocus}
                </p>
                <p className={`font-serif italic text-gray-900 whitespace-pre-line mb-2 ${quoteTextClass}`}>
                  "{lesson.scriptureFocus.text}"
                </p>
                <p className="text-[10.5pt] font-bold text-[#B91C1C]">
                  — {lesson.scriptureFocus.reference}
                </p>
              </div>

              {/* Objectives */}
              <div className="print-avoid-break border border-gray-200 rounded-lg p-4 mb-6">
                <h2 className={`font-serif font-bold text-[#0F2C59] mb-2.5 ${headingTextClass}`}>
                  {ui.lessonObjectives}
                </h2>
                <ol className={`list-decimal pl-5 space-y-1.5 text-gray-800 ${bodyTextClass}`}>
                  {lesson.objectives.map((obj, idx) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ol>
              </div>

              {/* Main Teaching */}
              <div className="space-y-5 mb-6">
                {lesson.teachingSections.map((sec) => (
                  <section key={sec.id} className="pt-2 border-t border-gray-200">
                    <h2 className={`font-serif font-bold text-[#0F2C59] mb-2 ${headingTextClass}`}>
                      {sec.number > 0 ? `${sec.number}. ${sec.title}` : sec.title}
                    </h2>
                    <div className={`space-y-2.5 text-gray-800 ${bodyTextClass}`}>
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="whitespace-pre-line">
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* Reflection Questions */}
              <section className="pt-3 border-t-2 border-[#B48246] mb-6">
                <h2 className={`font-serif font-bold text-[#0F2C59] mb-3 ${headingTextClass}`}>
                  {ui.reflectionQuestions}
                </h2>
                <ol className={`space-y-4 ${bodyTextClass}`}>
                  {lesson.reflectionQuestions.map((q, qIdx) => (
                    <li key={qIdx} className="print-avoid-break">
                      <p className="font-semibold text-gray-900 mb-2">
                        {qIdx + 1}. {q}
                      </p>
                      {includeWritingLines && (
                        <div className="space-y-6 pt-3 pb-1">
                          <div className="border-b border-gray-300" />
                          <div className="border-b border-gray-300" />
                          <div className="border-b border-gray-300" />
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </section>

              {/* Prayer & Weekly Challenge */}
              <section className="print-avoid-break border border-[#B48246] bg-[#FAF8F5] rounded-xl p-5">
                <h2 className={`font-serif font-bold text-[#B91C1C] mb-2 ${headingTextClass}`}>
                  {ui.prayerAndApplication}
                </h2>
                <p className={`font-serif italic text-gray-800 mb-4 ${bodyTextClass}`}>
                  "{lesson.prayer}"
                </p>
                <div className="border-t border-[#B48246]/40 pt-3">
                  <h3 className="text-[9.5pt] font-bold uppercase tracking-widest text-[#B91C1C] mb-1">
                    {ui.weeklyChallenge}
                  </h3>
                  <p className={`text-gray-800 ${bodyTextClass}`}>{lesson.challenge}</p>
                </div>
              </section>
            </article>
          </React.Fragment>
        );
      })}
    </div>
  );
}
