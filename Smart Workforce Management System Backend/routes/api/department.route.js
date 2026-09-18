const Router = require("express").Router();

const createDepartment = require("../../controllers/department/createDepartment");
const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");
const getAllDepartments = require("../../controllers/department/getAllDepartment");
const updateDepartment = require("../../controllers/department/updateDepartment");
const deleteDepartment = require("../../controllers/department/deleteDepartment");



Router.post("/create", authMiddleware, roleMiddleware("admin"), createDepartment);

Router.get("/getAll",authMiddleware,roleMiddleware("admin", "manager"),getAllDepartments);

Router.put("/update/:id",authMiddleware,roleMiddleware("admin"),updateDepartment);

Router.delete("/delete/:id",authMiddleware,roleMiddleware("admin"),deleteDepartment);

module.exports = Router;