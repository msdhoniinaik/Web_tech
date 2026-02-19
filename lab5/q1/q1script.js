let xmlDoc;

// Load XML Employees
function loadEmployees() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            xmlDoc = xhr.responseXML;
            displayEmployees();
            showMsg("Employees loaded successfully", "success");
        } else {
            showMsg("Error loading XML file", "error");
        }
    };

    xhr.send();
}

// Display Employees in Table
function displayEmployees() {
    const tbody = document.querySelector("#empTable tbody");
    tbody.innerHTML = "";

    const employees = xmlDoc.getElementsByTagName("employee");

    for (let emp of employees) {
        const id = emp.getElementsByTagName("id")[0].textContent;
        const name = emp.getElementsByTagName("name")[0].textContent;
        const dept = emp.getElementsByTagName("department")[0].textContent;
        const salary = emp.getElementsByTagName("salary")[0].textContent;

        const row = `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${dept}</td>
            <td>${salary}</td>
            <td><button onclick="deleteEmployee('${id}')">Delete</button></td>
        </tr>`;
        tbody.innerHTML += row;
    }
}

// Add Employee (XML DOM)
function addEmployee() {
    const id = empId.value;
    const name = empName.value;
    const dept = empDept.value;
    const salary = empSalary.value;

    if (!id || !name) {
        showMsg("Enter ID and Name", "error");
        return;
    }

    const emp = xmlDoc.createElement("employee");

    emp.appendChild(createNode("id", id));
    emp.appendChild(createNode("name", name));
    emp.appendChild(createNode("department", dept));
    emp.appendChild(createNode("salary", salary));

    xmlDoc.getElementsByTagName("employees")[0].appendChild(emp);

    displayEmployees();
    showMsg("Employee added (only in browser memory)", "success");
}

// Update Employee
function updateEmployee() {
    const id = empId.value;
    const dept = empDept.value;
    const salary = empSalary.value;

    const employees = xmlDoc.getElementsByTagName("employee");

    for (let emp of employees) {
        if (emp.getElementsByTagName("id")[0].textContent === id) {
            if (dept) emp.getElementsByTagName("department")[0].textContent = dept;
            if (salary) emp.getElementsByTagName("salary")[0].textContent = salary;
            displayEmployees();
            showMsg("Employee updated", "success");
            return;
        }
    }

    showMsg("Employee not found", "error");
}

// Delete Employee
function deleteEmployee(id) {
    const employees = xmlDoc.getElementsByTagName("employee");

    for (let emp of employees) {
        if (emp.getElementsByTagName("id")[0].textContent === id) {
            emp.parentNode.removeChild(emp);
            displayEmployees();
            showMsg("Employee deleted", "success");
            return;
        }
    }
}

// Helper Function
function createNode(tag, value) {
    const node = xmlDoc.createElement(tag);
    node.textContent = value;
    return node;
}

// Messages
function showMsg(text, type) {
    const msg = document.getElementById("msg");
    msg.className = "message " + type;
    msg.innerText = text;
}

// Load on Start
loadEmployees();
