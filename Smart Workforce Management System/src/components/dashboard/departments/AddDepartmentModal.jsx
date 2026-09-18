import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, InputNumber, Select, message } from "antd";
import api from "../../../lib/api";

const { Option } = Select;

function AddDepartmentModal({ open, onClose, refreshDepartments, editingDepartment, managers = [] }) {
  const [form] = Form.useForm();

  useEffect(() => {

    if (editingDepartment) {

      form.setFieldsValue({

        departmentName: editingDepartment.departmentName,

        departmentCode: editingDepartment.departmentCode,

        description: editingDepartment.description,

        managerId:
          typeof editingDepartment.managerId === "object"
            ? editingDepartment.managerId?._id
            : editingDepartment.managerId,

        maxWeeklyCapacity:
          editingDepartment.maxWeeklyCapacity,

      });

    } 
    else {
      form.resetFields();
    }
  }, [editingDepartment, form]);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {

    try {
        setSubmitting(true);

        if (editingDepartment) {

          await api.put(`/department/update/${editingDepartment._id}`, values);

        } else {
        await api.post("/department/create", values);
      }
      await refreshDepartments();
      message.success(editingDepartment ? "Department updated successfully" : "Department created successfully");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error(error.response?.data?.message || "Unable to save department");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={editingDepartment ? "Edit Department" : "Add New Department"}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width="min(700px, calc(100vw - 24px))"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Form.Item
            label="Department Name"
            name="departmentName"
            rules={[
              {
                required: true,
                message: "Please enter department name",
              },
            ]}
          >
            <Input placeholder="e.g. Development" />
          </Form.Item>
          <Form.Item
            label="Department Code"
            name="departmentCode"
            rules={[
              {
                required: true,
                message: "Please enter department code",
              },
            ]}
          >
            <Input placeholder="e.g. DEV" />
          </Form.Item>
          <Form.Item label="Manager" name="managerId">
            <Select placeholder="Assign later" allowClear>
              {managers.map((manager) => (
                <Option key={manager._id} value={manager._id}>
                  {manager.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Maximum Weekly Capacity"
            name="maxWeeklyCapacity"
            initialValue={160}
            rules={[
              {
                required: true,
                message: "Please enter maximum weekly capacity",
              },
            ]}
          >
            <InputNumber className="w-full" min={1} placeholder="160" />
          </Form.Item>
        </div>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} placeholder="Enter department description" />
        </Form.Item>
        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={submitting}>
            {editingDepartment ? "Update Department" : "Add Department"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddDepartmentModal;
