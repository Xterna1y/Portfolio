import { supabase } from './supabase';


// =====================================================
// IMAGE STORAGE
// Bucket: images
//
// Example:
// getImageUrl('Me/HangOut.jpg')
// =====================================================

export function getImageUrl(path: string): string {
  if (!path) {
    return '';
  }

  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(path);

  return data.publicUrl;
}


// =====================================================
// RESUME STORAGE
// Bucket: resume
//
// Example:
// getResumeUrl('ResumeReo26.pdf')
// =====================================================

export function getResumeUrl(path: string): string {
  if (!path) {
    return '';
  }

  const { data } = supabase.storage
    .from('resume')
    .getPublicUrl(path);

  return data.publicUrl;
}