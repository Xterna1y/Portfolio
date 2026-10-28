export type CollectionKey =
  | 'projects'
  | 'technicalSkills'
  | 'softSkills'
  | 'workExperience'
  | 'events'
  | 'gallery'
  | 'resume';


// =====================================================
// GENERIC ADMIN RECORD
// =====================================================

export type AdminRecord = {
  id: string | number;
  [key: string]: unknown;
};


// =====================================================
// PROJECTS
// Matches public.projects
// =====================================================

export type Project = AdminRecord & {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  year: number | null;
  role: string;
  cover_image: string;
  tech_stack: string[];
  live_url: string;
  repo_url: string;
  featured: boolean;
};


// =====================================================
// TECHNICAL SKILLS
// Matches public.technical_skills
// =====================================================

export type TechnicalSkill = AdminRecord & {
  name: string;
  category: string;
  level: string;
  sort_order: number;
};


// =====================================================
// SOFT SKILLS
// Matches public.soft_skills
// =====================================================

export type SoftSkill = AdminRecord & {
  name: string;
  description: string;
  sort_order: number;
};


// =====================================================
// WORK EXPERIENCE
// Matches public.work_experience
// =====================================================

export type WorkExperience = {
  id: number;
  created_at: string;
  company: string | null;
  position: string | null;
  period: string | null;
  description: string | null;
  image_url: string | null;
};


// =====================================================
// EVENTS
// Matches public.events
// =====================================================

export type Event = AdminRecord & {
  name: string;
  role: string;
  period: string;
  description: string;
  image_url: string;
};


// =====================================================
// GALLERY
// Matches public.gallery_items
// =====================================================

export type GalleryItem = AdminRecord & {
  title: string;
  image_url: string;
  alt_text: string;
  category: string;
};


// =====================================================
// RESUME
// Matches public.resume
// =====================================================

export type Resume = AdminRecord & {
  title: string;
  file_url: string;
  active: boolean;
};


// =====================================================
// CONTACT MESSAGES
// Matches public.contact_messages
// =====================================================

export type ContactMessage = {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at?: string;
};


// =====================================================
// ADMIN FORM FIELDS
// =====================================================

export type FieldDefinition = {
  key: string;
  label: string;
  type?:
    | 'text'
    | 'textarea'
    | 'url'
    | 'number'
    | 'checkbox'
    | 'tags'
    | 'email'
    | 'date';
  required?: boolean;
  help?: string;
};


// =====================================================
// ADMIN COLLECTION DEFINITIONS
// =====================================================

export type CollectionDefinition = {
  key: CollectionKey;
  label: string;
  singular: string;
  description: string;
  fields: FieldDefinition[];
};