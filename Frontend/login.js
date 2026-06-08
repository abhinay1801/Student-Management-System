function login(event)
{
    event.preventDefault();

    let rollNumber = document.getElementById("rollNumber").value;
    let password = document.getElementById("password").value;

    let data = JSON.parse(localStorage.getItem("loginDetails"));

    if(data.rollNumber != rollNumber && data.password != password)
    {
        window.alert("Invalid credentials");
        return;
    }
    console.log("login successfully");
    window.location.href = "./dashboard.html"
}