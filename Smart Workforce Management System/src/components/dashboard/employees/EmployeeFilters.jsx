import { Input, Select, Button } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

const { Option } = Select;

function EmployeeFilters({
  departments,
  filters,
  setFilters,
}) {

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <Input
          size="large"
          placeholder="Search Name / Employee ID / Email"
          prefix={<SearchOutlined />}
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: e.target.value,
            })
          }
        />

        <Select
          size="large"
          value={filters.department}
          onChange={(value) =>
            setFilters({
              ...filters,
              department: value,
            })
          }
        >
          <Option value="all">
            All Departments
          </Option>

          {departments.map((department) => (

            <Option
              key={department._id}
              value={department._id}
            >
              {department.departmentName}
            </Option>

          ))}

        </Select>

        <Select
          size="large"
          value={filters.role}
          onChange={(value) =>
            setFilters({
              ...filters,
              role: value,
            })
          }
        >
          <Option value="all">All Roles</Option>
          <Option value="employee">Employee</Option>
          <Option value="manager">Manager</Option>
        </Select>

        <Select
          size="large"
          value={filters.status}
          onChange={(value) =>
            setFilters({
              ...filters,
              status: value,
            })
          }
        >
          <Option value="all">All Status</Option>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>

        <Button
          icon={<ReloadOutlined />}
          size="large"
          onClick={() =>
            setFilters({
              search: "",
              department: "all",
              role: "all",
              status: "all",
            })
          }
        >
          Reset
        </Button>

      </div>

    </div>
  );
}

export default EmployeeFilters;