let tbody = document.getElementsByTagName("tbody")[0];
// let data = JSON.parse(localStorage.getItem("studentDetails"));

// console.log(data);


async function display() {
    try {
        let response = await fetch("http://localhost:3000/students");
        let data = await response.json();
        // console.log(data);


        let tdata = "";
        for (let i = 0; i < data.length; i++) {
            let student = data[i];
            tdata += `
                <tr onClick="show(event)">
                    <td>${student.rollNumber}</td>
                    <td>${student.name}</td>
                    <td>${student.branch}</td>
                    <td>${student.cgpa}</td>
                    <td>
                        <button id="${student.id}" >Edit</button>
                    </td>
                    <td>
                        <button id="${student.id}" >Delete</button>
                    </td>
                </tr>
            `
        }
        // console.log(tdata);
        tbody.innerHTML = tdata;
    }
    catch (error) {
        console.log(error);
    }
}
display();

function edit(idx) {
    // console.log(idx);
    sessionStorage.setItem("editIdx", idx);
    window.location.href = "./editStudent.html";
}

async function remove(idx) {
    // console.log(idx);
    try {
        await fetch(`http://localhost:3000/students/${idx}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    console.log('Object deleted successfully');
                }
            })
            .catch(error => console.error('Error deleting object:', error));
    }
    catch (error) {
        console.log(error);
    }
    // data.splice(idx,1);
    // localStorage.setItem("studentDetails",JSON.stringify(data));
    window.alert("student deleted successfully");
    display();
}

function show(event)
{
    if(event.target.textContent=="Delete")
    {
        remove(event.target.id);
    }
    else
    {
        edit(event.target.id);
    }
    // console.log(event.target.id);
}