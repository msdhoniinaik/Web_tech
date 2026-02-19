const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTable");
const messageDiv = document.getElementById("message");

// Simulated JSON database
let students = [];

// Simulated AJAX response
function fakeFetch(response, status = 200) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status === 200) resolve({ status, json: () => response });
            else reject({ status });
        }, 500);
    });
}

// CREATE or UPDATE
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = sid.value;
    const name = document.getElementById("name").value;
    const dept = document.getElementById("dept").value;
    const marks = document.getElementById("marks").value;

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        // Create
        students.push({ id, name, dept, marks });
        fakeFetch({ msg: "Student Added" }, 200)
            .then(showSuccess)
            .catch(showError);
    } else {
        // Update
        students[index] = { id, name, dept, marks };
        fakeFetch({ msg: "Student Updated" }, 200)
            .then(showSuccess)
            .catch(showError);
    }

    displayStudents();
    form.reset();
});

// READ
function displayStudents() {
    tableBody.innerHTML = "";

    fakeFetch(students, 200)
        .then(res => res.json())
        .then(data => {
            data.forEach(s => {
                const row = `
                    <tr>
                        <td>${s.id}</td>
                        <td>${s.name}</td>
                        <td>${s.dept}</td>
                        <td>${s.marks}</td>
                        <td>
                            <button class="action-btn edit" onclick="editStudent('${s.id}')">Edit</button>
                            <button class="action-btn delete" onclick="deleteStudent('${s.id}')">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(() => showError({ status: 500 }));
}

// UPDATE (Fill Form)
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return showError({ status: 404 });

    sid.value = student.id;
    name.value = student.name;
    dept.value = student.dept;
    marks.value = student.marks;
}

// DELETE
function deleteStudent(id) {
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return showError({ status: 404 });

    students.splice(index, 1);

    fakeFetch({ msg: "Deleted" }, 200)
        .then(showSuccess)
        .catch(showError);

    displayStudents();
}

// SUCCESS MESSAGE
function showSuccess(res) {
    res.json().then(data => {
        messageDiv.style.display = "block";
        messageDiv.textContent = "✅ " + data.msg;
        messageDiv.className = "success";
    });
}

function showError(err) {
    messageDiv.style.display = "block";

    let msg = "Server Error";

    if (err.status === 404) msg = "Student Not Found (404)";
    if (err.status === 500) msg = "Internal Server Error (500)";

    messageDiv.textContent = "❌ " + msg;
    messageDiv.className = "error";
}
