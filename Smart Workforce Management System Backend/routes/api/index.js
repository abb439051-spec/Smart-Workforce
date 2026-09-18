const Router = require("express").Router()
const auth = require("./auth.route")
const department = require("./department.route")
const user = require("./user.route")
const project = require("./project.route")
const task = require("./task.route")
const ai = require("./ai.routes")
const analytics = require("./analyticsRoutes")
const notification = require("./notification.route")
const report = require("./report.route")

Router.use("/auth", auth)
Router.use("/department",department)
Router.use("/user", user);
Router.use("/project",project)
Router.use("/task",task)
Router.use("/ai",ai)
Router.use("/analytics",analytics);
Router.use("/notification", notification);
Router.use("/report", report);

module.exports = Router