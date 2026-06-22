const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const {rollNumber , password} = req.body;
        const user = await User.findOne({ rollNumber});
        // console.log(rollNumber);
        console.log(user);

        if (user==null) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        const check = await bcrypt.compare(password,user.password);

        if(!check)
        {
             return res.status(400).json({
                success:false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                email:user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.status(200).json({
            success:true,
            message: "Login Successful",
            token
        });

        

    }
    catch (err) {
        return res.status(404).json({
            success: false,
            message: "failed to access",
            error: err.message
        })
    }
})





router.post("/register", async (req, res) => {
    try {
        const { rollNumber, email, password } = req.body; //extracting field from body
        // console.log(req.body);
        const existingUser = await User.findOne({ rollNumber });
        // console.log(existingUser);
        if (existingUser!=null) {
            // console.log("122");
            return res.status(409).json(
                {
                    success: false,
                    message: "roll Number already Exists"
                }
            );
        }
        const hashedPassword = await bcrypt.hash(password,12);
        
        const newUser = new User({
            rollNumber,
            email,
            password : hashedPassword
        });
        // console.log(newUser);
        const savedUser = await newUser.save();
        // console.log(savedUser);
        return res.status(201).json({
            success: true,
            message: "Registration Successful",
            data: {
                id: newUser._id,
                rollNumber: newUser.rollNumber,
                email: newUser.email
            }
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "failed to store data",
            error: error.message
        })
    }
})

router.get("/all", async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "data retrieved successfuly", data: users });
    }
    catch (err) {
        return res.status(400).json({ message: "failed to retrieve data", error: err.message });
    }
})


module.exports = router;