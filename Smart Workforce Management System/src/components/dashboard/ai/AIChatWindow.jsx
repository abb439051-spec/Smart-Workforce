import { Avatar } from "antd";
import { FaRobot } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";

function AIChatWindow({ messages, loading }) {

  return (
    <div className="flex max-h-[460px] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b border-gray-100 bg-slate-50/80 px-6 py-4">
        <p className="text-sm font-semibold text-gray-800">Conversation</p>
        <p className="text-xs text-gray-500">Answers are based on current workspace data.</p>
      </div>
      <div className="space-y-5 overflow-y-auto p-5">

        {!messages.length && (
          <div className="flex gap-3">
            <Avatar icon={<FaRobot />} className="bg-blue-600" />
            <div className="bg-gray-100 rounded-2xl px-5 py-3 max-w-xl">
              Ask about your real employees, tasks, projects, or workload.
            </div>
          </div>
        )}
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
            {message.role === "assistant" && <Avatar icon={<FaRobot />} className="bg-blue-600" />}
            <div className={`${message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100"} rounded-2xl px-5 py-3 max-w-xl`}>
              {message.text}
            </div>
            {message.role === "user" && <Avatar icon={<UserOutlined />} />}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <Avatar icon={<FaRobot />} className="bg-blue-600" />
            <div className="rounded-2xl bg-gray-100 px-5 py-3 text-sm text-gray-500">Analyzing workspace data...</div>
          </div>
        )}

      </div>

    </div>
  );
}

export default AIChatWindow;