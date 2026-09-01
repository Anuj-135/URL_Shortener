const URL = require("../models/url");
const { nanoid } = require("nanoid");
const { validationResult } = require("express-validator");

async function handleGenerateNewShortURL(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const body = req.body;
    const shortID = nanoid(8);

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.redirect(`/?id=${shortID}`);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) { // Null check
        return res.status(404).json({ error: "Short URL not found" });
    }
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};