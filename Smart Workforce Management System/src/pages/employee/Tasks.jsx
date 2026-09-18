import { useEffect, useState } from "react";
import { Input, Progress, Select, Spin, Table, Tag, Button, message } from "antd";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import api from "../../lib/api";
import TaskDrawer from "../../components/dashboard/tasks/TaskDrawer";

const priorityColors = {
  Critical: "red",
  High: "volcano",
  Medium: "gold",
  Low: "green",
};

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
    project: "all",
  });

  const loadTasks = async () => {
    const response = await api.get("/task/getAll");
    setTasks(response.data.tasks || []);
  };

  useEffect(() => {
    loadTasks()
      .catch((error) =>
        message.error(error.response?.data?.message || "Unable to load tasks")
      )
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (task, status) => {
    try {
      await api.put(`/task/status/${task._id}`, { status });
      window.dispatchEvent(new Event("workforce:data-changed"));
      await loadTasks();
      message.success("Task status updated");
    } catch (error) {
      message.error(error.response?.data?.message || "Unable to update task");
    }
  };

  const updateActualHours = async (actualHours) => {
    if (!selectedTask) return;

    try {
      const response = await api.put(`/task/status/${selectedTask._id}`, {
        status: selectedTask.status,
        completionPercentage: selectedTask.completionPercentage,
        actualHours,
      });
      setSelectedTask(response.data.task);
      await loadTasks();
      window.dispatchEvent(new Event("workforce:data-changed"));
      message.success("Actual hours updated");
    } catch (error) {
      message.error(error.response?.data?.message || "Unable to update actual hours");
    }
  };

  const projects = tasks.reduce((items, task) => {
    const project = task.projectId;
    if (project && !items.some((item) => item._id === project._id)) {
      items.push(project);
    }
    return items;
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const search = filters.search.toLowerCase().trim();
    const matchesSearch =
      !search ||
      task.taskName?.toLowerCase().includes(search) ||
      task.taskCode?.toLowerCase().includes(search) ||
      task.projectId?.projectName?.toLowerCase().includes(search);
    const matchesStatus =
      filters.status === "all" || task.status === filters.status;
    const matchesPriority =
      filters.priority === "all" || task.priority === filters.priority;
    const matchesProject =
      filters.project === "all" || task.projectId?._id === filters.project;

    return matchesSearch && matchesStatus && matchesPriority && matchesProject;
  }).sort((firstTask, secondTask) => {
    return Number(firstTask.status === "Completed") - Number(secondTask.status === "Completed");
  });

  const resetFilters = () =>
    setFilters({ search: "", status: "all", priority: "all", project: "all" });

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
        <p className="mt-2 text-gray-500">
          View your assigned tasks and update their status.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
          <Input
            size="large"
            placeholder="Search tasks or projects"
            prefix={<SearchOutlined />}
            value={filters.search}
            onChange={(event) =>
              setFilters({ ...filters, search: event.target.value })
            }
          />
          <Select
            size="large"
            value={filters.project}
            onChange={(project) => setFilters({ ...filters, project })}
            options={[
              { value: "all", label: "All Projects" },
              ...projects.map((project) => ({
                value: project._id,
                label: project.projectName,
              })),
            ]}
          />
          <Select
            size="large"
            value={filters.status}
            onChange={(status) => setFilters({ ...filters, status })}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "Todo", label: "Todo" },
              { value: "In Progress", label: "In Progress" },
              { value: "Review", label: "Review" },
              { value: "Completed", label: "Completed" },
            ]}
          />
          <Select
            size="large"
            value={filters.priority}
            onChange={(priority) => setFilters({ ...filters, priority })}
            options={[
              { value: "all", label: "All Priorities" },
              { value: "Critical", label: "Critical" },
              { value: "High", label: "High" },
              { value: "Medium", label: "Medium" },
              { value: "Low", label: "Low" },
            ]}
          />
          <Button size="large" icon={<ReloadOutlined />} onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <Table
          rowKey="_id"
          dataSource={filteredTasks}
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 8, showSizeChanger: false }}
          locale={{ emptyText: "No tasks found" }}
          onRow={(task) => ({
            onClick: () => {
              setSelectedTask(task);
              setDrawerOpen(true);
            },
            className: "cursor-pointer",
          })}
          columns={[
            {
              title: "Task",
              dataIndex: "taskName",
              render: (value, task) => (
                <div>
                  <div className="font-medium">{value}</div>
                  <div className="text-xs text-gray-500">
                    {task.taskCode || "No code"}
                  </div>
                </div>
              ),
            },
            {
              title: "Project",
              render: (_, task) => task.projectId?.projectName || "-",
            },
            {
              title: "Priority",
              dataIndex: "priority",
              render: (value) => (
                <Tag color={priorityColors[value] || "default"}>{value}</Tag>
              ),
            },
            {
              title: "Progress",
              width: 140,
              render: (_, task) => (
                <Progress percent={task.completionPercentage || 0} size="small" />
              ),
            },
            {
              title: "Due",
              width: 115,
              render: (_, task) =>
                task.dueDate ? dayjs(task.dueDate).format("DD MMM YYYY") : "-",
            },
            {
              title: "Status",
              width: 145,
              render: (_, task) => (
                <div onClick={(event) => event.stopPropagation()}>
                  <Select
                    size="small"
                    value={task.status}
                    className="w-full"
                    onChange={(status) => updateStatus(task, status)}
                    options={[
                      { value: "Todo", label: "Todo" },
                      { value: "In Progress", label: "In Progress" },
                      { value: "Review", label: "Review" },
                      { value: "Completed", label: "Completed" },
                    ]}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>

      <TaskDrawer
        open={drawerOpen}
        task={selectedTask}
        onSaveActualHours={updateActualHours}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedTask(null);
        }}
      />
    </div>
  );
}

export default Tasks;
