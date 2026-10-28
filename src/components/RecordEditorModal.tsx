import { Save, X } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import type {
  AdminRecord,
  CollectionKey,
  FieldDefinition,
} from '../types';
import { getCollectionDefinition } from '../lib/adminConfig';

type Props = {
  collection: CollectionKey;
  record?: AdminRecord;
  onClose: () => void;
  onSave: (record: Partial<AdminRecord>) => Promise<void>;
};

function fieldValue(
  value: unknown,
  field: FieldDefinition
): string | boolean {
  if (field.type === 'checkbox') {
    return Boolean(value);
  }

  if (field.type === 'tags') {
    return Array.isArray(value)
      ? value.join(', ')
      : String(value ?? '');
  }

  if (value === null || value === undefined) {
    return '';
  }

  return String(value);
}

function inputType(field: FieldDefinition) {
  switch (field.type) {
    case 'url':
      return 'url';
    case 'number':
      return 'number';
    case 'email':
      return 'email';
    case 'date':
      return 'date';
    default:
      return 'text';
  }
}

export default function RecordEditorModal({
  collection,
  record,
  onClose,
  onSave,
}: Props) {
  const definition = getCollectionDefinition(collection);

  const [form, setForm] = useState<
    Record<string, string | boolean>
  >({});

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const initial: Record<string, string | boolean> = {};

    definition.fields.forEach((field) => {
      initial[field.key] = fieldValue(
        record?.[field.key],
        field
      );
    });

    setForm(initial);
    setError('');
  }, [definition, record]);

  function setValue(
    key: string,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError('');
    setSaving(true);

    try {
      const payload: Record<string, unknown> = {};

      /*
       * Preserve the existing database ID when editing.
       * Do not send an empty ID when creating a new record,
       * allowing Supabase to generate the UUID/identity value.
       */
      if (
        record?.id !== undefined &&
        record?.id !== null &&
        record?.id !== ''
      ) {
        payload.id = record.id;
      }

      definition.fields.forEach((field) => {
        const value = form[field.key];

        if (field.type === 'checkbox') {
          payload[field.key] = Boolean(value);
          return;
        }

        if (field.type === 'number') {
          payload[field.key] =
            value === '' || value === undefined
              ? null
              : Number(value);
          return;
        }

        if (field.type === 'tags') {
          payload[field.key] = String(value ?? '')
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);
          return;
        }

        payload[field.key] = String(value ?? '').trim();
      });

      await onSave(payload as Partial<AdminRecord>);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : 'Could not save this item.'
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="editor-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-title"
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Content manager</p>

            <h2 id="editor-title">
              {record ? 'Edit' : 'Add'} {definition.singular}
            </h2>

            <p>{definition.description}</p>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close editor"
          >
            <X size={19} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="record-form"
        >
          <div className="form-grid">
            {definition.fields.map((field) => {
              const value = form[field.key];

              return (
                <label
                  className={`form-field ${
                    field.type === 'textarea'
                      ? 'field-full'
                      : ''
                  }`}
                  key={field.key}
                >
                  <span>
                    {field.label}

                    {field.required && (
                      <b className="required-mark">
                        {' '}
                        *
                      </b>
                    )}
                  </span>

                  {field.type === 'textarea' ? (
                    <textarea
                      rows={4}
                      required={field.required}
                      value={String(value ?? '')}
                      onChange={(event) =>
                        setValue(
                          field.key,
                          event.target.value
                        )
                      }
                    />
                  ) : field.type === 'checkbox' ? (
                    <span className="checkbox-field">
                      <input
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(event) =>
                          setValue(
                            field.key,
                            event.target.checked
                          )
                        }
                      />

                      <span>
                        Enable this option
                      </span>
                    </span>
                  ) : (
                    <input
                      type={inputType(field)}
                      required={field.required}
                      value={String(value ?? '')}
                      onChange={(event) =>
                        setValue(
                          field.key,
                          event.target.value
                        )
                      }
                      placeholder={
                        field.type === 'tags'
                          ? 'React, TypeScript, Supabase'
                          : field.type === 'url'
                            ? 'https://…'
                            : field.type === 'date'
                              ? ''
                              : ''
                      }
                    />
                  )}

                  {field.help && (
                    <small>{field.help}</small>
                  )}
                </label>
              );
            })}
          </div>

          {error && (
            <div
              className="form-error"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="button button-light"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="button button-dark"
              disabled={saving}
            >
              <Save size={16} />

              {saving
                ? 'Saving…'
                : record
                  ? 'Save changes'
                  : 'Create item'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}