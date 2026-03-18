const calculateAverage = (a, b, c) => (a + b + c) / 3;

function calculate() {
    let name = document.getElementById("name").value;
    let m1 = document.getElementById("m1").value;
    let m2 = document.getElementById("m2").value;
    let m3 = document.getElementById("m3").value;

    // Validation
    if (name === "" || m1 === "" || m2 === "" || m3 === "") {
        document.getElementById("result").innerHTML = "Please enter all fields";
        return;
    }

    // Convert to numbers
    m1 = Number(m1);
    m2 = Number(m2);
    m3 = Number(m3);

    let total = m1 + m2 + m3;
    let avg = calculateAverage(m1, m2, m3);

    document.getElementById("result").innerHTML =
        `Name: ${name}<br>
         Total Marks: ${total}<br>
         Average Marks: ${avg.toFixed(2)}`;
}