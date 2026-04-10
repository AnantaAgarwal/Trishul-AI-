console.log("LOGIN JS RUNNING");
window.onload = function () {

  const form = document.getElementById("login-form");
  const msgBox = document.getElementById("auth-message");
  const deviceInfo = document.getElementById("device-info");

  // Safety check (VERY IMPORTANT)
  if (!form) {
    console.error("Login form not found!");
    return;
  }

  // Show device ID
  if (deviceInfo) {
    deviceInfo.textContent = "Device ID: " + AUTH.getDeviceId();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const validPassword = AUTH.ALLOWED_CREDENTIALS[username];

    if (!validPassword || validPassword !== password) {
      showMessage("ACCESS DENIED: Invalid credentials.", "error");
      return;
    }

    const isRegistered = localStorage.getItem("trishul_registered_device");

    if (!isRegistered) {
      AUTH.registerDevice();
      showMessage("Device registered. Welcome.", "success");
    } else if (!AUTH.isDeviceAuthorized()) {
      showMessage("UNAUTHORIZED DEVICE", "error");
      return;
    }

    AUTH.createSession(username);

    showMessage("Login successful. Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "landing.html";
    }, 1000);
  });

  function showMessage(text, type) {
    msgBox.textContent = text;
    msgBox.style.display = "block";
    msgBox.style.color = type === "error" ? "red" : "lime";
  }

};