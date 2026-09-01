const User = require("../models/user");
const { v4: uuidv4 } = require("uuid")
const { setUser } = require("../service/auth")
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');

async function handleUserSignUp(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("signup", {
            error: errors.array()[0].msg
        });
    }

    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.redirect("/login");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
    });
    
    if (!user) {
        return res.render("login", {
            error: "Invalid Username or Password",
        })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.render("login", {
            error: "Invalid Username or Password",
        })
    }

    // const sessionId = uuidv4();   no more needed
    // setUser(sessionId, user);
    // res.cookie("uid", sessionId);
    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
}