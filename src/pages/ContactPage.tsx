import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  Mail,
  Clock,
  Twitter,
  Github,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react";
import RevealGroup from "../components/RevealGroup";
import usePageMeta from "../lib/usePageMeta";

const subjects = [
  "Sales & Pricing",
  "Support",
  "Partnerships",
  "Feedback",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = { type: "success" | "error"; text: string } | null;

export default function ContactPage() {
  usePageMeta(
    "Contact — Optimared",
    "Questions about Optimared, integrations, or the AI pricing roadmap — we read everything."
  );

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: subjects[0],
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", text: data.error || "Something went wrong. Please try again." });
        return;
      }
      setStatus({ type: "success", text: data.message || "Message sent." });
      setForm({ name: "", email: "", subject: subjects[0], message: "" });
    } catch {
      setStatus({ type: "error", text: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const labelClass = "mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted";

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="absolute inset-0">
          <div className="absolute inset-0 hud-grid" />
          <div className="aurora -top-24 right-[18%] h-64 w-64 bg-[#FFC53D]/12" />
        </div>
        <div className="relative px-6 py-20 text-center md:py-24">
          <p className="eyebrow-amber">human on the other end</p>
          <h1 className="mt-4 font-display text-4xl uppercase tracking-tight md:text-5xl">
            Get in touch
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            Questions about pricing, integrations, or the agent roadmap — we read everything.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-6">
        <RevealGroup className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form */}
          <form onSubmit={handleSubmit} className="panel p-7 lg:col-span-2">
            {status && (
              <div
                className={`mb-6 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium ${
                  status.type === "success"
                    ? "border-mint/30 bg-mint/10 text-mint"
                    : "border-rose/30 bg-[#ff586e]/10 text-[#ff9aab]"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                {status.text}
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="field"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@store.com"
                  className="field"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className={labelClass} htmlFor="subject">
                Subject
              </label>
              <select id="subject" name="subject" value={form.subject} onChange={handleChange} className="field">
                {subjects.map((s) => (
                  <option key={s} className="bg-panel text-ink" value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label className={labelClass} htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us how Optimared can help your store..."
                className="field resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary mt-6 w-full sm:w-auto"
            >
              {submitting ? "Sending..." : "Send message"}
              {!submitting && <Send className="h-4 w-4" />}
            </button>
          </form>

          {/* Side info */}
          <div className="space-y-5">
            <div className="panel p-6">
              <div className="flex items-center gap-3">
                <span className="logo-tile flex h-10 w-10 shrink-0 items-center justify-center">
                  <Mail className="h-5 w-5 text-amber" />
                </span>
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                    Email
                  </div>
                  <div className="font-mono text-sm text-ink-soft">hello@optimared.ai</div>
                </div>
              </div>
            </div>

            <div className="panel p-6">
              <div className="flex items-center gap-3">
                <span className="logo-tile flex h-10 w-10 shrink-0 items-center justify-center">
                  <Clock className="h-5 w-5 text-amber" />
                </span>
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                    Response time
                  </div>
                  <div className="text-sm text-ink-soft">Within 24 hours</div>
                </div>
              </div>
            </div>

            <div className="panel p-6">
              <div className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                Socials
              </div>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="panel flex h-10 w-10 items-center justify-center hover:border-amber/50 hover:text-amber"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="panel flex h-10 w-10 items-center justify-center hover:border-amber/50 hover:text-amber"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="panel flex h-10 w-10 items-center justify-center hover:border-amber/50 hover:text-amber"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </RevealGroup>
      </section>
    </div>
  );
}