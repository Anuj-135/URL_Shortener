const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser")
const { connectMongoDb } = require("./db")      //Db connection
const URL = require("./models/url");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");

//Routes 
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")


const app = express();
const PORT = 8001;

//Middleware
app.use(express.json());  // parse JSON bodies
app.use(cookieParser());  //Cookie Parser 
app.use(express.urlencoded({ extended: false }));

//connect ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Connection 
connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
    console.log("MongoDB Connected")
);


app.use("/", checkAuth, staticRoute);          //staticRoute
app.use("/url", restrictToLoggedInUserOnly, urlRoute);              //urlRoute
app.use("/user", userRoute);            //userRoute




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
