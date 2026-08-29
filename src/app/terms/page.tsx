import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — RICH",
  description: "Terms of Service for the Regional Innovation and Climate Hub (RICH) Knowledge Repository.",
};

export default function TermsPage() {
  return (
    <div className="bg-[var(--background)]">
      <div className="mx-auto max-w-[800px] px-6 lg:px-10 py-16 lg:py-20">
        <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#4a8c3f]">Legal</p>
        <h1 className="mt-3 text-[36px] font-medium leading-tight text-[var(--text-dark)]" style={{ fontFamily: "Playfair Display, serif" }}>
          Terms of Service
        </h1>
        <p className="mt-3 text-[14px] text-[var(--text-light)]">Last updated: 29 August 2026 — Regional Innovation and Climate Hub (RICH)</p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-7 text-[var(--text-mid)]">
          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">1. Acceptance</h2>
            <p className="mt-3">
              By accessing or using <strong>richafrica.vercel.app</strong> (the &quot;Platform&quot;), you agree to these Terms and our{" "}
              <a href="/privacy" className="text-[#4a8c3f] underline">Privacy Policy</a>. If you do not agree, please do not use the
              Platform. The Platform is operated by the Regional Innovation and Climate Hub (RICH), hosted by the Local Development Research
              Institute (LDRI).
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">2. Purpose</h2>
            <p className="mt-3">
              RICH is a curated knowledge repository for climate AI innovation in Africa: research outputs, innovation case studies, ecosystem
              insights and policy resources. Content is provided for information and learning purposes; it does not constitute professional,
              legal or financial advice.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">3. Accounts</h2>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>You must provide accurate information and keep your credentials confidential. You are responsible for activity under your account.</li>
              <li>You may register with email/password or via Google OAuth. We may suspend or terminate accounts that violate these Terms.</li>
              <li>You must be at least 16 years old to create an account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">4. Contributions &amp; licensing</h2>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>By submitting a resource you confirm you have the right to share it and that it does not infringe third-party rights.</li>
              <li>You retain ownership of your submission. You grant RICH a non-exclusive, worldwide, royalty-free licence to host, reproduce, adapt, translate, and make it publicly available on the Platform in perpetuity, with attribution to you.</li>
              <li>Submissions are reviewed; RICH may edit for clarity, reject, or remove content at its discretion. Decisions on publication are final.</li>
              <li>You are solely responsible for the accuracy of your submission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">5. Acceptable use</h2>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Do not upload unlawful, infringing, defamatory, or harmful content; spam; malware; or content that harvests personal data.</li>
              <li>Do not attempt to bypass security, scrape at scale without permission, or interfere with the Platform&apos;s operation.</li>
              <li>Respect attribution — cite resources properly and do not misrepresent affiliation with RICH/LDRI.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">6. Intellectual property</h2>
            <p className="mt-3">
              The Platform design, logo and curated metadata are owned by LDRI/RICH. Third-party resources remain the property of their
              authors/owners and are made available under their stated licences. If you believe content infringes your rights, contact{" "}
              <a href="mailto:thinking@developlocal.org" className="text-[#4a8c3f] underline">thinking@developlocal.org</a> with details.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">7. Third-party links &amp; services</h2>
            <p className="mt-3">
              The Platform links to external sites and uses Google OAuth, Supabase and Vercel. We are not responsible for external content or
              their terms/privacy practices. Use at your own discretion.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">8. Disclaimers</h2>
            <p className="mt-3">
              The Platform is provided &quot;as is&quot; without warranties of any kind. RICH does not guarantee completeness, accuracy,
              timeliness or availability. Use of content is at your own risk. To the extent permitted by law, RICH/LDRI disclaims liability
              for any loss or damage arising from use of the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">9. Termination</h2>
            <p className="mt-3">
              We may suspend or terminate access for breach of these Terms, legal requirements, or to protect the Platform. You may delete
              your account via the dashboard or by emailing us — see Privacy Policy for data retention.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">10. Changes</h2>
            <p className="mt-3">
              We may update these Terms to reflect Platform or legal changes. Updated Terms will be posted here with a new &quot;Last
              updated&quot; date. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">11. Governing law</h2>
            <p className="mt-3">
              These Terms are governed by the laws of Kenya. Disputes shall be submitted to the courts of Nairobi, Kenya, without prejudice
              to mandatory consumer protections in your jurisdiction.
            </p>
          </section>

          <section className="rounded-[8px] border border-[var(--border)] bg-[var(--off-white)] dark:bg-[#1a221a] p-6">
            <h2 className="text-[16px] font-bold text-[var(--text-dark)]">Contact</h2>
            <p className="mt-2 text-[14px] leading-6">
              Regional Innovation and Climate Hub (RICH) — Local Development Research Institute<br />
              Email: <a href="mailto:thinking@developlocal.org" className="text-[#4a8c3f] underline">thinking@developlocal.org</a>
              <br />
              Phone: <a href="tel:+254718610298" className="text-[#4a8c3f] underline">+254 718 610298</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
