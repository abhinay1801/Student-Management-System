const mongoose = require('mongoose');

//step1 : assign url to variable

const mongoURL = "mongodb://localhost:27017/myapp"



//step2 : set up mongoDb connection

mongoose.connect(mongoURL)




//step3 : get the default connection 

const db = mongoose.connection;



//step4 : define the event listeners for db connections

db.on('connected',()=>{
    console.log("Connected to mongoDB");
})

db.on('error',(err)=>{
    console.log("mongoDB connection error : ",err);
})

db.on('disconnected',()=>{
    console.log("mongoDB disconnected");
})


//step 5 : export the db

module.exports = db;
