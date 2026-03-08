// =============================================
//  VALORTIER – script.js (Firebase Version)
// =============================================

// ── Firebase SDK laden ──
// Wird über index.html als module eingebunden
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  runTransaction,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// ── Firebase Config ──
const firebaseConfig = {
  databaseURL:
    "https://valortier-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ── 1. Agent-Daten ──
const AGENTS = [
  // Duelists
  {
    id: "jett",
    name: "Jett",
    role: "Duelist",
    img: "https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png",
  },
  {
    id: "reyna",
    name: "Reyna",
    role: "Duelist",
    img: "https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png",
  },
  {
    id: "raze",
    name: "Raze",
    role: "Duelist",
    img: "https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png",
  },
  {
    id: "phoenix",
    name: "Phoenix",
    role: "Duelist",
    img: "https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png",
  },
  {
    id: "yoru",
    name: "Yoru",
    role: "Duelist",
    img: "https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png",
  },
  {
    id: "neon",
    name: "Neon",
    role: "Duelist",
    img: "https://media.valorant-api.com/agents/bb2a4828-46eb-8cd1-e765-15848195d751/displayicon.png",
  },
  {
    id: "iso",
    name: "Iso",
    role: "Duelist",
    img: "https://media.valorant-api.com/agents/0e38b510-41a8-5780-5e8f-568b2a4f2d6c/displayicon.png",
  },
  {
    id: "waylay",
    name: "Waylay",
    role: "Duelist",
    img: "https://media.valorant-api.com/agents/df1cb487-4902-002e-5c17-d28e83e78588/displayicon.png",
  },
  // Controllers
  {
    id: "brimstone",
    name: "Brimstone",
    role: "Controller",
    img: "https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayicon.png",
  },
  {
    id: "viper",
    name: "Viper",
    role: "Controller",
    img: "https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png",
  },
  {
    id: "omen",
    name: "Omen",
    role: "Controller",
    img: "https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png",
  },
  {
    id: "astra",
    name: "Astra",
    role: "Controller",
    img: "https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayicon.png",
  },
  {
    id: "harbor",
    name: "Harbor",
    role: "Controller",
    img: "https://media.valorant-api.com/agents/95b78ed7-4637-86d9-7e41-71ba8c293152/displayicon.png",
  },
  {
    id: "clove",
    name: "Clove",
    role: "Controller",
    img: "https://media.valorant-api.com/agents/1dbf2edd-4729-0984-3115-daa5eed44993/displayicon.png",
  },
  // Sentinels
  {
    id: "sage",
    name: "Sage",
    role: "Sentinel",
    img: "https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png",
  },
  {
    id: "cypher",
    name: "Cypher",
    role: "Sentinel",
    img: "https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayicon.png",
  },
  {
    id: "killjoy",
    name: "Killjoy",
    role: "Sentinel",
    img: "https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png",
  },
  {
    id: "chamber",
    name: "Chamber",
    role: "Sentinel",
    img: "https://media.valorant-api.com/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7/displayicon.png",
  },
  {
    id: "deadlock",
    name: "Deadlock",
    role: "Sentinel",
    img: "https://media.valorant-api.com/agents/cc8b64c8-4b25-4ff9-6e7f-37b4da43d235/displayicon.png",
  },
  {
    id: "vyse",
    name: "Vyse",
    role: "Sentinel",
    img: "https://media.valorant-api.com/agents/efba5359-4016-a1e5-7626-b1ae76895940/displayicon.png",
  },
  {
    id: "veto",
    name: "Veto",
    role: "Sentinel",
    img: "https://media.valorant-api.com/agents/92eeef5d-43b5-1d4a-8d03-b3927a09034b/displayicon.png",
  },
  // Initiators
  {
    id: "sova",
    name: "Sova",
    role: "Initiator",
    img: "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png",
  },
  {
    id: "breach",
    name: "Breach",
    role: "Initiator",
    img: "https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png",
  },
  {
    id: "skye",
    name: "Skye",
    role: "Initiator",
    img: "https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayicon.png",
  },
  {
    id: "kayo",
    name: "KAY/O",
    role: "Initiator",
    img: "https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/displayicon.png",
  },
  {
    id: "fade",
    name: "Fade",
    role: "Initiator",
    img: "https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/displayicon.png",
  },
  {
    id: "gekko",
    name: "Gekko",
    role: "Initiator",
    img: "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png",
  },
  {
    id: "tejo",
    name: "Tejo",
    role: "Initiator",
    img: "https://media.valorant-api.com/agents/b444168c-4e35-8076-db47-ef9bf368f384/displayicon.png",
  },
];

// ── 2. Standard-Scores ──
// Werden nur beim allerersten Start in Firebase geschrieben (wenn DB leer)
const DEFAULT_SCORES = {
  jett: 420,
  reyna: 310,
  raze: 190,
  phoenix: -80,
  yoru: 40,
  neon: 280,
  iso: 150,
  waylay: 200,
  brimstone: 120,
  viper: 380,
  omen: 350,
  astra: 60,
  harbor: -140,
  clove: 220,
  sage: 200,
  cypher: 170,
  killjoy: 390,
  chamber: 230,
  deadlock: -60,
  vyse: 110,
  veto: 80,
  sova: 340,
  breach: 140,
  skye: 260,
  kayo: 180,
  fade: 180,
  gekko: 90,
  tejo: 160,
};

// ── 3. Lokaler State ──
// scores    = aktueller Stand aus Firebase (für alle gleich)
// userVotes = nur im Browser gespeichert (was der aktuelle User gevotet hat)
let scores = {};
let userVotes = {};

try {
  const savedVotes = localStorage.getItem("valortier_uservotes");
  userVotes = savedVotes ? JSON.parse(savedVotes) : {};
} catch (e) {
  userVotes = {};
}

// ── 4. Hilfsfunktionen ──

function getTier(score) {
  if (score >= 300) return "S";
  if (score >= 150) return "A";
  if (score >= 0) return "B";
  if (score >= -100) return "C";
  return "D";
}

function saveUserVotes() {
  try {
    localStorage.setItem("valortier_uservotes", JSON.stringify(userVotes));
  } catch (e) {}
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

function updateVoteCounter() {
  const total = Object.values(scores).reduce((sum, s) => sum + Math.abs(s), 0);
  document.getElementById("total-votes").textContent = total.toLocaleString();
}

function showLoading(visible) {
  document.getElementById("tierlist").style.opacity = visible ? "0.4" : "1";
}

// ── 5. Firebase Initialisierung ──
// Lädt Scores aus Firebase. Falls DB leer → Default-Scores reinschreiben.
async function initFirebase() {
  showLoading(true);
  const scoresRef = ref(db, "scores");

  // Einmalig prüfen ob DB leer ist
  const snapshot = await get(scoresRef);
  if (!snapshot.exists()) {
    // Erste User ever → Default-Scores in Firebase schreiben
    await set(scoresRef, DEFAULT_SCORES);
  }

  // Live-Listener: aktualisiert die Tierlist bei jedem Vote von irgendwem
  onValue(scoresRef, (snapshot) => {
    const data = snapshot.val() || {};

    // Sicherstellen dass alle Agents einen Score haben (NaN-Fix)
    AGENTS.forEach((agent) => {
      if (data[agent.id] === undefined || isNaN(data[agent.id])) {
        data[agent.id] = DEFAULT_SCORES[agent.id] ?? 0;
      }
    });

    scores = data;
    showLoading(false);
    render();
    updateVoteCounter();
  });
}

// ── 6. Vote-Logik ──
async function vote(agentId, direction) {
  const prev = userVotes[agentId]; // was der User vorher gevotet hat ('up', 'down', oder undefined)
  const agentRef = ref(db, `scores/${agentId}`);
  const agent = AGENTS.find((a) => a.id === agentId);

  // Berechne den netto Änderungswert in EINEM Schritt:
  // Beispiel: User hatte 'up' (+1 gegeben), klickt jetzt 'down'
  //   → +1 rückgängig machen (-1) + down anwenden (-1) = delta von -2
  let delta = 0;

  if (prev === direction) {
    // Gleicher Button nochmal → Vote komplett entfernen
    delta = direction === "up" ? -1 : +1;
    delete userVotes[agentId];
    showToast("Vote entfernt");
  } else {
    // Alten Vote rückgängig machen (falls vorhanden)
    if (prev === "up") delta -= 1;
    if (prev === "down") delta += 1;
    // Neuen Vote anwenden
    if (direction === "up") delta += 1;
    if (direction === "down") delta -= 1;

    userVotes[agentId] = direction;
    showToast(
      direction === "up"
        ? `${agent.name} hochgevotet ▲`
        : `${agent.name} runtergevotet ▼`,
    );
  }

  // Einziger Firebase-Call mit dem berechneten delta
  await runTransaction(agentRef, (current) => (current || 0) + delta);
  saveUserVotes();
}

// ── 7. Render-Funktion ──
function render() {
  const tiers = { S: [], A: [], B: [], C: [], D: [] };

  AGENTS.forEach((agent) => {
    const score = scores[agent.id] ?? 0;
    tiers[getTier(score)].push({ ...agent, score });
  });

  Object.keys(tiers).forEach((tier) => {
    tiers[tier].sort((a, b) => b.score - a.score);
  });

  const tierClass = { S: "s", A: "a", B: "b", C: "c", D: "d" };

  document.getElementById("tierlist").innerHTML = Object.entries(tiers)
    .map(
      ([tier, agents]) => `
    <div class="tier-section">
      <div class="tier-label ${tierClass[tier]}">${tier}</div>
      <div class="tier-agents">
        ${agents
          .map((agent) => {
            const uv = userVotes[agent.id];
            const scoreClass =
              agent.score > 0
                ? "score-positive"
                : agent.score < 0
                  ? "score-negative"
                  : "";
            return `
            <div class="agent-card" id="card-${agent.id}">
              <img class="agent-img" src="${agent.img}" alt="${agent.name}" loading="lazy"
                onerror="this.style.background='#1e2028'; this.style.height='90px'">
              <div class="vote-score ${scoreClass}">
                ${agent.score > 0 ? "+" : ""}${agent.score}
              </div>
              <div class="agent-info">
                <div class="agent-name">${agent.name}</div>
                <div class="agent-role">${agent.role}</div>
                <div class="vote-buttons">
                  <button class="vote-btn up ${uv === "up" ? "voted-up" : ""}"
                    onclick="vote('${agent.id}', 'up')">▲</button>
                  <button class="vote-btn down ${uv === "down" ? "voted-down" : ""}"
                    onclick="vote('${agent.id}', 'down')">▼</button>
                </div>
              </div>
            </div>`;
          })
          .join("")}
        ${
          agents.length === 0
            ? '<div style="color:var(--muted);font-size:0.8rem;padding:10px;text-transform:uppercase;letter-spacing:0.1em;">Keine Agents hier</div>'
            : ""
        }
      </div>
    </div>
  `,
    )
    .join("");
}

// ── 8. Start ──
initFirebase();

// Macht vote() global erreichbar für onclick= im HTML
window.vote = vote;
