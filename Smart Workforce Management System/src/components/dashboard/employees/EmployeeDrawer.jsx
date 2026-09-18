import { Drawer, Avatar, Tag, Divider, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";

function EmployeeDrawer({
  open,
  employee,
  onClose,
  onChangePassword,
}) {

  if (!employee) return null;

  return (
    <Drawer
      title="Employee Details"
      placement="right"
      width="min(420px, calc(100vw - 24px))"
      open={open}
      onClose={onClose}
    >
      <div className="flex flex-col items-center">

        <Avatar
          size={90}
          src={employee.profileImage}
          icon={<UserOutlined />}
        />

        <h2 className="text-xl font-semibold mt-4">
          {employee.name}
        </h2>

        <Tag
          color={
            employee.role === "manager"
              ? "blue"
              : "green"
          }
        >
          {employee.role}
        </Tag>

      </div>

      <Divider />

      {JSON.parse(localStorage.getItem("user") || "{}").role === "admin" && (
        <Button
          type="primary"
          icon={<LockOutlined />}
          block
          onClick={() => onChangePassword(employee)}
        >
          Change Password
        </Button>
      )}

      <div className="space-y-4">

        <div>
          <p className="text-gray-500 text-sm">
            Employee ID
          </p>

          <p className="font-medium">
            {employee.employeeId}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Email
          </p>

          <p>{employee.userEmail}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Phone
          </p>

          <p>{employee.phone || "-"}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Department
          </p>

          <p>
            {employee.role === "manager"
              ? employee.departments?.length
                ? employee.departments
                    .map((department) => `${department.departmentName} (${department.departmentCode})`)
                    .join(", ")
                : "Not assigned"
              : employee.departmentId
                ? `${employee.departmentId.departmentName} (${employee.departmentId.departmentCode})`
                : "-"}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Designation
          </p>

          <p>{employee.designation}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Experience
          </p>

          <p>{employee.experience ?? 0} years</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Weekly Capacity
          </p>

          <p>{employee.weeklyCapacity} Hours</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Employment Type
          </p>

          <p>{employee.employmentType}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Skills
          </p>

          <div className="flex flex-wrap gap-2 mt-2">

            {employee.skills?.length ? (
              employee.skills.map((skill) => (
                <Tag key={skill} color="processing">
                  {skill}
                </Tag>
              ))
            ) : (
              <span>-</span>
            )}

          </div>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Status
          </p>

          <Tag color={employee.isActive ? "green" : "red"}>
            {employee.isActive ? "Active" : "Inactive"}
          </Tag>
        </div>

      </div>
    </Drawer>
  );
}

export default EmployeeDrawer;