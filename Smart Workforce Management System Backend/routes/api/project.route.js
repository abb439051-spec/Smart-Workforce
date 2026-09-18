const Router = require("express").Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");

const createProject = require("../../controllers/project/createProject");
const getAllProjects = require("../../controllers/project/getAllProjects");
const updateProject = require("../../controllers/project/updateProject");
const toggleProjectStatus = require("../../controllers/project/toggleProjectStatus");
const deleteProject = require("../../controllers/project/deleteProject");

Router.post("/create",authMiddleware,roleMiddleware("admin", "manager"),createProject);

Router.get("/getAll",authMiddleware,roleMiddleware("admin", "manager", "employee"),getAllProjects);

Router.put("/update/:id",authMiddleware,roleMiddleware("admin", "manager"),updateProject);

Router.put("/toggle-status/:id",authMiddleware,roleMiddleware("admin"),toggleProjectStatus);

Router.delete("/delete/:id",authMiddleware,roleMiddleware("admin", "manager"),deleteProject);

module.exports = Router;