import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import api from "../../lib/api";
import EmployeeHeader from "../../components/dashboard/employees/EmployeeHeader";
import EmployeeFilters from "../../components/dashboard/employees/EmployeeFilters";
import EmployeeTable from "../../components/dashboard/employees/EmployeeTable";
import AddEmployeeModal from "../../components/dashboard/employees/AddEmployeeModal";
import EmployeeDrawer from "../../components/dashboard/employees/EmployeeDrawer";
import ChangeEmployeePasswordModal from "../../components/dashboard/employees/ChangeEmployeePasswordModal";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    department: "all",
    role: "employee",
    status: "all",
  });

  const getEmployees = async () => {
    api.get("/user/getAll")
      .then((response) => setEmployees(response.data.users || []))
      .catch((error) => message.error(error.response?.data?.message || "Unable to load team"))
      .finally(() => setLoading(false));
  };

  const getDepartments = async () => {
    try {
      const response = await api.get("/department/getAll");
      setDepartments(response.data.departments || []);
    } catch (error) {
      message.error(error.response?.data?.message || "Unable to load departments");
    }
  };

  useEffect(() => {
    getEmployees();
    getDepartments();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    const search = filters.search.toLowerCase();
    const matchesSearch = [employee.name, employee.userEmail, employee.employeeId]
      .some((value) => value?.toLowerCase().includes(search));
    const matchesDepartment = filters.department === "all"
      || employee.departmentId?._id === filters.department;
    const matchesStatus = filters.status === "all"
      || (filters.status === "active" && employee.isActive)
      || (filters.status === "inactive" && !employee.isActive);
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  if (loading) {
    return <div className="flex min-h-[400px] items-center justify-center"><Spin size="large" /></div>;
  }

  return (
    <div className="space-y-6">
      <EmployeeHeader
        title="My Team"
        description="Employees in your assigned departments and managed projects."
        onAddEmployee={() => {
          setEditingEmployee(null);
          setOpen(true);
        }}
      />
      <EmployeeFilters
        departments={departments}
        filters={filters}
        setFilters={setFilters}
      />
      <EmployeeTable
        employees={filteredEmployees}
        refreshEmployees={getEmployees}
        onViewEmployee={(employee) => {
          setSelectedEmployee(employee);
          setDrawerOpen(true);
        }}
        onEditEmployee={(employee) => {
          setEditingEmployee(employee);
          setOpen(true);
        }}
      />
      <AddEmployeeModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingEmployee(null);
        }}
        refreshEmployees={getEmployees}
        editingEmployee={editingEmployee}
        departments={departments}
        managerMode
      />
      <EmployeeDrawer
        open={drawerOpen}
        employee={selectedEmployee}
        onClose={() => setDrawerOpen(false)}
        onChangePassword={() => {
          setDrawerOpen(false);
          setPasswordModalOpen(true);
        }}
      />
      <ChangeEmployeePasswordModal
        open={passwordModalOpen}
        employee={selectedEmployee}
        onClose={() => setPasswordModalOpen(false)}
      />
    </div>
  );
}

export default Employees;
