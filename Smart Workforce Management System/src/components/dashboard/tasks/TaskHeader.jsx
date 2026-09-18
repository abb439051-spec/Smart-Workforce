import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function TaskHeader({ onAddTask }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Tasks
        </h1>

        <p className="text-gray-500 mt-1">
          Assign, monitor and manage project tasks efficiently.
        </p>
      </div>

      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={onAddTask}
      >
        Create Task
      </Button>

    </div>
  );
}

export default TaskHeader;