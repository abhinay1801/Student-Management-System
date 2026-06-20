let idx = sessionStorage.getItem("editIdx");

// let data = JSON.parse(localStorage.getItem("studentDetails"));
let rollNumber = document.getElementById("rollNumber");
let name = document.getElementById("name");
let branch = document.getElementById("branch");
let cgpa = document.getElementById("cgpa");

async function getData(idx) {
    try {
        let response = await fetch(`http://localhost:3000/students/${idx}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        let studentJson = await response.json();
        let student = studentJson.data;

        // console.log(studentJson);
        // console.log(student);

        rollNumber.value = student.rollNumber;
        name.value = student.name;
        branch.value = student.branch;
        cgpa.value = student.cgpa;
    }
    catch (error) {
        console.log(error);
    }
}

getData(idx);

async function edit(event) {
    event.preventDefault();

    let errorElement = document.getElementById("error");

    let error = "";

    let rollReg = /^[0-9A-Z]{10}$/i;
    if (!rollReg.test(rollNumber.value)) {
        error += "Roll Number should be 10 characters\n";
    }


    let nameReg = /^[a-zA-Z]+([a-zA-Z\s]*[a-zA-Z]+)?$/;
    if (!nameReg.test(name.value)) {
        error += "Name should contains only alphabets\n";
    }
    // console.log(branch);


    let branchReg = /(CSE|CSD|CSM|CSC|AIM|AID|EEE|ECE|MECH|CIVIL|IT)/i;
    // console.log(branchReg.test(branch));
    if (!branchReg.test(branch.value)) {
        error += "Invalid Branch\n";
    }


    let cgpaReg = /^([0-9](\.[0-9]{1,2})?|(10(\.[0]{1,2})?))$/;
    // console.log(cgpa);
    // console.log(cgpaReg.test(cgpa));
    if (!cgpaReg.test(cgpa.value)) {
        error += "Invalid CGPA\n";
    }



    if (error.length > 0) {
        errorElement.innerText = error;
        return;
    }

    let editStudent = {
        rollNumber: rollNumber.value,
        name: name.value,
        branch: branch.value,
        cgpa: cgpa.value
    };

    // console.log(editStudent);

    try {
        let response = await fetch(`http://localhost:3000/students/${idx}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editStudent)
        })
        let dataJson = await response.json();

        if(!dataJson.success)
        {
            window.alert("failed to update student details");
        }
        else
        {
            window.location.href = "./viewStudents.html";
        }
    }
    catch (error) {
        console.log(error);
    }
    // data[idx] = editStudent;
    // localStorage.setItem("studentDetails", JSON.stringify(data));

    // window.location.href = "./viewStudents.html";
}