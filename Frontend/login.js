const { use } = require("react");

async function login(event)
{
    event.preventDefault();

    let rollNumber = document.getElementById("rollNumber").value;
    let password = document.getElementById("password").value;

    let errorElement = document.getElementById("error");

    let error = "";

    let rollReg = /^[0-9A-Z]{10}$/i;
    if(!rollReg.test(rollNumber))
    {
        error += "Roll Number should be 10 characters\n";
    }

    let data = JSON.parse(localStorage.getItem("loginDetails"));

    try{
        let response = await fetch("http://localhost:3000/users",{
            method:"GET"
        });
        let data = await response.json();
        // console.log(data);
        let check =  data.some((user)=>user.rollNumber==rollNumber && user.password==password);
        // console.log(check);
        if(check)
        {
            // console.log("login successfully");
            window.location.href = "./dashboard.html"
        }
        else
        {
            error += "Invalid credentials";
        }
    }
    catch(error)
    {
        console.log(error);
    }

    // if(data.rollNumber != rollNumber || data.password != password)
    // {
    //     error += "Invalid credentials\n";
    // }

    if(error.length>0)
    {
        errorElement.innerText = error;
        return;
    }


    console.log("login successfully");
    
    // window.location.href = "./dashboard.html"
}