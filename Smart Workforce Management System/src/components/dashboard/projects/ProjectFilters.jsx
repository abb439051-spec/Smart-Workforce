import { Input, Select, Button } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

function ProjectFilters({
  filters,
  setFilters,
  departments,
  managers,
}) {

  return (

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

        <Input
          size="large"
          placeholder="Search Project"
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

          <Select.Option value="all">
            All Departments
          </Select.Option>

          {departments.map((department) => (

            <Select.Option
              key={department._id}
              value={department._id}
            >
              {department.departmentName}
            </Select.Option>

          ))}

        </Select>

        <Select
          size="large"
          value={filters.manager}
          onChange={(value) =>
            setFilters({
              ...filters,
              manager: value,
            })
          }
        >

          <Select.Option value="all">
            All Managers
          </Select.Option>

          {managers.map((manager) => (

            <Select.Option
              key={manager._id}
              value={manager._id}
            >
              {manager.name}
            </Select.Option>

          ))}

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

          <Select.Option value="all">
            All Status
          </Select.Option>

          <Select.Option value="Planning">
            Planning
          </Select.Option>

          <Select.Option value="Active">
            Active
          </Select.Option>

          <Select.Option value="On Hold">
            On Hold
          </Select.Option>

          <Select.Option value="Completed">
            Completed
          </Select.Option>

        </Select>

        <Select
          size="large"
          value={filters.priority}
          onChange={(value) =>
            setFilters({
              ...filters,
              priority: value,
            })
          }
        >

          <Select.Option value="all">
            All Priority
          </Select.Option>

          <Select.Option value="Low">
            Low
          </Select.Option>

          <Select.Option value="Medium">
            Medium
          </Select.Option>

          <Select.Option value="High">
            High
          </Select.Option>

          <Select.Option value="Critical">
            Critical
          </Select.Option>

        </Select>

        <Button
          icon={<ReloadOutlined />}
          size="large"
          onClick={() =>
            setFilters({
              search: "",
              department: "all",
              manager: "all",
              status: "all",
              priority: "all",
            })
          }
        >
          Reset
        </Button>

      </div>

    </div>

  );

}

export default ProjectFilters;