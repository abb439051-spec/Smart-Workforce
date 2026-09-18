import { useEffect } from "react";
import api from "../../../../lib/api";
import dayjs from "dayjs";

import {
  Modal,
  Form,
  Input,
  message,
} from "antd";

import TaskBasicInfo from "./TaskBasicInfo";
import TaskAssignment from "./TaskAssignment";
import TaskDetails from "./TaskDetails";
import TaskProgress from "./TaskProgress";
import TaskFormActions from "./TaskFormActions";

function AddTaskModal({
  open,
  onClose,
  refreshTasks,
  editingTask,
  projects = [],
  employees = [],
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) return;

    if (editingTask) {
      form.setFieldsValue({
        taskName: editingTask.taskName,

        taskCode: editingTask.taskCode,

        taskType:
          editingTask.taskType ||
          "Development",

        description:
          editingTask.description || "",

        projectId:
          editingTask.projectId?._id ||
          editingTask.projectId,

        departmentId:
          editingTask.departmentId?._id ||
          editingTask.departmentId,

        assignedTo:
          editingTask.assignedTo?._id ||
          editingTask.assignedTo,

        priority:
          editingTask.priority,

        status:
          editingTask.status,

        estimatedHours:
          editingTask.estimatedHours || 0,

        actualHours:
          editingTask.actualHours || 0,

        completionPercentage:
          editingTask.completionPercentage || 0,

        remarks:
          editingTask.remarks || "",

        startDate:
          editingTask.startDate
            ? dayjs(editingTask.startDate)
            : null,

        dueDate:
          editingTask.dueDate
            ? dayjs(editingTask.dueDate)
            : null,
      });
    } else {
      form.resetFields();

      form.setFieldsValue({
        taskType: "Development",
        priority: "Medium",
        status: "Todo",
        estimatedHours: 0,
        actualHours: 0,
        completionPercentage: 0,
      });
    }
  }, [
    open,
    editingTask,
    form,
  ]);

  const handleProjectChange = (
    projectId
  ) => {
    const selectedProject =
      projects.find(
        (project) =>
          project._id === projectId
      );

    const departmentId =
      selectedProject?.departmentId?._id ||
      selectedProject?.departmentId ||
      null;

    form.setFieldValue(
      "departmentId",
      departmentId
    );

    /*
     * Clear the employee when the
     * project changes.
     *
     * TaskAssignment will then ask
     * AI for a new recommendation.
     */
    form.setFieldValue(
      "assignedTo",
      undefined
    );
  };

  const handleSubmit = async (
    values
  ) => {
    try {
      const payload = {
        ...values,
        taskCode: values.taskCode?.trim() || undefined,
        estimatedHours: Number(values.estimatedHours || 0),

        startDate:
          values.startDate
            ? values.startDate.format(
                "YYYY-MM-DD"
              )
            : null,

        dueDate:
          values.dueDate
            ? values.dueDate.format(
                "YYYY-MM-DD"
              )
            : null,
      };

      if (editingTask) {
        await api.put(
          `/task/update/${editingTask._id}`,
          payload
        );

        message.success(
          "Task updated successfully"
        );
      } else {
        /*
         * New tasks always start from zero.
         */
        payload.status = "Todo";
        payload.actualHours = 0;
        payload.completionPercentage = 0;

        await api.post("/task/create", payload);

        message.success(
          "Task created successfully"
        );
      }

      window.dispatchEvent(new Event("workforce:data-changed"));
      await refreshTasks?.();

      form.resetFields();

      onClose();
    } catch (error) {
      console.error(
        "Save task error:",
        error
      );

      message.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        editingTask
          ? "Edit Task"
          : "Create New Task"
      }
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      width="min(800px, calc(100vw - 24px))"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <TaskBasicInfo />

          <TaskAssignment
            form={form}
            projects={projects}
            employees={employees}
            onProjectChange={
              handleProjectChange
            }
            editingTask={editingTask}
          />

          <TaskDetails />

          {editingTask && (
            <TaskProgress
              form={form}
            />
          )}

          <div className="md:col-span-2">
            <Form.Item
              label="Description"
              name="description"
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter task description"
              />
            </Form.Item>
          </div>

          <div className="md:col-span-2">
            <Form.Item
              label="Remarks"
              name="remarks"
            >
              <Input.TextArea
                rows={2}
                placeholder="Add remarks"
              />
            </Form.Item>
          </div>

        </div>

        <Form.Item
          name="departmentId"
          hidden
        >
          <Input />
        </Form.Item>

        <TaskFormActions
          editingTask={editingTask}
          onCancel={handleClose}
        />
      </Form>
    </Modal>
  );
}

export default AddTaskModal;