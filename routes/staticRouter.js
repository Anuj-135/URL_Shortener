const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { checkForAuthentication, restrictTo } = require("../middlewares/auth");

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => { // ADMIN can see everyone's url
    res.set("Cache-Control", "no-store");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const allUrls = await URL.find({})
        .skip(skip)
        .limit(limit);

    res.render("home", { urls: allUrls, user: req.user, id: req.query.id, page, limit });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => { // NORMAL can see only their own urls, ADMIN can also access
    res.set("Cache-Control", "no-store");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const allUrls = await URL.find({ createdBy: req.user._id })
        .skip(skip)
        .limit(limit);

    res.render("home", { urls: allUrls, user: req.user, id: req.query.id, page, limit });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;