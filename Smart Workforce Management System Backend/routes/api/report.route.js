const router = require("express").Router();
const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");
const getReports = require("../../controllers/report/getReports");
const createReport = require("../../controllers/report/createReport");
const deleteReport = require("../../controllers/report/deleteReport");

router.use(authMiddleware, roleMiddleware("admin", "manager"));
router.get("/getAll", getReports);
router.post("/create", createReport);
router.delete("/delete/:id", deleteReport);

module.exports = router;
