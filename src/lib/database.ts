import { supabase } from './supabase';

import type {
  Project,
  WorkExperience,
  Event,
  TechnicalSkill,
  SoftSkill,
  GalleryItem,
  Resume,
  ContactMessage,
} from '../types';


// =====================================================
// PROJECTS
// =====================================================

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('year', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }

  return (data ?? []) as Project[];
}


export async function getProjectBySlug(
  slug: string
): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    throw error;
  }

  return data as Project;
}


// =====================================================
// WORK EXPERIENCE
// =====================================================

export async function getWorkExperience(): Promise<WorkExperience[]> {
  const { data, error } = await supabase
    .from('work_experience')
    .select('*')
    .order('period', { ascending: false });

  if (error) {
    console.error('Error fetching work experience:', error);
    throw error;
  }

  return (data ?? []) as WorkExperience[];
}


// =====================================================
// EVENTS
// =====================================================

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }

  return (data ?? []) as Event[];
}


// =====================================================
// TECHNICAL SKILLS
// =====================================================

export async function getTechnicalSkills(): Promise<TechnicalSkill[]> {
  const { data, error } = await supabase
    .from('technical_skills')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching technical skills:', error);
    throw error;
  }

  return (data ?? []) as TechnicalSkill[];
}


// =====================================================
// SOFT SKILLS
// =====================================================

export async function getSoftSkills(): Promise<SoftSkill[]> {
  const { data, error } = await supabase
    .from('soft_skills')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching soft skills:', error);
    throw error;
  }

  return (data ?? []) as SoftSkill[];
}


// =====================================================
// GALLERY
// =====================================================

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching gallery:', error);
    throw error;
  }

  return (data ?? []) as GalleryItem[];
}


// =====================================================
// RESUME
// =====================================================

export async function getActiveResume(): Promise<Resume | null> {
  const { data, error } = await supabase
    .from('resume')
    .select('*')
    .eq('active', true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching resume:', error);
    throw error;
  }

  return data as Resume | null;
}


// =====================================================
// CONTACT
// =====================================================

export async function sendContactMessage(
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<ContactMessage> {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([
      {
        name,
        email,
        subject,
        message,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }

  return data as ContactMessage;
}