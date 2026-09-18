import { Modal, message, Button, Form, Input } from "antd";
import api from "../../../lib/api";

function ChangeEmployeePasswordModal({ open, employee, onClose }) {
  const [form] = Form.useForm();

  const handleChangePassword = async (values) => {
    try {
      if (!employee?._id) {
        message.error("Employee record is missing.");
        return;
      }

      await api.put(`/user/change-password/${employee._id}`, {
        password: values.password,
      });
      message.success("Password changed successfully.");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error(error.response?.data?.message || "Unable to change password");
    }
  };

  return (
    <Modal
      title={`Reset password for ${employee?.name || "user"}`}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleChangePassword}>
        <Form.Item
          label="New password"
          name="password"
          rules={[
            { required: true, message: "Enter a new password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Confirm the new password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>
        <div className="flex justify-end gap-3">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">Change password</Button>
        </div>
      </Form>
    </Modal>
  );
}

export default ChangeEmployeePasswordModal;
