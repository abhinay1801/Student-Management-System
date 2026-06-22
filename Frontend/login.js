
async function login(event) {
    event.preventDefault();

    let rollNumber = document.getElementById("rollNumber").value;
    let password = document.getElementById("password").value;

    let errorElement = document.getElementById("error");

    let error = "";

    let rollReg = /^[0-9A-Z]{10}$/i;
    if (!rollReg.test(rollNumber)) {
        error += "Roll Number should be 10 characters\n";
    }

    if (error.length > 0) {
        errorElement.innerText = error;
        return;
    }

    let details  = {
        rollNumber : rollNumber.toLowerCase(),
        password : password
    }
    // console.log(details);
    try {
        let response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(details)
        });
        const data = await response.json();

        if (!data.success) {
            error += data.message;
        }
        else {
            localStorage.setItem("token",data.token);
            window.location.href = "./dashboard.html"
        }
    }
    catch (error) {
        console.log(error);
    }

    // if(data.rollNumber != rollNumber || data.password != password)
    // {
    //     error += "Invalid credentials\n";
    // }

    if (error.length > 0) {
        errorElement.innerText = error;
        return;
    }


    console.log("login successfully");
}