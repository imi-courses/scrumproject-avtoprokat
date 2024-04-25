const Router = require("express");
const router = new Router();
const applicationController = require("../сontrollers/applicationController");
const checkRole = require("../middleware/checkRoleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, applicationController.createApplication);
router.get("/", authMiddleware, applicationController.getApplications);
router.get(
  "/admin",
  checkRole("ADMIN"),
  applicationController.getAdminApplications
);
router.get("/:id", applicationController.getOneApplication);
router.patch(
  "/:id",
  checkRole("ADMIN"),
  applicationController.changeApplicationStatus
);

module.exports = router;
