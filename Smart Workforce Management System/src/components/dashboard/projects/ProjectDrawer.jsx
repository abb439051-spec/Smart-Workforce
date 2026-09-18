import { Avatar, Drawer, Tag, Progress } from "antd";
import { ProjectOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function ProjectDrawer({ open, onClose, project }) {

  if (!project) return null;

  const getStatusColor = (status) => {

    switch (status) {

      case "Completed":
        return "green";

      case "Active":
        return "blue";

      case "On Hold":
        return "orange";

      case "Planning":
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
      title="Project Details"
      open={open}
      onClose={onClose}
      width="min(450px, calc(100vw - 24px))"
    >

      <div className="flex flex-col items-center mb-8">

        <Avatar
          size={80}
          icon={<ProjectOutlined />}
          className="bg-blue-500"
        />

        <h2 className="text-xl font-semibold mt-4">

          {project.projectName}

        </h2>

        <div className="flex gap-2 mt-2">

          <Tag color={getStatusColor(project.status)}>
            {project.status}
          </Tag>

          <Tag color={getPriorityColor(project.priority)}>
            {project.priority}
          </Tag>

          <Tag color={project.isActive ? "green" : "red"}>
            {project.isActive ? "Active" : "Archived"}
          </Tag>

        </div>

      </div>

      <div className="space-y-5">

        <div>

          <p className="text-gray-500">Project Code</p>

          <p className="font-medium">

            {project.projectCode || "-"}

          </p>

        </div>

        <div>

          <p className="text-gray-500">Department</p>

          <p className="font-medium">

            {project.departmentId?.departmentName || "-"}

          </p>

        </div>

        <div>

          <p className="text-gray-500">Project Manager</p>

          <p className="font-medium">

            {project.managerId?.name || "-"}

          </p>

        </div>

        <div>

          <p className="text-gray-500">Estimated Hours</p>

          <p className="font-medium">

            {project.estimatedHours || 0} hrs

          </p>

        </div>

        <div>

          <p className="text-gray-500">Start Date</p>

          <p className="font-medium">

            {project.startDate
              ? dayjs(project.startDate).format("DD MMM YYYY")
              : "-"}

          </p>

        </div>

        <div>

          <p className="text-gray-500">End Date</p>

          <p className="font-medium">

            {project.endDate
              ? dayjs(project.endDate).format("DD MMM YYYY")
              : "-"}

          </p>

        </div>

        <div>

          <p className="text-gray-500">Progress</p>

          <Progress percent={project.completionPercentage || 0}
          status={project.completionPercentage === 100? "success": "active"}
          />

        </div>

        <div>

          <p className="text-gray-500">Description</p>

          <p className="font-medium">

            {project.description || "-"}

          </p>

        </div>

      </div>

    </Drawer>

  );

}

export default ProjectDrawer;