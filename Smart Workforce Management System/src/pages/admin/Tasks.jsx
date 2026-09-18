import { useEffect, useState } from "react";
import { message } from "antd";
import api from "../../lib/api";

import TaskHeader from "../../components/dashboard/tasks/TaskHeader";
import TaskFilters from "../../components/dashboard/tasks/TaskFilters";
import TaskTable from "../../components/dashboard/tasks/TaskTable";
import AddTaskModal from "../../components/dashboard/tasks/AddTaskModal/AddTaskModal";
import TaskDrawer from "../../components/dashboard/tasks/TaskDrawer";

function Tasks() {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    project: "all",
    employee: "all",
    status: "all",
  });

  const getTasks = async () => {
    try {
      setLoading(true);

      const response = await api.get("/task/getAll");

      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Get tasks error:", error);

      message.error(
        error.response?.data?.message ||
          "Failed to load tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  const getProjects = async () => {
    try {
      const response = await api.get("/project/getAll");

      setProjects(response.data.projects || []);
    } catch (error) {
      console.error("Get projects error:", error);

      message.error(
        error.response?.data?.message ||
          "Failed to load projects."
      );
    }
  };

  const getEmployees = async () => {
    try {
      const response = await api.get("/user/getAll");

      const assignableEmployees = (
        response.data.users || []
      ).filter(
        (user) =>
          user.isActive !== false &&
          user.role !== "admin"
      );

      setEmployees(assignableEmployees);
    } catch (error) {
      console.error("Get employees error:", error);

      message.error(
        error.response?.data?.message ||
          "Failed to load employees."
      );
    }
  };

  useEffect(() => {
    getTasks();
    getProjects();
    getEmployees();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const searchValue = filters.search
      .trim()
      .toLowerCase();

    const matchesSearch =
      searchValue === "" ||
      task.taskName
        ?.toLowerCase()
        .includes(searchValue) ||
      task.taskCode
        ?.toLowerCase()
        .includes(searchValue) ||
      task.projectId?.projectName
        ?.toLowerCase()
        .includes(searchValue) ||
      task.assignedTo?.name
        ?.toLowerCase()
        .includes(searchValue);

    const matchesProject =
      filters.project === "all" ||
      task.projectId?._id === filters.project ||
      task.projectId === filters.project;

    const matchesEmployee =
      filters.employee === "all" ||
      task.assignedTo?._id === filters.employee ||
      task.assignedTo === filters.employee;

    const matchesStatus =
      filters.status === "all" ||
      task.status === filters.status;

    return (
      matchesSearch &&
      matchesProject &&
      matchesEmployee &&
      matchesStatus
    );
  }).sort((firstTask, secondTask) => {
    return Number(firstTask.status === "Completed") - Number(secondTask.status === "Completed");
  });

  const handleCloseModal = () => {
    setOpen(false);
    setEditingTask(null);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <TaskHeader
        onAddTask={() => {
          setEditingTask(null);
          setOpen(true);
        }}
      />

      <TaskFilters
        filters={filters}
        setFilters={setFilters}
        projects={projects}
        employees={employees}
      />

      <TaskTable
        tasks={filteredTasks}
        loading={loading}
        refreshTasks={getTasks}
        onViewTask={handleViewTask}
        onEditTask={handleEditTask}
      />

      <AddTaskModal
        open={open}
        onClose={handleCloseModal}
        refreshTasks={getTasks}
        editingTask={editingTask}
        projects={projects}
        employees={employees}
      />

      <TaskDrawer
        open={drawerOpen}
        task={selectedTask}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedTask(null);
        }}
      />
    </div>
  );
}

export default Tasks;
