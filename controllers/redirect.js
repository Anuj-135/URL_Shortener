const URL = require("../models/url");

async function handleRedirectToURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    if (!entry) {
        return res.status(404).send("URL not found");
    }

    return res.redirect(entry.redirectURL);
}

module.exports = {
    handleRedirectToURL,
};
