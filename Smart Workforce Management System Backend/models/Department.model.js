const { Schema, model } = require("mongoose");

const DepartmentModel = new Schema(
{
    workspaceId: {
        type: Schema.Types.ObjectId,
        ref: "workspace",
        required: true,
    },

    departmentName: {
        type: String,
        required: true,
        trim: true,
    },

    departmentCode: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },

    description: {
        type: String,
        default: "",
    },

    managerId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        default: null,
    },

    maxWeeklyCapacity: {
        type: Number,
        required: true,
        default: 160,
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
},
{
    timestamps: true,
});

DepartmentModel.index(
    {
        workspaceId: 1,
        departmentName: 1,
    },
    {
        unique: true,
    }
);

module.exports = model("departments",DepartmentModel,"departments");