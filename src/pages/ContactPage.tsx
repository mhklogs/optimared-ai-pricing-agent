import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  Mail,
  Clock,
  Twitter,
  Github,
  Linkedin,
  CheckCircle2,
  AlertCircle,
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
  usePageMeta("Contact — OptimaRed");

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

  const inputClass =
    "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-500 transition";

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 antialiased">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e7e5e4_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative px-6 py-20 md:py-24 max-w-6xl mx-auto text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-stone-900">
            Get in Touch
          </h1>
          <p className="text-stone-500 text-lg mt-4 max-w-2xl mx-auto">
            Questions about pricing, integrations, or the agent roadmap — we read everything.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <RevealGroup className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl p-7 shadow-sm">
            {status && (
              <div
                className={`mb-6 flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border ${
                  status.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-rose-50 border-rose-200 text-rose-700"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                {status.text}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-2" htmlFor="name">
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
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-2" htmlFor="email">
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
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-2" htmlFor="subject">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={inputClass}
              >
                {subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us how OptimaRed can help your store..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-colors"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Side info */}
          <div className="space-y-5">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Email</div>
                  <div className="font-mono text-sm text-stone-700">hello@optimared.ai</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Response Time</div>
                  <div className="text-sm text-stone-700">Within 24 hours</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Socials</div>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center hover:bg-blue-600 transition-colors" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center hover:bg-blue-600 transition-colors" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center hover:bg-blue-600 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </RevealGroup>
      </section>
    </div>
  );
}