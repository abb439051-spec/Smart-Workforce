import { Modal, Form, Input, Button, message } from "antd";
import api from "../../../lib/api";

function EditProfileModal({
  open,
  onClose,
  user,
  onUpdated,
}) {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await api.put("/auth/profile", values);
      onUpdated(response.data.user);
      message.success("Profile updated successfully");
      onClose();
    } catch (error) {
      message.error(error.response?.data?.message || "Unable to update profile");
    }
  };

  return (
    <Modal
      title="Edit Profile"
      open={open}
      onCancel={onClose}
      footer={null}
      width="min(750px, calc(100vw - 24px))"
      centered
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          name: user?.name,
          email: user?.userEmail,
          phone: user?.phone,
          designation: user?.designation,
          address: user?.address,
          companyName: user?.workspaceId?.companyName,
          skills: Array.isArray(user?.skills) ? user.skills.join(", ") : user?.skills || "",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
            ]}
          >
            <Input placeholder="John Smith" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
              {
                type: "email",
              },
            ]}
          >
            <Input disabled value={user?.userEmail} />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
          >
            <Input placeholder="+91 98745XXXXX" />
          </Form.Item>

          <Form.Item
            label="Designation"
            name="designation"
          >
            <Input placeholder="Senior Frontend Developer" />
          </Form.Item>

          {user?.role === "admin" && (
            <Form.Item
              label="Company Name"
              name="companyName"
              rules={[{ required: true, message: "Please enter your company name" }]}
            >
              <Input placeholder="Your company name" />
            </Form.Item>
          )}

        </div>

        <Form.Item
          label="Skills"
          name="skills"
        >
          <Input placeholder="React, Node.js, Leadership, Communication" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
        >
          <Input.TextArea
            rows={3}
            placeholder="Enter address..."
          />
        </Form.Item>


        <div className="flex justify-end gap-3 mt-6">

          <Button
            size="large"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
          >
            Save Changes
          </Button>

        </div>

      </Form>
    </Modal>
  );
}

export default EditProfileModal;