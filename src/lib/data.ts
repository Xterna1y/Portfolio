import type {
  AdminRecord,
  CollectionKey,
  ContactMessage,
  Project,
} from '../types';
import { supabase } from './supabase';

const tableForCollection: Record<CollectionKey, string> = {
  projects: 'projects',
  technicalSkills: 'technical_skills',
  softSkills: 'soft_skills',
  events: 'events',
  gallery: 'gallery_items',
  resume: 'resume',
  workExperience: 'work_experience',
};

/**
 * Get all records from a Supabase collection.
 */
export async function getRecords(
  collection: CollectionKey
): Promise<AdminRecord[]> {
  const table = tableForCollection[collection];

  let query = (supabase as any).from(table).select('*');

  // Apply sensible ordering for each collection.
  switch (collection) {
    case 'technicalSkills':
    case 'softSkills':
      query = query.order('sort_order', { ascending: true });
      break;

    case 'projects':
      query = query
        .order('featured', { ascending: false })
        .order('year', { ascending: false });
      break;

    case 'events':
      query = query.order('created_at', { ascending: false });
      break;

    case 'gallery':
      query = query.order('created_at', { ascending: false });
      break;

    case 'resume':
      query = query
        .order('active', { ascending: false })
        .order('created_at', { ascending: false });
      break;

    case 'workExperience':
      query = query.order('period', { ascending: false });
      break;
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Could not load ${collection}: ${error.message}`);
  }

  return (data ?? []) as AdminRecord[];
}

/**
 * Save a record.
 *
 * If an ID is provided, the existing record is updated.
 * If no ID is provided, Supabase creates a new record.
 */
export async function saveRecord(
  collection: CollectionKey,
  record: Partial<AdminRecord>
): Promise<AdminRecord> {
  const table = tableForCollection[collection];

  const payload = { ...record } as Record<string, unknown>;

  // Let Supabase generate the UUID / identity ID for new records.
  if (
    payload.id === undefined ||
    payload.id === null ||
    payload.id === ''
  ) {
    delete payload.id;
  }

  const { data, error } = await (supabase as any)
    .from(table)
    .upsert(payload)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Could not save ${collection}: ${error.message}`);
  }

  return data as AdminRecord;
}

/**
 * Delete a record from Supabase.
 */
export async function deleteRecord(
  collection: CollectionKey,
  id: string | number
): Promise<void> {
  const table = tableForCollection[collection];

  const { error } = await (supabase as any)
    .from(table)
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Could not delete ${collection}: ${error.message}`);
  }
}

/**
 * Get contact messages for the admin dashboard.
 */
export async function getContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await (supabase as any)
    .from('contact_messages')
    .select('id,name,email,subject,message,created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Could not load messages: ${error.message}`);
  }

  return (data ?? []) as ContactMessage[];
}

/**
 * Submit a contact form message.
 *
 * The message is always stored in Supabase.
 * The optional Edge Function attempts to send an email notification.
 */
export async function submitContactMessage(
  message: ContactMessage
): Promise<{ emailSent: boolean; stored: boolean }> {
  const { error } = await (supabase as any)
    .from('contact_messages')
    .insert({
      name: message.name,
      email: message.email,
      subject: message.subject ?? 'Portfolio contact',
      message: message.message,
    });

  if (error) {
    throw new Error(`Could not save your message: ${error.message}`);
  }

  // Try to trigger the email notification.
  // The portfolio still works if the Edge Function has not been deployed.
  try {
    const { error: emailError } = await supabase.functions.invoke(
      'send-contact-message',
      {
        body: message,
      }
    );

    if (emailError) {
      console.warn(
        'Message saved, but the email notification function is unavailable:',
        emailError.message
      );

      return {
        emailSent: false,
        stored: true,
      };
    }

    return {
      emailSent: true,
      stored: true,
    };
  } catch (error) {
    console.warn(
      'Message saved, but the email notification function could not be reached:',
      error
    );

    return {
      emailSent: false,
      stored: true,
    };
  }
}

/**
 * Find a project by its slug.
 */
export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  const cleanSlug = slug.trim();

  if (!cleanSlug) {
    return undefined;
  }

  // Portfolio URLs use the project's slug.
  const { data: project, error: slugError } = await (supabase as any)
    .from('projects')
    .select('*')
    .eq('slug', cleanSlug)
    .maybeSingle();

  if (slugError) {
    throw new Error(
      `Could not load project: ${slugError.message}`
    );
  }

  if (project) {
    return project as Project;
  }

  // Optional fallback: if the URL contains an actual UUID,
  // allow the project to be opened directly by its database ID.
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidPattern.test(cleanSlug)) {
    return undefined;
  }

  const { data: projectById, error: idError } = await (supabase as any)
    .from('projects')
    .select('*')
    .eq('id', cleanSlug)
    .maybeSingle();

  if (idError) {
    throw new Error(
      `Could not load project: ${idError.message}`
    );
  }

  return projectById as Project | undefined;
}