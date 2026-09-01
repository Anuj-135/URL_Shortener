const express = require("express");
const router = express.Router();
const { handleRedirectToURL } = require("../controllers/redirect");

router.get("/:shortId", handleRedirectToURL);

module.exports = router;
