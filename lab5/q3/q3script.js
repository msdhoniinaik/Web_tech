let students = [];

// Load JSON using Fetch API
function loadStudents() {
    fetch("students.json")
        .then(res => res.json())
        .then(data => {
            students = data;
            displayStudents();
            showMsg("Students loaded", "success");
        })
        .catch(err => {
            showMsg("JSON Load Error", "error");
        });
}

// Display Students
function displayStudents() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach(s => {
        table.innerHTML += `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.course}</td>
            <td>${s.marks}</td>
            <td><button onclick="deleteStudent('${s.id}')">Delete</button></td>
        </tr>`;
    });
}

// Add Student
function addStudent() {
    const id = sid.value;
    const name = sname.value;
    const course = scourse.value;
    const marks = smarks.value;

    if (!id || !name || !course || !marks) {
        showMsg("Fill all fields", "error");
        return;
    }

    students.push({ id, name, course, marks });
    displayStudents();
    showMsg("Student added (browser memory)", "success");
}

// Update Student
function updateStudent() {
    const id = sid.value;
    const course = scourse.value;
    const marks = smarks.value;

    const student = students.find(s => s.id === id);

    if (!student) {
        showMsg("Student not found", "error");
        return;
    }

    student.course = course;
    student.marks = marks;
    displayStudents();
    showMsg("Student updated", "success");
}

// Delete Student
function deleteStudent(id) {
    students = students.filter(s => s.id !== id);
    displayStudents();
    showMsg("Student deleted", "success");
}

// Message Function
function showMsg(text, type) {
    const msg = document.getElementById("msg");
    msg.className = type;
    msg.innerText = text;
}

// Load on page start
loadStudents();
