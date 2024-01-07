const express = require("express")
const { UserModel } = require("../Model/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const usersRoute = express.Router()
const key = "krayzen"

usersRoute.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            res.send(`User with Email Id ${email} already exist`)
        }
        else {
            bcrypt.hash(password, 5, async (err, secure_password) => {
                if (err) {
                    res.send(err)
                } else {
                    let createUser = new UserModel({ name: name, email: email, password: secure_password })
                    await createUser.save()
                    res.send("Signup Successfully")
                    // res.send(createUser)
                }
            });
        }
    } catch (e) {
        res.send(e.message)
    }
})

usersRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await UserModel.findOne({ email })
        console.log(user)
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user._id }, key, { expiresIn: '1h' });
                    res.send({ "token": token, "username": user.name, "userID": user._id });
                } else {
                    res.send("Wrong Credentials")
                }
            });
        }
        else {
            res.send(`User does not exist with Email Id ${email}`)
        }
    } catch (e) {
        console.log(e.message)
        res.send(e.message)
    }
});

module.exports = {
    usersRoute
};