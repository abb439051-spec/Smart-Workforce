import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function ProjectHeader({ onAddProject }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Projects
        </h1>

        <p className="text-gray-500 mt-1">
          Manage projects, teams, timelines, and project progress.
        </p>
      </div>

      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={onAddProject}
      >
        Create Project
      </Button>
    </div>
  );
}

export default ProjectHeader;