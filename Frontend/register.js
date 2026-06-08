function registerUser(event)
{
    event.preventDefault();

    let rollNumber = document.getElementById("rollNumber").value;
    let password = document.getElementById("password").value;
    let conformPassword = document.getElementById("conformPassword").value;

    if(rollNumber.length != 10)
    {
        alert("Roll Number should be 10 characters");
        return;
    }
    if(password<8)
    {
        alert("Passwords must be atleast 8 characters");
        return;
    }

    if(password !== conformPassword)
    {
        alert("Passwords do not match");
        return;
    }

    let data = {
        rollNumber : rollNumber,
        password : password
    }

    localStorage.setItem("loginDetails",JSON.stringify(data));
    window.location.href = "./login.html";
}