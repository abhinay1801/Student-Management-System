function addStudent(event)
{
    event.preventDefault();

    let rollNumber = document.getElementById("rollNumber").value;
    let name = document.getElementById("name").value;
    let branch = document.getElementById("branch").value;
    let cgpa = document.getElementById("cgpa").value;

    let studentDetails = JSON.parse(localStorage.getItem("studentDetails"));
    console.log(studentDetails);
    if(studentDetails==null)
    {
        studentDetails = [];
    }

    let data = {
        rollNumber : rollNumber,
        name : name,
        branch : branch,
        cgpa : cgpa
    }
    studentDetails.push(data);
    console.log(studentDetails);
    localStorage.setItem("studentDetails",JSON.stringify(studentDetails));
    window.location.href="./viewStudents.html";
}