import { useState } from "react";
import { useEffect } from "react";
import api from "../../lib/api";

import AIHeader from "../../components/dashboard/ai/AIHeader";
import AIQuickActions from "../../components/dashboard/ai/AIQuickActions";
import AIChatWindow from "../../components/dashboard/ai/AIChatWindow";
import AIInput from "../../components/dashboard/ai/AIInput";
import AIResultCard from "../../components/dashboard/ai/AIResultCard";
import AISuggestions from "../../components/dashboard/ai/AISuggestions";

function AIAssistant() {
  const [selectedAction, setSelectedAction] = useState("");
  const [messages, setMessages] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionKey, setActionKey] = useState(0);

  useEffect(() => {
    api.get("/analytics/dashboard")
      .then((response) => setAnalytics(response.data.data))
      .catch((error) => console.error("AI snapshot error:", error));
  }, []);

  useEffect(() => {
    if (!selectedAction) return;
    let active = true;
    setLoading(true);
    setMessages((current) => [...current, { role: "user", text: selectedAction }]);
    api.post("/ai/chat", { message: selectedAction })
      .then((response) => {
        if (active) {
          setMessages((current) => [...current, { role: "assistant", text: response.data.reply }]);
        }
      })
      .catch((error) => {
        if (active) {
          setMessages((current) => [
            ...current,
            { role: "assistant", text: error.response?.data?.message || "AI assistant is unavailable right now." },
          ]);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [selectedAction, actionKey]);

  const handleActionSelect = (prompt) => {
    setSelectedAction(prompt);
    setActionKey((current) => current + 1);
  };

  return (
    <div className="space-y-7">

      <AIHeader />

      <AIQuickActions
        onActionSelect={handleActionSelect}
      />

      <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-3">

        <div className="space-y-4 xl:col-span-2">
          <AIChatWindow messages={messages} loading={loading} />
          <AIInput
            loading={loading}
            onMessage={(message) => setMessages((current) => [...current, message])}
          />
        </div>

        <div className="space-y-6">
          <AIResultCard analytics={analytics} />
        </div>

      </div>

      <AISuggestions onSelect={handleActionSelect} />

    </div>
  );
}

export default AIAssistant;