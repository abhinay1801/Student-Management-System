
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

    let details = {
        rollNumber: rollNumber.toLowerCase(),
        password: password
    }
    // console.log(details);
    try {
        let response = await fetch("http://127.0.0.1:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(details)
        });
        const data = await response.json();
        // console.log(data);
        if (!data.success) {
            error += data.message;
        }
        else {
            // localStorage.setItem("token",data.token);
            window.location.href = "./dashboard.html"
            // async function help()
            // {

            //     await fetch("http://127.0.0.1:3000/test", {
            //         credentials: "include"
            //     })
            //         .then(res => res.json())
            //         .then(console.log);
            //     console.log("login");
            // }
            // help();
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