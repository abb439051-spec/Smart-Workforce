import { Avatar, Drawer, Tag, Progress, InputNumber, Button } from "antd";
import { useEffect, useState } from "react";
import {
  CheckSquareOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

function TaskDrawer({ open, onClose, task, onSaveActualHours }) {
  const [actualHours, setActualHours] = useState(0);

  useEffect(() => {
    setActualHours(task?.actualHours || 0);
  }, [task]);

  if (!task) return null;

  const getStatusColor = (status) => {

    switch (status) {

      case "Completed":
        return "green";

      case "In Progress":
        return "blue";

      case "Review":
        return "orange";

      case "Todo":
        return "gold";

      default:
        return "default";

    }

  };

  const getPriorityColor = (priority) => {

    switch (priority) {

      case "Critical":
        return "red";

      case "High":
        return "volcano";

      case "Medium":
        return "gold";

      case "Low":
        return "green";

      default:
        return "default";

    }

  };

  return (

    <Drawer
      title="Task Details"
      open={open}
      onClose={onClose}
      width="min(450px, calc(100vw - 24px))"
    >

      <div className="flex flex-col items-center mb-8">

        <Avatar
          size={80}
          icon={<CheckSquareOutlined />}
          className="bg-blue-500"
        />

        <h2 className="text-xl font-semibold mt-4">

          {task.taskName}

        </h2>

        <div className="flex gap-2 mt-2">

          <Tag color={getStatusColor(task.status)}>
            {task.status}
          </Tag>

          <Tag color={getPriorityColor(task.priority)}>
            {task.priority}
          </Tag>

          <Tag color={task.isActive ? "green" : "red"}>
            {task.isActive ? "Active" : "Archived"}
          </Tag>

        </div>

      </div>

      <div className="space-y-5">

        <div>

          <p className="text-gray-500">Task Code</p>

          <p className="font-medium">

            {task.taskCode || "-"}

          </p>

        </div>
        <div>
          <p className="text-gray-500">Task Type</p>
          <p className="font-medium">
            {task.taskType || "-"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Project</p>

          <p className="font-medium">

            {task.projectId?.projectName || "-"}

          </p>

        </div>

        {task.projectId && (
          <>
            <div>
              <p className="text-gray-500">Project Status</p>
              <p className="font-medium">{task.projectId.status || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Project Description</p>
              <p className="font-medium">{task.projectId.description || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Project Dates</p>
              <p className="font-medium">
                {task.projectId.startDate
                  ? dayjs(task.projectId.startDate).format("DD MMM YYYY")
                  : "-"}{" "}
                to{" "}
                {task.projectId.endDate
                  ? dayjs(task.projectId.endDate).format("DD MMM YYYY")
                  : "-"}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Project Progress</p>
              <Progress percent={task.projectId.completionPercentage || 0} />
            </div>
          </>
        )}

        <div>

          <p className="text-gray-500">Department</p>

          <p className="font-medium">

            {task.departmentId?.departmentName || "-"}

          </p>

        </div>

        <div>

          <p className="text-gray-500">Assigned To</p>

          <p className="font-medium">

            {task.assignedTo?.name || "-"}

          </p>

        </div>

        <div>

          <p className="text-gray-500">Estimated Hours</p>

          <p className="font-medium">

            {task.estimatedHours || 0} hrs

          </p>

        </div>

        <div>

          <p className="text-gray-500">Actual Hours</p>

          {onSaveActualHours ? (
            <div className="flex items-center gap-2">
              <InputNumber
                min={0}
                value={actualHours}
                onChange={(value) => setActualHours(value ?? 0)}
              />
              <span>hrs</span>
              <Button
                size="small"
                type="primary"
                onClick={() => onSaveActualHours(actualHours)}
              >
                Save
              </Button>
            </div>
          ) : (
            <p className="font-medium">{task.actualHours || 0} hrs</p>
          )}

        </div>

        <div>

          <p className="text-gray-500">Start Date</p>

          <p className="font-medium">

            {task.startDate
              ? dayjs(task.startDate).format("DD MMM YYYY")
              : "-"}

          </p>

        </div>

        <div>

          <p className="text-gray-500">Due Date</p>

          <p className="font-medium">

            {task.dueDate
              ? dayjs(task.dueDate).format("DD MMM YYYY")
              : "-"}

          </p>

        </div>

        <div>

          <p className="text-gray-500">Completion</p>

          <Progress
            percent={task.completionPercentage || 0}
            status={
              task.completionPercentage === 100
                ? "success"
                : "active"
            }
          />

        </div>

        <div>

          <p className="text-gray-500">Description</p>

          <p className="font-medium">

            {task.description || "-"}

          </p>

        </div>

        <div>

          <p className="text-gray-500">Remarks</p>

          <p className="font-medium">

            {task.remarks || "-"}

          </p>

        </div>

      </div>

    </Drawer>

  );

}

export default TaskDrawer;