 
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

 
function showLoginForm() {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");
}

function showSignupForm() {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    signupBtn.classList.add("active");
    loginBtn.classList.remove("active");
}

loginBtn.addEventListener("click", showLoginForm);
signupBtn.addEventListener("click", showSignupForm);
showSignup.addEventListener("click", showSignupForm);
showLogin.addEventListener("click", showLoginForm);

 
document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
        const input = icon.previousElementSibling;
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    });
});

 
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!\%*?&]).{8,}$/;

function showError(id, message) {
    const element = document.getElementById(id);
    element.innerText = message;
    element.classList.add("show");
    element.previousElementSibling.querySelector('input, select').style.borderColor = '#ef4444';
    element.previousElementSibling.querySelector('input, select').style.backgroundColor = '#fef2f2';
}

function clearError(id) {
    const element = document.getElementById(id);
    element.innerText = "";
    element.classList.remove("show");
    element.previousElementSibling.querySelector('input, select').style.borderColor = '';
    element.previousElementSibling.querySelector('input, select').style.backgroundColor = '';
}

function shakeForm(form) {
    form.style.animation = "shake .4s";
    setTimeout(() => { form.style.animation = ""; }, 400);
}

 
function setupLiveValidation(inputId, errorId, validationFn) {
    const input = document.getElementById(inputId);
    if(input) {
        input.addEventListener("input", () => validationFn(input.value));
        input.addEventListener("change", () => validationFn(input.value)); // for selects
    }
}

 
setupLiveValidation("loginEmail", "loginEmailError", (val) => {
    if (!emailPattern.test(val.trim())) showError("loginEmailError", "Enter a valid work email.");
    else clearError("loginEmailError");
});
setupLiveValidation("loginPassword", "loginPasswordError", (val) => {
    if (val.length < 6) showError("loginPasswordError", "Password must be at least 6 characters.");
    else clearError("loginPasswordError");
});
setupLiveValidation("loginRole", "loginEmailError", (val) => clearError("loginEmailError")); // Clear role error on select

 
setupLiveValidation("signupName", "signupNameError", (val) => {
    if (val.trim().length < 3) showError("signupNameError", "Full name must be at least 3 characters.");
    else clearError("signupNameError");
});
setupLiveValidation("signupEmail", "signupEmailError", (val) => {
    if (!emailPattern.test(val.trim())) showError("signupEmailError", "Enter a valid work email.");
    else clearError("signupEmailError");
});
setupLiveValidation("signupPassword", "signupPasswordError", (val) => {
    if (!passwordPattern.test(val)) showError("signupPasswordError", "Use 8+ chars with uppercase, lowercase, number & special char.");
    else clearError("signupPasswordError");
});
setupLiveValidation("signupConfirmPassword", "signupConfirmError", (val) => {
    if (val !== document.getElementById("signupPassword").value) showError("signupConfirmError", "Passwords do not match.");
    else clearError("signupConfirmError");
});

 
window.addEventListener("DOMContentLoaded", () => {
    const savedMail = localStorage.getItem("rememberEmail");
    if (savedMail) {
        const emailInput = document.getElementById("loginEmail");
        if (emailInput) emailInput.value = savedMail;
        const rememberCheck = document.querySelector(".remember-me input");
        if (rememberCheck) rememberCheck.checked = true;
    }
});

 
function loading(button, text) {
    button.disabled = true;
    button.dataset.text = button.innerHTML;
    button.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${text}`;
}
function resetButton(button) {
    button.disabled = false;
    button.innerHTML = button.dataset.text;
}

 

 
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const role = document.getElementById("loginRole").value;

    if (role === "") { showError("loginEmailError", "Please select your role."); isValid = false; }
    else if (!emailPattern.test(email)) { showError("loginEmailError", "Please enter a valid email address."); isValid = false; }
    else clearError("loginEmailError");

    if (password.length < 6) { showError("loginPasswordError", "Password is required."); isValid = false; }
    else clearError("loginPasswordError");

    if (!isValid) { shakeForm(loginForm); return; }

    const loginButton = loginForm.querySelector(".main-btn");
    loading(loginButton, "Authenticating...");

 
    const remember = document.querySelector(".remember-me input");
    if (remember.checked) localStorage.setItem("rememberEmail", email);
    else localStorage.removeItem("rememberEmail");

 
    localStorage.setItem("UserMail", email);
    localStorage.setItem("UserRole", role);

 
    setTimeout(() => {
        resetButton(loginButton);
        if (role === "admin") {
            window.location.href = "admin.html"; // Redirects to Admin Dashboard
        } else {
            window.location.href = "user.html"; // Redirects to Employee Dashboard
        }
    }, 1500);
});

 
signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("signupConfirmPassword").value;
    const role = document.getElementById("signupRole").value;

    if (role === "") { showError("signupNameError", "Please select a role."); isValid = false; }
    if (name.length < 3) { showError("signupNameError", "Name must be at least 3 characters."); isValid = false; }
    if (!emailPattern.test(email)) { showError("signupEmailError", "Enter a valid work email."); isValid = false; }
    if (!passwordPattern.test(password)) { showError("signupPasswordError", "Password must meet complexity requirements."); isValid = false; }
    if (password !== confirm || confirm === "") { showError("signupConfirmError", "Passwords do not match."); isValid = false; }

    if (!isValid) { shakeForm(signupForm); return; }

    const signupButton = signupForm.querySelector(".main-btn");
    loading(signupButton, "Creating Account...");

    setTimeout(() => {
        resetButton(signupButton);
        alert("Account Created Successfully! Please login.");
        signupForm.reset();
        showLoginForm();
    }, 2000);
});

 
document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const activeForm = loginForm.classList.contains("hidden") ? signupForm : loginForm;
        const submitButton = activeForm.querySelector(".main-btn");
        if (submitButton) submitButton.click();
    }
});