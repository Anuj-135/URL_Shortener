const express = require("express");
const { connectMongoDb } = require("./db")
const urlRoute = require("./routes/url")
const app = express();
const PORT = 8001;

//Middleware
app.use(express.json());  // parse JSON bodies

//Connection 
connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
    console.log("MongoDB Connected")
);

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
