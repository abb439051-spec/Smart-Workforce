import { useState, useEffect } from "react";
import api from "../../lib/api";

import DepartmentHeader from "../../components/dashboard/departments/DepartmentHeader";
import DepartmentFilters from "../../components/dashboard/departments/DepartmentFilters";
import DepartmentTable from "../../components/dashboard/departments/DepartmentTable";
import AddDepartmentModal from "../../components/dashboard/departments/AddDepartmentModal";
import DepartmentDrawer from "../../components/dashboard/departments/DepartmentDrawer";
import { message, Spin } from "antd";

function Departments() {
  const [open, setOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
  });

  const getDepartments = async () => {
    try {
      const response = await api.get("/department/getAll");

      setDepartments(response.data.departments || []);

    } catch (error) {
      message.error(error.response?.data?.message || "Unable to load departments");
    } finally {
      setLoading(false);
    }
  };

  const getManagers = async () => {
    try {
      const response = await api.get("/user/getAll");
      setManagers((response.data.users || []).filter((user) => user.role === "manager" && user.isActive !== false));
    } catch (error) {
      message.error(error.response?.data?.message || "Unable to load managers");
    }
  };

  const filteredDepartments = departments.filter((department) => {

    const matchesSearch =
      department.departmentName
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());

    return matchesSearch;

  });

  useEffect(() => {
    getDepartments();
    getManagers();
  }, []);

  return (
    <div className="space-y-6">

      <DepartmentHeader
        onAddDepartment={() => setOpen(true)}
      />

      <DepartmentFilters
        filters={filters}
        setFilters={setFilters}
      />

      {loading ? <div className="flex min-h-[300px] items-center justify-center"><Spin size="large" /></div> : <DepartmentTable
        departments={filteredDepartments}
        refreshDepartments={getDepartments}
        onViewDepartment={(department) => {
          setSelectedDepartment(department);
          setDrawerOpen(true);
        }}
        onEditDepartment={(department) => {
          setEditingDepartment(department);
          setOpen(true);
        }}
      />}

      <AddDepartmentModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingDepartment(null);
        }}
        refreshDepartments={getDepartments}
        editingDepartment={editingDepartment}
        managers={managers}
      />

      <DepartmentDrawer
        open={drawerOpen}
        department={selectedDepartment}
        onClose={() => setDrawerOpen(false)}
      />

    </div>
  );
}

export default Departments;