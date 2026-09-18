import { Avatar, Drawer } from "antd";
import { UserOutlined } from "@ant-design/icons";

function DepartmentDrawer({ open, onClose, department }) {
  if (!department) return null;

  return (
    <Drawer
      title="Department Details"
      open={open}
      onClose={onClose}
      width="min(420px, calc(100vw - 24px))"
    >
      <div className="flex flex-col items-center mb-8">
        <Avatar size={80} icon={<UserOutlined />} />

        <h2 className="text-xl font-semibold mt-4">
          {department.departmentName}
        </h2>
        <p className="text-sm text-gray-500">{department.departmentCode}</p>

      </div>

      <div className="space-y-5">

        <div>
          <p className="text-gray-500">Manager</p>
          <p className="font-medium">{department.managerId?.name || "Not assigned"}</p>
        </div>

        <div>
          <p className="text-gray-500">Employees</p>
          <p className="font-medium">
            {department.employeeCount ?? 0} employee{department.employeeCount === 1 ? "" : "s"}
          </p>
          <p className="text-sm text-gray-500">
            Capacity: {department.maxWeeklyCapacity} hours/week
          </p>
        </div>

        <div>
          <p className="text-gray-500">Projects</p>
          <p className="font-medium">{department.description || "No description provided"}</p>
        </div>

        <div>
          <p className="text-gray-500">Department Code</p>
          <p className="font-medium">{department.departmentCode}</p>
        </div>

      </div>
    </Drawer>
  );
}

export default DepartmentDrawer;