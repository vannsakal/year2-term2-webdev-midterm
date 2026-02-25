// COOKIE FUNCTIONS
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; Max-Age=0; path=/";
}

// PASSWORD STRENGTH CHECKER
function checkPasswordStrength() {
    const password = document.getElementById("password").value;
    const feedback = document.getElementById("feedback");

    let rules = 0;

    if (password.length >= 8) rules++;
    if (/[0-9]/.test(password)) rules++;
    if (/[!@#$%^&*]/.test(password)) rules++;

    if (rules <= 1) {
        feedback.textContent = "Weak";
        feedback.style.color = "red";
    } else if (rules === 2) {
        feedback.textContent = "Medium";
        feedback.style.color = "orange";
    } else {
        feedback.textContent = "Strong";
        feedback.style.color = "green";
    }
}

// LOGIN FUNCTION
function login() {
    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value;

    if (!role || !password) {
        alert("Please fill all fields");
        return;
    }

    setCookie("active_role", role, 1);

    if (role === "Nurse") {
        window.location.href = "nurse.html";
    } else if (role === "Admin") {
        window.location.href = "admin.html";
    }
}

// AUTO LOGIN
function autoLogin() {
    const role = getCookie("active_role");
    if (role === "Nurse") {
        window.location.replace("nurse.html");
    } else if (role === "Admin") {
        window.location.replace("admin.html");
    }
}

// SECURITY GUARD
function guard(requiredRole = null) {
    const role = getCookie("active_role");

    if (!role) {
        window.location.href = "error.html";
    }

    if (requiredRole && role !== requiredRole) {
        window.location.href = "error.html";
    }
}

// LOGOUT
function logout() {
    deleteCookie("active_role");
    window.location.href = "landing.html";
}

// RESET SESSION
function resetSession() {
    deleteCookie("active_role");
    window.location.href = "index.html";
}