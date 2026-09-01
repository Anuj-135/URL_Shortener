const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { handleUserSignUp, handleUserLogin } = require("../controllers/user");

router.post(
    "/",
    [
        body("email").isEmail().withMessage("Please enter a valid email address"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ],
    handleUserSignUp
);

router.post("/login", handleUserLogin);

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.redirect("/login");
});

module.exports = router;
