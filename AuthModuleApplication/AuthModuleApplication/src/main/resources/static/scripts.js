document.addEventListener("DOMContentLoaded", function () {
  // Get references to the forms and buttons
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const passwordResetForm = document.getElementById("reset-form");
  const profileForm = document.getElementById("profile-form");
  const logoutButton = document.getElementById("logout-button");
  const profilePicture = document.getElementById("profile-picture");
  const profilePicturePreview = document.getElementById(
    "profile-picture-preview"
  );
  const messageContainer = document.getElementById("message-container");

  // Function to validate email format
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Function to validate password strength
  function validatePassword(password) {
    return password.length >= 6; // Minimum length of 6 characters
  }

  // Function to show success/error messages with smooth transition
  function showMessage(message, isSuccess) {
    const messageDiv = document.createElement("div");
    messageDiv.className = isSuccess
      ? "alert alert-success"
      : "alert alert-danger";
    messageDiv.textContent = message;
    messageDiv.style.opacity = 0; // Start hidden
    messageContainer.appendChild(messageDiv);

    // Trigger a reflow to enable the transition
    requestAnimationFrame(() => {
      messageDiv.style.transition = "opacity 0.5s ease-in-out";
      messageDiv.style.opacity = 1; // Fade in
    });

    setTimeout(() => {
      messageDiv.style.opacity = 0; // Fade out
      setTimeout(() => messageDiv.remove(), 500); // Remove after fade-out
    }, 3000); // Keep the message visible for 3 seconds
  }

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      if (validateEmail(email) && password) {
        fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              showMessage("Login successful!", true);
              window.location.href = "profile.html"; // Redirect to profile page
            } else {
              showMessage(data.message, false);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            showMessage("An error occurred during login.", false);
          });
      } else {
        showMessage("Invalid email or password.", false);
      }
    });
  }

  // Handle registration form submission
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("register-name").value;
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;

      if (!validateEmail(email)) {
        showMessage("Please enter a valid email.", false);
        return;
      }

      if (!validatePassword(password)) {
        showMessage("Password must be at least 6 characters long.", false);
        return;
      }

      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showMessage("Registration successful! Please log in.", true);
            window.location.href = "index.html"; // Redirect to login page
          } else {
            showMessage(data.message, false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          showMessage("An error occurred during registration.", false);
        });
    });
  }

  // Handle password reset form submission
  if (passwordResetForm) {
    passwordResetForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("reset-email").value;

      if (!validateEmail(email)) {
        showMessage("Please enter a valid email.", false);
        return;
      }

      fetch("/api/password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showMessage("Password reset link sent to your email!", true);
            window.location.href = "index.html"; // Redirect to login page
          } else {
            showMessage(data.message, false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          showMessage("An error occurred during password reset.", false);
        });
    });
  }

  // Handle profile update form submission
  if (profileForm) {
    profileForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("profile-name").value;
      const email = document.getElementById("profile-email").value;
      const password = document.getElementById("profile-password").value;

      if (password && !validatePassword(password)) {
        showMessage("New password must be at least 6 characters long.", false);
        return;
      }

      fetch("/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showMessage("Profile updated successfully!", true);
          } else {
            showMessage(data.message, false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          showMessage("An error occurred while updating the profile.", false);
        });
    });
  }

  // Handle logout button click
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      fetch("/api/logout", {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showMessage("Logged out successfully!", true);
            window.location.href = "index.html"; // Redirect to login page
          } else {
            showMessage(data.message, false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          showMessage("An error occurred during logout.", false);
        });
    });
  }

  // Handle profile picture upload
  if (profilePicture) {
    profilePicture.addEventListener("change", function () {
      const file = profilePicture.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          profilePicturePreview.src = e.target.result; // Preview the uploaded image
        };
        reader.readAsDataURL(file);
      }
    });
  }
});
