const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/login", async (req,res)=>{
    try{
        const user = req.body;
        const checkUser = await User.findOne({rollNumber:user.rollNumber});

        console.log(user);
        // console.log(checkUser);

        if(checkUser==null)
        {
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }

        if(checkUser.password == user.password)
        {
            return res.status(200).json({
                success:true,
                message:"login successfull"
            })
        }
        else
        {
            return res.status(401).json({
                success:false,
                message:"Invalid creditenials"
            })
        }
    }
    catch(err)
    {
        return res.status(404).json({
            success:false,
            message:"failed to access",
            error : err.message
        })
    }
})





router.post("/register",async (req,res)=>{
    try{

        // create a document user instance
        const newUser = new User(req.body);
        console.log(newUser);
        //save the document into mongoDB

        const savedUser = await newUser.save();

        return res.status(201).json({
            success:true,
            message : "new user stored succesfully",
            data : savedUser
        })
    }
    catch(error)
    {
        return res.status(400).json({
            success:false,
            message : "failed to store data",
            error : error.message
        })
    }
})

router.get("/all", async (req,res)=>{
    try{
        const users = await User.find();
        return res.status(200).json({message:"data retrieved successfuly",data : users});
    }
    catch(err)
    {
         return res.status(400).json({message:"failed to retrieve data",error : err.message});
    }
})


module.exports = router;