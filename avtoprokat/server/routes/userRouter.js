const Router = require("express");
const router = new Router();
const userController = require("../сontrollers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/", userController.createUserData);
router.get("/auth", authMiddleware, checkRole("USER"), userController.check);
router.get("/admin", authMiddleware, checkRole("ADMIN"), userController.check);
router.get("/data", authMiddleware, userController.getOneUser);

module.exports = router;
