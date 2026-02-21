  // ===== TRISHUL AI — SCRIPT.JS =====

// ===== CLOCK =====
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const timeStr = `${h}:${m}:${s} IST`;
    document.getElementById('clock').textContent = timeStr;
    document.getElementById('clock2').textContent = timeStr;
  }
  setInterval(updateClock, 1000);
  updateClock();
  
  // ===== ANIMATED GRID CANVAS =====
  const gridCanvas = document.getElementById('grid-canvas');
  const gctx = gridCanvas.getContext('2d');
  
  function resizeGrid() {
    gridCanvas.width = window.innerWidth;
    gridCanvas.height = window.innerHeight;
  }
  resizeGrid();
  window.addEventListener('resize', resizeGrid);
  
  let gridOffset = 0;
  function drawGrid() {
    gctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
  
    const spacing = 50;
    gctx.strokeStyle = 'rgba(0, 229, 255, 0.12)';
    gctx.lineWidth = 0.5;
  
    // Vertical lines
    for (let x = 0; x < gridCanvas.width; x += spacing) {
      gctx.beginPath();
      gctx.moveTo(x, 0);
      gctx.lineTo(x, gridCanvas.height);
      gctx.stroke();
    }
  
    // Horizontal lines with perspective vanishing (bottom-weighted)
    for (let y = 0; y < gridCanvas.height; y += spacing) {
      const alpha = 0.04 + (y / gridCanvas.height) * 0.2;
      gctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
      gctx.beginPath();
      gctx.moveTo(0, y);
      gctx.lineTo(gridCanvas.width, y);
      gctx.stroke();
    }
  
    // Glowing center cross
    gctx.strokeStyle = 'rgba(0, 229, 255, 0.08)';
    gctx.lineWidth = 1;
    gctx.beginPath();
    gctx.moveTo(gridCanvas.width / 2, 0);
    gctx.lineTo(gridCanvas.width / 2, gridCanvas.height);
    gctx.stroke();
    gctx.beginPath();
    gctx.moveTo(0, gridCanvas.height / 2);
    gctx.lineTo(gridCanvas.width, gridCanvas.height / 2);
    gctx.stroke();
  
    gridOffset = (gridOffset + 0.3) % spacing;
    requestAnimationFrame(drawGrid);
  }
  drawGrid();
  
  // ===== PARTICLES =====
  const particleContainer = document.getElementById('particles');
  const NUM_PARTICLES = 40;
  
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.bottom = '-5px';
    p.style.animationDuration = (6 + Math.random() * 12) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (1 + Math.random() * 3) + 'px';
    p.style.opacity = Math.random() * 0.7;
    particleContainer.appendChild(p);
  }
  
  // ===== NEURAL NETWORK CANVAS =====
  const neuralCanvas = document.getElementById('neural-canvas');
  const nctx = neuralCanvas.getContext('2d');
  
  const nodes = [];
  const NUM_NODES = 18;
  
  for (let i = 0; i < NUM_NODES; i++) {
    nodes.push({
      x: Math.random() * neuralCanvas.width,
      y: Math.random() * neuralCanvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: 2 + Math.random() * 2
    });
  }
  
  function drawNeural() {
    nctx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height);
    nctx.fillStyle = 'rgba(0, 10, 20, 0.3)';
    nctx.fillRect(0, 0, neuralCanvas.width, neuralCanvas.height);
  
    // Update positions
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > neuralCanvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > neuralCanvas.height) n.vy *= -1;
    });
  
    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 70) {
          nctx.strokeStyle = `rgba(0, 229, 255, ${1 - dist / 70})`;
          nctx.lineWidth = 0.5;
          nctx.beginPath();
          nctx.moveTo(nodes[i].x, nodes[i].y);
          nctx.lineTo(nodes[j].x, nodes[j].y);
          nctx.stroke();
        }
      }
    }
  
    // Draw nodes
    nodes.forEach(n => {
      nctx.beginPath();
      nctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      nctx.fillStyle = '#00e5ff';
      nctx.shadowColor = '#00e5ff';
      nctx.shadowBlur = 6;
      nctx.fill();
      nctx.shadowBlur = 0;
    });
  
    requestAnimationFrame(drawNeural);
  }
  drawNeural();
  
  // ===== RANDOM GLITCH EFFECT ON TITLE =====
  const title = document.querySelector('.title-glow');
  const glitchChars = '!@#$%^&*<>?/\\|█▓▒░';
  
  function glitchTitle() {
    const original = 'TRISHUL AI';
    let glitched = '';
    for (let i = 0; i < original.length; i++) {
      if (Math.random() < 0.15 && original[i] !== ' ') {
        glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      } else {
        glitched += original[i];
      }
    }
    title.textContent = glitched;
    setTimeout(() => { title.textContent = 'TRISHUL AI'; }, 80);
  }
  
  setInterval(() => {
    if (Math.random() < 0.3) glitchTitle();
  }, 2500);
  
  // ===== LIVE THREAT LOG TICKER =====
  const threatMessages = [
    'SCANNING SECTOR 7... THREAT NEUTRALIZED',
    'AI PREDICTION ENGINE: NOMINAL',
    'CYBER SCAN: NO NEW INTRUSIONS DETECTED',
    'AIR VECTOR TRACKING: 3 OBJECTS MONITORED',
    'SIGNAL INTEGRITY: RESTORING...',
    'PREDICTIVE SHIELD: ALL SYSTEMS OPTIMAL',
    'NEURAL NETWORK EXPANSION: +2.4%',
    'INTER-SERVICE DATA SYNC: COMPLETE',
    'ELECTRONIC SPECTRUM: CLEAR',
    'SATELLITE LINK: STABLE // UPTIME 99.97%',
  ];
  
  let tickerIndex = 0;
  const warningBody = document.querySelector('.warning-body');
  
  setInterval(() => {
    tickerIndex = (tickerIndex + 1) % threatMessages.length;
    const msg = threatMessages[tickerIndex];
    warningBody.innerHTML = `<span class="orange">${msg}</span>`;
  }, 3000);
  
  // ===== ENTER BUTTON =====
  // ===== ENTER BUTTON =====
 function enterSystem() {

    const btn = document.querySelector('.enter-btn');
    const overlay = document.createElement('div');
    overlay.className = 'flash-overlay';
    document.body.appendChild(overlay);
  
    // Step 1 — Authorizing
    btn.innerHTML = '<span class="btn-text">[ AUTHORIZING ACCESS... ]</span>';
    btn.style.color = '#ffaa00';
    btn.style.borderColor = '#ffaa00';
  
    setTimeout(() => {
      // Step 2 — Biometric
      btn.innerHTML = '<span class="btn-text">[ BIOMETRIC VERIFIED ]</span>';
      btn.style.color = '#00e5ff';
      btn.style.borderColor = '#00e5ff';
    }, 700);
  
    setTimeout(() => {
      // Step 3 — Access Granted
      btn.innerHTML = '<span class="btn-text">[ ACCESS GRANTED ]</span>';
      btn.style.color = '#00ff88';
      btn.style.borderColor = '#00ff88';
    }, 1300);
  
    setTimeout(() => {
      // Redirect to Dashboard
      window.location.href = "dashboard.html";
    }, 2000);
  
  }
  
  // ===== STAT VALUE FLUCTUATION (live feel) =====
  setInterval(() => {
    const integrityEl = document.querySelector('.stat-value.green');
    if (integrityEl && integrityEl.textContent.includes('%')) {
      const base = 98;
      const val = (base + (Math.random() * 1.2 - 0.1)).toFixed(1);
      integrityEl.textContent = val + '%';
    }
  }, 4000);
  
  // ===== CONSOLE BOOT LOG (fun easter egg) =====
  console.log('%c TRISHUL AI BOOT SEQUENCE ', 'background:#00e5ff;color:#000;font-weight:bold;font-size:14px;');
  console.log('%c System Integrity: 98.7% | Neural Network: EXPANDING | Shield: ONLINE ', 'color:#00e5ff;');
  console.log('%c Team 2Bytes | Ananta Agarwal & Shivika Tandon ', 'color:#888;');