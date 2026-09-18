const TaskModel = require("../../models/Tasks.model");
const updateProjectProgress = require("../project/updateProjectProgress");
const updateEmployeeWorkload = require("../../services/ai/updateEmployeeWorkload");

const statusCompletion = {
    Todo: 0,
    "In Progress": 50,
    Review: 80,
    Completed: 100,
};

const updateTaskStatus = async (req, res) => {
    try {
        const { status, completionPercentage, actualHours } = req.body;
        if (!Object.prototype.hasOwnProperty.call(statusCompletion, status)) {
            return res.status(400).json({ success: false, message: "Invalid task status" });
        }

        const task = await TaskModel.findOne({
            _id: req.params.id,
            workspaceId: req.user.workspaceId,
            assignedTo: req.user._id,
        });

        if (!task) {
            return res.status(404).json({ success: false, message: "Assigned task not found" });
        }

        task.status = status;
        task.completionPercentage =
            status === "In Progress" && Number.isFinite(completionPercentage)
                ? Math.min(100, Math.max(0, completionPercentage))
                : statusCompletion[status];
        if (actualHours !== undefined) {
            const parsedActualHours = Number(actualHours);
            if (!Number.isFinite(parsedActualHours) || parsedActualHours < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Actual hours must be a non-negative number",
                });
            }
            task.actualHours = parsedActualHours;
        }
        if (task.completionPercentage === 100) {
            task.status = "Completed";
        }
        await task.save();
        await updateProjectProgress(task.projectId);
        await updateEmployeeWorkload(req.user._id);

        return res.json({ success: true, message: "Task status updated", task });
    } catch (error) {
        console.error("Update task status error:", error);
        return res.status(500).json({ success: false, message: "Unable to update task status" });
    }
};

module.exports = updateTaskStatus;
