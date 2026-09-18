import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free Trial",
    price: "₹0",
    duration: "3-day trial",
    description: "Try the platform with core workspace tools before committing.",
    button: "Start free trial",
    featured: false,
    route: "/register",
    features: [
      "Up to 10 employees",
      "Basic dashboard access",
      "Task management",
      "Department overview",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "₹1,499",
    duration: "/month",
    description: "Best for growing teams that need advanced productivity and AI insights.",
    button: "Choose plan",
    featured: true,
    route: "/register",
    features: [
      "Unlimited employees",
      "AI productivity insights",
      "Predictive workforce analytics",
      "Manager and admin controls",
      "Priority support",
      "Advanced project reporting",
    ],
  },
];

function PricingSection() {
  return (
    <section className="py-28 bg-slate-950" id="pricing">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Pricing</p>
          <h2 className="mt-5 text-5xl font-bold text-white">Simple plans for growing teams</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            Start with a 3-day free trial, then move to a flexible monthly plan when your team is ready.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.featured
                  ? "scale-[1.02] border-blue-500 bg-gradient-to-br from-blue-600 to-indigo-700 text-white"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-slate-900">
                  Most Popular
                </span>
              )}

              <h3 className="text-3xl font-bold">{plan.name}</h3>
              <p className={`mt-4 ${plan.featured ? "text-blue-100" : "text-slate-500"}`}>
                {plan.description}
              </p>

              <div className="mt-8">
                <span className="text-5xl font-bold">{plan.price}</span>
                {plan.duration && <span className={`text-lg ${plan.featured ? "text-blue-100" : "text-slate-500"}`}> {plan.duration}</span>}
              </div>

              <div className="mt-8 space-y-4 py-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className={plan.featured ? "text-white" : "text-green-500"} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to={plan.route}
                className={`mt-10 inline-flex w-full items-center justify-center rounded-xl py-4 font-semibold transition ${
                  plan.featured
                    ? "bg-black text-white hover:bg-slate-900"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {plan.button}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;