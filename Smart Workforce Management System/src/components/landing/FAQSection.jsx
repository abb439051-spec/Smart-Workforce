import { Collapse } from "antd";

const items = [
  {
    key: "1",
    label: "How is productivity measured?",
    children: (
      <p>
        Productivity is calculated using task completion rates, focus hours,
        goal achievement, attendance trends, and AI-generated workforce
        analytics instead of simply tracking working hours.
      </p>
    ),
  },
  {
    key: "2",
    label: "Does the platform monitor employees?",
    children: (
      <p>
        No. The platform focuses on productivity insights and workforce
        analytics rather than invasive employee monitoring. It analyzes
        operational data to support better decision-making.
      </p>
    ),
  },
  {
    key: "3",
    label: "Can it integrate with existing tools?",
    children: (
      <p>
        Yes. The system is designed to integrate with popular project
        management, HR, attendance, and collaboration platforms through APIs.
      </p>
    ),
  },
  {
    key: "4",
    label: "Is employee data secure?",
    children: (
      <p>
        Absolutely. Data is encrypted, securely stored, and protected using
        role-based access control and modern security practices.
      </p>
    ),
  },
  {
    key: "5",
    label: "Can AI predict project delays?",
    children: (
      <p>
        Yes. AI analyzes workload distribution, historical performance, and
        project progress to identify potential delays before they occur.
      </p>
    ),
  },
  {
    key: "6",
    label: "Does it support remote teams?",
    children: (
      <p>
        Yes. The platform supports hybrid and remote teams by providing
        centralized workforce visibility, productivity analytics, and
        collaboration insights.
      </p>
    ),
  },
];

function FAQSection() {
  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-blue-600 font-semibold">
            Frequently Asked Questions
          </p>

          <h2 className="text-5xl font-bold mt-5">
            Everything You Need to Know
          </h2>

          <p className="text-lg text-slate-600 mt-6">
            Have questions? We've answered the most common ones below.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-4">
          <Collapse
            accordion
            size="large"
            items={items}
          />
        </div>

      </div>
    </section>
  );
}

export default FAQSection;