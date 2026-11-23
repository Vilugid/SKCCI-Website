import { jsPDF } from 'jspdf';
import { LessonData } from '../lessonsData';
import {
  ManualLanguage,
  MANUAL_UI_TEXT,
  getCategoryLabel,
} from './manualTranslation';

export type PrintScope = 'lesson' | 'section' | 'all';

export interface ManualPdfOptions {
  lessons: LessonData[];
  scope: PrintScope;
  sectionCategory?: string;
  language: ManualLanguage;
  largePrint: boolean;
  includeWritingLines: boolean;
}

// Safely normalize text to WinAnsi-compatible characters for jsPDF built-in fonts
function cleanPdfText(input: string): string {
  if (!input) return '';
  return input
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/\u2014/g, ' - ')
    .replace(/\u2013/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/\u00A0/g, ' ')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, '');
}

async function loadLogoAsDataUrl(): Promise<{ dataUrl: string; aspect: number } | null> {
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Logo load failed'));
      img.src = '/churchlogo2.png';
    });
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || 400;
    canvas.height = img.naturalHeight || 120;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0);
    return {
      dataUrl: canvas.toDataURL('image/png'),
      aspect: canvas.width / canvas.height,
    };
  } catch {
    return null;
  }
}

export async function generateManualPdf(options: ManualPdfOptions): Promise<string> {
  const { lessons, scope, sectionCategory, language, largePrint, includeWritingLines } = options;
  const ui = MANUAL_UI_TEXT[language];

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = largePrint ? 16 : 18;
  const marginTop = 18;
  const marginBottom = 18;
  const contentWidth = pageWidth - marginX * 2;

  // Brand colors (ink-conscious print palette)
  const NAVY: [number, number, number] = [15, 44, 89];
  const CRIMSON: [number, number, number] = [185, 28, 28];
  const GOLD: [number, number, number] = [180, 130, 70];
  const CHARCOAL: [number, number, number] = [31, 41, 55];
  const MUTED: [number, number, number] = [100, 116, 139];
  const LIGHT_BG: [number, number, number] = [250, 248, 245];
  const BORDER_GRAY: [number, number, number] = [215, 220, 226];

  // Typography sizing for Standard vs Elderly-Friendly Large Print
  const bodySize = largePrint ? 13 : 10.5;
  const bodyLineHeight = largePrint ? 6.6 : 5.3;
  const sectionTitleSize = largePrint ? 15.5 : 13;
  const lessonTitleSize = largePrint ? 21 : 18;
  const quoteSize = largePrint ? 13.5 : 11.5;

  const logo = await loadLogoAsDataUrl();
  let y = marginTop;

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > pageHeight - marginBottom) {
      doc.addPage();
      y = marginTop;
    }
  };

  const drawWrappedText = (
    text: string,
    x: number,
    maxWidth: number,
    fontSize: number,
    lineHeight: number,
    color: [number, number, number] = CHARCOAL,
    fontStyle: 'normal' | 'bold' | 'italic' | 'bolditalic' = 'normal',
    fontFamily: 'helvetica' | 'times' = 'helvetica'
  ) => {
    doc.setFont(fontFamily, fontStyle);
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    const paragraphs = cleanPdfText(text).split('\n');
    for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
      const para = paragraphs[pIdx].trim();
      if (!para) {
        y += lineHeight * 0.5;
        continue;
      }
      const lines = doc.splitTextToSize(para, maxWidth);
      for (const line of lines) {
        ensureSpace(lineHeight + 1);
        doc.text(line, x, y);
        y += lineHeight;
      }
      if (pIdx < paragraphs.length - 1) {
        y += lineHeight * 0.35;
      }
    }
  };

  const drawCoverPage = () => {
    // Clean decorative frame
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.7);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24);
    doc.setDrawColor(...NAVY);
    doc.setLineWidth(0.3);
    doc.rect(14.5, 14.5, pageWidth - 29, pageHeight - 29);

    let coverY = 48;
    if (logo) {
      const logoH = 22;
      const logoW = Math.min(95, logoH * logo.aspect);
      doc.addImage(logo.dataUrl, 'PNG', (pageWidth - logoW) / 2, coverY, logoW, logoH);
      coverY += logoH + 14;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...CRIMSON);
    doc.text(cleanPdfText(ui.churchName.toUpperCase()), pageWidth / 2, coverY, { align: 'center' });
    coverY += 7;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10.5);
    doc.setTextColor(...MUTED);
    doc.text(cleanPdfText(`"${ui.churchMotto}"`), pageWidth / 2, coverY, { align: 'center' });
    coverY += 24;

    // Accent rule
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(1);
    doc.line(pageWidth / 2 - 28, coverY, pageWidth / 2 + 28, coverY);
    coverY += 18;

    const mainTitle =
      scope === 'section' && sectionCategory
        ? `${getCategoryLabel(sectionCategory, language)} ${ui.manualsSuffix}`
        : ui.discipleshipManualsTitle;

    doc.setFont('times', 'bold');
    doc.setFontSize(largePrint ? 30 : 28);
    doc.setTextColor(...NAVY);
    const titleLines = doc.splitTextToSize(cleanPdfText(mainTitle), contentWidth - 16);
    for (const line of titleLines) {
      doc.text(line, pageWidth / 2, coverY, { align: 'center' });
      coverY += 12;
    }

    coverY += 6;
    const editionSub =
      scope === 'all'
        ? `${getCategoryLabel('Evangelism', language)}  |  ${getCategoryLabel('Consolidation', language)}  |  ${getCategoryLabel('Envisioning', language)}`
        : `${ui.printModal.lessonsCount(lessons.length)}`;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...CHARCOAL);
    doc.text(cleanPdfText(editionSub), pageWidth / 2, coverY, { align: 'center' });

    if (largePrint) {
      coverY += 12;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...CRIMSON);
      doc.text(
        cleanPdfText(language === 'fil' ? 'MALAKING LETRA NA EDISYON' : 'LARGE PRINT EDITION'),
        pageWidth / 2,
        coverY,
        { align: 'center' }
      );
    }

    // Footer church address
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...MUTED);
    doc.text(
      '2nd Floor 158 Manalac Avenue, Bagong Tanyag, Taguig City',
      pageWidth / 2,
      pageHeight - 30,
      { align: 'center' }
    );
    doc.text(
      cleanPdfText(language === 'fil' ? 'Para sa Pag-aaral ng Salita ng DIYOS at Cell Group' : 'For Personal Discipleship & Cell Group Study'),
      pageWidth / 2,
      pageHeight - 24,
      { align: 'center' }
    );

    // Table of Contents page
    doc.addPage();
    y = marginTop + 4;
    doc.setFont('times', 'bold');
    doc.setFontSize(largePrint ? 20 : 18);
    doc.setTextColor(...NAVY);
    doc.text(cleanPdfText(ui.tableOfContents), marginX, y);
    y += 4;
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.7);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 9;

    const categoriesInOrder = Array.from(new Set(lessons.map((l) => l.category)));
    for (const cat of categoriesInOrder) {
      const catLessons = lessons.filter((l) => l.category === cat);
      ensureSpace(14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(largePrint ? 12.5 : 11);
      doc.setTextColor(...CRIMSON);
      doc.text(cleanPdfText(`${getCategoryLabel(cat, language)} ${ui.manualsSuffix}`.toUpperCase()), marginX, y);
      y += 6.5;

      for (const item of catLessons) {
        ensureSpace(7.5);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(largePrint ? 11.5 : 10);
        doc.setTextColor(...CHARCOAL);
        const tocLines = doc.splitTextToSize(cleanPdfText(item.title), contentWidth - 6);
        for (const tLine of tocLines) {
          ensureSpace(6);
          doc.text(tLine, marginX + 4, y);
          y += largePrint ? 5.8 : 4.9;
        }
        y += 1.2;
      }
      y += 5;
    }
  };

  const drawLesson = (lesson: LessonData, isFirstPage: boolean) => {
    if (!isFirstPage) {
      doc.addPage();
    }
    y = marginTop;

    // Compact church branding bar at top of each lesson
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    doc.text(cleanPdfText(ui.churchName.toUpperCase()), marginX, y);
    doc.setTextColor(...CRIMSON);
    doc.text(
      cleanPdfText(`${getCategoryLabel(lesson.category, language).toUpperCase()}  |  ${lesson.readingTime}`),
      pageWidth - marginX,
      y,
      { align: 'right' }
    );
    y += 3;
    doc.setDrawColor(...BORDER_GRAY);
    doc.setLineWidth(0.35);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 9;

    // Lesson Title
    drawWrappedText(
      lesson.title,
      marginX,
      contentWidth,
      lessonTitleSize,
      largePrint ? 9 : 7.8,
      NAVY,
      'bold',
      'times'
    );
    y += 3;

    // Scripture Focus Callout Box
    const scriptureTextLines = doc.splitTextToSize(
      cleanPdfText(`"${lesson.scriptureFocus.text}"`),
      contentWidth - 12
    );
    const scriptureRefText = cleanPdfText(`- ${lesson.scriptureFocus.reference}`);
    const scriptureLineH = largePrint ? 6.5 : 5.4;
    const boxHeight = 10 + scriptureTextLines.length * scriptureLineH + 9;

    ensureSpace(boxHeight + 4);
    doc.setFillColor(...LIGHT_BG);
    doc.roundedRect(marginX, y, contentWidth, boxHeight, 2, 2, 'F');
    doc.setFillColor(...GOLD);
    doc.rect(marginX, y, 2.2, boxHeight, 'F');

    let boxY = y + 6.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...CRIMSON);
    doc.text(cleanPdfText(ui.scriptureFocus.toUpperCase()), marginX + 6, boxY);
    boxY += 6;

    doc.setFont('times', 'italic');
    doc.setFontSize(quoteSize);
    doc.setTextColor(...CHARCOAL);
    for (const sLine of scriptureTextLines) {
      doc.text(sLine, marginX + 6, boxY);
      boxY += scriptureLineH;
    }
    boxY += 1.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(largePrint ? 10.5 : 9.5);
    doc.setTextColor(...CRIMSON);
    doc.text(scriptureRefText, marginX + 6, boxY);

    y += boxHeight + 8;

    // Lesson Objectives
    ensureSpace(16);
    doc.setFont('times', 'bold');
    doc.setFontSize(sectionTitleSize);
    doc.setTextColor(...NAVY);
    doc.text(cleanPdfText(ui.lessonObjectives), marginX, y);
    y += 2.5;
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.5);
    doc.line(marginX, y, marginX + 42, y);
    y += 6;

    lesson.objectives.forEach((obj, idx) => {
      const bulletPrefix = `${idx + 1}. `;
      const wrapped = doc.splitTextToSize(cleanPdfText(`${bulletPrefix}${obj}`), contentWidth - 4);
      ensureSpace(wrapped.length * bodyLineHeight + 2);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(bodySize);
      doc.setTextColor(...CHARCOAL);
      for (const line of wrapped) {
        doc.text(line, marginX + 2, y);
        y += bodyLineHeight;
      }
      y += 1.8;
    });
    y += 4;

    // Teaching Sections
    for (const sec of lesson.teachingSections) {
      ensureSpace(22);
      const secHeader =
        sec.number > 0 ? `${sec.number}. ${sec.title}` : sec.title;

      // Subtle section heading bar
      doc.setDrawColor(...BORDER_GRAY);
      doc.setLineWidth(0.3);
      doc.line(marginX, y - 3.5, pageWidth - marginX, y - 3.5);
      y += 2;

      drawWrappedText(
        secHeader,
        marginX,
        contentWidth,
        sectionTitleSize,
        largePrint ? 7.2 : 6.2,
        NAVY,
        'bold',
        'times'
      );
      y += 1.5;

      for (const para of sec.paragraphs) {
        const isKeyTruth = /^(Key Truth|Mahalagang Katotohanan|Application|Aplikasyon|Pastoral note|Paalala)/i.test(
          para.trim()
        );
        drawWrappedText(
          para,
          marginX,
          contentWidth,
          bodySize,
          bodyLineHeight,
          isKeyTruth ? NAVY : CHARCOAL,
          isKeyTruth ? 'bold' : 'normal',
          'helvetica'
        );
        y += 2.5;
      }
      y += 3.5;
    }

    // Reflection Questions (with optional pen-and-paper writing lines!)
    ensureSpace(24);
    doc.setFont('times', 'bold');
    doc.setFontSize(sectionTitleSize);
    doc.setTextColor(...NAVY);
    doc.text(cleanPdfText(ui.reflectionQuestions), marginX, y);
    y += 2.5;
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.5);
    doc.line(marginX, y, marginX + 50, y);
    y += 6.5;

    lesson.reflectionQuestions.forEach((q, idx) => {
      const linesNeeded = includeWritingLines ? 3 : 0;
      const qWrapped = doc.splitTextToSize(cleanPdfText(`${idx + 1}. ${q}`), contentWidth);
      const blockEstimate = qWrapped.length * bodyLineHeight + linesNeeded * 7.5 + 5;
      ensureSpace(Math.min(blockEstimate, 45));

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(bodySize);
      doc.setTextColor(...CHARCOAL);
      for (const qLine of qWrapped) {
        ensureSpace(bodyLineHeight + 1);
        doc.text(qLine, marginX, y);
        y += bodyLineHeight;
      }

      if (includeWritingLines) {
        y += 2.5;
        doc.setDrawColor(190, 198, 208);
        doc.setLineWidth(0.25);
        for (let lineIdx = 0; lineIdx < 3; lineIdx++) {
          ensureSpace(8);
          y += 6.8;
          doc.line(marginX + 3, y, pageWidth - marginX, y);
        }
      }
      y += 4.5;
    });

    y += 3;

    // Prayer & Weekly Challenge Box
    const prayerLines = doc.splitTextToSize(cleanPdfText(`"${lesson.prayer}"`), contentWidth - 12);
    const challengeLines = doc.splitTextToSize(cleanPdfText(lesson.challenge), contentWidth - 12);
    const prayerBoxH =
      14 +
      prayerLines.length * bodyLineHeight +
      10 +
      challengeLines.length * bodyLineHeight +
      10;

    if (prayerBoxH < pageHeight - marginTop - marginBottom) {
      ensureSpace(prayerBoxH + 4);
      doc.setFillColor(...LIGHT_BG);
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(0.45);
      doc.roundedRect(marginX, y, contentWidth, prayerBoxH, 2.5, 2.5, 'FD');

      y += 7.5;
      doc.setFont('times', 'bold');
      doc.setFontSize(sectionTitleSize);
      doc.setTextColor(...CRIMSON);
      doc.text(cleanPdfText(ui.prayerAndApplication), marginX + 6, y);
      y += 6.5;

      doc.setFont('times', 'italic');
      doc.setFontSize(bodySize);
      doc.setTextColor(...CHARCOAL);
      for (const pLine of prayerLines) {
        doc.text(pLine, marginX + 6, y);
        y += bodyLineHeight;
      }

      y += 5;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...CRIMSON);
      doc.text(cleanPdfText(ui.weeklyChallenge.toUpperCase()), marginX + 6, y);
      y += 5.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(bodySize);
      doc.setTextColor(...CHARCOAL);
      for (const cLine of challengeLines) {
        doc.text(cLine, marginX + 6, y);
        y += bodyLineHeight;
      }
    } else {
      // Fallback for unusually long prayers on large print
      ensureSpace(20);
      doc.setFont('times', 'bold');
      doc.setFontSize(sectionTitleSize);
      doc.setTextColor(...CRIMSON);
      doc.text(cleanPdfText(ui.prayerAndApplication), marginX, y);
      y += 6.5;
      drawWrappedText(`"${lesson.prayer}"`, marginX, contentWidth, bodySize, bodyLineHeight, CHARCOAL, 'italic', 'times');
      y += 4;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...CRIMSON);
      doc.text(cleanPdfText(ui.weeklyChallenge.toUpperCase()), marginX, y);
      y += 5.5;
      drawWrappedText(lesson.challenge, marginX, contentWidth, bodySize, bodyLineHeight, CHARCOAL, 'normal', 'helvetica');
    }
  };

  // Build document pages
  if (scope === 'section' || scope === 'all') {
    drawCoverPage();
    let prevCategory = '';
    lessons.forEach((lesson) => {
      if (scope === 'all' && lesson.category !== prevCategory) {
        prevCategory = lesson.category;
        doc.addPage();
        // Clean Section Divider Page
        const midY = pageHeight / 2 - 14;
        doc.setDrawColor(...GOLD);
        doc.setLineWidth(0.8);
        doc.line(pageWidth / 2 - 30, midY - 12, pageWidth / 2 + 30, midY - 12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...CRIMSON);
        doc.text(cleanPdfText(ui.churchName.toUpperCase()), pageWidth / 2, midY - 2, { align: 'center' });
        doc.setFont('times', 'bold');
        doc.setFontSize(26);
        doc.setTextColor(...NAVY);
        doc.text(
          cleanPdfText(`${getCategoryLabel(lesson.category, language)} ${ui.manualsSuffix}`),
          pageWidth / 2,
          midY + 12,
          { align: 'center' }
        );
        const count = lessons.filter((l) => l.category === lesson.category).length;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11.5);
        doc.setTextColor(...MUTED);
        doc.text(cleanPdfText(ui.printModal.lessonsCount(count)), pageWidth / 2, midY + 23, { align: 'center' });
        doc.line(pageWidth / 2 - 30, midY + 32, pageWidth / 2 + 30, midY + 32);
      }
      drawLesson(lesson, false);
    });
  } else if (lessons.length > 0) {
    drawLesson(lessons[0], true);
  }

  // Add subtle page numbers on every page (skip cover page #1 for section/all)
  const totalPages = doc.getNumberOfPages();
  const startPageForFooter = scope === 'lesson' ? 1 : 2;
  for (let p = startPageForFooter; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(...BORDER_GRAY);
    doc.setLineWidth(0.25);
    doc.line(marginX, pageHeight - 13, pageWidth - marginX, pageHeight - 13);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    doc.text(cleanPdfText('SKCCI Discipleship Manuals'), marginX, pageHeight - 8.5);
    doc.text(cleanPdfText(ui.pageOf(p, totalPages)), pageWidth - marginX, pageHeight - 8.5, {
      align: 'right',
    });
  }

  // Generate clean filename
  const langTag = language === 'fil' ? 'Tagalog' : 'English';
  const sizeTag = largePrint ? '-LargePrint' : '';
  let fileName = `SKCCI-Manual-${langTag}${sizeTag}.pdf`;
  if (scope === 'lesson' && lessons[0]) {
    const safeId = lessons[0].id.replace(/[^a-z0-9-_]/gi, '-');
    fileName = `SKCCI-${safeId}-${langTag}${sizeTag}.pdf`;
  } else if (scope === 'section' && sectionCategory) {
    fileName = `SKCCI-${sectionCategory}-Manuals-${langTag}${sizeTag}.pdf`;
  } else if (scope === 'all') {
    fileName = `SKCCI-Complete-Discipleship-Manuals-${langTag}${sizeTag}.pdf`;
  }

  doc.save(fileName);
  return fileName;
}
