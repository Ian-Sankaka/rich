import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - RICH",
  description: "Privacy Policy for the Regional Innovation and Climate Hub (RICH) Knowledge Repository.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--background)]">
      <div className="mx-auto max-w-[800px] px-6 lg:px-10 py-16 lg:py-20">
        <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#4a8c3f]">Legal</p>
        <h1 className="mt-3 text-[36px] font-medium leading-tight text-[var(--text-dark)]" style={{ fontFamily: "Playfair Display, serif" }}>
          Privacy Policy
        </h1>
        <p className="mt-3 text-[14px] text-[var(--text-light)]">Last updated: 29 August 2026 - Regional Innovation and Climate Hub (RICH), hosted by Local Development Research Institute</p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-7 text-[var(--text-mid)]">
          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">1. Who we are</h2>
            <p className="mt-3">
              The RICH Knowledge Repository (<strong>richafrica.vercel.app</strong>) is operated by the Regional Innovation and Climate
              Hub (RICH), hosted by the Local Development Research Institute (LDRI), Nairobi, Kenya. Contact:{" "}
              <a href="mailto:thinking@developlocal.org" className="text-[#4a8c3f] underline">thinking@developlocal.org</a> - Tel:{" "}
              <a href="tel:+254718610298" className="text-[#4a8c3f] underline">+254 718 610298</a>.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">2. What we collect</h2>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li><strong>Account information:</strong> name, email address and profile image when you register directly or via Google OAuth (Sign in with Google). We receive only basic profile data (name, email, avatar) from Google.</li>
              <li><strong>Submissions:</strong> resources, case studies and metadata you submit through the contribution pathway.</li>
              <li><strong>Usage data:</strong> pages viewed, search queries, device/browser info and approximate location via standard web logs and analytics.</li>
              <li><strong>Cookies:</strong> essential session cookies to keep you signed in, plus preferences (theme). No advertising cookies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">3. How we use it</h2>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>To create and manage your account and authenticate you (including secure sign-in with Google).</li>
              <li>To review, publish and attribute contributed resources.</li>
              <li>To improve the repository, respond to enquiries and send essential service updates (you may opt out of the newsletter).</li>
              <li>To comply with legal obligations and protect against misuse.</li>
            </ul>
            <p className="mt-3">We do not sell your personal data and we do not use it for third-party advertising.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">4. Legal basis &amp; sharing</h2>
            <p className="mt-3">
              Processing is based on contract (providing the account/service), legitimate interest (improving the platform, security) and
              consent (newsletter, Google OAuth). We share data only with service providers who help us run the platform:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li><strong>Secure hosting and database providers</strong> who store and process data on our behalf</li>
              <li><strong>Google</strong> (only if you choose Sign in with Google - Google&apos;s Privacy Policy applies)</li>
            </ul>
            <p className="mt-3">All providers are contractually bound to protect your data. We do not transfer data outside Kenya/EU except as needed to provide the service.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">5. Retention</h2>
            <p className="mt-3">
              Account data is kept while your account is active. You may request deletion at any time - we will delete or anonymise your
              account within 30 days, except where retention is required by law or to resolve disputes. Published resources remain
              attributed unless you request removal.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">6. Your rights</h2>
            <p className="mt-3">
              You may access, correct or delete your personal data, object to processing, or withdraw consent by contacting{" "}
              <a href="mailto:thinking@developlocal.org" className="text-[#4a8c3f] underline">thinking@developlocal.org</a>. Where
              applicable under Kenyan Data Protection Act (2019) and GDPR, you may lodge a complaint with the Office of the Data Protection
              Commissioner (Kenya) or your local authority.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">7. Security</h2>
            <p className="mt-3">
              We use HTTPS, encrypted passwords, secure httpOnly cookies and role-based access controls. No system is 100% secure -
              please use a strong, unique password and notify us of any suspected breach.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">8. Children</h2>
            <p className="mt-3">The repository is not directed at children under 16. We do not knowingly collect data from children.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[var(--text-dark)]">9. Changes</h2>
            <p className="mt-3">
              We may update this policy to reflect legal or operational changes. We will post the new version here with a new &quot;Last
              updated&quot; date and, for material changes, notify you by email or in-app notice.
            </p>
          </section>

          <section className="rounded-[8px] border border-[var(--border)] bg-[var(--off-white)] dark:bg-[#1a221a] p-6">
            <h2 className="text-[16px] font-bold text-[var(--text-dark)]">Contact</h2>
            <p className="mt-2 text-[14px] leading-6">
              Regional Innovation and Climate Hub (RICH) - Local Development Research Institute<br />
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
