const Router = require("express").Router()
const register = require('../../controllers/auth/register')
const login = require('../../controllers/auth/login')
const createWorkspace = require("../../controllers/auth/createWorkspace")
const authMiddleware = require("../../middlewares/auth.middleware");
const profile = require("../../controllers/auth/profile");
const updateProfile = require("../../controllers/auth/updateProfile");
const sendWorkspaceSignupOtp = require("../../controllers/auth/sendWorkspaceSignupOtp");
const sendPasswordResetOtp = require("../../controllers/auth/sendPasswordResetOtp");
const resetAdminPassword = require("../../controllers/auth/resetAdminPassword");
const verifyPasswordResetOtp = require("../../controllers/auth/verifyPasswordResetOtp");
const approvePasswordResetRequest = require("../../controllers/auth/approvePasswordResetRequest");

Router.post("/createWorkspace/send-otp", sendWorkspaceSignupOtp);
Router.post("/createWorkspace", createWorkspace);
Router.post("/forgot-password/send-otp", sendPasswordResetOtp);
Router.post("/forgot-password/verify-otp", verifyPasswordResetOtp);
Router.post("/forgot-password/approve", authMiddleware, approvePasswordResetRequest);
Router.post("/forgot-password/reset", resetAdminPassword);
Router.use("/register",register)
Router.use("/login",login)

Router.get("/profile", authMiddleware, profile);
Router.put("/profile", authMiddleware, updateProfile);

module.exports = Router