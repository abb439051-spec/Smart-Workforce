function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 text-slate-700">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Privacy Policy</p>
        <h1 className="text-4xl font-bold text-slate-900">Privacy Policy</h1>

        <div className="mt-8 space-y-6 text-base leading-8">
          <p>
            Smart Workforce is committed to protecting the privacy and security of the people and organizations who use our platform.
            We collect only the information necessary to provide workforce management, analytics, and communication features safely and effectively.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Information We Collect</h2>
          <p>
            We may collect workspace details, employee information, task and project activity, department data, login and usage metadata,
            and contact information required for account setup, communication, and system operations.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">How We Use It</h2>
          <p>
            We use this information to operate the platform, assign roles and permissions, generate productivity insights,
            support notifications and reports, improve system reliability, and communicate relevant service updates.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Data Security</h2>
          <p>
            We use industry-standard safeguards to protect access to user data, including secure authentication, encrypted communication,
            permission-based access, and secure storage practices for application data.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Third-Party Services</h2>
          <p>
            We may use analytics, email delivery, and hosting services needed to operate the platform. These providers are used only to
            support the product and must comply with appropriate security and privacy standards.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Your Rights</h2>
          <p>
            You may request access to your account information, update contact details, or ask for removal of information where applicable
            under the law and platform requirements. We will respond to valid requests in a reasonable timeframe.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Continued use of the platform after changes indicates acceptance of the updated policy.
          </p>
        </div>
      </div>
    </main>
  );
}

export default PrivacyPolicy;
