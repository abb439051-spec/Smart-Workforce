const UsersModel = require("../../models/Users.model");
const ProjectModel = require("../../models/Projects.model");
const TaskModel = require("../../models/Tasks.model");
const DepartmentModel = require("../../models/Department.model");

const getWorkloadCategory = (capacityPercentage) => {
    if (capacityPercentage <= 40) return "Available";
    if (capacityPercentage <= 70) return "Moderate";
    if (capacityPercentage <= 90) return "Busy";
    if (capacityPercentage <= 100) return "Overloaded";
    return "Critical";
};

const getAllUsers = async (req, res) => {

    try {

        let query = { workspaceId: req.user.workspaceId };

        if (req.user.role === "manager") {
            const departmentIds = await DepartmentModel.find({
                workspaceId: req.user.workspaceId,
                managerId: req.user._id,
            }).distinct("_id");

            const projects = await ProjectModel.find({
                workspaceId: req.user.workspaceId,
                $or: [
                    { managerId: req.user._id },
                    {
                        departmentId: {
                            $in: departmentIds,
                        },
                    },
                ],
            }).select("_id teamMembers");
            const projectIds = projects.map((project) => project._id);
            const memberIds = projects.flatMap((project) => project.teamMembers || []);
            const taskMembers = await TaskModel.distinct("assignedTo", {
                workspaceId: req.user.workspaceId,
                projectId: { $in: projectIds },
            });

            query = {
                ...query,
                $or: [
                    { _id: { $in: [...memberIds, ...taskMembers] } },
                    { departmentId: { $in: departmentIds } },
                ],
                role: "employee",
            };
        }

        const users = await UsersModel.find(query)
        .populate("departmentId", "departmentName departmentCode")
        .select("-password")
        .sort({ createdAt: -1 });

        const managerIds = users
            .filter((user) => user.role === "manager")
            .map((user) => user._id);
        const managerDepartments = managerIds.length
            ? await DepartmentModel.find({
                workspaceId: req.user.workspaceId,
                managerId: { $in: managerIds },
            }).select("departmentName departmentCode managerId")
            : [];
        const departmentsByManager = managerDepartments.reduce((result, department) => {
            const managerId = department.managerId.toString();
            result[managerId] = result[managerId] || [];
            result[managerId].push(department);
            return result;
        }, {});

        const activeTasks = await TaskModel.find({
            workspaceId: req.user.workspaceId,
            isActive: true,
            status: { $ne: "Completed" },
        }).select("assignedTo estimatedHours").lean();

        const workloadByEmployee = activeTasks.reduce((result, task) => {
            if (!task.assignedTo) {
                return result;
            }

            const employeeId = task.assignedTo.toString();
            result[employeeId] = (result[employeeId] || 0) + Number(task.estimatedHours || 0);
            return result;
        }, {});

        return res.status(200).json({

            success: true,

            users: users.map((user) => {
                const userData = user.toObject();
                const currentWorkload = workloadByEmployee[user._id.toString()] || 0;
                const weeklyCapacity = Number(user.weeklyCapacity || 40);
                const capacityPercentage = weeklyCapacity > 0
                    ? Number(((currentWorkload / weeklyCapacity) * 100).toFixed(2))
                    : 0;

                return {
                    ...userData,
                    currentWorkload,
                    capacityPercentage,
                    workloadCategory: getWorkloadCategory(capacityPercentage),
                    departments: departmentsByManager[user._id.toString()] || [],
                };
            }),

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = getAllUsers;