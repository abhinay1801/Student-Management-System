async function registerUser(event) {
    event.preventDefault();

    let rollNumber = document.getElementById("rollNumber").value;
    let password = document.getElementById("password").value;
    let conformPassword = document.getElementById("conformPassword").value;
    let email = document.getElementById("email").value;
    let errorElement = document.getElementById("error");

    let error = "";

    let rollReg = /^[0-9A-Z]{10}$/i;
    let passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

    let emailReg = /^[0-9A-Z]{10}@cvr.ac.in$/i;
    if (!emailReg.test(email)) {
        error += "entered email is invalid\n";
    }
    // console.log(rollNumber);
    // console.log(typeof rollNumber);
    // console.log(rollReg.test(rollNumber));
    if (!rollReg.test(rollNumber)) {
        error += "Roll Number should be 10 characters\n";
    }
    if (!passReg.test(password)) {
        error += "Passwords must be satisfy contraints\n atleast 1 uppercase\natleast 1 lowercase\natleast 1 digit\naltest 1 special charcter ([!@#$%^&*]) ";
    }

    if (password !== conformPassword) {
        error += "Passwords do not match\n";
    }

    if (error.length > 0) {
        errorElement.innerText = error;
        return;
    }

    let data = {
        rollNumber: rollNumber,
        password: password,
        email: email
    }

    try {
        const response = await fetch("http://localhost:3000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const info = await response.json();
        // console.log(info.success);
        if (!info.success) {
            error += info.message;
        }
        else {
            window.location.href = "./login.html";
        }
    }
    catch (error) {
        console.log(error);
    }

    // localStorage.setItem("loginDetails",JSON.stringify(data));

}