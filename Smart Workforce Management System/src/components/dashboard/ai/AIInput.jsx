import { useState } from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import api from "../../../lib/api";

function AIInput({ onMessage, loading }) {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    const prompt = message.trim();
    if (!prompt) return;
    onMessage({ role: "user", text: prompt });
    setMessage("");
    try {
      const response = await api.post("/ai/chat", { message: prompt });
      onMessage({ role: "assistant", text: response.data.reply });
    } catch (error) {
      onMessage({
        role: "assistant",
        text: error.response?.data?.message || "AI assistant is unavailable right now.",
      });
    }
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">

      <div className="flex gap-3">

        <Input
          size="large"
          placeholder="Ask AI about workload, employees, projects..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handleSend}
          disabled={loading}
        />

        <Button
          type="primary"
          size="large"
          icon={<SendOutlined />}
          onClick={handleSend}
          loading={loading}
        >
          Send
        </Button>

      </div>

    </div>
  );
}

export default AIInput;