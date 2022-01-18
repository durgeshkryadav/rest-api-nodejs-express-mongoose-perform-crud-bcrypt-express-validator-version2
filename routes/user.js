const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyparser = require("body-parser");
const bcrypt = require('bcrypt');
const { body, validationResult } = require("express-validator");
const User = require("../models/users");


// @desc      Create Users(post)
// @api      "/users"
router.post("/", body('email').isEmail(), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // main code
        console.log(req.body);
        const creatData = await User.create(req.body);
        res.json({
            status: "Success",
            agya: "agya data bhai...",
            data: creatData
        })

    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
});



// @desc      Display All Users(get)
// @api      "/api/v1/users"
router.get("/", async (req, res) => {
    try {
        // main code
        const displayData = await User.find();
        res.json({
            status: "Success",
            agya: "agya data bhai...",
            data: displayData
        })

    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
});


// @desc      Display Single User By id(get)
// @api      "/api/v1/users/:id"
router.get("/:id", async (req, res) => {
    console.log(req.params);
    try {
        // main code
        const displaySingleData = await User.find({ _id: req.params.id });
        res.json({
            status: "Success",
            agya: "agya data bhai...",
            data: displaySingleData
        })
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
});




// @desc      Update User By Id(put)
// @api      "/api/v1/users/:id"
router.put("/:id", async (req, res) => {
    try {
        // main code
        const displaySingleData = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });

        res.json({
            status: "Success",
            agya: "agya data bhai...",
            data: displaySingleData
        })
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
});





// @desc      Delete User By Id(delete)
// @api      "/api/v1/users/:id"
router.delete("/:id", async (req, res) => {
    try {
        // main code
        const displaySingleData = await User.deleteOne({ _id: req.params.id });

        res.json({
            status: "Success",
            agya: "agya data bhai...",
            data: displaySingleData
        })
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
});






module.exports = router;