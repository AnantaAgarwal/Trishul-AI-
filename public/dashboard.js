document.addEventListener("DOMContentLoaded", () => {
  createRadar("air-radar");
  createRadar("cyber-radar");
  createRadar("ew-radar");
});

function createRadar(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let angle = 0;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  resize();
  window.addEventListener("resize", resize);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 - 10;

    // Radar circle
    ctx.strokeStyle = "rgba(0,229,255,0.3)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Sweep
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, angle, angle + 0.3);
    ctx.fillStyle = "rgba(0,229,255,0.3)";
    ctx.fill();

    angle += 0.02;
    requestAnimationFrame(draw);
  }

  draw();
}
  

  
  function triggerAction(domain, action) {
    const toast = document.getElementById("action-toast");
  
    toast.innerText = `[${domain.toUpperCase()}] ACTION INITIATED: ${action}`;
    toast.classList.add("show");
  
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
  
  

  
  setInterval(() => {
    const el = document.getElementById("integrity");
    if (el) {
      const value = (98 + Math.random()).toFixed(1);
      el.innerText = value + "%";
    }
  }, 4000);
  
  
  
  
  setTimeout(() => {
    const steps = document.querySelectorAll(".flow-step");
    if (steps.length > 3) {
      steps[3].classList.remove("pending");
      steps[3].classList.add("active");
    }
  }, 5000);