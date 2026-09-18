import { useEffect } from "react";
import { Modal, Form, Input, Select, Button, InputNumber, Alert, message } from "antd";
import api from "../../../lib/api";

const { Option } = Select;

function AddEmployeeModal({
  open,
  onClose,
  refreshEmployees,
  editingEmployee,
  departments,
  managerMode = false,
}) {
  const [form] = Form.useForm();
  const role = Form.useWatch("role", form);

  useEffect(() => {
    if (editingEmployee) {
      form.setFieldsValue({
        name: editingEmployee.name,
        userEmail: editingEmployee.userEmail,
        phone: editingEmployee.phone,
        departmentId: editingEmployee.departmentId?._id,
        designation: editingEmployee.designation,
        role: managerMode ? "employee" : editingEmployee.role,
        weeklyCapacity: editingEmployee.weeklyCapacity,
        employmentType: editingEmployee.employmentType,
        experience: editingEmployee.experience ?? 0,
        skills: Array.isArray(editingEmployee.skills)
          ? editingEmployee.skills.join(", ")
          : editingEmployee.skills || "",
      });
    } else {
      form.resetFields();
      if (managerMode) {
        form.setFieldValue("role", "employee");
      }
      form.setFieldValue("experience", 0);
      form.setFieldValue("weeklyCapacity", 40);
      form.setFieldValue("employmentType", "Full Time");
    }
  }, [editingEmployee, form, managerMode]);

  const handleSubmit = async (values) => {
    try {
      const skills = Array.isArray(values.skills)
        ? values.skills
        : typeof values.skills === "string"
          ? values.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
          : [];

      const employeeValues = {
        ...values,
        role: managerMode ? "employee" : values.role,
        experience: Number(values.experience || 0),
        skills,
      };

      if (employeeValues.role === "manager") {
        delete employeeValues.departmentId;
      }

      if (editingEmployee) {
        await api.put(
          `/user/update/${editingEmployee._id}`,
          employeeValues
        );
      } else {
        await api.post("/user/create", employeeValues);
      }

      await refreshEmployees();

      form.resetFields();

      onClose();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Unable to save employee details"
      );
    }
  };

  return (
    <Modal
      title={editingEmployee ? "Update Employee" : "Add New Employee"}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width="min(700px, calc(100vw - 24px))"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="userEmail"
            rules={[
              { required: true },
              { type: "email" },
            ]}
          >
            <Input placeholder="employee@email.com" />
          </Form.Item>

          {!editingEmployee && (
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, min: 6 }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
          )}

          <Form.Item
            label="Phone"
            name="phone"
          >
            <Input placeholder="+91 9876543210" />
          </Form.Item>

          {role === "manager" ? (
            <Alert
              className="mb-1"
              type="info"
              showIcon
              message="Assign departments from the Departments section after creating the manager."
            />
          ) : (
            <Form.Item
              label="Department"
              name="departmentId"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Department">
                {departments.map((department) => (
                  <Option
                    key={department._id}
                    value={department._id}
                  >
                    {department.departmentName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            label="Designation"
            name="designation"
            rules={[{ required: true }]}
          >
            <Input placeholder="Frontend Developer" />
          </Form.Item>

          {!managerMode && <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="employee">Employee</Option>
              <Option value="manager">Manager</Option>
            </Select>
          </Form.Item>}

          <Form.Item
            label="Experience (Years)"
            name="experience"
            initialValue={0}
          >
            <InputNumber
              className="w-full"
              min={0}
              max={50}
            />
          </Form.Item>

          <Form.Item
            label="Weekly Capacity"
            name="weeklyCapacity"
            initialValue={40}
          >
            <InputNumber
              className="w-full"
              min={1}
              max={80}
            />
          </Form.Item>

          <Form.Item
            label="Employment Type"
            name="employmentType"
            initialValue="Full Time"
          >
            <Select>
              <Option value="Full Time">Full Time</Option>
              <Option value="Part Time">Part Time</Option>
              <Option value="Intern">Intern</Option>
              <Option value="Contract">Contract</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Skills"
            name="skills"
            className="sm:col-span-2"
          >
            <Input placeholder="React, Node.js, SQL, Communication" />
          </Form.Item>

        </div>

        <div className="flex justify-end gap-3 mt-4">

          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
          >
            {editingEmployee ? "Update Employee" : "Add Employee"}
          </Button>

        </div>

      </Form>
    </Modal>
  );
}

export default AddEmployeeModal;