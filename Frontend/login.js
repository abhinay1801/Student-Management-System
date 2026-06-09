function login(event)
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

    if(data.rollNumber != rollNumber || data.password != password)
    {
        error += "Invalid credentials\n";
    }

     if(error.length>0)
    {
        errorElement.innerText = error;
        return;
    }

    console.log("login successfully");
    window.location.href = "./dashboard.html"
}