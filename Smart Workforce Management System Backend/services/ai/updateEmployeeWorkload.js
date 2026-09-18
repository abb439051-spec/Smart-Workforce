const TaskModel = require("../../models/Tasks.model");
const UsersModel = require("../../models/Users.model");
const NotificationModel = require("../../models/Notifications.model");

const updateEmployeeWorkload = async (employeeId) => {
    const employee = await UsersModel.findById(employeeId).select(
        "workspaceId weeklyCapacity"
    );

    if (!employee) {
        throw new Error("Employee not found");
    }

    const tasks = await TaskModel.find({
        workspaceId: employee.workspaceId,
        assignedTo: employeeId,
        isActive: true,
        status: { $ne: "Completed" },
    });

    const totalHours = tasks.reduce(
        (sum, task) => sum + (task.estimatedHours || 0),
        0
    );

    const maxWeeklyCapacity = employee.weeklyCapacity || 40;

    const percentage = Math.round(
        (totalHours / maxWeeklyCapacity) * 100
    );

    let category = "Available";

    if (percentage <= 40)
        category = "Available";
    else if (percentage <= 70)
        category = "Moderate";
    else if (percentage <= 90)
        category = "Busy";
    else if (percentage <= 100)
        category = "Overloaded";
    else
        category = "Critical";

    const updatedEmployee = await UsersModel.findByIdAndUpdate(employeeId, {

        currentWorkload: totalHours,

        capacityPercentage: percentage,

        workloadCategory: category,

    }, { new: true }).select("-password");

    if (["Overloaded", "Critical"].includes(category)) {
        const alreadyNotified = await NotificationModel.findOne({
            workspaceId: employee.workspaceId,
            userId: employeeId,
            type: "Workload",
            isRead: false,
        });

        if (!alreadyNotified) {
            await NotificationModel.create({
                workspaceId: employee.workspaceId,
                userId: employeeId,
                title: "Workload needs attention",
                message: `Your workload is at ${percentage}% of your weekly capacity.`,
                type: "Workload",
                priority: "High",
            });
        }
    }

    return updatedEmployee;

};

module.exports = updateEmployeeWorkload;