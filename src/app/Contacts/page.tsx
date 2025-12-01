import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader, CheckCircle } from "lucide-react";
import "./contact.css";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact: React.FC = () => {
  // initial form state
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );

  // contact info from resume: email, phone, address. See resume. :contentReference[oaicite:2]{index=2}
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "tmreo123@gmail.com",
      href: "mailto:tmreo123@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+60 12-802-5770",
      href: "tel:+60128025770",
    },
    {
      icon: MapPin,
      label: "Location",
      value:
        "D'Latour, Jalan Taylors, Bandar Sunway, Pjs7, 47500 Subang Jaya, Selangor",
      href: "#",
    },
  ];

  // basic validation
  const validateForm = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      next.email = "Email is invalid";

    if (!formData.subject.trim()) next.subject = "Subject is required";

    if (!formData.message.trim()) next.message = "Message is required";
    else if (formData.message.trim().length < 10)
      next.message = "Message must be at least 10 characters";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if ((errors as any)[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");

    try {
      // replace this Formspree endpoint if you have a different form id
      const response = await fetch("https://formspree.io/f/myznqrjk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="header">
          <h2>Get In Touch</h2>
          <p>
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="grid">
          {/* Left column: contact info */}
          <div className="left-col">
            <div className="intro">
              <h3>Let's Connect</h3>
              <p>
                I'm always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="info-list">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <a key={idx} className="info-item" href={info.href}>
                    <div className="icon-wrap">
                      <Icon size={20} />
                    </div>
                    <div className="info-text">
                      <div className="info-label">{info.label}</div>
                      <div className="info-value">{info.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="response-box">
              <h4>Response Time</h4>
              <p>I typically respond within 24–48 hours during business days.</p>
              <small>For urgent matters, please mention it in your message subject.</small>
            </div>
          </div>

          {/* Right column: contact form */}
          <div className="right-col card">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <label htmlFor="name">Name *</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={errors.name ? "input error" : "input"}
                />
                {errors.name && <div className="error-text">{errors.name}</div>}
              </div>

              <div className="form-row">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={errors.email ? "input error" : "input"}
                />
                {errors.email && <div className="error-text">{errors.email}</div>}
              </div>

              <div className="form-row">
                <label htmlFor="subject">Subject *</label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className={errors.subject ? "input error" : "input"}
                />
                {errors.subject && <div className="error-text">{errors.subject}</div>}
              </div>

              <div className="form-row">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell me about your project..."
                  className={errors.message ? "input textarea error" : "input textarea"}
                />
                {errors.message && <div className="error-text">{errors.message}</div>}
              </div>

              {status === "success" && (
                <div className="status success">
                  <CheckCircle size={18} />
                  <div>Message sent successfully! I'll get back to you soon.</div>
                </div>
              )}

              {status === "error" && (
                <div className="status error">
                  <div>Failed to send message. Please try again or email me directly.</div>
                </div>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={status === "loading"}
                aria-busy={status === "loading" ? "true" : "false"}
              >
                {status === "loading" ? (
                  <>
                    <Loader size={18} className="spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>

            <p className="powered">
              Powered by{" "}
              <a href="https://formspree.io" target="_blank" rel="noreferrer">
                Formspree
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
