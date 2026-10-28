import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import {
  useState,
  type FormEvent,
} from 'react';
import { submitContactMessage } from '../lib/data';

const contactEmail =
  import.meta.env.VITE_CONTACT_EMAIL ||
  'hello@example.com';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const emptyForm: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] =
    useState<FormState>(emptyForm);

  const [sending, setSending] =
    useState(false);

  const [notice, setNotice] =
    useState<{
      type: 'success' | 'error';
      text: string;
    } | null>(null);

  function update(
    key: keyof FormState,
    value: string
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

    setSending(true);
    setNotice(null);

    try {
      const result =
        await submitContactMessage(form);

      if (result.emailSent) {
        setNotice({
          type: 'success',
          text:
            'Thanks — your message has been sent. I’ll get back to you as soon as I can.',
        });
      } else if (result.stored) {
        setNotice({
          type: 'success',
          text:
            'Thanks — your message has been received. I’ll get back to you as soon as I can.',
        });
      } else {
        setNotice({
          type: 'error',
          text:
            'Your message could not be sent. Please email me directly instead.',
        });

        return;
      }

      setForm(emptyForm);
    } catch (error) {
      setNotice({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please email me directly.',
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-main page-container section-pad">
        {/* INTRO */}

        <div className="contact-intro">
          <p className="eyebrow">
            Open for a conversation / 04
          </p>

          <h1>
            Let's talk
            <span className="heading-period">
              .
            </span>
          </h1>

          <p className="page-lead">
            Have a project, an opportunity,
            or just an interesting idea?
            Drop me a note.
          </p>

          <div className="contact-direct">
            {/* EMAIL */}

            <a
              href={`mailto:${contactEmail}`}
            >
              <span className="contact-direct-icon">
                <Mail size={18} />
              </span>

              <span>
                <small>
                  Email me directly
                </small>

                <strong>
                  {contactEmail}
                </strong>
              </span>

              <ArrowUpRight size={17} />
            </a>

            {/* LOCATION */}

            <div className="contact-location">
              <span className="contact-direct-icon">
                <MapPin size={18} />
              </span>

              <span>
                <small>
                  Based in
                </small>

                <strong>
                  Malaysia · Open to remote
                  collaboration
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* CONTACT FORM */}

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="contact-form-heading">
            <div>
              <span className="eyebrow">
                Your message
              </span>

              <h2>
                Send a note.
              </h2>
            </div>

            <span className="form-step">
              01 / 01
            </span>
          </div>

          <div className="contact-form-grid">
            {/* NAME */}

            <label className="form-field">
              <span>
                Name *
              </span>

              <input
                required
                value={form.name}
                onChange={(event) =>
                  update(
                    'name',
                    event.target.value
                  )
                }
                placeholder="Your name"
                autoComplete="name"
              />
            </label>

            {/* EMAIL */}

            <label className="form-field">
              <span>
                Email *
              </span>

              <input
                required
                type="email"
                value={form.email}
                onChange={(event) =>
                  update(
                    'email',
                    event.target.value
                  )
                }
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>

            {/* SUBJECT */}

            <label className="form-field field-full">
              <span>
                Subject
              </span>

              <input
                value={form.subject}
                onChange={(event) =>
                  update(
                    'subject',
                    event.target.value
                  )
                }
                placeholder="What would you like to talk about?"
              />
            </label>

            {/* MESSAGE */}

            <label className="form-field field-full">
              <span>
                Message *
              </span>

              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(event) =>
                  update(
                    'message',
                    event.target.value
                  )
                }
                placeholder="Tell me a little about it…"
              />
            </label>
          </div>

          {/* STATUS */}

          {notice && (
            <div
              className={`notice notice-${notice.type}`}
              role="status"
            >
              {notice.type ===
                'success' && (
                <CheckCircle2
                  size={17}
                />
              )}

              {notice.text}
            </div>
          )}

          {/* SUBMIT */}

          <button
            className="button button-dark submit-button"
            type="submit"
            disabled={sending}
          >
            {sending
              ? 'Sending…'
              : 'Send message'}

            <Send size={16} />
          </button>

          <p className="form-privacy">
            Your details are only used
            to respond to your message.
            Your message is securely
            stored in the portfolio
            database.
          </p>
        </form>
      </section>
    </div>
  );
}