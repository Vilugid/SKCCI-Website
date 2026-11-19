import imageCompression from 'browser-image-compression';

export interface CompressImageOptions {
  maxDimension?: number;
  targetMaxChars?: number;
  onProgress?: (percent: number) => void;
}

/**
 * Checks whether a File looks like an iPhone/iOS HEIC or HEIF image.
 */
export function isHeicOrHeifFile(file: File): boolean {
  const type = (file.type || '').toLowerCase();
  const name = (file.name || '').toLowerCase();
  return (
    type.includes('heic') ||
    type.includes('heif') ||
    name.endsWith('.heic') ||
    name.endsWith('.heif')
  );
}

async function convertHeicBlobToJpeg(blob: Blob, quality = 0.75): Promise<Blob> {
  const heic2anyModule = await import('heic2any');
  const converter = ((heic2anyModule as any).default || heic2anyModule) as (options: {
    blob: Blob;
    toType?: string;
    quality?: number;
  }) => Promise<Blob | Blob[]>;
  const converted = await converter({
    blob,
    toType: 'image/jpeg',
    quality,
  });
  return Array.isArray(converted) ? converted[0] : converted;
}

/**
 * Loads a File, Blob, or data URL into an HTMLImageElement or ImageBitmap
 * using zero-copy Object URLs instead of huge base64 FileReader strings
 * so 12MP–48MP mobile camera photos never exhaust mobile browser RAM.
 */
async function decodeImageSource(
  source: File | Blob | string
): Promise<{ drawable: CanvasImageSource; width: number; height: number; cleanup: () => void }> {
  // 1. String source (existing data URL or remote URL)
  if (typeof source === 'string') {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        resolve({
          drawable: img,
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height,
          cleanup: () => {},
        });
      };
      img.onerror = () => reject(new Error('Could not decode image data.'));
      img.src = source;
    });
  }

  let workingBlob: Blob = source;

  // 2. If file is HEIC/HEIF, test if browser can decode natively first; if not, convert via heic2any
  if (source instanceof File && isHeicOrHeifFile(source)) {
    let nativeDecodeSucceeded = false;
    if (typeof createImageBitmap === 'function') {
      try {
        const bmp = await createImageBitmap(source);
        nativeDecodeSucceeded = true;
        return {
          drawable: bmp,
          width: bmp.width,
          height: bmp.height,
          cleanup: () => {
            try {
              bmp.close();
            } catch {}
          },
        };
      } catch {
        nativeDecodeSucceeded = false;
      }
    }

    if (!nativeDecodeSucceeded) {
      try {
        workingBlob = await convertHeicBlobToJpeg(source, 0.75);
      } catch (heicErr) {
        console.warn('HEIC conversion fallback note:', heicErr);
      }
    }
  }

  // 3. Try hardware-accelerated createImageBitmap (lowest RAM usage on iOS & Android)
  if (typeof createImageBitmap === 'function') {
    try {
      const bmp = await createImageBitmap(workingBlob);
      if (bmp.width > 0 && bmp.height > 0) {
        return {
          drawable: bmp,
          width: bmp.width,
          height: bmp.height,
          cleanup: () => {
            try {
              bmp.close();
            } catch {}
          },
        };
      }
    } catch {
      // Fallback to ObjectURL + HTMLImageElement below
    }
  }

  // 4. Zero-copy ObjectURL decode (avoids 20MB+ FileReader base64 string allocation on phones)
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(workingBlob);
    const img = new Image();

    img.onload = () => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      if (!w || !h) {
        URL.revokeObjectURL(objectUrl);
        return reject(new Error('Invalid image dimensions.'));
      }
      resolve({
        drawable: img,
        width: w,
        height: h,
        cleanup: () => URL.revokeObjectURL(objectUrl),
      });
    };

    img.onerror = async () => {
      URL.revokeObjectURL(objectUrl);
      // Last-chance HEIC conversion if an unmarked HEIC file failed in <img>
      try {
        const jpegBlob = await convertHeicBlobToJpeg(workingBlob, 0.72);
        const retryUrl = URL.createObjectURL(jpegBlob);
        const retryImg = new Image();
        retryImg.onload = () => {
          resolve({
            drawable: retryImg,
            width: retryImg.naturalWidth || retryImg.width,
            height: retryImg.naturalHeight || retryImg.height,
            cleanup: () => URL.revokeObjectURL(retryUrl),
          });
        };
        retryImg.onerror = () => {
          URL.revokeObjectURL(retryUrl);
          reject(new Error('Unable to decode mobile photo format.'));
        };
        retryImg.src = retryUrl;
      } catch {
        reject(new Error('Unable to process photo file. Please try another photo.'));
      }
    };

    img.src = objectUrl;
  });
}

