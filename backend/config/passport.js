const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: "username", passwordField: "password" },
            (username, password, done) => {
                User.findOne({
                    // match user username
                    username: username,
                })
                    .then((user) => {
                        if (!user) {
                            // if no match
                            return done(null, false, {
                                message: "That email is not registered",
                            }); // null is error, false is user, object argument is for options
                        }

                        // match password
                        bcrypt.compare(
                            password,
                            user.password,
                            (err, isMatch) => {
                                // password is what user enter, user.password is what's hashed in DB
                                if (err) throw err; // OR { return done(err) }

                                if (isMatch) {
                                    // passwords match
                                    // return done(null, user); // null err, and user is true
                                    return res.status(200).json({
                                        msg: "User matched.",
                                    });
                                } else {
                                    return done(null, false, {
                                        message: "Password incorrect",
                                    });
                                }
                            }
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
