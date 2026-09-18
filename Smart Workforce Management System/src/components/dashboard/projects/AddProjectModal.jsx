import { useEffect } from "react";
import api from "../../../lib/api";
import dayjs from "dayjs";

import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  message,
  InputNumber,
} from "antd";

const { TextArea } = Input;

function AddProjectModal({
  open,
  onClose,
 refreshProjects,
  editingProject,
  departments,
  managers,
  employees,
}) {

  const [form] = Form.useForm();

  useEffect(() => {

    if (editingProject) {

      form.setFieldsValue({

        projectName: editingProject.projectName,

        projectCode: editingProject.projectCode,

        description: editingProject.description,

        departmentId: editingProject.departmentId?._id,

        managerId: editingProject.managerId?._id,
        teamMembers: editingProject.teamMembers?.map((member) => member._id) || [],

        priority: editingProject.priority,

        status: editingProject.status,

        estimatedHours: editingProject.estimatedHours,

        startDate: editingProject.startDate
          ? dayjs(editingProject.startDate)
          : null,

        endDate: editingProject.endDate
          ? dayjs(editingProject.endDate)
          : null,

      });

    } else {

      form.resetFields();

    }

  }, [editingProject, form]);

  const handleSubmit = async (values) => {

    try {

      const payload = {
        ...values,
        projectCode: values.projectCode?.trim() || undefined,
        managerId: values.managerId || undefined,
        teamMembers: values.teamMembers || [],
        estimatedHours: Number(values.estimatedHours || 0),

        startDate: values.startDate.format("YYYY-MM-DD"),

        endDate: values.endDate.format("YYYY-MM-DD"),

      };

      if (editingProject) {

        await api.put(
          `/project/update/${editingProject._id}`,
          payload
        );

        message.success("Project updated successfully");

      } else {

        await api.post("/project/create", payload);

        message.success("Project created successfully");

      }

      refreshProjects();

      form.resetFields();

      onClose();

    } catch (error) {

      message.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return (

    <Modal
      title={
        editingProject
          ? "Edit Project"
          : "Create New Project"
      }
      open={open}
      footer={null}
      onCancel={onClose}
      centered
      width="min(750px, calc(100vw - 24px))"
    >

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <Form.Item
            label="Project Name"
            name="projectName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Team Members" name="teamMembers">
            <Select mode="multiple" allowClear placeholder="Select employees">
              {(employees || []).map((employee) => (
                <Select.Option key={employee._id} value={employee._id}>
                  {employee.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Project Code"
            name="projectCode"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Department"
            name="departmentId"
            rules={[{ required: true }]}
          >
            <Select>

              {departments.map((department) => (

                <Select.Option
                  key={department._id}
                  value={department._id}
                >
                  {department.departmentName}
                </Select.Option>

              ))}

            </Select>
          </Form.Item>

          <Form.Item
            label="Project Manager"
            name="managerId"
          >
            <Select allowClear>

              {managers.map((manager) => (

                <Select.Option
                  key={manager._id}
                  value={manager._id}
                >
                  {manager.name}
                </Select.Option>

              ))}

            </Select>
          </Form.Item>

          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true }]}
          >
            <Select>

              <Select.Option value="Low">
                Low
              </Select.Option>

              <Select.Option value="Medium">
                Medium
              </Select.Option>

              <Select.Option value="High">
                High
              </Select.Option>

              <Select.Option value="Critical">
                Critical
              </Select.Option>

            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            initialValue="Planning"
          >
            <Select>

              <Select.Option value="Planning">
                Planning
              </Select.Option>

              <Select.Option value="Active">
                Active
              </Select.Option>

              <Select.Option value="On Hold">
                On Hold
              </Select.Option>

              <Select.Option value="Completed">
                Completed
              </Select.Option>

            </Select>
          </Form.Item>

          <Form.Item
            label="Estimated Hours"
            name="estimatedHours"
          >
            <InputNumber
              min={0}
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <div className="col-span-2">

            <Form.Item
              label="Description"
              name="description"
            >
              <TextArea rows={4} />
            </Form.Item>

          </div>

        </div>

        <div className="flex justify-end gap-3 mt-4">

          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
          >
            {editingProject
              ? "Update Project"
              : "Create Project"}
          </Button>

        </div>

      </Form>

    </Modal>

  );

}

export default AddProjectModal;