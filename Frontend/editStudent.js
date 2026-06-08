let idx = sessionStorage.getItem("editIdx");
let data = JSON.parse(localStorage.getItem("studentDetails"));
let student = data[idx];

let rollNumber = document.getElementById("rollNumber");
let name = document.getElementById("name");
let branch= document.getElementById("branch");
let cgpa = document.getElementById("cgpa");

rollNumber.value = student.rollNumber;
name.value = student.name;
branch.value = student.branch;
cgpa.value = student.cgpa;


function edit(event)
{
    event.preventDefault();

    let editStudent = {
        rollNumber : rollNumber.value,
        name : name.value,
        branch : branch.value,
        cgpa : cgpa.value
    };

    data[idx] = editStudent;
    localStorage.setItem("studentDetails",JSON.stringify(data));

    window.location.href = "./viewStudents.html";
}