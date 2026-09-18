import { Input, Button } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

function DepartmentFilters({
  filters,
  setFilters,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Input
          size="large"
          placeholder="Search Department"
          prefix={<SearchOutlined />}
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: e.target.value,
            })
          }
        />

        <Button
          icon={<ReloadOutlined />}
          size="large"
          onClick={() =>
            setFilters({
              search: "",
            })
          }
        >
          Reset
        </Button>

      </div>

    </div>
  );
}

export default DepartmentFilters;