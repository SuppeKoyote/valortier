// =============================================
//  VALORTIER – script.js (Firebase Version)
//  Features: Agents / Maps / Weapons + Patch-Reset
// =============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  runTransaction,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://valortier-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const ADMIN_PASSWORD = "valortier2024";

// =============================================
//  DATA
// =============================================

const AGENTS = [
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

const MAPS = [
  {
    id: "map_abyss",
    name: "Abyss",
    role: "Map",
    img: "https://media.valorant-api.com/maps/224b0a95-48b9-f703-1bd8-67aca101a61f/splash.png",
  },
  {
    id: "map_ascent",
    name: "Ascent",
    role: "Map",
    img: "https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/splash.png",
  },
  {
    id: "map_bind",
    name: "Bind",
    role: "Map",
    img: "https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/listviewicon.png",
  },
  {
    id: "map_breeze",
    name: "Breeze",
    role: "Map",
    img: "https://media.valorant-api.com/maps/2fb9a4fd-47b8-4e7d-a969-74b4046ebd53/splash.png",
  },
  {
    id: "map_fracture",
    name: "Fracture",
    role: "Map",
    img: "https://media.valorant-api.com/maps/b529448b-4d60-346e-e89e-00a4c527a405/splash.png",
  },
  {
    id: "map_haven",
    name: "Haven",
    role: "Map",
    img: "https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/listviewicon.png",
  },
  {
    id: "map_icebox",
    name: "Icebox",
    role: "Map",
    img: "https://media.valorant-api.com/maps/e2ad5c54-4114-a870-9641-8ea21279579a/splash.png",
  },
  {
    id: "map_lotus",
    name: "Lotus",
    role: "Map",
    img: "https://media.valorant-api.com/maps/2fe4ed3a-450a-948b-6d6b-e89a78e680a9/splash.png",
  },
  {
    id: "map_pearl",
    name: "Pearl",
    role: "Map",
    img: "https://media.valorant-api.com/maps/fd267378-4d1d-484f-ff52-77821ed10dc2/listviewicon.png",
  },
  {
    id: "map_split",
    name: "Split",
    role: "Map",
    img: "https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/listviewicon.png",
  },
  {
    id: "map_sunset",
    name: "Sunset",
    role: "Map",
    img: "https://media.valorant-api.com/maps/92584fbe-486a-b1b2-9faa-39b0f486b498/listviewicon.png",
  },
];

const WEAPONS = [
  {
    id: "wp_vandal",
    name: "Vandal",
    role: "Rifle",
    img: "https://media.valorant-api.com/weapons/9c82e19d-4575-0200-1a81-3eacf00cf872/displayicon.png",
  },
  {
    id: "wp_phantom",
    name: "Phantom",
    role: "Rifle",
    img: "https://media.valorant-api.com/weapons/ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a/displayicon.png",
  },
  {
    id: "wp_operator",
    name: "Operator",
    role: "Sniper",
    img: "https://media.valorant-api.com/weapons/a03b24d3-4319-996d-0f8c-94bbfba1dfc7/displayicon.png",
  },
  {
    id: "wp_guardian",
    name: "Guardian",
    role: "Rifle",
    img: "https://media.valorant-api.com/weapons/4ade7faa-4cf1-8376-95ef-39884480959b/displayicon.png",
  },
  {
    id: "wp_outlaw",
    name: "Outlaw",
    role: "Sniper",
    img: "https://media.valorant-api.com/weapons/42da8ccc-40d5-affc-beec-15aa47b42eda/displayicon.png",
  },
  {
    id: "wp_bulldog",
    name: "Bulldog",
    role: "Rifle",
    img: "https://media.valorant-api.com/weapons/ae3de142-4d85-2547-dd26-4e90bed35cf7/displayicon.png",
  },
  {
    id: "wp_spectre",
    name: "Spectre",
    role: "SMG",
    img: "https://media.valorant-api.com/weapons/462080d1-4035-2937-7c09-27aa2a5c27a7/displayicon.png",
  },
  {
    id: "wp_stinger",
    name: "Stinger",
    role: "SMG",
    img: "https://media.valorant-api.com/weapons/f7e1b454-4ad4-1063-ec0a-159e56b58941/displayicon.png",
  },
  {
    id: "wp_ares",
    name: "Ares",
    role: "LMG",
    img: "https://media.valorant-api.com/weapons/55d8a0f4-4274-ca67-fe2c-06ab45efdf58/displayicon.png",
  },
  {
    id: "wp_odin",
    name: "Odin",
    role: "LMG",
    img: "https://media.valorant-api.com/weapons/63e6c2b6-4a8e-869c-3d4c-e38355226584/displayicon.png",
  },
  {
    id: "wp_sheriff",
    name: "Sheriff",
    role: "Pistol",
    img: "https://media.valorant-api.com/weapons/e336c6b8-418d-9340-d77f-7a9e4cfe0702/displayicon.png",
  },
  {
    id: "wp_classic",
    name: "Classic",
    role: "Pistol",
    img: "https://media.valorant-api.com/weapons/29a0cfab-485b-f5d5-779a-b59f85e204a8/displayicon.png",
  },
  {
    id: "wp_ghost",
    name: "Ghost",
    role: "Pistol",
    img: "https://media.valorant-api.com/weapons/1baa85b4-4c70-1284-64bb-6481dfc3bb4e/displayicon.png",
  },
  {
    id: "wp_frenzy",
    name: "Frenzy",
    role: "Pistol",
    img: "https://media.valorant-api.com/weapons/44d4e95c-4157-0037-81b2-17841bf2e8e3/displayicon.png",
  },
  {
    id: "wp_marshal",
    name: "Marshal",
    role: "Sniper",
    img: "https://media.valorant-api.com/weapons/c4883e50-4494-202c-3ec3-6b8a9284f00b/displayicon.png",
  },
  {
    id: "wp_judge",
    name: "Judge",
    role: "Shotgun",
    img: "https://media.valorant-api.com/weapons/ec845bf4-4f79-ddda-a3da-0db3774b2794/displayicon.png",
  },
  {
    id: "wp_bucky",
    name: "Bucky",
    role: "Shotgun",
    img: "https://media.valorant-api.com/weapons/910be174-449b-c412-ab22-d0873436b21b/displayicon.png",
  },
];

const DEFAULTS = {
  agents: {
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
  },
  maps: {
    map_abyss: 200,
    map_ascent: 350,
    map_bind: 120,
    map_breeze: -80,
    map_fracture: -120,
    map_haven: 280,
    map_icebox: 60,
    map_lotus: 190,
    map_pearl: 100,
    map_split: 220,
    map_sunset: 140,
  },
  weapons: {
    wp_vandal: 420,
    wp_phantom: 390,
    wp_operator: 300,
    wp_guardian: 80,
    wp_outlaw: 150,
    wp_bulldog: 60,
    wp_spectre: 180,
    wp_stinger: -60,
    wp_ares: -100,
    wp_odin: 40,
    wp_sheriff: 250,
    wp_classic: 120,
    wp_ghost: 160,
    wp_frenzy: -40,
    wp_marshal: 130,
    wp_judge: 90,
    wp_bucky: 20,
  },
};

const ITEMS = { agents: AGENTS, maps: MAPS, weapons: WEAPONS };

// =============================================
//  STATE
// =============================================

let currentTab = "agents";
let scores = { agents: {}, maps: {}, weapons: {} };
let userVotes = { agents: {}, maps: {}, weapons: {} };
let listeners = {};

try {
  const saved = localStorage.getItem("valortier_uservotes_v2");
  if (saved) userVotes = JSON.parse(saved);
} catch (e) {}

// =============================================
//  HELPERS
// =============================================

function getTier(score) {
  if (score >= 300) return "S";
  if (score >= 150) return "A";
  if (score >= 0) return "B";
  if (score >= -100) return "C";
  return "D";
}

function saveUserVotes() {
  try {
    localStorage.setItem("valortier_uservotes_v2", JSON.stringify(userVotes));
  } catch (e) {}
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

// Vote counter: only counts votes made by real users (stored in userVotes)
// Not the default scores, which are just starting values
function updateVoteCounter() {
  const total = Object.values(userVotes).reduce((sum, tabVotes) => {
    return sum + Object.keys(tabVotes).length;
  }, 0);
  document.getElementById("total-votes").textContent = total.toLocaleString();
}

function showLoading(visible) {
  document.getElementById("tierlist").style.opacity = visible ? "0.3" : "1";
}

// =============================================
//  FIREBASE
// =============================================

async function initTab(tab) {
  showLoading(true);
  const tabRef = ref(db, `scores_${tab}`);

  if (listeners[tab]) return;

  const snapshot = await get(tabRef);
  if (!snapshot.exists()) {
    await set(tabRef, DEFAULTS[tab]);
  } else {
    // Falls alle Werte 0 sind (z.B. nach altem Reset-Bug) → Defaults reinschreiben
    const data = snapshot.val();
    const allZero = Object.values(data).every((v) => v === 0);
    if (allZero) await set(tabRef, DEFAULTS[tab]);
  }

  listeners[tab] = onValue(tabRef, (snapshot) => {
    const data = snapshot.val() || {};
    ITEMS[tab].forEach((item) => {
      if (data[item.id] === undefined || isNaN(data[item.id])) {
        data[item.id] = DEFAULTS[tab][item.id] ?? 0;
      }
    });
    scores[tab] = data;
    if (tab === currentTab) {
      showLoading(false);
      render();
      updateVoteCounter();
    }
  });
}

// =============================================
//  VOTE
// =============================================

async function vote(itemId, direction) {
  const prev = userVotes[currentTab][itemId];
  const itemRef = ref(db, `scores_${currentTab}/${itemId}`);
  const item = ITEMS[currentTab].find((i) => i.id === itemId);

  let delta = 0;
  if (prev === direction) {
    delta = direction === "up" ? -1 : 1;
    delete userVotes[currentTab][itemId];
    showToast("Vote removed");
  } else {
    if (prev === "up") delta -= 1;
    if (prev === "down") delta += 1;
    if (direction === "up") delta += 1;
    if (direction === "down") delta -= 1;
    userVotes[currentTab][itemId] = direction;
    showToast(
      direction === "up"
        ? `${item.name} voted up ▲`
        : `${item.name} voted down ▼`,
    );
  }

  await runTransaction(itemRef, (current) => (current || 0) + delta);
  saveUserVotes();
  updateVoteCounter();
}

// =============================================
//  PATCH RESET
// =============================================

async function patchReset() {
  const pw = prompt("Admin password:");
  if (pw !== ADMIN_PASSWORD) {
    showToast("Wrong password ✕");
    return;
  }

  const patchName = prompt("Patch number (e.g. 10.07):");
  if (!patchName) return;

  if (
    !window.confirm(
      `Reset all "${currentTab}" scores to default values for patch ${patchName}?`,
    )
  )
    return;

  const resetScores = { ...DEFAULTS[currentTab] };
  await set(ref(db, `scores_${currentTab}`), resetScores);

  // Also clear user votes for this tab so people can vote again
  userVotes[currentTab] = {};
  saveUserVotes();
  updateVoteCounter();

  // Patch number in Firebase so everyone sees it
  await set(ref(db, "patch"), patchName);
  document.querySelector(".patch-badge span").textContent = patchName;
  showToast(`Patch ${patchName} reset ✓`);
}

// =============================================
//  RENDER
// =============================================

function render() {
  const items = ITEMS[currentTab];
  const tiers = { S: [], A: [], B: [], C: [], D: [] };

  items.forEach((item) => {
    const score = scores[currentTab][item.id] ?? 0;
    tiers[getTier(score)].push({ ...item, score });
  });

  Object.keys(tiers).forEach((t) => tiers[t].sort((a, b) => b.score - a.score));

  const tierClass = { S: "s", A: "a", B: "b", C: "c", D: "d" };
  const isMap = currentTab === "maps";

  document.getElementById("tierlist").innerHTML = Object.entries(tiers)
    .map(
      ([tier, items]) => `
    <div class="tier-section">
      <div class="tier-label ${tierClass[tier]}">${tier}</div>
      <div class="tier-agents">
        ${items
          .map((item) => {
            const uv = userVotes[currentTab][item.id];
            const scoreClass =
              item.score > 0
                ? "score-positive"
                : item.score < 0
                  ? "score-negative"
                  : "";
            return `
            <div class="agent-card ${isMap ? "map-card" : ""}" id="card-${item.id}">
              <img class="agent-img ${isMap ? "map-img" : ""}" src="${item.img}" alt="${item.name}" loading="lazy"
                onerror="this.style.background='#1e2028'; this.style.height='90px'">
              <div class="vote-score ${scoreClass}">${item.score > 0 ? "+" : ""}${item.score}</div>
              <div class="agent-info">
                <div class="agent-name">${item.name}</div>
                <div class="agent-role">${item.role}</div>
                <div class="vote-buttons">
                  <button class="vote-btn up ${uv === "up" ? "voted-up" : ""}"
                    onclick="vote('${item.id}', 'up')">▲</button>
                  <button class="vote-btn down ${uv === "down" ? "voted-down" : ""}"
                    onclick="vote('${item.id}', 'down')">▼</button>
                </div>
              </div>
            </div>`;
          })
          .join("")}
        ${items.length === 0 ? '<div style="color:var(--muted);font-size:0.8rem;padding:10px;text-transform:uppercase;letter-spacing:0.1em;">No items here</div>' : ""}
      </div>
    </div>
  `,
    )
    .join("");
}

// =============================================
//  TAB SWITCH
// =============================================

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  if (!listeners[tab]) {
    showLoading(true);
    initTab(tab);
  } else {
    render();
    updateVoteCounter();
  }
}

// =============================================
//  START
// =============================================

window.vote = vote;
window.switchTab = switchTab;
window.patchReset = patchReset;

// Patch-Nummer aus Firebase laden
get(ref(db, "patch")).then((snapshot) => {
  if (snapshot.exists()) {
    document.querySelector(".patch-badge span").textContent = snapshot.val();
  }
});

initTab("agents");
