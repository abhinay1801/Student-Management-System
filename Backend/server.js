const express = require('express');
const db = require('./db');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();



const userRoute = require("./routes/userRoute");
const studentRoute = require("./routes/studentRoute");

require("dotenv").config();
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin :[
//       "http://localhost:5500",
//       "http://127.0.0.1:5500"
//     ],
//     methods : ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
//   })
// );


app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
  })
);

app.use("/users",userRoute);
app.use("/students",studentRoute);

app.get("/test", (req, res) => {
    console.log(req.cookies);

    res.json({
        cookies: req.cookies
    });
});

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