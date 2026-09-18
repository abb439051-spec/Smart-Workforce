import { useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import api from "../../../lib/api";

function ContactAdminModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);

  const submit = async (values) => {
    try {
      setLoading(true);
      await api.post("/notification/manager-message", values);
      message.success("Your message was sent to the administrator.");
      onClose();
    } catch (error) {
      message.error(error.response?.data?.message || "Unable to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Contact administrator" open={open} onCancel={onClose} footer={null} destroyOnClose>
      <p className="mb-5 text-sm text-slate-500">Send a private message to the administrators of your workspace.</p>
      <Form layout="vertical" onFinish={submit}>
        <Form.Item label="Subject" name="subject" rules={[{ required: true, message: "Enter a subject" }]}><Input placeholder="What do you need help with?" /></Form.Item>
        <Form.Item label="Message" name="message" rules={[{ required: true, message: "Enter your message" }]}><Input.TextArea rows={5} maxLength={2000} showCount placeholder="Write your message..." /></Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} className="!w-full !rounded-lg !bg-blue-600">Send message</Button>
      </Form>
    </Modal>
  );
}

export default ContactAdminModal;
