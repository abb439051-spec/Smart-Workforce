const TaskModel = require("../../models/Tasks.model");
const ProjectModel = require("../../models/Projects.model");

const updateProjectProgress = async (projectId) => {
  const project = await ProjectModel.findById(projectId);

  if (!project) {
    return;
  }

  const tasks = await TaskModel.find({
    projectId,
    isActive: true,
  });

  // No tasks
  if (tasks.length === 0) {
    project.completionPercentage = 0;

    if (project.status !== "On Hold") {
      project.status = "Planning";
    }

    await project.save();

    return;
  }

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const completionPercentage = Math.round(
    (completedTasks / totalTasks) * 100
  );

  project.completionPercentage =
    completionPercentage;

  // Keep On Hold if manually selected
  if (project.status !== "On Hold") {
    project.status =
      completionPercentage === 100
        ? "Completed"
        : "Active";
  }

  await project.save();
};

module.exports = updateProjectProgress;