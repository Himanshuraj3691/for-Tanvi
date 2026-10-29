/* ===========================
   BEST FRIEND REQUEST — script.js
   For Tanvi 🌸
=========================== */

"use strict";

const dodgeMsgs = [
  "Are you sure? 🥺",
  "Think again 🙈",
  "Nice try 😭🌸",
  "That button seems shy 😂",
  "Try YES maybe? 🌟",
  "Don't leave me hanging! 😭",
  "Wait… think about it 🌸",
  "One more thought? 🥺",
  "That NO button is running away 😂",
  "Come on… you know you want to 💛",
  "Hmm… suspicious 🙈",
  "My gut says keep trying 🌸"
];

let dodgeCount = {};
let lastMsgIndex = -1;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomMsg() {
  if (Math.random() < 0.5) return "";
  let idx;
  do { idx = Math.floor(Math.random() * dodgeMsgs.length); }
  while (idx === lastMsgIndex && dodgeMsgs.length > 1);
  lastMsgIndex = idx;
  return dodgeMsgs[idx];
}

function dodgeNo(btn, msgId) {
  const id = btn.id;
  dodgeCount[id] = (dodgeCount[id] || 0) + 1;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const bw = 130;
  const bh = 54;

  let x, y;
  const strategy = Math.floor(Math.random() * 4);
  switch (strategy) {
    case 0: x = rand(10, vw * 0.35 - bw); y = rand(bh + 10, vh - bh - 10); break;
    case 1: x = rand(vw * 0.6, vw - bw - 10); y = rand(bh + 10, vh - bh - 10); break;
    case 2: x = rand(10, vw - bw - 10); y = rand(10, vh * 0.3); break;
    case 3: x = rand(10, vw - bw - 10); y = rand(vh * 0.65, vh - bh - 20); break;
  }

  x = Math.max(6, Math.min(vw - bw - 6, x));
  y = Math.max(6, Math.min(vh - bh - 6, y));

  btn.classList.add("dodging");
  btn.style.left = x + "px";
  btn.style.top  = y + "px";
  btn.style.width = bw + "px";

  const rotate = rand(-15, 15);
  btn.style.transform = `rotate(${rotate}deg)`;
  setTimeout(() => { btn.style.transform = ""; }, 400);

  const msgEl = document.getElementById(msgId);
  if (msgEl) {
    const msg = getRandomMsg();
    if (msg) {
      msgEl.textContent = msg;
      msgEl.style.opacity = "1";
      setTimeout(() => { msgEl.style.opacity = "0"; }, 2000);
    }
  }

  spawnBurstHearts(btn, 3);
}

function transitionTo(fromId, toId, callback) {
  const from = document.getElementById(fromId);
  const to   = document.getElementById(toId);
  from.style.transition = "opacity 0.5s ease";
  from.style.opacity = "0";
  setTimeout(() => {
    from.classList.remove("active");
    from.style.opacity = "";
    from.style.transition = "";
    to.classList.add("active");
    if (callback) callback();
  }, 500);
}

function goToScreen2() {
  spawnBurstHearts(document.getElementById("yes1"), 6);
  transitionTo("overlay1", "overlay2");
  resetNoBtn("no2");
}

function goToScreen3() {
  spawnBurstHearts(document.getElementById("yes2"), 6);
  transitionTo("overlay2", "overlay3", () => {
    setTimeout(animateLetter, 200);
  });
  resetNoBtn("noFinal");
}

function goToFinal() {
  spawnBurstHearts(document.getElementById("yesFinal"), 10);
  transitionTo("overlay3", "overlay4", () => {
    launchCelebration();
  });
}

function resetNoBtn(id) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.classList.remove("dodging");
  btn.style.left = "";
  btn.style.top = "";
  btn.style.width = "";
  btn.style.transform = "";
}

function animateLetter() {
  const paras = document.querySelectorAll("#overlay3 .fade-para");
  paras.forEach((el, i) => {
    setTimeout(() => { el.classList.add("visible"); }, i * 180);
  });
}