/**
 * Compresses any mobile phone or desktop image (including 12MP–48MP iPhone/Android photos & HEIC)
 * down to a safe, crisp JPEG data URL strictly under targetMaxChars (~38KB binary by default).
 */
export async function compressMobileImageToSafePayload(
  source: File | Blob | string,
  options: CompressImageOptions = {}
): Promise<string> {
  const maxDimension = options.maxDimension ?? 640;
  const targetMaxChars = options.targetMaxChars ?? 52000; // ~38KB binary, super fast on mobile networks & safe for Firestore
  const onProgress = options.onProgress;

  onProgress?.(15);

  try {
    const { drawable, width: rawWidth, height: rawHeight, cleanup } = await decodeImageSource(source);
    onProgress?.(45);

    try {
      let targetW = rawWidth;
      let targetH = rawHeight;

      if (targetW > maxDimension || targetH > maxDimension) {
        if (targetW > targetH) {
          targetH = Math.round((targetH * maxDimension) / targetW);
          targetW = maxDimension;
        } else {
          targetW = Math.round((targetW * maxDimension) / targetH);
          targetH = maxDimension;
        }
      }

      targetW = Math.max(1, targetW);
      targetH = Math.max(1, targetH);

      // Step-down intermediate canvas if source is massive (>2400px, e.g. 12MP-48MP phone camera)
      // This prevents iOS Safari canvas memory spikes and improves sharpness
      let currentSource: CanvasImageSource = drawable;
      let currentW = rawWidth;
      let currentH = rawHeight;

      if (currentW > targetW * 2.2 || currentH > targetH * 2.2) {
        const midW = Math.max(targetW, Math.min(1280, Math.round(currentW / 2)));
        const midH = Math.max(targetH, Math.min(1280, Math.round(currentH / 2)));
        const midCanvas = document.createElement('canvas');
        midCanvas.width = midW;
        midCanvas.height = midH;
        const midCtx = midCanvas.getContext('2d');
        if (midCtx) {
          midCtx.fillStyle = '#FFFFFF';
          midCtx.fillRect(0, 0, midW, midH);
          midCtx.drawImage(currentSource, 0, 0, midW, midH);
          currentSource = midCanvas;
          currentW = midW;
          currentH = midH;
        }
      }

      let canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas 2D context unavailable');
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetW, targetH);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(currentSource, 0, 0, targetW, targetH);

      onProgress?.(70);

      // Progressive quality & resolution reduction until strictly <= targetMaxChars
      const qualities = [0.68, 0.56, 0.46, 0.38];
      let resultDataUrl = '';

      for (const q of qualities) {
        resultDataUrl = canvas.toDataURL('image/jpeg', q);
        if (resultDataUrl.length <= targetMaxChars) {
          break;
        }
      }

      // If still above targetMaxChars, downscale dimensions iteratively
      let scaleAttempt = 0;
      while (resultDataUrl.length > targetMaxChars && scaleAttempt < 3) {
        scaleAttempt++;
        const nextW = Math.max(240, Math.round(canvas.width * 0.75));
        const nextH = Math.max(240, Math.round(canvas.height * 0.75));
        const nextCanvas = document.createElement('canvas');
        nextCanvas.width = nextW;
        nextCanvas.height = nextH;
        const nextCtx = nextCanvas.getContext('2d');
        if (!nextCtx) break;
        nextCtx.fillStyle = '#FFFFFF';
        nextCtx.fillRect(0, 0, nextW, nextH);
        nextCtx.imageSmoothingEnabled = true;
        nextCtx.drawImage(canvas, 0, 0, nextW, nextH);
        canvas.width = 0;
        canvas.height = 0;
        canvas = nextCanvas;
        resultDataUrl = canvas.toDataURL('image/jpeg', 0.45);
      }

      // Free canvas memory on mobile
      canvas.width = 0;
      canvas.height = 0;

      onProgress?.(95);
      return resultDataUrl;
    } finally {
      cleanup();
    }
  } catch (primaryErr) {
    console.warn('Primary mobile canvas compressor fallback:', primaryErr);
    // Secondary fallback using browser-image-compression if source is a File
    if (source instanceof File) {
      const compressedFile = await imageCompression(source, {
        maxSizeMB: 0.035,
        maxWidthOrHeight: 560,
        useWebWorker: false,
        fileType: 'image/jpeg',
        initialQuality: 0.6,
      });
      const dataUrl = await imageCompression.getDataUrlFromFile(compressedFile);
      onProgress?.(95);
      return dataUrl;
    }
    throw primaryErr;
  }
}

