import {
  AlertTriangle,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  FileText,
  Image as ImageIcon,
  Pencil,
  Plus,
  Trash2,
  Wrench,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import RecordEditorModal from '../components/RecordEditorModal';
import { collectionDefinitions } from '../lib/adminConfig';
import {
  deleteRecord,
  getRecords,
  saveRecord,
} from '../lib/data';
import type {
  AdminRecord,
  CollectionKey,
} from '../types';

const collectionIcons: Record<
  CollectionKey,
  typeof FileText
> = {
  projects: FileText,
  technicalSkills: Wrench,
  softSkills: Check,
  workExperience: BriefcaseBusiness,
  events: ArrowUpRight,
  gallery: ImageIcon,
  resume: FileText,
};

function recordTitle(record: AdminRecord) {
  return String(
    record.title ??
      record.name ??
      record.company ??
      record.slug ??
      record.position ??
      'Untitled item'
  );
}

function recordSubtitle(
  record: AdminRecord,
  collection: CollectionKey
) {
  if (collection === 'projects') {
    return [
      record.category,
      record.year,
    ]
      .filter(Boolean)
      .join(' · ');
  }

  if (collection === 'technicalSkills') {
    return [
      record.category,
      record.level,
    ]
      .filter(Boolean)
      .join(' · ');
  }

  if (collection === 'softSkills') {
    return String(
      record.description ?? ''
    );
  }

  if (collection === 'workExperience') {
    return [
      record.position,
      record.period,
    ]
      .filter(Boolean)
      .join(' · ');
  }

  if (collection === 'events') {
    return [
      record.role,
      record.period,
    ]
      .filter(Boolean)
      .join(' · ');
  }

  if (collection === 'gallery') {
    return String(
      record.category ?? 'Image'
    );
  }

  if (collection === 'resume') {
    return record.active
      ? 'Current resume'
      : 'Archived resume';
  }

  return '';
}

export default function AdminManagement() {
  const [collection, setCollection] =
    useState<CollectionKey>('projects');

  const [records, setRecords] =
    useState<AdminRecord[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [editorOpen, setEditorOpen] =
    useState(false);

  const [editingRecord, setEditingRecord] =
    useState<AdminRecord | undefined>();

  const [notice, setNotice] =
    useState<{
      type: 'success' | 'error';
      message: string;
    } | null>(null);

  const [busyId, setBusyId] =
    useState<string | number | null>(null);

  const definition = useMemo(
    () =>
      collectionDefinitions.find(
        (item) => item.key === collection
      )!,
    [collection]
  );

  const loadRecords = useCallback(
    async () => {
      setLoading(true);

      try {
        const rows =
          await getRecords(collection);

        setRecords(rows);
        setNotice(null);
      } catch (error) {
        setNotice({
          type: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'Could not load items.',
        });
      } finally {
        setLoading(false);
      }
    },
    [collection]
  );

  useEffect(() => {
    void loadRecords();
  }, [loadRecords]);

  function openCreate() {
    setEditingRecord(undefined);
    setEditorOpen(true);
  }

  function openEdit(
    record: AdminRecord
  ) {
    setEditingRecord(record);
    setEditorOpen(true);
  }

  async function handleSave(
    record: Partial<AdminRecord>
  ) {
    try {
      await saveRecord(
        collection,
        record
      );

      setEditorOpen(false);

      await loadRecords();

      setNotice({
        type: 'success',
        message: `${definition.singular} saved successfully.`,
      });
    } catch (error) {
      setNotice({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Could not save item.',
      });
    }
  }

  async function handleDelete(
    record: AdminRecord
  ) {
    const title =
      recordTitle(record);

    if (
      !window.confirm(
        `Delete “${title}”? This cannot be undone.`
      )
    ) {
      return;
    }

    setBusyId(record.id);

    try {
      await deleteRecord(
        collection,
        record.id
      );

      await loadRecords();

      setNotice({
        type: 'success',
        message: `${definition.singular} deleted.`,
      });
    } catch (error) {
      setNotice({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Could not delete item.',
      });
    } finally {
      setBusyId(null);
    }
  }

  const Icon =
    collectionIcons[collection];

  return (
    <div className="admin-management">
      {/* -------------------------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------------------------- */}

      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">
            Content studio
          </p>

          <h1>
            Manage content
            <span className="heading-period">
              .
            </span>
          </h1>

          <p>
            Edit the details that appear on
            your public portfolio.
          </p>
        </div>

        <div className="heading-actions">
          <button
            className="button button-dark"
            onClick={openCreate}
          >
            <Plus size={17} />
            Add {definition.singular}
          </button>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* NOTICES */}
      {/* -------------------------------------------------- */}

      {notice && (
        <div
          className={`admin-notice admin-notice-${notice.type}`}
          role="status"
        >
          {notice.type === 'success' ? (
            <Check size={16} />
          ) : (
            <AlertTriangle size={16} />
          )}

          <span>
            {notice.message}
          </span>

          <button
            className="notice-dismiss"
            onClick={() =>
              setNotice(null)
            }
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* CONTENT MANAGER */}
      {/* -------------------------------------------------- */}

      <div className="content-manager-layout">
        {/* COLLECTION NAVIGATION */}

        <aside className="collection-nav">
          <p className="sidebar-label">
            Collections
          </p>

          {collectionDefinitions.map(
            (item) => {
              const ItemIcon =
                collectionIcons[
                  item.key
                ];

              return (
                <button
                  key={item.key}
                  className={`collection-nav-item ${
                    collection === item.key
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setCollection(
                      item.key
                    )
                  }
                >
                  <ItemIcon size={17} />

                  <span>
                    {item.label}
                  </span>

                  <ChevronDown
                    size={14}
                    className="collection-nav-chevron"
                  />
                </button>
              );
            }
          )}
        </aside>

        {/* COLLECTION CONTENT */}

        <section className="collection-panel">
          <div className="collection-panel-header">
            <div className="collection-title-icon">
              <Icon size={20} />
            </div>

            <div>
              <h2>
                {definition.label}
              </h2>

              <p>
                {definition.description}
              </p>
            </div>

            <span className="collection-count">
              {records.length} items
            </span>
          </div>

          <div className="collection-table-head">
            <span>Item</span>
            <span>Details</span>
            <span className="table-actions-label">
              Actions
            </span>
          </div>

          {loading ? (
            <div className="collection-empty">
              Loading content…
            </div>
          ) : records.length ? (
            <div className="record-list">
              {records.map(
                (record) => (
                  <div
                    className="record-row"
                    key={String(
                      record.id
                    )}
                  >
                    {/* PRIMARY */}

                    <div className="record-primary">
                      <span className="record-avatar">
                        {record.title ? (
                          String(
                            record.title
                          )
                            .slice(0, 1)
                            .toUpperCase()
                        ) : record.name ? (
                          String(
                            record.name
                          )
                            .slice(0, 1)
                            .toUpperCase()
                        ) : record.company ? (
                          String(
                            record.company
                          )
                            .slice(0, 1)
                            .toUpperCase()
                        ) : (
                          <Icon size={17} />
                        )}
                      </span>

                      <div>
                        <strong>
                          {recordTitle(
                            record
                          )}
                        </strong>

                        <small>
                          {String(
                            record.slug ??
                              record.id
                          )}
                        </small>
                      </div>
                    </div>

                    {/* SECONDARY */}

                    <div className="record-secondary">
                      {recordSubtitle(
                        record,
                        collection
                      ) || (
                        <span className="muted">
                          No extra details
                        </span>
                      )}
                    </div>

                    {/* ACTIONS */}

                    <div className="record-actions">
                      <button
                        className="icon-button"
                        onClick={() =>
                          openEdit(
                            record
                          )
                        }
                        aria-label={`Edit ${recordTitle(
                          record
                        )}`}
                      >
                        <Pencil
                          size={16}
                        />
                      </button>

                      <button
                        className="icon-button danger-icon"
                        onClick={() =>
                          void handleDelete(
                            record
                          )
                        }
                        disabled={
                          busyId ===
                          record.id
                        }
                        aria-label={`Delete ${recordTitle(
                          record
                        )}`}
                      >
                        <Trash2
                          size={16}
                        />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="collection-empty">
              <Icon size={30} />

              <h3>
                No{' '}
                {definition.label.toLowerCase()}{' '}
                yet
              </h3>

              <p>
                Add your first{' '}
                {definition.singular}{' '}
                to get started.
              </p>

              <button
                className="button button-dark"
                onClick={openCreate}
              >
                <Plus size={16} />
                Add{' '}
                {definition.singular}
              </button>
            </div>
          )}
        </section>
      </div>

      {/* -------------------------------------------------- */}
      {/* FOOTER TIP */}
      {/* -------------------------------------------------- */}

      <p className="admin-bottom-tip">
        <ArrowUpRight size={15} />
        Tip: after saving, check the public
        page to see how your content looks
        in context.
      </p>

      {/* -------------------------------------------------- */}
      {/* EDITOR */}
      {/* -------------------------------------------------- */}

      {editorOpen && (
        <RecordEditorModal
          collection={collection}
          record={editingRecord}
          onClose={() =>
            setEditorOpen(false)
          }
          onSave={handleSave}
        />
      )}
    </div>
  );
}