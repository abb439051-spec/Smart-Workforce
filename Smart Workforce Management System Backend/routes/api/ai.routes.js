const express = require("express");

const router = express.Router();

const authenticateUser = require("../../middlewares/auth.middleware");
const authorizeRoles = require("../../middlewares/role.middleware");

const recommendEmployee = require("../../controllers/ai/recommendEmployee");
const suggestEmployee = require("../../controllers/ai/suggestEmployee");
const chat = require("../../controllers/ai/chat");


router.post("/recommend-employee",authenticateUser,authorizeRoles("admin", "manager"),recommendEmployee);
router.post("/suggest-employee",authenticateUser,suggestEmployee);
router.post("/chat", authenticateUser, chat);

module.exports = router;