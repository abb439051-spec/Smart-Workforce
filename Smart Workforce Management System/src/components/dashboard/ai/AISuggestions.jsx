function AISuggestions({ onSelect }) {

  const suggestions = [
    "Which employees are overloaded?",
    "Why is the Marketing team slower this month?",
    "Which project is at risk?",
    "Show productivity trends.",
    "Recommend task allocation.",
    "Predict project delays.",
  ];

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

      <h2 className="text-lg font-semibold text-gray-800">Suggested Questions</h2>
      <p className="mb-5 mt-1 text-sm text-gray-500">Use a prompt or write your own below.</p>

      <div className="grid gap-3">

        {suggestions.map((item) => (

          <button
            key={item}
            onClick={() => onSelect(item)}
            className="rounded-xl border p-3 text-left text-sm text-gray-600 transition hover:border-blue-500 hover:bg-blue-50"
          >
            {item}
          </button>

        ))}

      </div>

    </div>
  );
}

export default AISuggestions;