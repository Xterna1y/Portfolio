import type { CollectionDefinition, CollectionKey } from '../types';

export const collectionDefinitions: CollectionDefinition[] = [
  {
    key: 'projects',
    label: 'Projects',
    singular: 'project',
    description: 'Portfolio projects, case studies, links, and technologies.',
    fields: [
      {
        key: 'title',
        label: 'Project title',
        required: true,
      },
      {
        key: 'slug',
        label: 'URL slug',
        required: true,
        help: 'Use lowercase words separated by hyphens, e.g. dementia-support-app.',
      },
      {
        key: 'category',
        label: 'Category',
        required: true,
      },
      {
        key: 'year',
        label: 'Year',
        type: 'number',
      },
      {
        key: 'summary',
        label: 'Short summary',
        type: 'textarea',
        required: true,
      },
      {
        key: 'description',
        label: 'Full description',
        type: 'textarea',
        required: true,
      },
      {
        key: 'role',
        label: 'Your role',
      },
      {
        key: 'cover_image',
        label: 'Cover image URL',
        type: 'url',
        help: 'Paste the Supabase Storage public URL or image URL.',
      },
      {
        key: 'tech_stack',
        label: 'Tech stack',
        type: 'tags',
        help: 'Separate technologies with commas.',
      },
      {
        key: 'live_url',
        label: 'Live project URL',
        type: 'url',
      },
      {
        key: 'repo_url',
        label: 'Repository URL',
        type: 'url',
      },
      {
        key: 'featured',
        label: 'Feature on home page',
        type: 'checkbox',
      },
    ],
  },

  {
    key: 'technicalSkills',
    label: 'Technical skills',
    singular: 'technical skill',
    description: 'Languages, frameworks, tools, and platforms you use.',
    fields: [
      {
        key: 'name',
        label: 'Skill name',
        required: true,
      },
      {
        key: 'category',
        label: 'Category',
        required: true,
        help: 'e.g. Frontend, Backend, Design, Database.',
      },
      {
        key: 'level',
        label: 'Proficiency label',
        help: 'e.g. Familiar, Intermediate, Advanced.',
      },
      {
        key: 'sort_order',
        label: 'Display order',
        type: 'number',
      },
    ],
  },

  {
    key: 'softSkills',
    label: 'Soft skills',
    singular: 'soft skill',
    description: 'People, leadership, communication, and collaboration strengths.',
    fields: [
      {
        key: 'name',
        label: 'Skill name',
        required: true,
      },
      {
        key: 'description',
        label: 'Description',
        type: 'textarea',
      },
      {
        key: 'sort_order',
        label: 'Display order',
        type: 'number',
      },
    ],
  },

  {
    key: 'workExperience',
    label: 'Work experience',
    singular: 'work experience',
    description: 'Professional work experience and responsibilities.',
    fields: [
      {
        key: 'company',
        label: 'Company',
        required: true,
      },
      {
        key: 'position',
        label: 'Position',
        required: true,
      },
      {
        key: 'period',
        label: 'Start date',
        type: 'date',
        help: 'Select the start date of this position.',
      },
      {
        key: 'description',
        label: 'Description',
        type: 'textarea',
      },
      {
        key: 'image_url',
        label: 'Company image URL',
        type: 'url',
        help: 'Paste a Supabase Storage public URL or image URL.',
      },
    ],
  },

  {
    key: 'events',
    label: 'Roles & events',
    singular: 'role or event',
    description: 'Leadership roles, events, volunteering, and experience highlights.',
    fields: [
      {
        key: 'name',
        label: 'Role / event name',
        required: true,
      },
      {
        key: 'role',
        label: 'Position / responsibility',
      },
      {
        key: 'period',
        label: 'Date or period',
      },
      {
        key: 'description',
        label: 'Description',
        type: 'textarea',
      },
      {
        key: 'image_url',
        label: 'Image URL',
        type: 'url',
        help: 'Paste a Supabase Storage public URL or image URL.',
      },
    ],
  },

  {
    key: 'gallery',
    label: 'Pictures',
    singular: 'picture',
    description: 'Images used in the About page and project galleries.',
    fields: [
      {
        key: 'title',
        label: 'Image title',
        required: true,
      },
      {
        key: 'image_url',
        label: 'Image URL',
        type: 'url',
        required: true,
        help: 'Paste the public URL of an image from Supabase Storage.',
      },
      {
        key: 'alt_text',
        label: 'Accessible alt text',
      },
      {
        key: 'category',
        label: 'Category / grouping',
      },
    ],
  },

  {
    key: 'resume',
    label: 'Resume',
    singular: 'resume entry',
    description: 'Manage the resume PDF used on your portfolio.',
    fields: [
      {
        key: 'title',
        label: 'Resume label',
        required: true,
      },
      {
        key: 'file_url',
        label: 'PDF URL',
        type: 'url',
        required: true,
        help: 'Paste the public URL of your resume from the Supabase resume bucket.',
      },
      {
        key: 'active',
        label: 'Use as current resume',
        type: 'checkbox',
      },
    ],
  },
];

export const getCollectionDefinition = (key: CollectionKey) =>
  collectionDefinitions.find((definition) => definition.key === key)!;