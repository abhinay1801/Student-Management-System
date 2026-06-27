let tbody = document.getElementsByTagName("tbody")[0];
// let data = JSON.parse(localStorage.getItem("studentDetails"));
// let token = localStorage.getItem("token");
// // console.log(token);
// if (!token) {
//     window.alert("unauthorization access");
//     window.location.href = "login.html";
//     // return;
// }


async function display() {
    try {
        let response = await fetch("http://127.0.0.1:3000/students",
            {
                credentials: "include"
            }
        );
        // console.log(response);
        let dataJson = await response.json();
        // console.log(dataJson);
        if (response.status == 401) {
            window.alert(dataJson.message);
            window.location.href = "login.html"
            return;
        }
        let data = dataJson.data;
        // console.log(dataJson);


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
                        <button id="${student._id}" >Edit</button>
                    </td>
                    <td>
                        <button id="${student._id}" >Delete</button>
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
    if (!confirm("are you want delete student")) {
        return;
    }
    try {
        const response = await fetch(`http://127.0.0.1:3000/students/${idx}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
                // 'Authorization': `Bearer ${token}`
            },
            credentials: "include"
        })

        const dataJson = await response.json();
        if (response.status == 401) {
            window.alert(dataJson.message);
            window.location.href = "login.html"
            return;
        }
        // const data = dataJson.data;

        if (!dataJson.success) {
            window.alert("failed to delete a student");
        }

        // console.log(data);
    }
    catch (error) {
        console.log(error);
    }
    // data.splice(idx,1);
    // localStorage.setItem("studentDetails",JSON.stringify(data));
    // window.alert("student deleted successfully");
    display();
}

function show(event) {
    if (event.target.tagName !== "BUTTON") return;

    if (event.target.textContent == "Delete") {
        remove(event.target.id);
    }
    else {
        edit(event.target.id);
    }
    // console.log(event.target.id);
}