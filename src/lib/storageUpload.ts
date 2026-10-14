import { supabase, isSupabaseConfigured } from './supabase';
import { MediaItem } from '../types/cms';

export interface UploadResult {
  url: string;
  path: string;
  filename: string;
  size: number;
  mimeType: string;
  isStorage: boolean;
  item?: MediaItem;
  warning?: string;
}

export interface UploadOptions {
  folder?: 'seo' | 'portfolio' | 'clients' | 'branding' | 'site' | string;
  customFilename?: string;
  bucket?: string;
  maxSizeMB?: number;
  allowedTypes?: string[];
  onProgress?: (percent: number) => void;
}

const DEFAULT_BUCKET = 'viratta-assets';
const DEFAULT_MAX_SIZE_MB = 10;
const DEFAULT_ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/svg+xml',
  'image/gif',
  'image/avif',
];

/**
 * Format bytes to readable human size (e.g., "340 KB", "2.1 MB")
 */
export function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Sanitize filename to be safe for cloud storage
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .toLowerCase();
}

/**
 * Extract storage path from a Supabase storage public URL if applicable
 */
export function extractStoragePath(url: string, bucket: string = DEFAULT_BUCKET): string | null {
  if (!url) return null;
  const match = url.match(new RegExp(`/storage/v1/object/public/${bucket}/(.+)$`));
  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }
  return null;
}

/**
 * Validates a file against allowed MIME types and max file size
 */
export function validateImageFile(
  file: File,
  allowedTypes: string[] = DEFAULT_ALLOWED_TYPES,
  maxSizeMB: number = DEFAULT_MAX_SIZE_MB
): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'Nenhum arquivo fornecido.' };
  }

  // Type check
  const isTypeAllowed = allowedTypes.some((type) => {
    if (type.endsWith('/*')) {
      return file.type.startsWith(type.replace('/*', ''));
    }
    return file.type === type;
  });

  if (!isTypeAllowed && !file.type.startsWith('image/')) {
    return {
      valid: false,
      error: `Formato inválido (${file.type || 'desconhecido'}). Envie PNG, JPG, WebP, SVG ou GIF.`,
    };
  }

  // Size check
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `Arquivo muito grande (${formatFileSize(file.size)}). O limite máximo é ${maxSizeMB}MB.`,
    };
  }

  return { valid: true };
}

/**
 * Upload a file directly to Supabase Storage with local fallback
 */
export async function uploadFileToStorage(
  file: File,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const {
    folder = 'portfolio',
    customFilename,
    bucket = DEFAULT_BUCKET,
    maxSizeMB = DEFAULT_MAX_SIZE_MB,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
  } = options;

  // 1. Validation
  const validation = validateImageFile(file, allowedTypes, maxSizeMB);
  if (!validation.valid) {
    throw new Error(validation.error || 'Arquivo inválido para upload.');
  }

  const cleanName = customFilename ? sanitizeFilename(customFilename) : sanitizeFilename(file.name);
  const timestamp = Date.now();
  const filePath = `${folder}/${timestamp}-${cleanName}`;

  // 2. Try Supabase Storage
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (!error && data) {
        const { data: pubData } = supabase.storage
          .from(bucket)
          .getPublicUrl(data.path);

        const publicUrl = pubData.publicUrl;

        const mediaItem: MediaItem = {
          id: `med-${timestamp}`,
          name: file.name,
          url: publicUrl,
          file_path: data.path,
          file_size: file.size,
          mime_type: file.type,
          folder: folder as any,
          created_at: new Date().toISOString(),
        };

        return {
          url: publicUrl,
          path: data.path,
          filename: file.name,
          size: file.size,
          mimeType: file.type,
          isStorage: true,
          item: mediaItem,
        };
      }

      if (error) {
        console.warn('Supabase storage upload error:', error.message);
      }
    } catch (storageErr) {
      console.warn('Supabase storage upload exception:', storageErr);
    }
  }

  // 3. Fallback to Local Data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const mediaItem: MediaItem = {
        id: `med-${timestamp}`,
        name: file.name,
        url: dataUrl,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
        folder: folder as any,
        created_at: new Date().toISOString(),
      };

      resolve({
        url: dataUrl,
        path: filePath,
        filename: file.name,
        size: file.size,
        mimeType: file.type,
        isStorage: false,
        item: mediaItem,
        warning: 'Salvo localmente (Base64). Conexão direta ao bucket Supabase Storage não disponível no momento.',
      });
    };
    reader.onerror = () => reject(new Error('Erro ao processar arquivo no navegador.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Replace an existing file in Supabase Storage with a new file
 */
export async function replaceFileInStorage(
  newFile: File,
  oldUrlOrPath: string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const bucket = options.bucket || DEFAULT_BUCKET;

  // Attempt to delete old file if it was hosted in Supabase Storage
  if (oldUrlOrPath && isSupabaseConfigured() && supabase) {
    try {
      const oldPath = extractStoragePath(oldUrlOrPath, bucket) || (oldUrlOrPath.includes('/') && !oldUrlOrPath.startsWith('http') ? oldUrlOrPath : null);
      if (oldPath) {
        await supabase.storage.from(bucket).remove([oldPath]);
      }
    } catch (delErr) {
      console.warn('Could not remove previous asset from storage:', delErr);
    }
  }

  // Upload the replacement file
  return uploadFileToStorage(newFile, options);
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFileFromStorage(
  urlOrPath: string,
  bucket: string = DEFAULT_BUCKET
): Promise<{ success: boolean; error?: string }> {
  if (!urlOrPath) return { success: false, error: 'URL ou caminho vazio.' };

  if (isSupabaseConfigured() && supabase) {
    try {
      const path = extractStoragePath(urlOrPath, bucket) || (urlOrPath.includes('/') && !urlOrPath.startsWith('http') ? urlOrPath : null);
      if (path) {
        const { error } = await supabase.storage.from(bucket).remove([path]);
        if (error) {
          return { success: false, error: error.message };
        }
        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Erro ao deletar do Supabase Storage.' };
    }
  }

  return { success: true };
}
