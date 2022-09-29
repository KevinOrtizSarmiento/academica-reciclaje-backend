const { Router } = require("express");
const controladorAuth = require("../controllers/authController")
const router = Router();


router.post("/login", controladorAuth.login);
router.post("/register", controladorAuth.register)
router.post("/logout", controladorAuth.logout);
router.get("/info", controladorAuth.info);

module.exports = router;