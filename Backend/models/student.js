const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    rollNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [10, 'roll number must be exactly 5 characters long'],
        maxLength: [10, 'roll number must be exactly 5 characters long']
    },
    name : {
        type: String,
        required: true,
        trim: true
    },
    branch : {
        type : String,
        enum : ["CSE","CSD","CSM","CSC","AIM","AID","EEE","ECE","MECH","CIVIL","IT"],
        uppercase : true,
        default : "CSE"
    },
    cgpa : {
        type : Number,
        min : 0,
        max : 10
    }
})

const student = mongoose.model("Student",studentSchema);

module.exports = student;