const mongoose = require("mongoose");


//step1 : define a blue print
const userSchema = mongoose.Schema({
    rollNumber :{
        type : String,
        required : true,
        unique : true
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
