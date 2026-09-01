const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
    handleGenerateNewShortURL,
    handleGetAnalytics,
} = require("../controllers/url");

router.post(
    "/",
    [
        body("url")
            .trim()
            .notEmpty()
            .withMessage("URL is required")
            .isURL({ protocols: ["http", "https"], require_protocol: true })
            .withMessage("Please enter a valid HTTP or HTTPS URL"),
    ],
    handleGenerateNewShortURL
);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;