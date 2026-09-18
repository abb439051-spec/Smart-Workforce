import { useState, useEffect } from "react";
import api from "../../lib/api";

import EmployeeHeader from "../../components/dashboard/employees/EmployeeHeader";
import EmployeeFilters from "../../components/dashboard/employees/EmployeeFilters";
import EmployeeTable from "../../components/dashboard/employees/EmployeeTable";
import AddEmployeeModal from "../../components/dashboard/employees/AddEmployeeModal";
import EmployeeDrawer from "../../components/dashboard/employees/EmployeeDrawer";
import ChangeEmployeePasswordModal from "../../components/dashboard/employees/ChangeEmployeePasswordModal";

function Employees() {
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    department: "all",
    role: "all",
    status: "all",
  });

  const getEmployees = async () => {
    try {
      const response = await api.get("/user/getAll");

      setEmployees(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartments = async () => {
    try {
      const response = await api.get("/department/getAll");

      setDepartments(response.data.departments);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name
        ?.toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      employee.userEmail
        ?.toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      employee.employeeId
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchesDepartment =
      filters.department === "all" ||
      employee.departmentId?._id === filters.department;

    const matchesRole =
      filters.role === "all" ||
      employee.role === filters.role;

    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "active" && employee.isActive) ||
      (filters.status === "inactive" && !employee.isActive);

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesRole &&
      matchesStatus
    );
  });

  useEffect(() => {
    getEmployees();
    getDepartments();
  }, []);

  return (
    <div className="space-y-6">

      <EmployeeHeader
        onAddEmployee={() => setOpen(true)}
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