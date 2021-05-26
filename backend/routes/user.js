const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

router.get("/loadUser", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select(
        "-Hashed_Password -salt"
    );
    res.send(user);
});

router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { username, password } = req.body;

    await User.findOne({ username: req.body.username }).then((user) => {
        if (user) {
            return res.status(400).json({
                msg: "Username already exist",
            });
        }

        bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
            if (err) {
                return res.status(401).json({
                    msg: err, // try throw err;
                });
            }

            let user = new User({
                username, // coz its same as name: name; ES6 syntax
                password: hashedPass,
            });
            user.save()
                .then((user) => {
                    // console.log(req.body)
                    res.status(200).send({
                        user: username,
                        msg: "Signup success! Please signin.",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    });
});

router.post("/login", (req, res) => {
    // console.log(req.body);

    const { username, password } = req.body;

    User.findOne({ username })
        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    msg: "Username does not exist. Please signup.",
                });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                // password is what user enter, user.password is what's hashed in DB
                if (err) throw err; // OR { return done(err) }

                if (isMatch) {
                    // generate token
                    const token = jwt.sign(
                        { _id: this._id },
                        process.env.JWT_SECRET,
                        { expiresIn: "1hr" }
                    );
                    const { username } = user; /* email, role */

                    return res.header("x-auth-token", token).json({
                        user: { username /* email, role */ },
                        token,
                        msg: "Successful Login",
                    });

                    console.log("res.header: ", res.header);
                    console.log("token: ", token);

                    /* return res.status(200).json({
                        msg: "User matched.",
                    }); */
                } else {
                    return res.status(401).json({
                        msg: "Password does not match",
                    });
                }
            });
        })
        .catch((err) => {
            console.log("Login Error: ", err);
        });

    /* 
    
    const { username, password } = req.body;
    User.findOne({ username }).then(user => {
        if (err || !user) {
            return res.status(400).json({
                msg: "User with that staffId does not exist. Please signup.",
            });
        }

        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                msg: "staffId and Password do not match.",
            });
        }

        // generate token
        const token = user.generateAuthToken();
        const { username, email, role } = user;
        res.header("x-auth-token", token).json({
            user: { username, email, role },
            token,
            msg: "success",
        });
    });

 */

    /* 
    passport.authenticate("local", {
        successRedirect: "/dashboard", // dashboard.ejs
        failureRedirect: "/users/login", // login GET request
        failureFlash: true,
    })(req, res, next); 
    */
});

module.exports = router;
