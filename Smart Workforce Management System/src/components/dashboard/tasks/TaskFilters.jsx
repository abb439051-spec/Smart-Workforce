import { Input, Select, Button } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const { Option } = Select;

function TaskFilters({
  filters,
  setFilters,
  projects,
  employees,
}) {

  return (

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <Input
          size="large"
          placeholder="Search Task / Task Code"
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
          value={filters.project}
          onChange={(value) =>
            setFilters({
              ...filters,
              project: value,
            })
          }
        >

          <Option value="all">
            All Projects
          </Option>

          {projects.map((project) => (

            <Option
              key={project._id}
              value={project._id}
            >
              {project.projectName}
            </Option>

          ))}

        </Select>

        <Select
          size="large"
          value={filters.employee}
          onChange={(value) =>
            setFilters({
              ...filters,
              employee: value,
            })
          }
        >

          <Option value="all">
            All Employees
          </Option>

          {employees.map((employee) => (

            <Option
              key={employee._id}
              value={employee._id}
            >
              {employee.name}
            </Option>

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

          <Option value="all">
            All Status
          </Option>

          <Option value="Todo">
            Todo
          </Option>

          <Option value="In Progress">
            In Progress
          </Option>

          <Option value="Review">
            Review
          </Option>

          <Option value="Completed">
            Completed
          </Option>

        </Select>

        <Button
          icon={<ReloadOutlined />}
          size="large"
          onClick={() =>
            setFilters({
              search: "",
              project: "all",
              employee: "all",
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

export default TaskFilters;