function TermsOfService() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 text-slate-700">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Terms of Service</p>
        <h1 className="text-4xl font-bold text-slate-900">Terms of Service</h1>

        <div className="mt-8 space-y-6 text-base leading-8">
          <p>
            By using Smart Workforce, you agree to use the platform responsibly and in accordance with your organization’s internal policies,
            applicable laws, and the permissions granted to your workspace.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Account Responsibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your workspace.
            Users must ensure they do not misuse access to employee, project, or department information.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Permitted Use</h2>
          <p>
            Smart Workforce is intended for workforce planning, project tracking, reporting, communication, and operational insight within a valid business context.
            The platform may not be used for unlawful, abusive, deceptive, or unauthorized activity.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Service Availability</h2>
          <p>
            We strive to maintain the platform reliably, but service availability may vary due to maintenance, updates, power interruptions,
            internet issues, or third-party provider disruptions beyond our control.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Intellectual Property</h2>
          <p>
            Smart Workforce and its related features, content, and branding remain the property of the product owner unless otherwise stated.
            Customers may use the platform according to the agreed workspace access and subscription terms.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Limitation of Liability</h2>
          <p>
            Smart Workforce is provided on an “as is” basis. We do not guarantee uninterrupted access or complete accuracy of all insights,
            forecasts, or recommendations generated through the platform.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Changes to Terms</h2>
          <p>
            These terms may be updated as the product evolves. Continued use of the platform after updates means you accept the revised conditions.
          </p>
        </div>
      </div>
    </main>
  );
}

export default TermsOfService;
