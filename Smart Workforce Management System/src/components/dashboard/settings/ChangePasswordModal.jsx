import { Modal, Form, Input, Button } from "antd";

function ChangePasswordModal({
  open,
  onClose,
}) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log(values);

    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Change Password"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width="min(550px, calc(100vw - 24px))"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[
            {
              required: true,
              message: "Please enter your current password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please enter a new password",
            },
            {
              min: 8,
              message: "Password must be at least 8 characters",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  getFieldValue("newPassword") === value
                ) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("Passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className="flex justify-end gap-3 mt-6">

          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
          >
            Update Password
          </Button>

        </div>

      </Form>
    </Modal>
  );
}

export default ChangePasswordModal;