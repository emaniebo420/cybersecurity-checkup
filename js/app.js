// ---------------------------------------------------------------------------
// Minimal inline icon set (no external icon library dependency)
// ---------------------------------------------------------------------------
const ICONS = {
  shield: '<path d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3Z"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  drive: '<rect x="3" y="7" width="18" height="12" rx="2"/><path d="M3 13h18"/><circle cx="7.5" cy="16" r="0.6" fill="currentColor"/>',
  wifi: '<path d="M2 8.5a16 16 0 0 1 20 0"/><path d="M5 12a11 11 0 0 1 14 0"/><path d="M8.5 15.5a6 6 0 0 1 7 0"/><circle cx="12" cy="19" r="1" fill="currentColor"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  chevronLeft: '<path d="m15 6-6 6 6 6"/>',
  restart: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/>',
  alert: '<path d="M12 9v4"/><path d="M12 17h.01"/><path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>',
};

function icon(name, size = 16) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ""}</svg>`;
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
const state = {
  stage: "intro", // intro | quiz | results
  catIndex: 0,
  answers: {}, // { "passwords-0": score }
  name: "",
};

const root = document.getElementById("app");

function setAnswer(catId, qIndex, score) {
  state.answers[`${catId}-${qIndex}`] = score;
  render();
}

function categoryAnswered(cat) {
  return cat.questions.every((_, qi) => state.answers[`${cat.id}-${qi}`] !== undefined);
}

function computeResults() {
  const perCategory = CATEGORIES.map((cat) => {
    const maxCat = cat.questions.length * MAX_PER_Q;
    const score = cat.questions.reduce((sum, _, qi) => sum + (state.answers[`${cat.id}-${qi}`] ?? 0), 0);
    return { ...cat, score, maxCat, pct: (score / maxCat) * 100 };
  });
  const total = perCategory.reduce((s, c) => s + c.score, 0);
  const pct = (total / MAX_SCORE) * 100;
  const weakest = [...perCategory].sort((a, b) => a.pct - b.pct).slice(0, 3);
  return { perCategory, total, pct, weakest };
}

// ---------------------------------------------------------------------------
// Renderers
// ---------------------------------------------------------------------------
function renderIntro() {
  return `
    <div class="fade-in">
      <h1 class="hero-title">How exposed are<br>your online habits?</h1>
      <p class="hero-sub">
        A ${TOTAL_QUESTIONS}-question self-assessment across passwords, MFA, phishing awareness,
        updates, privacy, backups, and network security. No scanning, no accounts —
        just your honest answers, scored on the spot.
      </p>

      <div class="card name-card">
        <label class="label-sm" for="nameInput">Your name (optional, for the report)</label>
        <input id="nameInput" type="text" placeholder="e.g. Boyong" value="${escapeHtml(state.name)}" />
      </div>

      <div class="cat-grid">
        ${CATEGORIES.map((c) => `
          <div class="cat-chip">
            <span class="cat-chip-icon">${icon(c.icon, 15)}</span>
            <span>${c.title}</span>
          </div>
        `).join("")}
      </div>

      <button id="startBtn" class="btn btn-primary btn-block">
        Start assessment ${icon("chevronRight", 18)}
      </button>
      <p class="fine-print">Takes about 4–5 minutes. Your answers stay in this browser session only.</p>
    </div>
  `;
}

function renderProgressDots() {
  return `
    <div class="dots">
      ${CATEGORIES.map((_, i) => `<div class="dot ${i === state.catIndex ? "dot-active" : i < state.catIndex ? "dot-done" : ""}"></div>`).join("")}
    </div>
  `;
}

function renderQuiz() {
  const cat = CATEGORIES[state.catIndex];
  const isLast = state.catIndex === CATEGORIES.length - 1;
  return `
    <div class="fade-in" key="${cat.id}">
      <div class="quiz-header-row">
        ${renderProgressDots()}
        <span class="mono muted-sm">${state.catIndex + 1} / ${CATEGORIES.length}</span>
      </div>

      <div class="section-heading">
        <div class="section-icon">${icon(cat.icon, 18)}</div>
        <div>
          <h2 class="section-title">${cat.title}</h2>
          <p class="section-blurb">${cat.blurb}</p>
        </div>
      </div>

      <div class="question-list">
        ${cat.questions.map((q, qi) => {
          const key = `${cat.id}-${qi}`;
          return `
            <div class="card">
              <p class="question-text">${qi + 1}. ${q.q}</p>
              <div class="option-list">
                ${q.options.map((opt, oi) => {
                  const selected = state.answers[key] === opt.s;
                  return `
                    <button class="option-btn ${selected ? "option-selected" : ""}"
                            data-cat="${cat.id}" data-qi="${qi}" data-score="${opt.s}">
                      ${opt.t}
                    </button>
                  `;
                }).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div class="nav-row">
        <button id="backBtn" class="btn btn-ghost">${icon("chevronLeft", 16)} Back</button>
        <button id="nextBtn" class="btn btn-primary flex-1" ${categoryAnswered(cat) ? "" : "disabled"}>
          ${isLast ? "See my results" : "Next section"} ${icon("chevronRight", 16)}
        </button>
      </div>
    </div>
  `;
}

function renderGauge(pct, color) {
  const r = 82;
  const circumference = 2 * Math.PI * r;
  const arcFraction = 270 / 360;
  const bgDash = `${circumference * arcFraction} ${circumference}`;
  const fgDash = `${circumference * arcFraction * (pct / 100)} ${circumference}`;
  return `
    <div class="gauge-wrap">
      <svg viewBox="0 0 200 200" class="gauge-svg">
        <circle cx="100" cy="100" r="${r}" fill="none" stroke="#232E3D" stroke-width="14"
                stroke-dasharray="${bgDash}" stroke-linecap="round" />
        <circle cx="100" cy="100" r="${r}" fill="none" stroke="${color}" stroke-width="14"
                stroke-dasharray="${fgDash}" stroke-linecap="round" class="gauge-fg" />
      </svg>
      <div class="gauge-center">
        <span class="gauge-number mono" style="color:${color}">${Math.round(pct)}</span>
        <span class="gauge-label">SCORE / 100</span>
      </div>
    </div>
  `;
}

function renderPwnedCheck() {
  return `
    <div class="results-section">
      <h3 class="eyebrow">${icon("lock", 14)} Password exposure check</h3>
      <div class="card">
        <p class="pwned-intro">
          Check whether a password you use has already turned up in a known data breach —
          powered by the free
          <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noopener">Have I Been Pwned Pwned Passwords</a> API.
        </p>
        <p class="pwned-privacy">
          ${icon("check", 14)} Your password is hashed (SHA-1) in your browser first. Only the first
          5 characters of that hash are ever sent — the full password never leaves your device,
          and nothing is stored.
        </p>
        <div class="pwned-input-row">
          <input id="pwnedInput" type="password" placeholder="Type a password to check" autocomplete="new-password" />
          <button id="pwnedToggle" type="button" class="btn-icon" aria-label="Show password">${icon("eye", 16)}</button>
        </div>
        <button id="pwnedCheckBtn" class="btn btn-primary btn-block" style="margin-top:12px;">
          Check this password
        </button>
        <div id="pwnedResult" role="status" aria-live="polite"></div>
      </div>
    </div>
  `;
}

function renderEmailBreachCheck() {
  return `
    <div class="results-section">
      <h3 class="eyebrow">${icon("mail", 14)} Email breach check</h3>
      <div class="card">
        <p class="pwned-intro">
          Check whether an email address has appeared in a known data breach — powered by the free,
          open-source <a href="https://xposedornot.com" target="_blank" rel="noopener">XposedOrNot</a> database.
        </p>
        <p class="pwned-privacy pwned-note">
          ${icon("alert", 14)} Unlike the password check above, this one has to send the actual
          email address to XposedOrNot's public API to look it up — there's no way to check "is
          this email breached" without revealing which email you're asking about. Only use an
          address you're comfortable sharing with a third-party lookup service. Nothing is
          stored on this site.
        </p>
        <div class="pwned-input-row">
          <input id="emailInput" type="email" placeholder="e.g. yourname@gmail.com" autocomplete="email" />
        </div>
        <button id="emailCheckBtn" class="btn btn-primary btn-block" style="margin-top:12px;">
          Check this email
        </button>
        <div id="emailResult" role="status" aria-live="polite"></div>
      </div>
    </div>
  `;
}

function renderResults() {
  const results = computeResults();
  const risk = riskFor(results.pct);
  return `
    <div class="fade-in">
      <p class="muted-sm center">${state.name ? escapeHtml(state.name) + "'s" : "Your"} security posture</p>
      ${renderGauge(results.pct, risk.color)}
      <div class="center">
        <span class="risk-pill" style="background:${risk.glow};color:${risk.color}">${risk.label}</span>
      </div>
      <p class="risk-msg">${risk.msg}</p>

      <div class="results-section">
        <h3 class="eyebrow">Breakdown by area</h3>
        <div class="breakdown-list">
          ${results.perCategory.map((c) => {
            const r = riskFor(c.pct);
            return `
              <div class="breakdown-row">
                <div class="breakdown-top">
                  <span class="breakdown-name">${icon(c.icon, 14)} ${c.title}</span>
                  <span class="mono breakdown-score" style="color:${r.color}">${c.score}/${c.maxCat}</span>
                </div>
                <div class="bar-track">
                  <div class="bar-fill" style="width:${c.pct}%;background:${r.color}"></div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <div class="results-section">
        <h3 class="eyebrow">${icon("alert", 14)} Priority recommendations</h3>
        <div class="rec-list">
          ${results.weakest.map((c) => `
            <div class="card">
              <div class="rec-head">
                ${icon(c.icon, 15)}
                <span class="rec-title">${c.title}</span>
                <span class="mono muted-sm rec-pct">${Math.round(c.pct)}%</span>
              </div>
              <ul class="rec-items">
                ${RECS[c.id].map((r) => `<li><span class="arrow">→</span>${r}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </div>
      </div>

      ${renderPwnedCheck()}
      ${renderEmailBreachCheck()}

      <div class="disclaimer">
        ${icon("check", 18)}
        <p>This is a self-assessment based on stated habits, not a technical scan of your devices or accounts —
        treat the score as a starting point for what to fix first, not a guarantee of safety.</p>
      </div>

      <button id="restartBtn" class="btn btn-outline btn-block">${icon("restart", 16)} Retake assessment</button>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// Pwned Passwords check (k-anonymity model: only first 5 hash chars leave the device)
// ---------------------------------------------------------------------------
async function sha1Hex(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const digest = await crypto.subtle.digest("SHA-1", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

async function checkPwnedPassword(password) {
  const hash = await sha1Hex(password);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  if (!res.ok) throw new Error(`API returned ${res.status}`);
  const body = await res.text();

  const match = body.split("\r\n").find((line) => line.startsWith(suffix));
  return match ? parseInt(match.split(":")[1], 10) : 0;
}

async function checkEmailBreaches(email) {
  const res = await fetch(`https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}`);
  if (res.status === 404) return []; // not found = clean
  if (!res.ok) throw new Error(`API returned ${res.status}`);
  const body = await res.json();
  if (body.Error) return [];
  // breaches comes back as an array containing one array of names, e.g. [["Tesco","Adobe"]]
  return (body.breaches && body.breaches[0]) || [];
}

function renderEmailResultBox(state_) {
  const box = document.getElementById("emailResult");
  if (!box) return;
  if (state_.status === "invalid") {
    box.innerHTML = `<p class="pwned-status pwned-error">${icon("alert", 14)} That doesn't look like a valid email address.</p>`;
  } else if (state_.status === "loading") {
    box.innerHTML = `<p class="pwned-status pwned-loading">Checking…</p>`;
  } else if (state_.status === "error") {
    box.innerHTML = `<p class="pwned-status pwned-error">${icon("alert", 14)} Couldn't reach the check right now. Try again in a moment.</p>`;
  } else if (state_.status === "found") {
    box.innerHTML = `
      <div class="pwned-status pwned-bad">
        ${icon("alert", 16)}
        <div>
          <strong>Found in ${state_.breaches.length} known breach${state_.breaches.length === 1 ? "" : "es"}:</strong>
          <p>${state_.breaches.map(escapeHtml).join(", ")}</p>
          <p>Change the password on these accounts if you haven't already, and check whether that password is reused elsewhere.</p>
        </div>
      </div>
    `;
  } else if (state_.status === "clean") {
    box.innerHTML = `
      <div class="pwned-status pwned-good">
        ${icon("check", 16)}
        <div><strong>Not found in XposedOrNot's breach database.</strong><p>Good sign — but no single database is exhaustive, so this isn't a guarantee.</p></div>
      </div>
    `;
  }
}

function renderPwnedResultBox(state_) {
  const box = document.getElementById("pwnedResult");
  if (!box) return;
  if (state_.status === "loading") {
    box.innerHTML = `<p class="pwned-status pwned-loading">Checking…</p>`;
  } else if (state_.status === "error") {
    box.innerHTML = `<p class="pwned-status pwned-error">${icon("alert", 14)} Couldn't reach the check right now. Try again in a moment.</p>`;
  } else if (state_.status === "found") {
    box.innerHTML = `
      <div class="pwned-status pwned-bad">
        ${icon("alert", 16)}
        <div>
          <strong>Found in ${state_.count.toLocaleString()} known breach${state_.count === 1 ? "" : "es"}.</strong>
          <p>Stop using this password anywhere and change it now, especially if it's reused elsewhere.</p>
        </div>
      </div>
    `;
  } else if (state_.status === "clean") {
    box.innerHTML = `
      <div class="pwned-status pwned-good">
        ${icon("check", 16)}
        <div><strong>Not found in known breaches.</strong><p>Still worth making it unique and storing it in a password manager.</p></div>
      </div>
    `;
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ---------------------------------------------------------------------------
// Main render + event wiring
// ---------------------------------------------------------------------------
function render() {
  if (state.stage === "intro") root.innerHTML = renderIntro();
  else if (state.stage === "quiz") root.innerHTML = renderQuiz();
  else root.innerHTML = renderResults();
  wireEvents();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function wireEvents() {
  const startBtn = document.getElementById("startBtn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      const nameInput = document.getElementById("nameInput");
      state.name = nameInput ? nameInput.value.trim() : "";
      state.stage = "quiz";
      state.catIndex = 0;
      render();
    });
  }

  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setAnswer(btn.dataset.cat, Number(btn.dataset.qi), Number(btn.dataset.score));
    });
  });

  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (state.catIndex > 0) state.catIndex -= 1;
      else state.stage = "intro";
      render();
    });
  }

  const nextBtn = document.getElementById("nextBtn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (state.catIndex < CATEGORIES.length - 1) state.catIndex += 1;
      else state.stage = "results";
      render();
    });
  }

  const pwnedToggle = document.getElementById("pwnedToggle");
  if (pwnedToggle) {
    pwnedToggle.addEventListener("click", () => {
      const input = document.getElementById("pwnedInput");
      input.type = input.type === "password" ? "text" : "password";
    });
  }

  const pwnedCheckBtn = document.getElementById("pwnedCheckBtn");
  if (pwnedCheckBtn) {
    pwnedCheckBtn.addEventListener("click", async () => {
      const input = document.getElementById("pwnedInput");
      const password = input.value;
      if (!password) return;

      pwnedCheckBtn.disabled = true;
      pwnedCheckBtn.textContent = "Checking…";
      renderPwnedResultBox({ status: "loading" });
      try {
        const count = await checkPwnedPassword(password);
        input.value = ""; // never keep it around longer than needed
        if (count > 0) renderPwnedResultBox({ status: "found", count });
        else renderPwnedResultBox({ status: "clean" });
      } catch (err) {
        renderPwnedResultBox({ status: "error" });
      } finally {
        pwnedCheckBtn.disabled = false;
        pwnedCheckBtn.textContent = "Check this password";
      }
    });
  }

  const emailCheckBtn = document.getElementById("emailCheckBtn");
  if (emailCheckBtn) {
    emailCheckBtn.addEventListener("click", async () => {
      const input = document.getElementById("emailInput");
      const email = input.value.trim();

      if (!email) return;
      if (!input.checkValidity()) {
        renderEmailResultBox({ status: "invalid" });
        input.focus();
        return;
      }

      emailCheckBtn.disabled = true;
      emailCheckBtn.textContent = "Checking…";
      renderEmailResultBox({ status: "loading" });
      try {
        const breaches = await checkEmailBreaches(email);
        if (breaches.length > 0) renderEmailResultBox({ status: "found", breaches });
        else renderEmailResultBox({ status: "clean" });
      } catch (err) {
        renderEmailResultBox({ status: "error" });
      } finally {
        emailCheckBtn.disabled = false;
        emailCheckBtn.textContent = "Check this email";
      }
    });
  }

  const restartBtn = document.getElementById("restartBtn");
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      state.stage = "intro";
      state.catIndex = 0;
      state.answers = {};
      render();
    });
  }
}

render();
