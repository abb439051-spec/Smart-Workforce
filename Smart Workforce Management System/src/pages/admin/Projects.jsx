import { useState, useEffect } from "react";
import api from "../../lib/api";

import ProjectHeader from "../../components/dashboard/projects/ProjectHeader";
import ProjectFilters from "../../components/dashboard/projects/ProjectFilters";
import ProjectTable from "../../components/dashboard/projects/ProjectTable";
import AddProjectModal from "../../components/dashboard/projects/AddProjectModal";
import ProjectDrawer from "../../components/dashboard/projects/ProjectDrawer";

function Projects() {

  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    department: "all",
    manager: "all",
    status: "all",
    priority: "all",
  });

  const getProjects = async () => {

    try {

      const response = await api.get("/project/getAll");

      setProjects(response.data.projects);

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

  const getManagers = async () => {

    try {

      const response = await api.get("/user/getAll");

      setManagers(
        response.data.users.filter(
          (user) => user.role === "manager"
        )
      );

    } catch (error) {

      console.log(error);

    }

  };

  const getEmployees = async () => {
    try {
      const response = await api.get("/user/getAll");
      setEmployees(response.data.users.filter((user) => user.role === "employee"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    getProjects();
    getDepartments();
    getManagers();
    getEmployees();

  }, []);

  const filteredProjects = projects.filter((project) => {

    const matchesSearch =
      project.projectName
        ?.toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      project.projectCode
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchesDepartment =
      filters.department === "all" ||
      project.departmentId?._id === filters.department;

    const matchesManager =
      filters.manager === "all" ||
      project.managerId?._id === filters.manager;

    const matchesStatus =
      filters.status === "all" ||
      project.status === filters.status;

    const matchesPriority =
      filters.priority === "all" ||
      project.priority === filters.priority;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesManager &&
      matchesStatus &&
      matchesPriority
    );

  }).sort((firstProject, secondProject) => {
    return Number(firstProject.status === "Completed") - Number(secondProject.status === "Completed");
  });

  return (

    <div className="space-y-6">

      <ProjectHeader
        onAddProject={() => setOpen(true)}
      />

      <ProjectFilters
        filters={filters}
        setFilters={setFilters}
        departments={departments}
        managers={managers}
        employees={employees}
      />

      <ProjectTable
        projects={filteredProjects}
        refreshProjects={getProjects}
        onViewProject={(project) => {

          setSelectedProject(project);

          setDrawerOpen(true);

        }}
        onEditProject={(project) => {

          setEditingProject(project);

          setOpen(true);

        }}
      />

      <AddProjectModal
        open={open}
        onClose={() => {

          setOpen(false);

          setEditingProject(null);

        }}
        refreshProjects={getProjects}
        editingProject={editingProject}
        departments={departments}
        managers={managers}
        employees={employees}
      />

      <ProjectDrawer
        open={drawerOpen}
        project={selectedProject}
        onClose={() => setDrawerOpen(false)}
      />

    </div>

  );

}

export default Projects;