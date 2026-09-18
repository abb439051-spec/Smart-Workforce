import { Input, Select, Button, DatePicker } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const { Option } = Select;

function NotificationsFilters({ filters, setFilters }) {
  const handleReset = () => {
    setFilters({ search: "", type: "all", priority: "all", date: null });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

        {/* Search */}
        <Input
          size="large"
          placeholder="Search notifications..."
          prefix={<SearchOutlined />}
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        {/* Type */}
        <Select
          size="large"
          value={filters.type}
          onChange={(type) => setFilters({ ...filters, type })}
        >
          <Option value="all">All Types</Option>
          <Option value="Workload">Workload</Option>
          <Option value="Task">Task</Option>
          <Option value="Project">Project</Option>
          <Option value="System">System</Option>
        </Select>

        {/* Priority */}
        <Select
          size="large"
          value={filters.priority}
          onChange={(priority) => setFilters({ ...filters, priority })}
        >
          <Option value="all">All Priority</Option>
          <Option value="high">High</Option>
          <Option value="medium">Medium</Option>
          <Option value="low">Low</Option>
        </Select>

        {/* Date */}
        <DatePicker
          size="large"
          className="w-full"
          value={filters.date}
          onChange={(date) => setFilters({ ...filters, date })}
        />

        {/* Reset */}
        <Button
          size="large"
          icon={<ReloadOutlined />}
          onClick={handleReset}
        >
          Reset
        </Button>

      </div>

    </div>
  );
}

export default NotificationsFilters;