function initBgHearts() {
  const container = document.getElementById("bgHearts");
  const heartEmojis = ["🌸", "💛", "🌼", "✨", "🌟", "💐", "🫶🏻"];
  const count = window.innerWidth < 600 ? 12 : 20;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "bg-heart";
    el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    const size = rand(1.0, 2.0);
    const left = rand(2, 96);
    const duration = rand(10, 22);
    const delay = rand(0, 15);
    el.style.cssText = `left:${left}%;font-size:${size}rem;animation-duration:${duration}s;animation-delay:${delay}s;`;
    container.appendChild(el);
  }
}

function initSparkles() {
  const container = document.getElementById("sparklesContainer");
  const sparkleChars = ["✨", "⭐", "💫", "🌟", "✦"];
  const count = window.innerWidth < 600 ? 8 : 14;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "sparkle";
    el.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
    const left = rand(3, 95);
    const top  = rand(3, 90);
    const dur  = rand(2.5, 5);
    const delay = rand(0, 4);
    const size = rand(0.8, 1.4);
    el.style.cssText = `left:${left}%;top:${top}%;font-size:${size}rem;animation-duration:${dur}s;animation-delay:${delay}s;`;
    container.appendChild(el);
  }
}

function spawnBurstHearts(origin, count) {
  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;
  if (origin) {
    const r = origin.getBoundingClientRect();
    cx = r.left + r.width / 2;
    cy = r.top + r.height / 2;
  }
  const emojis = ["🌸", "💛", "🌼", "✨", "🌟", "🎉"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "heart-burst";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = rand(0, 360);
    const dist  = rand(60, 180);
    const rad   = (angle * Math.PI) / 180;
    const dx    = Math.cos(rad) * dist;
    const dy    = Math.sin(rad) * dist;
    el.style.cssText = `left:${cx}px;top:${cy}px;--dx:${dx}px;--dy:${dy}px;font-size:${rand(1.2, 2.2)}rem;animation-delay:${i * 0.04}s;`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }
}

function launchCelebration() {
  const container = document.getElementById("confettiContainer");
  const pieces = ["🌸", "💛", "🌼", "✨", "🌟", "🎉", "🎊", "💐", "🫶🏻", "🥳", "🎀", "💫"];
  const count = window.innerWidth < 600 ? 40 : 70;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement("span");
      el.className = "confetti-piece";
      el.textContent = pieces[Math.floor(Math.random() * pieces.length)];
      const left = rand(0, 100);
      const dur  = rand(3.5, 7);
      const size = rand(1.0, 2.2);
      const delay = rand(0, 2);
      el.style.cssText = `left:${left}%;font-size:${size}rem;animation-duration:${dur}s;animation-delay:${delay}s;`;
      container.appendChild(el);
      setTimeout(() => el.remove(), (dur + delay + 0.5) * 1000);
    }, i * 60);
  }
  setTimeout(() => launchConfettiWave(container, pieces), 3500);
  setTimeout(() => launchConfettiWave(container, pieces), 7000);
}

function launchConfettiWave(container, pieces) {
  const count = window.innerWidth < 600 ? 20 : 35;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement("span");
      el.className = "confetti-piece";
      el.textContent = pieces[Math.floor(Math.random() * pieces.length)];
      const left = rand(0, 100);
      const dur  = rand(3, 6);
      const size = rand(0.9, 1.8);
      el.style.cssText = `left:${left}%;font-size:${size}rem;animation-duration:${dur}s;animation-delay:0s;`;
      container.appendChild(el);
      setTimeout(() => el.remove(), (dur + 0.5) * 1000);
    }, i * 70);
  }
}

window.addEventListener("resize", () => {
  ["no1","no2","noFinal"].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn || !btn.classList.contains("dodging")) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const bw = 130; const bh = 54;
    let x = parseFloat(btn.style.left) || 0;
    let y = parseFloat(btn.style.top)  || 0;
    x = Math.max(6, Math.min(vw - bw - 6, x));
    y = Math.max(6, Math.min(vh - bh - 6, y));
    btn.style.left = x + "px";
    btn.style.top  = y + "px";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  initBgHearts();
  initSparkles();
});
