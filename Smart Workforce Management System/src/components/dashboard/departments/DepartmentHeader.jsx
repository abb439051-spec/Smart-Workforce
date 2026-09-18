import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function DepartmentHeader({ onAddDepartment }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Departments
        </h1>

        <p className="text-gray-500 mt-1">
          Manage departments, managers, and team performance.
        </p>
      </div>

      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={onAddDepartment}
      >
        Add Department
      </Button>
    </div>
  );
}

export default DepartmentHeader;