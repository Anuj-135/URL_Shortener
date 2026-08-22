const express = require("express");
const path = require("path");
const { connectMongoDb } = require("./db")
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const URL = require("./models/url");

const app = express();
const PORT = 8001;

//Middleware
app.use(express.json());  // parse JSON bodies
app.use(express.urlencoded({ extended: false }));

//connect ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Connection 
connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
    console.log("MongoDB Connected")
);

//staticRoute
app.use("/", staticRoute);
//urlRoute
app.use("/url", urlRoute);



app.get("/:shortId", async (req, res) => {            //register the visitHistory in timestamp
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {                       //Find
            shortId,
        },
        {                       // Update
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            },
        },

    )
    if (!entry) {
        return res.status(404).send("URL not found");
    }
    res.redirect(entry.redirectURL);
})



app.listen(PORT, () => console.log(`Server started at ${PORT}`));
