async function addStudent(event)
{
    event.preventDefault();

    let rollNumber = document.getElementById("rollNumber").value;
    let name = document.getElementById("name").value;
    let branch = document.getElementById("branch").value;
    let cgpa = document.getElementById("cgpa").value;

    let errorElement = document.getElementById("error");
    let error = "";

    let rollReg = /^[0-9A-Z]{10}$/i;
    if(!rollReg.test(rollNumber))
    {
        error += "Roll Number should be 10 characters\n";
    }

    let nameReg =/^[a-zA-Z]+([a-zA-Z\s]*[a-zA-Z]+)?$/;
     if(!nameReg.test(name))
    {
        error += "Name should contains only alphabets\n";
    }
    // console.log(branch);


    let branchReg = /(CSE|CSD|CSM|CSC|AIM|AID|EEE|ECE|MECH|CIVIL|IT)/i;
    // console.log(branchReg.test(branch));
     if(!branchReg.test(branch))
    {
        error += "Invalid Branch\n";
    }

    let cgpaReg = /^([0-9](\.[0-9]{1,2})?|(10(\.[0]{1,2})?))$/;
    // console.log(cgpa);
    // console.log(cgpaReg.test(cgpa));
    if(!cgpaReg.test(cgpa))
    {
        error += "Invalid CGPA\n";
    }
    if(error.length>0)
    {
        errorElement.innerText = error;
        return;
    }



    let studentDetails = JSON.parse(localStorage.getItem("studentDetails"));
    // console.log(studentDetails);
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

     try{
        await fetch("http://localhost:3000/students",{
            method:"POST",
            body:JSON.stringify(data)
        })
        .then(res=>console.log(res))
        .catch(error=>console.log(error));
    }
    catch(error)
    {
        console.log(error);
    }

    // studentDetails.push(data);
    // console.log(studentDetails);
    // localStorage.setItem("studentDetails",JSON.stringify(studentDetails));

    
    window.location.href="./viewStudents.html";
}