import { useState } from "react";
import { Input, Select, Button, DatePicker } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { RangePicker } = DatePicker;

function ReportsFilters({ onChange, departments = [], reportTypes = [] }) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [reportType, setReportType] = useState("all");
  const [dateRange, setDateRange] = useState(null);

  const handleReset = () => {
    setSearch("");
    setDepartment("all");
    setReportType("all");
    setDateRange(null);
    onChange({ search: "", department: "all", reportType: "all", dateRange: null });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

        <Input
          size="large"
          placeholder="Search reports..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onChange({ search: e.target.value, department, reportType, dateRange });
          }}
        />

        <Select
          size="large"
          value={department}
          onChange={(value) => {
            setDepartment(value);
            onChange({ search, department: value, reportType, dateRange });
          }}
        >
          <Option value="all">All Departments</Option>
          {departments.map((item) => (
            <Option key={item} value={item.toLowerCase()}>
              {item}
            </Option>
          ))}
        </Select>

        <Select
          size="large"
          value={reportType}
          onChange={(value) => {
            setReportType(value);
            onChange({ search, department, reportType: value, dateRange });
          }}
        >
          <Option value="all">All Reports</Option>
          {reportTypes.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>

        <RangePicker
          size="large"
          className="w-full"
          value={dateRange}
          format="DD/MM/YYYY"
          onChange={(value) => {
            setDateRange(value);
            onChange({ search, department, reportType, dateRange: value });
          }}
        />

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

export default ReportsFilters;