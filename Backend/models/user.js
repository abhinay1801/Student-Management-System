const mongoose = require("mongoose");


//step1 : define a blue print
const userSchema = mongoose.Schema({
    rollNumber :{
        type : String,
        required : true,
        unique : true,
        lowercase: true,
        trim : true,
        minLength: [10, 'roll number must be exactly 10 characters long'],
        maxLength: [10, 'roll number must be exactly 10 characters long']
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})


//step2 : compile a schema into model and export it

const user = mongoose.model('User',userSchema);

module.exports = user;
