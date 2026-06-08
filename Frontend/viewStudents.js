let tbody = document.getElementsByTagName("tbody")[0];
let data = JSON.parse(localStorage.getItem("studentDetails"));

// console.log(data);


function display()
{
    let tdata = "";
    for(let i=0;i<data.length;i++)
    {
        let student = data[i];
        // console.log(student);
        tdata += `
            <tr>
                <td>${student.rollNumber}</td>
                <td>${student.name}</td>
                <td>${student.branch}</td>
                <td>${student.cgpa}</td>
                <td>
                    <button onClick="edit(${i})" >Edit</button>
                </td>
                <td>
                    <button onClick="remove(${i})" >Delete</button>
                </td>
            </tr>
        `
    }
    // console.log(tdata);
    tbody.innerHTML = tdata;
}
display();

function edit(idx)
{
    console.log(idx);
    sessionStorage.setItem("editIdx",idx);
    window.location.href = "./editStudent.html";
}

function remove(idx)
{
    console.log(idx);
    data.splice(idx,1);
    localStorage.setItem("studentDetails",JSON.stringify(data));
    window.alert("student deleted successfully");
    display();
}