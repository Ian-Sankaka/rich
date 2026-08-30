"use client";
import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, ArrowUpRight } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

export default function ContactPage() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast("Please fill in name, email and message", "error");
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast("Message sent - we will reply within 24 hours", "success");
      setSent(true);
      setName(""); setEmail(""); setSubject(""); setMessage("");
      setSending(false);
      setTimeout(() => setSent(false), 4000);
    }, 700);
  }

  return (
    <div className="bg-[var(--background)]">
      {/* hero - premium, like collections */}
      <div className="relative overflow-hidden bg-[#1a3a1a] border-b border-black/10">
        <div className="absolute inset-0" style={{ background: "radial-gradient(600px circle at 20% 0%, rgba(109,184,98,0.18), transparent 60%), radial-gradient(500px circle at 90% 20%, rgba(255,255,255,0.06), transparent 50%)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-10 py-14 sm:py-16">
          <div>
            <p className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.18em] uppercase text-[#6db862]"><span className="h-0.5 w-7 bg-[#6db862]" /> Get in touch</p>
            <h1 className="mt-3 max-w-[640px] text-[36px] sm:text-[46px] font-medium leading-[1.05] text-white text-balance" style={{ fontFamily: "Playfair Display, serif" }}>
              We&apos;d love to hear from you
            </h1>
            <p className="mt-4 max-w-[560px] text-[16px] font-light leading-7 text-white/80">
              Question, feedback, partnership, or a resource to share? We reply within a day. Built for the African climate AI community, hosted by LDRI in Nairobi.
            </p>
          </div>
        </div>
      </div>

      {/* main - 2 column equal height */}
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_1.45fr] items-stretch">
          {/* left - 3 cards equal height to form */}
          <div className="flex flex-col gap-4 h-full">
            <a href="mailto:thinking@developlocal.org" className="group flex items-start gap-4 rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#1a221a] p-6 hover:border-[#4a8c3f]/30 hover:shadow-[0_12px_32px_rgba(16,42,16,0.08)] hover:-translate-y-0.5 transition-all">
              <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[12px] border shadow-sm bg-[#dbeed6] text-[#4a8c3f] border-[#4a8c3f]/10 group-hover:scale-[1.04] transition-transform">
                <Mail className="h-[22px] w-[22px]" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-[var(--text-light)]">Email</span>
                <span className="mt-0.5 block text-[17px] font-medium text-[#1a3a1a] dark:text-white group-hover:text-[#4a8c3f]" style={{ fontWeight: 500 }}>thinking@developlocal.org</span>
                <span className="mt-1 block text-[13px] font-light leading-6 text-[var(--text-mid)]">Best for support, partnerships, and submissions. We reply within 24 hours.</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#4a8c3f]">Send email <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></span>
              </span>
            </a>

            <a href="tel:+254718610298" className="group flex items-start gap-4 rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#1a221a] p-6 hover:border-[#2d6a8f]/30 hover:shadow-[0_12px_32px_rgba(16,42,16,0.08)] hover:-translate-y-0.5 transition-all">
              <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[12px] border shadow-sm bg-[#d9e9f5] text-[#2d6a8f] border-[#2d6a8f]/10">
                <Phone className="h-[22px] w-[22px]" />
              </span>
              <span className="flex-1">
                <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-[var(--text-light)]">Phone</span>
                <span className="mt-0.5 block text-[17px] font-medium text-[#1a3a1a] dark:text-white" style={{ fontWeight: 500 }}>+254 718 610298</span>
                <span className="mt-1 block text-[13px] font-light leading-6 text-[var(--text-mid)]">Mon - Fri, 09:00 to 18:00 EAT. For urgent partnership queries.</span>
              </span>
            </a>

            <div className="flex flex-col rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#1a221a] p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] border shadow-sm bg-[#f2e2cc] text-[#8a5a2a] border-[#8a5a2a]/10">
                  <MapPin className="h-[18px] w-[18px]" />
                </span>
                <span className="flex-1">
                  <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-[var(--text-light)]">Visit</span>
                  <span className="mt-0.5 block text-[15px] font-semibold text-[#1a3a1a] dark:text-white">One Padmore Place, Kilimani, Nairobi</span>
                  <span className="mt-1 block text-[13px] font-light leading-6 text-[var(--text-mid)]">Regional Innovation and Climate Hub, hosted by LDRI. <a href="https://www.developlocal.org" target="_blank" className="text-[#4a8c3f] underline">developlocal.org</a></span>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--off-white)] dark:bg-white/5 border border-[var(--border)] px-3 py-1 text-[12px]"><Clock className="h-3.5 w-3.5" /> 09:00 - 18:00 EAT</span>
                </span>
              </div>
            </div>
          </div>

          {/* right form - same height as left */}
          <div className="flex flex-col rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#1a221a] shadow-[0_16px_48px_rgba(16,42,16,0.08)] overflow-hidden h-full">
            <div className="p-6 sm:p-8 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="flex items-center gap-2 text-[20px] font-medium text-[#1a3a1a] dark:text-white" style={{ fontFamily: "Playfair Display, serif" }}><MessageSquare className="h-5 w-5 text-[#4a8c3f]" /> Send us a message</h2>
                  <p className="mt-1.5 text-[14px] font-light text-[var(--text-mid)]">We usually reply within a day. For resources, use <Link href="/submit" className="text-[#4a8c3f] underline font-medium">Submit a Resource</Link>.</p>
                </div>
                {sent && <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f3e5] text-[#2d5a27] px-3 py-1 text-[12px] font-bold shrink-0"><CheckCircle2 className="h-4 w-4" /> Sent</span>}
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4 flex-1 flex flex-col">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-bold tracking-[0.06em] uppercase text-[#1a3a1a] dark:text-white">Name <span className="text-red-500">*</span></span>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required className="h-[44px] rounded-[10px] border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-4 text-[14px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 transition-all" />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-bold tracking-[0.06em] uppercase text-[#1a3a1a] dark:text-white">Email <span className="text-red-500">*</span></span>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="h-[44px] rounded-[10px] border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-4 text-[14px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 transition-all" />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-bold tracking-[0.06em] uppercase text-[#1a3a1a] dark:text-white">Subject</span>
                  <select value={subject} onChange={(e) => setSubject(e.target.value)} className="h-[44px] rounded-[10px] border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-4 text-[14px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10">
                    <option value="">Select a topic</option>
                    <option>Partnership</option>
                    <option>Resource submission</option>
                    <option>Policy inquiry</option>
                    <option>General question</option>
                    <option>Report an issue</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5 flex-1">
                  <span className="flex items-center justify-between text-[12px] font-bold tracking-[0.06em] uppercase text-[#1a3a1a] dark:text-white">Message <span className="text-red-500">*</span><span className="text-[11px] font-normal normal-case tracking-normal text-[var(--text-light)]">{message.length}/800</span></span>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} maxLength={800} placeholder="Tell us about your question, resource, or partnership idea..." required className="flex-1 rounded-[10px] border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-4 py-3 text-[14px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 resize-none min-h-[180px]" />
                </label>

                <button type="submit" disabled={sending} className="group inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#4a8c3f] px-6 py-3.5 text-[14px] font-bold uppercase tracking-[0.06em] text-white hover:bg-[#2d5a27] hover:shadow-[0_12px_24px_rgba(74,140,63,0.25)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all">
                  {sending ? <><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg> Sending...</> : <><Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" /> Send message</>}
                </button>

                <p className="text-center text-[11px] leading-4 text-[var(--text-light)]">By sending, you agree to our <Link href="/privacy" className="text-[#4a8c3f] underline">Privacy Policy</Link>. We never share your email.</p>
              </form>
            </div>


          </div>
        </div>

        {/* map - full width below two columns, same max-width as grid */}
        <div className="mt-8 overflow-hidden rounded-[16px] border border-[var(--border)] h-[320px] bg-[#eef3e5]">
          <iframe
            title="LDRI map - One Padmore Place"
            src="https://www.google.com/maps?q=One%20Padmore%20Place%2C%20Kilimani%2C%20Nairobi&z=15&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div className="mt-2 flex justify-end">
          <a href="https://www.google.com/maps/search/?api=1&query=One%20Padmore%20Place%20Kilimani%20Nairobi" target="_blank" className="inline-flex text-[12px] font-semibold text-[#4a8c3f] hover:underline">Open in Google Maps - One Padmore Place</a>
        </div>
      </div>
    </div>
  );
}
