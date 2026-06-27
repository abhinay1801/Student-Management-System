const express = require("express");
const Student = require('../models/student');
const router = express.Router();
const auth = require("../middleware/authMiddleware");
router.post("/",auth,async (req,res)=>{
    try{
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        // console.log(savedStudent);
        return res.status(201).json({
            success:true,
            message : "new student stored succesfully",
            data : savedStudent
        })
    }
    catch(err)
    {
        return res.status(400).json({
            success: false,
            message : "failed to add a sudent",
            error : err.message
        })
    }

})

router.get("/",auth,async (req,res)=>{
    try{
        const allStudents = await Student.find();
        // console.log(allStudents);
        return res.status(201).json({
            success:true,
            message : "data fetched successfully",
            data : allStudents
        });
    }
    catch(err)
    {
        return res.status(404).json({
            success: false,
            message:"failed to fetch students from Db",
            error : err.message
        });
    }
})


router.get("/:id",auth,async (req,res)=>{
    try{
        const id = req.params.id;
        // console.log(id);
        const student = await Student.findOne({_id:id});
        // console.log(student);

        if(student==null)
        {
            return res.status(404).json({
            success: false,
            message : "no student with id"
        });
        }
        
        return res.status(201).json({
            success:true,
            message : "data fetched successfully",
            data : student
        });
    }
    catch(err)
    {
        return res.status(404).json({
            success: false,
            message:"failed to fetch students from Db",
            error : err.message
        });
    }

})



router.put("/:id",auth,async (req,res)=>{
     try{
        const id = req.params.id;
        //console.log(id);
        const updatedStudentData = req.body;
        // console.log(updatedStudentData);

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            updatedStudentData,
            {
                returnDocument: 'after', //return the data after modification only ( before used to fetch old data - modified data)
                runValidators: true
            }
        )

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found with the given ID"
            });
        }


        return res.status(201).json({
            success:true,
            message: "Student data updated successfully",
            data: updatedStudent
        });
    }
    catch(err)
    {
        return res.status(404).json({
            success: false,
            message:"failed to fetch students from Db",
            error : err.message
        });
    }
})



router.delete("/:id",auth,async (req,res)=>{
    try{
        const id = req.params.id;
        // console.log(id);

        const deletedStudent = await Student.findByIdAndDelete(id)

        if (!deletedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found with the given ID"
            });
        }


        return res.status(201).json({
            success:true,
            message: "Student data updated successfully",
            data: deletedStudent
        });
    }
    catch(err)
    {
        return res.status(404).json({
            success: false,
            message:"failed to fetch students from Db",
            error : err.message
        });
    }
})


module.exports = router;