require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require("./db"); // Db connection
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

// Routes 
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const redirectRoute = require("./routes/redirect");

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(express.json()); // parse JSON bodies
app.use(cookieParser()); // Cookie Parser 
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./public")));
app.use("/images", express.static(path.resolve("./images")));

// Connect ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Connection 
connectMongoDb(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/short-url").then(() =>
    console.log("MongoDB Connected")
);

app.use(checkForAuthentication);
app.use("/", staticRoute); // staticRoute
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute); // urlRoute
app.use("/user", userRoute); // userRoute
app.use("/", redirectRoute); // redirectRoute

app.listen(PORT, () => console.log(`Server started at ${PORT}`));

