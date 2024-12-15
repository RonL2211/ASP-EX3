// API Base URL
const apiBaseUrl = "https://proj.ruppin.ac.il/bgroup1/test2/tar1/api/User";

$(document).ready(() => {
    // Toggle visibility of login and register sections
    $("#show-register-btn").click(() => {
        $("#login-section").hide();
        $("#register-section").fadeIn();
    });

    $("#show-login-btn").click(() => {
        $("#register-section").hide();
        $("#login-section").fadeIn();
    });

    // Display feedback messages
    function showFeedback(elementId, message, success = true) {
        const element = $("#" + elementId);
        element.css("color", success ? "green" : "red").text(message);
    }

    // Function to register a new user
    function registerUser() {
        const userName = $("#register-username").val().trim();
        const email = $("#register-email").val().trim();
        const password = $("#register-password").val();

        if (!userName || !email || !password) {
            showFeedback("register-feedback", "All fields are required.", false);
            return;
        }

        const userData = JSON.stringify({ id: 0, userName: userName, Email: email, Password: password });

        ajaxCall(
            "POST",
            `${apiBaseUrl}/Register`,
            userData,
            function () {
                showFeedback("register-feedback", "Registration successful! You can now log in.");
            },
            function (xhr) {
                const error = xhr.responseText || "Registration failed.";
                showFeedback("register-feedback", `Registration failed: ${error}`, false);
            }
        );
    }

    // Function to log in a user
    function loginUser() {
        const email = $("#login-email").val().trim();
        const password = $("#login-password").val();

        if (!email || !password) {
            showFeedback("login-feedback", "Both email and password are required.", false);
            return;
        }

        const loginData = JSON.stringify({ id: 0, username: "", Email: email, Password: password });

        ajaxCall(
            "POST",
            `${apiBaseUrl}/Login`,
            loginData,
            function (response) {
                if (response.userName && response.id) {
                    // Save login data to local storage
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("userName", response.userName);
                    localStorage.setItem("userId", response.id);

                    // Add success message to LocalStorage
                    localStorage.setItem("loginSuccessMessage", "Login successful! Welcome, " + response.userName + ".");

                    // Redirect to the main page
                    window.location.href = "index.html";
                } else {
                    showFeedback("login-feedback", "Login succeeded but user details not found.", false);
                }
            },
            function (xhr) {
                const error = xhr.responseText || "Login failed: Please register first.";
                showFeedback("login-feedback", error, false);
            }
        );
    }

    // Event listeners for the buttons
    $("#register-btn").click(registerUser);
    $("#login-btn").click(loginUser);

    // Check login status on other pages
    const currentPageId = $("body").attr("id");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (currentPageId !== "login-page" && !isLoggedIn) {
        // Clear local storage and redirect to login page
        localStorage.clear();
        alert("You must log in to access this page.");
        window.location.href = "login.html";
    }
});

function ajaxCall(method, api, data, successCB, errorCB) {
    $.ajax({
        type: method,
        url: api,
        data: data,
        cache: false,
        contentType: "application/json",
        dataType: "json",
        success: successCB,
        error: errorCB
    });
}
