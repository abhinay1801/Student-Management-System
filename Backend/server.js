const express = require('express');
const db = require('./db');
const app = express();

const loginRoute = require("./routes/loginRoute");
const studentRoute = require("./routes/studentRoute");
app.use(express.json());




app.use("/",loginRoute);
app.use("/student",studentRoute);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


// app.get("/",(req,res)=>{
//     res.send("hello guru!!!");
// })





//for students

app.listen(3000,()=>{
    console.log("app is listening at port 3000");
})