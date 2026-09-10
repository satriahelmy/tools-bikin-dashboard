let allPalettes = [];
const fallbackPalettes = [
  { id: "001", name: "Ocean Depth", colors: ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"], tags: ["blue", "cool", "professional", "finance"], mood: "calm" },
  { id: "002", name: "Forest Metrics", colors: ["#1B4332", "#2D6A4F", "#40916C", "#74C69D", "#D8F3DC"], tags: ["green", "nature", "operations", "tech"], mood: "fresh" },
  { id: "003", name: "Sunset Board", colors: ["#7F5539", "#B08968", "#DDB892", "#E6CCB2", "#FFE6A7"], tags: ["warm", "marketing", "earth", "creative"], mood: "warm" },
  { id: "004", name: "Royal Contrast", colors: ["#1D4ED8", "#2563EB", "#3B82F6", "#93C5FD", "#DBEAFE"], tags: ["blue", "bold", "tech", "finance"], mood: "bold" },
  { id: "005", name: "Dark Pulse", colors: ["#020617", "#0F172A", "#1E293B", "#334155", "#64748B"], tags: ["dark", "tech", "modern", "operations"], mood: "dark" },
  { id: "006", name: "Pastel Bloom", colors: ["#FFCAD4", "#F4ACB7", "#9D8189", "#B8E0D2", "#DEE2FF"], tags: ["pastel", "soft", "hr", "creative"], mood: "pastel" },
  { id: "007", name: "Calm Teal", colors: ["#0F766E", "#0D9488", "#14B8A6", "#5EEAD4", "#CCFBF1"], tags: ["teal", "calm", "operations", "health"], mood: "calm" },
  { id: "008", name: "Finance Steel", colors: ["#0B132B", "#1C2541", "#3A506B", "#5BC0BE", "#CDEDF6"], tags: ["finance", "professional", "blue", "corporate"], mood: "calm" }
];

const searchInput = document.getElementById("searchInput");
const moodFilter = document.getElementById("moodFilter");
const industryFilter = document.getElementById("industryFilter");
const grid = document.getElementById("paletteGrid");

function createSkeleton(count = 6) {
  grid.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const card = document.createElement("div");
    card.className = "palette-card skeleton";
    card.style.height = "170px";
    grid.appendChild(card);
  }
}

function byFilters(item) {
  const q = searchInput.value.trim().toLowerCase();
  const mood = moodFilter.value;
  const industry = industryFilter.value;
  const text = `${item.name} ${item.tags.join(" ")}`.toLowerCase();
  const passQ = !q || text.includes(q);
  const passMood = !mood || item.mood.toLowerCase() === mood;
  const passIndustry = !industry || item.tags.map((t) => t.toLowerCase()).includes(industry);
  return passQ && passMood && passIndustry;
}

function render() {
  const items = allPalettes.filter(byFilters);
  grid.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "palette-card";
    card.innerHTML = `
      <div class="palette-strip">${item.colors.map((c) => `<span style="background:${c}"></span>`).join("")}</div>
      <div class="palette-meta">
        <div>
          <div class="bd-heading">${item.name}</div>
          <div class="bd-hint">Suasana: ${item.mood}</div>
        </div>
        <div class="palette-tags">
          ${item.tags.slice(0, 4).map((tag) => `<span class="bd-badge bd-badge-gray">${tag}</span>`).join("")}
        </div>
        <button type="button" class="bd-btn bd-btn-primary">Pakai palet ini</button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => {
      writeSeedPalette(item.colors);
      showToast("Palet dipilih. Membuka generator…");
      setTimeout(() => {
        location.href = `./index.html?palette=${encodeURIComponent(item.colors.join(","))}`;
      }, 250);
    });
    grid.appendChild(card);
  });
  if (!items.length) {
    grid.innerHTML = `<div class="bd-hint">Belum ada palet yang cocok dengan filter ini.</div>`;
  }
}

async function init() {
  createSkeleton();
  try {
    const res = await fetch("./palettes.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allPalettes = await res.json();
    render();
  } catch (_error) {
    allPalettes = fallbackPalettes;
    render();
    showToast("Mode offline: menampilkan palet contoh.");
  }
}

searchInput.addEventListener("input", render);
moodFilter.addEventListener("change", render);
industryFilter.addEventListener("change", render);

init();
