const express = require("express");

const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");

const createTask = require("../../controllers/tasks/createTask");
const getAllTasks = require("../../controllers/tasks/getAllTasks");
const updateTask = require("../../controllers/tasks/updateTask");
const deleteTask = require("../../controllers/tasks/deleteTask");
const updateTaskStatus = require("../../controllers/tasks/updateTaskStatus");

const router = express.Router();

router.post("/create",authMiddleware,roleMiddleware("admin", "manager"),createTask);

router.get("/getAll",authMiddleware,getAllTasks);

router.put("/update/:id",authMiddleware,roleMiddleware("admin", "manager"),updateTask);
router.put("/status/:id",authMiddleware,updateTaskStatus);

router.delete("/delete/:id",authMiddleware,roleMiddleware("admin", "manager"),deleteTask);

module.exports = router;