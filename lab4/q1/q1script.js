const usernameInput = document.getElementById("username");
const statusDiv = document.getElementById("status");
const form = document.getElementById("registerForm");

let usernameAvailable = false;

// Simulated backend usernames
const database = ["dhoni", "virat", "rohit", "rahul", "admin"];

usernameInput.addEventListener("input", () => {
    const username = usernameInput.value.trim().toLowerCase();

    if (username === "") {
        statusDiv.textContent = "";
        return;
    }

    // Show loading effect
    statusDiv.textContent = "Checking availability...";
    statusDiv.className = "loading";

    // Simulate AJAX delay (server response)
    setTimeout(() => {
        if (database.includes(username)) {
            statusDiv.textContent = "❌ Username already taken";
            statusDiv.className = "taken";
            usernameAvailable = false;
        } else {
            statusDiv.textContent = "✅ Username available";
            statusDiv.className = "available";
            usernameAvailable = true;
        }
    }, 700);
});

// Prevent form submission if username exists
form.addEventListener("submit", (e) => {
    if (!usernameAvailable) {
        alert("❌ Username not available. Choose another.");
        e.preventDefault();
    } else {
        alert("✅ Registration Successful!");
    }
});
