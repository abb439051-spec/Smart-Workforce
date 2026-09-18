const Router = require("express").Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");

const createUser = require("../../controllers/user/createUser");
const getAllUsers = require("../../controllers/user/getAllUsers")
const getUser = require("../../controllers/user/getUser")
const updateUser = require("../../controllers/user/updateUser")
const toggleUserStatus = require("../../controllers/user/toggleUserStatus")
const resetUserPassword = require("../../controllers/user/resetUserPassword")

Router.post("/create",authMiddleware,roleMiddleware("admin", "manager"),createUser);
Router.get("/getAll",authMiddleware,roleMiddleware("admin", "manager"),getAllUsers);
Router.get("/:id",authMiddleware,roleMiddleware("admin"),getUser);
Router.put("/update/:id",authMiddleware,roleMiddleware("admin", "manager"),updateUser);
Router.put("/toggle-status/:id",authMiddleware,roleMiddleware("admin", "manager"),toggleUserStatus);
Router.put("/change-password/:id",authMiddleware,roleMiddleware("admin", "manager"),resetUserPassword);

module.exports = Router;