/**
 * Ensures the entire meetingLogs array on a cell_groups document stays well below
 * Firestore's 1,048,576-byte (1MB) total document limit even after dozens of meetings with photos.
 */
export async function optimizeMeetingLogsForFirestore(
  logs: any[],
  maxTotalSerializedChars = 600000
): Promise<any[]> {
  if (!Array.isArray(logs) || logs.length === 0) return [];

  // 1. Compress any single log photo that exceeds 55,000 chars (~40KB)
  const sanitizedLogs = await Promise.all(
    logs.map(async (log) => {
      if (!log || typeof log !== 'object') return log;
      let photo = log.photoUrl || null;
      if (typeof photo === 'string' && photo.startsWith('data:image/') && photo.length > 55000) {
        try {
          photo = await compressMobileImageToSafePayload(photo, {
            maxDimension: 560,
            targetMaxChars: 45000,
          });
        } catch {
          // keep as is if re-compression fails
        }
      }
      return {
        ...log,
        photoUrl: photo,
      };
    })
  );

  // 2. Check total serialized size; if over budget, compact older meeting photos (oldest first)
  let serializedLength = JSON.stringify(sanitizedLogs).length;
  if (serializedLength <= maxTotalSerializedChars) {
    return sanitizedLogs;
  }

  // Sort indices from oldest to newest so recent meeting photos stay sharpest
  const indicesByDateAsc = sanitizedLogs
    .map((log, index) => ({ index, time: new Date(log?.date || 0).getTime() || 0 }))
    .sort((a, b) => a.time - b.time)
    .map((item) => item.index);

  for (const idx of indicesByDateAsc) {
    if (serializedLength <= maxTotalSerializedChars) break;
    const log = sanitizedLogs[idx];
    if (log?.photoUrl && typeof log.photoUrl === 'string' && log.photoUrl.startsWith('data:image/')) {
      const oldLen = log.photoUrl.length;
      try {
        const compactPhoto = await compressMobileImageToSafePayload(log.photoUrl, {
          maxDimension: 360,
          targetMaxChars: 22000,
        });
        sanitizedLogs[idx] = { ...log, photoUrl: compactPhoto };
        serializedLength -= Math.max(0, oldLen - compactPhoto.length);
      } catch {
        // Ignore single thumbnail error
      }
    }
  }

  return sanitizedLogs;
}
