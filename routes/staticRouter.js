const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { checkForAuthentication, restrictTo } = require("../middlewares/auth");

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {    // ADMIN can see everyone's url
    res.set("Cache-Control", "no-store");
    const allUrls = await URL.find({});
    res.render("home", { urls: allUrls, user: req.user, id: req.query.id })   // added id: req.query.id 
})


router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {           // NORMAL can see only his own url  both NORMAL and ADMIN can access
    res.set("Cache-Control", "no-store");
    const allUrls = await URL.find({ createdBy: req.user._id });
    res.render("home", { urls: allUrls, user: req.user, id: req.query.id })   // added id: req.query.id 
})

router.get("/signup", (req, res) => {
    return res.render("signup");
})

router.get("/login", (req, res) => {
    return res.render("login");
})

module.exports = router;