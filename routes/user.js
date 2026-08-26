const express = require("express");
const router = express.Router();
const { handleUserSignUp, handleUserLogin } = require("../controllers/user")

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/logout", (req, res) => {
    res.clearCookie("uid");
    return res.redirect("/login");
});

module.exports = router;