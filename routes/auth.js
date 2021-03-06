const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../middlewares/auth");

const router = express.Router();
const {check, validationResult} = require('express-validator/check');

const User = require("../models/User");


//  @route      GET api/auth
//  @desc       Get a logged in user
//  @access     Private
router.get('/', [auth], async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
});

//  @route      POST api/auth
//  @desc       Auth user & get token
//  @access     Public
router.post('/', [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password").exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    ;

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email: email});

        if (!user) {
            return res.status(400).json({msg: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: "Invalid credentials"});
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get("JWT_SECRET"), {
            expiresIn: 3600
        }, (err, token) => {
            if (err) {
                throw err;
            }
            res.json({"X-Auth-Token": token});
        });
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error");
    }
});

module.exports = router;