import { useEffect, useState } from "react";
import { Spin, Table, Tag, message } from "antd";
import dayjs from "dayjs";
import api from "../../lib/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/project/getAll")
      .then((response) => setProjects(response.data.projects || []))
      .catch((error) => message.error(error.response?.data?.message || "Unable to load projects"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex min-h-[400px] items-center justify-center"><Spin size="large" /></div>;

  const orderedProjects = [...projects].sort((firstProject, secondProject) => {
    return Number(firstProject.status === "Completed") - Number(secondProject.status === "Completed");
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Projects</h1>
        <p className="mt-2 text-gray-500">Projects where you are a team member.</p>
      </div>
      <Table rowKey="_id" dataSource={orderedProjects} scroll={{ x: "max-content" }} columns={[
        { title: "Project", dataIndex: "projectName" },
        { title: "Code", dataIndex: "projectCode" },
        { title: "Priority", dataIndex: "priority", render: (value) => <Tag>{value}</Tag> },
        { title: "Status", dataIndex: "status", render: (value) => <Tag color="blue">{value}</Tag> },
        { title: "End Date", render: (_, project) => project.endDate ? dayjs(project.endDate).format("DD MMM YYYY") : "-" },
      ]} />
    </div>
  );
}

export default Projects;
