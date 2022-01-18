const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyparser = require("body-parser");
const bcrypt = require('bcrypt');
const { body, validationResult } = require("express-validator");
const User = require("../models/users");
const jwt = require('jsonwebtoken');


// @desc    Register User(post)
// @api     "/api/v1/register"
router.post("/register", body('email'), body('password'), async (req, res) => {
    try {

        // express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const { name, email, password } = req.body;
        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: "failed", message: "Invalid Data" })
            }
            else {
                const user = await User.create({
                    name,
                    email,
                    password: hash
                });
                return res.json({
                    status: "Success",
                    data: user
                })
            }
        });
    } catch (err) {
        res.json({
            status: "failed",
            message: err.message
        })
    }
})





// @desc    Register User(post)
// @api     "/api/v1/register"
router.post("/login", body('email'), body('password'), async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        console.log(user.password);
        bcrypt.compare(password, user.password, async function (err, result) {
            // result == true
            if (err) {
                console.log(err);
                return res.status(400).json({
                    status: "failed",
                    message: "Invalid Credentials"
                })
            }
            else {
                return res.json({
                    status: result ? "login successfull" : "Invalid login"
                })
            }
        });

    } catch (e) {

    }
})


module.exports = router;