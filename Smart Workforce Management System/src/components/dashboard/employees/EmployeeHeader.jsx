import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function EmployeeHeader({
  onAddEmployee,
  title = "Employees",
  description = "Manage employees, workloads, skills, and performance.",
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {title}
        </h1>

        <p className="text-gray-500 mt-1">
          {description}
        </p>
      </div>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="large"
        onClick={onAddEmployee}
      >
        Add Employee
      </Button>
    </div>
  );
}

export default EmployeeHeader;