document.addEventListener("DOMContentLoaded", () => {
  initializePaletteOracle();
  initializePaletteStudio();
});

const EXTRA_PALETTES = [
  { title: "Amber Atlas", story: "Map-paper neutrals, old ink, amber roads, and deep ocean pins.", colors: ["#2f1b12", "#7c3f1d", "#d99a3d", "#f5e6c8", "#0f4c5c"] },
  { title: "Blue Hour Letter", story: "Soft evening paper, fountain pen blue, and the last warm window light.", colors: ["#0f172a", "#1d4ed8", "#93c5fd", "#f8fafc", "#f59e0b"] },
  { title: "Apricot Circuit", story: "Warm product light wrapped around crisp code and quiet hardware gray.", colors: ["#1f2937", "#475569", "#ffb703", "#fb8500", "#fff7ed"] },
  { title: "Moss Archive", story: "A library corner of moss greens, aged paper, and polished wood.", colors: ["#1b4332", "#40916c", "#95d5b2", "#f1faee", "#7f4f24"] },
  { title: "Velvet Debug", story: "Dark editor velvet, electric traces, and a small violet highlight.", colors: ["#09090b", "#18181b", "#22d3ee", "#a78bfa", "#f4f4f5"] },
  { title: "Peach Kiln", story: "Peach clay, soft ash, terracotta edges, and sage glaze.", colors: ["#5c2e1f", "#c56a43", "#ffcab0", "#f8ead8", "#7a8f63"] },
  { title: "Rainy Terminal", story: "Terminal greens through rainy glass and midnight blue reflections.", colors: ["#020617", "#064e3b", "#10b981", "#a7f3d0", "#38bdf8"] },
  { title: "Paper Lantern", story: "Cream paper, candle gold, red silk, and dusky violet shadow.", colors: ["#3b0a0a", "#991b1b", "#f59e0b", "#fff7ed", "#6d28d9"] },
  { title: "Ocean Schema", story: "Structured ocean blues, foam white, and a coral annotation.", colors: ["#082f49", "#0369a1", "#7dd3fc", "#f0f9ff", "#fb7185"] },
  { title: "Fig Orchard", story: "Fig skins, garden leaves, cream linen, and ripe amber fruit.", colors: ["#3b0764", "#7e22ce", "#365314", "#fef3c7", "#f59e0b"] },
  { title: "Rose Algorithm", story: "A romantic UI palette with rose glass and precise charcoal text.", colors: ["#111827", "#be123c", "#fb7185", "#ffe4e6", "#f8fafc"] },
  { title: "Juniper Notebook", story: "Juniper ink, soft ruled paper, and a brass bookmark.", colors: ["#0f2f2f", "#0f766e", "#99f6e4", "#f8fafc", "#b45309"] },
  { title: "Saffron Graph", story: "Analytical grays warmed by saffron data points and cream space.", colors: ["#1f2937", "#6b7280", "#e5e7eb", "#f59e0b", "#fff7ed"] },
  { title: "Lilac Console", story: "Cool console panels softened with lilac, mist, and moon white.", colors: ["#111827", "#4338ca", "#a5b4fc", "#e0e7ff", "#f8fafc"] },
  { title: "Terra Prototype", story: "Grounded terracotta, practical neutrals, and a clean blue action.", colors: ["#431407", "#9a3412", "#fed7aa", "#f5f5f4", "#2563eb"] },
  { title: "Mint Thesis", story: "Academic dark green, mint diagrams, and quiet ivory margins.", colors: ["#052e16", "#15803d", "#86efac", "#f7fee7", "#334155"] },
  { title: "Coral Dataset", story: "Clean data blues with coral outliers and paper-soft highlights.", colors: ["#0f172a", "#0284c7", "#bae6fd", "#fff7ed", "#f97316"] },
  { title: "Plum Interface", story: "A plush dark product palette with plum panels and warm focus rings.", colors: ["#1e1b4b", "#581c87", "#c084fc", "#faf5ff", "#f59e0b"] },
  { title: "Golden Blueprint", story: "Blueprint navy, drafting lines, and precise golden measurements.", colors: ["#0c1b33", "#1d4ed8", "#bfdbfe", "#fef3c7", "#d97706"] },
  { title: "Sage Portfolio", story: "Soft sage, warm cream, red-brown signature, and gallery charcoal.", colors: ["#1f2937", "#6b705c", "#a5a58d", "#ffe8d6", "#850f01"] },
  { title: "Cherry Terminal", story: "A dark terminal warmed by cherry alerts and pink command glow.", colors: ["#09090b", "#27272a", "#e11d48", "#fb7185", "#f4f4f5"] },
  { title: "Cloud Ceramic", story: "Cloud glaze, pale clay, mineral blue, and kiln-smoke gray.", colors: ["#334155", "#94a3b8", "#e2e8f0", "#f5e6c8", "#2563eb"] },
  { title: "Olive Diagram", story: "Olive structure, inked labels, cream boards, and orange emphasis.", colors: ["#1c1917", "#4d7c0f", "#a3e635", "#fefce8", "#ea580c"] },
  { title: "Vermilion Grid", story: "Poster red, layout cream, charcoal type, and a bright cyan guide.", colors: ["#1f1f1f", "#b91c1c", "#ef4444", "#fff7ed", "#06b6d4"] },
  { title: "Iris Research", story: "Research-night blues, iris violet, and a clear annotation yellow.", colors: ["#020617", "#312e81", "#818cf8", "#eef2ff", "#facc15"] },
  { title: "Honeyed Clay", story: "Honey glaze, dark clay, toasted edges, and linen display light.", colors: ["#3b2417", "#78350f", "#d97706", "#fde68a", "#fff7ed"] },
  { title: "Cypress Lab", story: "Cypress greens, sterile lab white, and one controlled amber signal.", colors: ["#022c22", "#047857", "#6ee7b7", "#ecfdf5", "#f59e0b"] },
  { title: "Ink Bloom", story: "Spreading blue-black ink with bloom pink and paper white.", colors: ["#020617", "#1e3a8a", "#60a5fa", "#fdf2f8", "#db2777"] },
  { title: "Tangerine Model", story: "A warm ML dashboard palette with tangerine insight and slate structure.", colors: ["#0f172a", "#334155", "#f8fafc", "#fb923c", "#14b8a6"] },
  { title: "Lavender Studio", story: "Lavender shadows, cream table light, and a grounded brown accent.", colors: ["#3b0764", "#8b5cf6", "#ddd6fe", "#fff7ed", "#7c2d12"] },
  { title: "Pine Presentation", story: "Confident pine, crisp slides, cream backgrounds, and gold emphasis.", colors: ["#052e16", "#166534", "#bbf7d0", "#fffbeb", "#ca8a04"] },
  { title: "Ruby Product", story: "Ruby action states over clean product neutrals and soft blush.", colors: ["#111827", "#9f1239", "#e11d48", "#ffe4e6", "#f8fafc"] },
  { title: "Slate Garden", story: "Slate UI panels with garden green, dew blue, and morning cream.", colors: ["#0f172a", "#334155", "#16a34a", "#93c5fd", "#fefce8"] },
  { title: "Marigold Poster", story: "Marigold ink, tomato red, cream paper, and a deep graphic outline.", colors: ["#1f1f1f", "#dc2626", "#f59e0b", "#fde68a", "#fff7ed"] },
  { title: "Arctic Notebook", story: "Icy notes, blue-gray shadows, and a sharp cyan underline.", colors: ["#0f172a", "#475569", "#cbd5e1", "#f8fafc", "#22d3ee"] },
  { title: "Cocoa Interface", story: "Cocoa surfaces, caramel accents, and a restrained blue interaction.", colors: ["#2a120c", "#5d3124", "#a16207", "#fff7ed", "#0ea5e9"] },
  { title: "Frosted Plum", story: "Frosty lavender highlights over plum shadows and snow white.", colors: ["#2e1065", "#6b21a8", "#d8b4fe", "#faf5ff", "#94a3b8"] },
  { title: "Signal Sunset", story: "Sunset orange, signal cyan, and dark navy for high-contrast systems.", colors: ["#020617", "#0f172a", "#06b6d4", "#f97316", "#ffedd5"] },
  { title: "Botanical Wireframe", story: "Wireframe gray with fresh botanical green and cream UI space.", colors: ["#18181b", "#71717a", "#d4d4d8", "#84cc16", "#fefce8"] },
  { title: "Mulberry Sketch", story: "Mulberry ink, sketchbook paper, dusty rose, and graphite marks.", colors: ["#3f0f2f", "#9d174d", "#f9a8d4", "#fff7ed", "#374151"] },
  { title: "Cobalt Ceramic", story: "Cobalt glaze, white porcelain, and warm kiln shadow.", colors: ["#172554", "#1d4ed8", "#bfdbfe", "#f8fafc", "#92400e"] },
  { title: "Sunlit Query", story: "Database darks lit by yellow query highlights and mint success.", colors: ["#030712", "#1f2937", "#facc15", "#dcfce7", "#22c55e"] },
  { title: "Blush Framework", story: "Blush cards, burgundy structure, and cool blue interaction states.", colors: ["#450a0a", "#9f1239", "#fecdd3", "#fff1f2", "#2563eb"] },
  { title: "Topaz Dashboard", story: "Dark dashboard panels with topaz alerts and glassy blue charts.", colors: ["#111827", "#1f2937", "#38bdf8", "#fbbf24", "#f8fafc"] },
  { title: "Fern Collage", story: "Cut-paper greens, warm scraps, and a red-brown portfolio stamp.", colors: ["#14532d", "#4d7c0f", "#d9f99d", "#fff7ed", "#850f01"] },
  { title: "Night Gallery", story: "Gallery-black walls, pale spotlights, and a single cyan placard.", colors: ["#030712", "#18181b", "#e5e7eb", "#f8fafc", "#06b6d4"] },
  { title: "Copper Function", story: "Copper code comments, dark editor chrome, and creamy string literals.", colors: ["#0c0a09", "#292524", "#c2410c", "#fed7aa", "#fef3c7"] },
  { title: "Seaglass Flow", story: "Sea-glass greens, foam, deep teal, and a tiny coral marker.", colors: ["#042f2e", "#0f766e", "#5eead4", "#f0fdfa", "#fb7185"] },
  { title: "Orchid Sprint", story: "Sprint-board purples, focused navy, and optimistic orange tags.", colors: ["#111827", "#4c1d95", "#a78bfa", "#f5f3ff", "#f97316"] },
  { title: "Linen Wire", story: "Linen backgrounds, ink wires, rust pins, and cool blue references.", colors: ["#1f2937", "#6b7280", "#f5f5dc", "#b45309", "#2563eb"] },
  { title: "Electric Sage", story: "Sage greens energized by electric cyan and almost-black structure.", colors: ["#020617", "#365314", "#84cc16", "#ccfbf1", "#06b6d4"] },
  { title: "Ember Meeting", story: "Warm meeting-room light, ember red notes, and polished charcoal.", colors: ["#1c1917", "#44403c", "#b91c1c", "#fb923c", "#fff7ed"] },
  { title: "Azure Ceramic", story: "Azure glaze, pale slip, gray clay, and sunny studio trim.", colors: ["#0c4a6e", "#0284c7", "#bae6fd", "#f8fafc", "#f59e0b"] },
  { title: "Pomegranate UI", story: "Pomegranate reds, blush states, cream surfaces, and deep type.", colors: ["#2a120c", "#7f1d1d", "#dc2626", "#fee2e2", "#fff7ed"] },
  { title: "Mint Compiler", story: "Compiler-dark panels with mint syntax and a soft white output pane.", colors: ["#020617", "#111827", "#34d399", "#d1fae5", "#f8fafc"] },
  { title: "Ochre Roadmap", story: "Roadmap ochre, planning grays, and blue milestone markers.", colors: ["#1f2937", "#6b7280", "#fef3c7", "#d97706", "#2563eb"] },
  { title: "Dusk Weave", story: "Dusk violet, woven rose, warm cream, and a navy base.", colors: ["#111827", "#4c1d95", "#be185d", "#fbcfe8", "#fff7ed"] },
  { title: "Basil Grid", story: "Basil greens organized on a quiet cream grid with dark labels.", colors: ["#052e16", "#166534", "#86efac", "#f7fee7", "#1f2937"] },
  { title: "Quartz Product", story: "Quartz white cards, cool grays, cyan actions, and amber moments.", colors: ["#111827", "#64748b", "#e2e8f0", "#f8fafc", "#06b6d4"] },
  { title: "Spiced Interface", story: "Spiced orange, soft cream, brown ink, and a crisp teal accent.", colors: ["#2a120c", "#9a3412", "#fdba74", "#fff7ed", "#0f766e"] },
  { title: "Night Orchard", story: "Dark orchard greens, plum fruit, and moonlit cream highlights.", colors: ["#052e16", "#14532d", "#581c87", "#c084fc", "#fefce8"] },
  { title: "Cyan Monograph", story: "Minimal black and white interrupted by a precise cyan signature.", colors: ["#09090b", "#27272a", "#f4f4f5", "#ffffff", "#06b6d4"] },
  { title: "Rosewood Lab", story: "Rosewood cabinets, lab glass, pale notes, and controlled green.", colors: ["#3f1d1d", "#7f1d1d", "#fecaca", "#f8fafc", "#16a34a"] },
  { title: "Butterfly Query", story: "Butterfly blue, lilac query trails, and a warm nectar accent.", colors: ["#172554", "#2563eb", "#c4b5fd", "#f5f3ff", "#f59e0b"] },
  { title: "Stone Fruit", story: "Peach, plum, stone gray, and leafy green for warm editorial pages.", colors: ["#3f0f2f", "#be185d", "#fed7aa", "#78716c", "#4d7c0f"] },
  { title: "Graphite Sunrise", story: "Graphite foundations with sunrise orange and pale yellow lift.", colors: ["#111827", "#374151", "#f97316", "#fde68a", "#f8fafc"] },
  { title: "Indigo Clay", story: "Indigo shadows, brown clay, pale glaze, and a quiet sky highlight.", colors: ["#1e1b4b", "#4338ca", "#8a4f2a", "#f4e0bd", "#93c5fd"] },
  { title: "Lemon Syntax", story: "Dark syntax, lemon highlights, and cool green confirmation.", colors: ["#020617", "#1e293b", "#fef08a", "#84cc16", "#f8fafc"] },
  { title: "Cranberry Board", story: "Cranberry sections, paper cards, slate notes, and warm dividers.", colors: ["#111827", "#881337", "#e11d48", "#ffe4e6", "#f8fafc"] },
  { title: "Blue Porcelain", story: "Porcelain white, blue ornament, and a small gold rim.", colors: ["#172554", "#1d4ed8", "#bfdbfe", "#f8fafc", "#d97706"] },
  { title: "Lush Wireframe", story: "A lush green wireframe over charcoal with bright lime nodes.", colors: ["#09090b", "#27272a", "#166534", "#a3e635", "#f7fee7"] },
  { title: "Paprika Sprint", story: "Paprika planning notes, warm cards, slate structure, and sky tags.", colors: ["#1e293b", "#b45309", "#f97316", "#ffedd5", "#38bdf8"] },
  { title: "Museum Teal", story: "Museum teal walls, cream labels, polished wood, and gold lights.", colors: ["#042f2e", "#0f766e", "#ccfbf1", "#fff7ed", "#a16207"] },
  { title: "Berry Dataset", story: "Berry chart marks, dark axes, and pale interface canvas.", colors: ["#111827", "#701a75", "#d946ef", "#fae8ff", "#f8fafc"] },
  { title: "Candlelit Repo", story: "A candlelit code repository with amber diffs and deep brown chrome.", colors: ["#1c1917", "#292524", "#92400e", "#f59e0b", "#fef3c7"] },
  { title: "Glacier Method", story: "Glacier blues, precise gray, and a small warm proof mark.", colors: ["#082f49", "#0284c7", "#e0f2fe", "#f8fafc", "#f97316"] },
  { title: "Persimmon Form", story: "Persimmon buttons, cream fields, cedar text, and cool validation.", colors: ["#2a120c", "#c2410c", "#fb923c", "#fff7ed", "#0e7490"] },
  { title: "Pistachio Sketch", story: "Pistachio paper, graphite lines, soft cream, and a red correction.", colors: ["#1f2937", "#6b7280", "#d9f99d", "#fefce8", "#dc2626"] },
  { title: "Midnight Ceramic", story: "Midnight glaze, cream slip, cobalt depth, and ember reflection.", colors: ["#020617", "#172554", "#1d4ed8", "#fff7ed", "#f97316"] },
  { title: "Raspberry Console", story: "Raspberry console alerts on dark panels with cool blue clarity.", colors: ["#09090b", "#1f2937", "#be123c", "#f9a8d4", "#38bdf8"] },
  { title: "Golden Garden", story: "Golden wildflowers, dark leaves, and cream afternoon air.", colors: ["#14532d", "#4d7c0f", "#facc15", "#fef3c7", "#fff7ed"] },
  { title: "Steel Blossom", story: "Steel UI neutrals softened by blossom pink and fresh cyan.", colors: ["#111827", "#475569", "#cbd5e1", "#f9a8d4", "#06b6d4"] },
  { title: "Cinnamon Docs", story: "Documentation cream, cinnamon headings, and reliable navy links.", colors: ["#1e293b", "#7c2d12", "#c2410c", "#fed7aa", "#fff7ed"] },
  { title: "Peacock Query", story: "Peacock teal, jewel blue, cream output, and orange caret.", colors: ["#042f2e", "#0f766e", "#1d4ed8", "#f0fdfa", "#f97316"] },
  { title: "Amethyst Demo", story: "Amethyst presentation panels with white space and golden applause.", colors: ["#1e1b4b", "#7e22ce", "#c084fc", "#faf5ff", "#f59e0b"] },
  { title: "Willow Interface", story: "Willow greens, cloud gray, and a quiet rose accent.", colors: ["#365314", "#65a30d", "#d9f99d", "#f8fafc", "#e11d48"] },
  { title: "Bronze Monitor", story: "Bronze metrics over dark monitoring panels with blue status.", colors: ["#0c0a09", "#292524", "#a16207", "#fde68a", "#0ea5e9"] },
  { title: "Snowfall Syntax", story: "Snowy code themes with pale blue shadows and bright green success.", colors: ["#0f172a", "#334155", "#bfdbfe", "#f8fafc", "#22c55e"] },
  { title: "Peony Layout", story: "Peony editorial color with cream layouts and restrained navy type.", colors: ["#172554", "#be123c", "#fb7185", "#ffe4e6", "#fff7ed"] },
  { title: "Olive Sunset", story: "Olive hills under orange sunset with charcoal silhouettes.", colors: ["#1c1917", "#3f6212", "#a3e635", "#f97316", "#ffedd5"] },
  { title: "Cobalt Sprint", story: "Cobalt sprint planning with pale task cards and amber priority.", colors: ["#0f172a", "#1d4ed8", "#93c5fd", "#eff6ff", "#f59e0b"] },
  { title: "Terracotta Map", story: "Terracotta map routes, sand backgrounds, and river teal.", colors: ["#431407", "#9a3412", "#fdba74", "#fff7ed", "#0f766e"] },
  { title: "Violet Archive", story: "Violet archive boxes, paper tags, graphite labels, and gold pins.", colors: ["#2e1065", "#7e22ce", "#ddd6fe", "#f8fafc", "#ca8a04"] },
  { title: "Seafoam Product", story: "Seafoam onboarding screens, dark text, and warm conversion buttons.", colors: ["#0f172a", "#0f766e", "#99f6e4", "#f0fdfa", "#fb923c"] },
  { title: "Charcoal Apricot", story: "Charcoal layouts lifted by apricot fills and cream card space.", colors: ["#111827", "#374151", "#fb923c", "#fed7aa", "#fff7ed"] },
  { title: "Jade Graph", story: "Jade graph lines, dark axes, pale labels, and yellow annotations.", colors: ["#022c22", "#047857", "#6ee7b7", "#ecfdf5", "#eab308"] },
  { title: "Rouge Wireframe", story: "Rouge wireframe marks over cream boards with black UI rails.", colors: ["#111111", "#850f01", "#dc2626", "#fee2e2", "#fffaf4"] },
  { title: "Periwinkle Lab", story: "Periwinkle research cards, deep blue notes, and gentle cream.", colors: ["#172554", "#3730a3", "#a5b4fc", "#eef2ff", "#fff7ed"] },
  { title: "Harvest Console", story: "Harvest gold console messages against deep graphite panels.", colors: ["#0c0a09", "#27272a", "#ca8a04", "#fde68a", "#f8fafc"] },
  { title: "Aqua Collage", story: "Aqua cutouts, white borders, midnight text, and coral tape.", colors: ["#082f49", "#0891b2", "#67e8f9", "#f8fafc", "#fb7185"] },
  { title: "Rosemary Launch", story: "Rosemary greens, cream landing space, and a confident red CTA.", colors: ["#052e16", "#166534", "#bbf7d0", "#fff7ed", "#b91c1c"] },
  { title: "Sienna Notebook", story: "Sienna covers, ivory pages, slate ink, and blue margin notes.", colors: ["#1f2937", "#7c2d12", "#c2410c", "#fed7aa", "#2563eb"] }
];

function pickBestAnswerIndex(colors, fallbackOffset) {
  function hexComponents(hex) {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ];
  }
  function colorScore(hex) {
    const [r, g, b] = hexComponents(hex);
    const luma = (r * 299 + g * 587 + b * 114) / 1000;
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);
    const lumaPenalty = luma < 40 ? (40 - luma) * 3 : luma > 220 ? (luma - 220) * 3 : 0;
    return chroma - lumaPenalty;
  }
  function colorDist(a, b) {
    const [ra, ga, ba] = hexComponents(a);
    const [rb, gb, bb] = hexComponents(b);
    return Math.sqrt((ra - rb) ** 2 + (ga - gb) ** 2 + (ba - bb) ** 2);
  }

  const sorted = colors
    .map((c, i) => ({ c, i, s: colorScore(c) }))
    .sort((a, b) => b.s - a.s);

  for (const { c, i } of sorted) {
    const isDistinct = colors.every((other, j) => j === i || colorDist(c, other) > 50);
    if (isDistinct) return i;
  }
  return sorted[0].i;
}

function createOraclePalettes(basePalettes) {
  const extra = EXTRA_PALETTES.map((palette, index) => {
    const answerIdx = pickBestAnswerIndex(palette.colors, index);
    const answer = palette.colors[answerIdx];
    return {
      title: palette.title,
      story: palette.story,
      colors: palette.colors,
      answer,
      decoys: getDecoyColors(answer, index)
    };
  });

  return [...basePalettes, ...extra].slice(0, 100);
}

function createStudioPresets(basePresets) {
  const extra = EXTRA_PALETTES.map((palette) => ({
    mood: palette.title,
    colors: palette.colors
  }));

  return [...basePresets, ...extra].slice(0, 100);
}

function getDecoyColors(answer, offset) {
  const r = parseInt(answer.slice(1, 3), 16);
  const g = parseInt(answer.slice(3, 5), 16);
  const b = parseInt(answer.slice(5, 7), 16);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const luma   = (r * 299 + g * 587 + b * 114) / 1000;
  const chroma = max - min;

  let hue = 0;
  if (chroma > 0) {
    if (max === r) hue = ((g - b) / chroma + (g < b ? 6 : 0)) * 60;
    else if (max === g) hue = ((b - r) / chroma + 2) * 60;
    else hue = ((r - g) / chroma + 4) * 60;
  }

  // Vivid, clearly distinct pools for each hue family
  const families = {
    red:    ["#dc2626", "#b91c1c", "#ef4444", "#e11d48", "#be123c", "#f43f5e"],
    yellow: ["#f59e0b", "#d97706", "#eab308", "#facc15", "#ca8a04", "#fb923c"],
    green:  ["#16a34a", "#15803d", "#22c55e", "#4d7c0f", "#84cc16", "#059669"],
    teal:   ["#0f766e", "#0d9488", "#14b8a6", "#0891b2", "#06b6d4", "#0e7490"],
    blue:   ["#2563eb", "#1d4ed8", "#3b82f6", "#1e40af", "#0284c7", "#60a5fa"],
    purple: ["#7c3aed", "#6d28d9", "#8b5cf6", "#a855f7", "#9333ea", "#c084fc"],
  };

  // Route the answer to its hue family; muted/dark/light fall back by offset
  function getAnswerFamily() {
    if (luma < 50 || luma > 210 || chroma < 28) {
      const vivid = ["red", "teal", "purple", "green", "blue", "yellow"];
      return vivid[offset % vivid.length];
    }
    if (hue < 30 || hue >= 330) return "red";
    if (hue < 75)  return "yellow";
    if (hue < 165) return "green";
    if (hue < 210) return "teal";
    if (hue < 270) return "blue";
    return "purple";
  }

  // Each answer family gets 3 decoy families from the opposite side of the color wheel
  const contrastMap = {
    red:    ["teal",   "blue",   "green"],
    yellow: ["blue",   "purple", "teal"],
    green:  ["purple", "red",    "blue"],
    teal:   ["red",    "purple", "yellow"],
    blue:   ["yellow", "red",    "green"],
    purple: ["yellow", "green",  "teal"],
  };

  const af = getAnswerFamily();
  return contrastMap[af].map((family, i) => {
    const pool = families[family];
    return pool[(offset + i * 2 + 1) % pool.length];
  });
}

function initializePaletteOracle() {
  const titleEl     = document.getElementById("po-title");
  const storyEl     = document.getElementById("po-story");
  const paletteEl   = document.getElementById("po-palette");
  const optionsEl   = document.getElementById("po-options");
  const statusEl    = document.getElementById("po-status");
  const scoreEl     = document.getElementById("po-score");
  const progressEl  = document.getElementById("po-progress");
  const resultEl    = document.getElementById("po-result");
  const dotsEl      = document.getElementById("po-dots");
  const newRoundBtn = document.getElementById("po-new-round");

  if (!titleEl || !storyEl || !paletteEl || !optionsEl || !statusEl || !scoreEl || !progressEl || !resultEl || !newRoundBtn) return;

  const palettes = createOraclePalettes([
    {
      title: "Moonlit Charcoal",
      story: "A cool study in moonlight, shadow, and graphite-soft contrast.",
      colors: ["#0f172a", "#1e293b", "#f8fafc", "#a7c7e7", "#f6c453"],
      answer: "#a7c7e7",
      decoys: ["#ef4444", "#22c55e", "#fb7185"]
    },
    {
      title: "Ceramic Earth",
      story: "Warm clay, fired edges, and a studio table covered in dust and sunlight.",
      colors: ["#3b2417", "#8a4f2a", "#d7a36a", "#f4e0bd", "#6f7d4f"],
      answer: "#d7a36a",
      decoys: ["#2dd4bf", "#7c3aed", "#e11d48"]
    },
    {
      title: "Sunset Logo",
      story: "The portfolio mark translated into flame, ember, red, and soft cream.",
      colors: ["#941b0c", "#c24118", "#ffad1f", "#fff7ed", "#4a1309"],
      answer: "#ffad1f",
      decoys: ["#38bdf8", "#a78bfa", "#22c55e"]
    },
    {
      title: "Digital Garden",
      story: "Interface blues and leafy greens for systems that feel alive.",
      colors: ["#052e2f", "#0e7490", "#84cc16", "#e6f4d7", "#f59e0b"],
      answer: "#84cc16",
      decoys: ["#dc2626", "#64748b", "#f9a8d4"]
    },
    {
      title: "Reverie Room",
      story: "A soft interior palette for memory, mood boards, and quiet reflection.",
      colors: ["#312e81", "#818cf8", "#f0abfc", "#f8fafc", "#f59e0b"],
      answer: "#f0abfc",
      decoys: ["#14532d", "#7f1d1d", "#0891b2"]
    },
    {
      title: "Hackathon Night",
      story: "Deep focus blues, terminal glow, and one warm spark for late-build energy.",
      colors: ["#020617", "#0b1322", "#06b6d4", "#dbeafe", "#ffad1f"],
      answer: "#06b6d4",
      decoys: ["#fb7185", "#84cc16", "#f97316"]
    },
    {
      title: "Clay Kiln",
      story: "A fired ceramic palette with oxides, ash, and a soft glaze highlight.",
      colors: ["#2f1b12", "#7f341b", "#b85c38", "#ead2b1", "#2f3e46"],
      answer: "#b85c38",
      decoys: ["#06b6d4", "#a78bfa", "#22c55e"]
    },
    {
      title: "Gallery Wall",
      story: "Clean wall space, dark frames, warm track lights, and a quiet accent.",
      colors: ["#fffaf4", "#eadfce", "#2a120c", "#b23600", "#7c8a5d"],
      answer: "#eadfce",
      decoys: ["#0ea5e9", "#c084fc", "#16a34a"]
    },
    {
      title: "Code Bloom",
      story: "A product palette where system blues meet botanical growth and sunlight.",
      colors: ["#0f172a", "#0e7490", "#2dd4bf", "#d9f99d", "#fbbf24"],
      answer: "#2dd4bf",
      decoys: ["#dc2626", "#8b5cf6", "#f472b6"]
    },
    {
      title: "Paint Water",
      story: "Cloudy rinse water, pigment blooms, paper cream, and one decisive red.",
      colors: ["#172554", "#64748b", "#cbd5e1", "#fff7ed", "#941b0c"],
      answer: "#64748b",
      decoys: ["#65a30d", "#f59e0b", "#7c3aed"]
    },
    {
      title: "Resume Ink",
      story: "Professional, readable, and a little warm around the edges.",
      colors: ["#111827", "#374151", "#f8fafc", "#f2d6a1", "#850f01"],
      answer: "#374151",
      decoys: ["#22c55e", "#fb7185", "#06b6d4"]
    },
    {
      title: "Ghibli Guard",
      story: "Soft greens, storybook sky, warm lantern light, and protective shadow.",
      colors: ["#12372a", "#436850", "#adbc9f", "#fbfada", "#f59e0b"],
      answer: "#adbc9f",
      decoys: ["#ef4444", "#0ea5e9", "#a855f7"]
    },
    {
      title: "Print Studio",
      story: "Ink, paper grain, registration marks, and a punchy poster accent.",
      colors: ["#111111", "#f5f1e8", "#d6c6a8", "#e11d48", "#2563eb"],
      answer: "#e11d48",
      decoys: ["#84cc16", "#f97316", "#06b6d4"]
    }
  ]);

  const totalRounds = 10;
  let current = null;
  let currentMissingEl = null;
  let roundIndex = 0;
  let roundQueue = [];
  let correct = 0;
  let roundTimer = null;
  let roundResults = [];

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function renderDots() {
    if (!dotsEl) return;
    dotsEl.replaceChildren();
    for (let i = 0; i < totalRounds; i++) {
      const dot = document.createElement("span");
      dot.className = "palette-dot";
      if (i < roundResults.length) {
        dot.classList.add(roundResults[i] === "correct" ? "is-correct" : "is-wrong");
      } else if (i === roundIndex) {
        dot.classList.add("is-current");
      }
      dotsEl.appendChild(dot);
    }
  }

  function startSession() {
    window.clearTimeout(roundTimer);
    roundQueue = shuffle(palettes).slice(0, totalRounds);
    roundIndex = 0;
    correct = 0;
    roundResults = [];
    hideResult();
    renderDots();
    renderRound();
  }

  function renderRound() {
    window.clearTimeout(roundTimer);
    hideResult();
    if (roundIndex >= totalRounds) {
      renderFinalScore();
      return;
    }

    current = roundQueue[roundIndex];
    const missingIndex = current.colors.indexOf(current.answer);

    titleEl.textContent    = current.title;
    storyEl.textContent    = current.story;
    statusEl.textContent   = "Tap or drag the swatch that completes this palette.";
    scoreEl.textContent    = `Score ${correct} / ${totalRounds}`;
    progressEl.textContent = `${roundIndex + 1} / ${totalRounds}`;
    optionsEl.dataset.locked = "false";
    currentMissingEl = null;
    paletteEl.replaceChildren();
    optionsEl.replaceChildren();
    renderDots();

    current.colors.forEach((color, index) => {
      const swatch = document.createElement("div");
      swatch.className = "palette-swatch palette-wheel-swatch";
      swatch.style.setProperty("--slot-index", index);
      if (index === missingIndex) {
        swatch.classList.add("is-missing");
        swatch.innerHTML = "<span>?</span>";
        swatch.setAttribute("aria-label", "Missing swatch — drop the correct color here");
        swatch.addEventListener("dragover", allowDrop);
        swatch.addEventListener("drop", handleDrop);
        currentMissingEl = swatch;
      } else {
        swatch.style.setProperty("--swatch-color", color);
        swatch.dataset.hex = color.toUpperCase();
        swatch.setAttribute("aria-label", `Palette swatch ${color}`);
      }
      paletteEl.appendChild(swatch);
    });

    shuffle([current.answer, ...current.decoys]).forEach((color) => {
      const wrap = document.createElement("div");
      wrap.className = "palette-option-wrap";

      const option = document.createElement("button");
      option.type = "button";
      option.className = "palette-option";
      option.style.setProperty("--swatch-color", color);
      option.dataset.color = color;
      option.dataset.hex = color.toUpperCase();
      option.draggable = true;
      option.setAttribute("aria-label", `Choose swatch ${color}`);
      option.addEventListener("click", () => {
        if (option.dataset.dragged === "true") {
          option.dataset.dragged = "false";
          return;
        }
        chooseOption(option, color);
      });
      option.addEventListener("dragstart", (event) => {
        if (optionsEl.dataset.locked === "true") {
          event.preventDefault();
          return;
        }
        event.dataTransfer.setData("text/plain", color);
        event.dataTransfer.effectAllowed = "move";
        option.classList.add("is-dragging");
        currentMissingEl?.classList.add("is-drop-target");
      });
      option.addEventListener("dragend", () => {
        option.classList.remove("is-dragging");
        currentMissingEl?.classList.remove("is-drop-target");
      });
      bindPointerDrag(option, color);

      const hexLabel = document.createElement("span");
      hexLabel.className = "palette-option-hex";
      hexLabel.textContent = color.toUpperCase();

      wrap.appendChild(option);
      wrap.appendChild(hexLabel);
      optionsEl.appendChild(wrap);
    });
  }

  function bindPointerDrag(option, color) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let optionRect = null;

    option.addEventListener("pointerdown", (event) => {
      if (optionsEl.dataset.locked === "true" || event.button > 0) return;
      startX = event.clientX;
      startY = event.clientY;
      isDragging = false;
      optionRect = option.getBoundingClientRect();
      option.setPointerCapture(event.pointerId);
    });

    option.addEventListener("pointermove", (event) => {
      if (!optionRect || optionsEl.dataset.locked === "true") return;
      const distance = Math.hypot(event.clientX - startX, event.clientY - startY);
      if (distance < 8 && !isDragging) return;

      isDragging = true;
      option.dataset.dragged = "true";
      option.classList.add("is-pointer-dragging");
      currentMissingEl?.classList.add("is-drop-target");
      option.style.width = `${optionRect.width}px`;
      option.style.height = `${optionRect.height}px`;
      option.style.left = `${event.clientX - optionRect.width / 2}px`;
      option.style.top = `${event.clientY - optionRect.height / 2}px`;
      event.preventDefault();
    });

    function finishPointerDrag(event) {
      if (!optionRect) return;
      const wasDragging = isDragging;
      optionRect = null;

      if (wasDragging) {
        option.hidden = true;
        const dropTarget = document.elementFromPoint(event.clientX, event.clientY);
        option.hidden = false;
        resetPointerOption(option);
        currentMissingEl?.classList.remove("is-drop-target");

        if (dropTarget === currentMissingEl || currentMissingEl?.contains(dropTarget)) {
          chooseOption(option, color);
        } else {
          statusEl.textContent = "Drop the swatch into the missing wheel slot.";
        }
        event.preventDefault();
      }
    }

    option.addEventListener("pointerup", finishPointerDrag);
    option.addEventListener("pointercancel", (event) => {
      resetPointerOption(option);
      currentMissingEl?.classList.remove("is-drop-target");
      optionRect = null;
      event.preventDefault();
    });
  }

  function resetPointerOption(option) {
    option.classList.remove("is-pointer-dragging");
    option.style.width = "";
    option.style.height = "";
    option.style.left = "";
    option.style.top = "";
  }

  function allowDrop(event) {
    if (!current || optionsEl.dataset.locked === "true") return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleDrop(event) {
    event.preventDefault();
    if (!current || optionsEl.dataset.locked === "true") return;

    const color = event.dataTransfer.getData("text/plain");
    const option = optionsEl.querySelector(`[data-color="${color}"]`);
    if (option) chooseOption(option, color, true);
  }

  function chooseOption(option, color) {
    if (!current || optionsEl.dataset.locked === "true") return;

    optionsEl.dataset.locked = "true";
    const isCorrect = color === current.answer;
    roundResults.push(isCorrect ? "correct" : "wrong");
    renderDots();

    if (isCorrect) {
      correct += 1;
      option.classList.add("is-correct");
      currentMissingEl?.classList.remove("is-drop-target");
      currentMissingEl?.classList.remove("is-missing");
      currentMissingEl?.classList.add("is-filled");
      currentMissingEl?.style.setProperty("--swatch-color", color);
      currentMissingEl.dataset.hex = color.toUpperCase();
      currentMissingEl.innerHTML = "";
      statusEl.textContent = "Correct — this swatch completes the palette.";
      showResult(true, color);
    } else {
      option.classList.add("is-wrong");
      currentMissingEl?.classList.remove("is-drop-target");
      currentMissingEl?.classList.add("is-wrong-drop");
      statusEl.textContent = `The missing color was ${current.answer.toUpperCase()}.`;
      showResult(false, current.answer);
      optionsEl.querySelectorAll("[data-color]").forEach((child) => {
        if (child.dataset.color === current.answer) child.classList.add("is-correct");
      });
      window.setTimeout(() => currentMissingEl?.classList.remove("is-wrong-drop"), 320);
    }
    scoreEl.textContent = `Score ${correct} / ${totalRounds}`;

    function advance() {
      window.clearTimeout(roundTimer);
      optionsEl.dataset.locked = "false";
      roundIndex += 1;
      renderRound();
    }

    roundTimer = window.setTimeout(advance, 2800);
    resultEl.querySelector(".palette-result-next")?.addEventListener("click", advance, { once: true });
  }

  function showResult(isCorrect, color) {
    resultEl.hidden = false;
    resultEl.className = `palette-result-pop ${isCorrect ? "is-correct" : "is-wrong"}`;
    resultEl.style.setProperty("--result-color", color);
    resultEl.innerHTML = `
      <div class="palette-result-icon" style="--result-color:${color}">
        <span>${isCorrect ? "✓" : "×"}</span>
      </div>
      <p class="palette-result-title">${isCorrect ? "Correct" : "Wrong"}</p>
      <p class="palette-result-copy">${isCorrect
        ? "The palette clicked into place."
        : `Missing: <span class="palette-result-hex">${color.toUpperCase()}</span>`}
      </p>
      <button class="palette-result-next mini-game-ghost-btn" type="button">Next →</button>
    `;
  }

  function hideResult() {
    resultEl.hidden = true;
    resultEl.replaceChildren();
  }

  function renderFinalScore() {
    current = null;
    currentMissingEl = null;
    optionsEl.dataset.locked = "true";
    const pct = Math.round((correct / totalRounds) * 100);
    titleEl.textContent = "Palette run complete";
    storyEl.textContent = `${correct} of ${totalRounds} palettes matched — ${pct}% accuracy.`;
    statusEl.textContent = correct >= 8
      ? "Excellent eye. You read the palette mood fast."
      : correct >= 5
      ? "Nice run. A few more rounds will sharpen the eye."
      : "Restart to sharpen your color intuition.";
    scoreEl.textContent = `Final ${correct} / ${totalRounds}`;
    progressEl.textContent = `${totalRounds} / ${totalRounds}`;
    paletteEl.replaceChildren();
    optionsEl.replaceChildren();
    renderDots();

    const finalWheel = document.createElement("div");
    finalWheel.className = "palette-final-wheel";
    finalWheel.innerHTML = `<span>${correct}</span><small>/ ${totalRounds}</small>`;
    paletteEl.appendChild(finalWheel);
  }

  newRoundBtn.addEventListener("click", startSession);
  startSession();
}

function initializePaletteStudio() {
  const previewEl = document.getElementById("ps-preview");
  const controlsEl = document.getElementById("ps-controls");
  const randomizeBtn = document.getElementById("ps-randomize");
  const copyBtn = document.getElementById("ps-copy");
  const cssBtn = document.getElementById("ps-css");
  const moodEl = document.getElementById("ps-mood");
  const statusEl = document.getElementById("ps-status");
  const scoreEl = document.getElementById("ps-score");

  if (!previewEl || !controlsEl || !randomizeBtn || !copyBtn || !moodEl || !statusEl || !scoreEl) return;

  const presets = createStudioPresets([
    {
      mood: "Sunset system",
      colors: ["#941b0c", "#c24118", "#ffad1f", "#fff7ed", "#3b130b"]
    },
    {
      mood: "Moonlit interface",
      colors: ["#020617", "#0f172a", "#06b6d4", "#e2e8f0", "#f6c453"]
    },
    {
      mood: "Ceramic studio",
      colors: ["#3b2417", "#8a4f2a", "#d7a36a", "#f4e0bd", "#6f7d4f"]
    },
    {
      mood: "Gallery morning",
      colors: ["#fff7ed", "#ffd6a5", "#b23600", "#5d3124", "#0e7490"]
    },
    {
      mood: "Digital garden",
      colors: ["#052e2f", "#0e7490", "#84cc16", "#e6f4d7", "#f59e0b"]
    },
    {
      mood: "Hackathon night",
      colors: ["#020617", "#0b1322", "#06b6d4", "#dbeafe", "#ffad1f"]
    },
    {
      mood: "Clay kiln",
      colors: ["#2f1b12", "#7f341b", "#b85c38", "#ead2b1", "#2f3e46"]
    },
    {
      mood: "Gallery wall",
      colors: ["#fffaf4", "#eadfce", "#2a120c", "#b23600", "#7c8a5d"]
    },
    {
      mood: "Code bloom",
      colors: ["#0f172a", "#0e7490", "#2dd4bf", "#d9f99d", "#fbbf24"]
    },
    {
      mood: "Paint water",
      colors: ["#172554", "#64748b", "#cbd5e1", "#fff7ed", "#941b0c"]
    },
    {
      mood: "Resume ink",
      colors: ["#111827", "#374151", "#f8fafc", "#f2d6a1", "#850f01"]
    },
    {
      mood: "Ghibli guard",
      colors: ["#12372a", "#436850", "#adbc9f", "#fbfada", "#f59e0b"]
    },
    {
      mood: "Print studio",
      colors: ["#111111", "#f5f1e8", "#d6c6a8", "#e11d48", "#2563eb"]
    },
    {
      mood: "Product launch",
      colors: ["#08111f", "#1e293b", "#38bdf8", "#f8fafc", "#f97316"]
    },
    {
      mood: "Ceremony sunset",
      colors: ["#4a1309", "#941b0c", "#e85d04", "#ffba08", "#fff0dc"]
    },
    {
      mood: "Quiet database",
      colors: ["#101828", "#1d2939", "#667085", "#d0d5dd", "#12b76a"]
    },
    {
      mood: "Portfolio cream",
      colors: ["#fff7ed", "#ffe3c2", "#c24118", "#5d3124", "#0e7490"]
    },
    {
      mood: "Midnight thesis",
      colors: ["#030712", "#111827", "#312e81", "#818cf8", "#f8fafc"]
    },
    {
      mood: "Market poster",
      colors: ["#2a120c", "#850f01", "#ffad1f", "#fffaf4", "#0e7490"]
    },
    {
      mood: "Soft prototype",
      colors: ["#f8fafc", "#dbeafe", "#bfdbfe", "#1d4ed8", "#f59e0b"]
    }
  ]);

  let colors = [...presets[0].colors];
  let currentMood = presets[0].mood;
  const lockedIndices = new Set();

  const LOCK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`;
  const UNLOCK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-3.4"/></svg>`;

  function toggleLock(index) {
    if (lockedIndices.has(index)) {
      lockedIndices.delete(index);
      statusEl.textContent = "Color unlocked — Surprise Me will shuffle it.";
    } else {
      lockedIndices.add(index);
      statusEl.textContent = "Color locked — Surprise Me will keep this one.";
    }
    renderStudio();
  }

  function renderStudio() {
    previewEl.replaceChildren();
    controlsEl.replaceChildren();
    moodEl.textContent = currentMood;
    const lockedCount = lockedIndices.size;
    scoreEl.textContent = lockedCount > 0
      ? `${colors.length} colors · ${lockedCount} locked`
      : `${colors.length} colors`;

    colors.forEach((color, index) => {
      const isLocked = lockedIndices.has(index);

      const swatch = document.createElement("button");
      swatch.type = "button";
      swatch.className = `palette-studio-swatch${isLocked ? " is-locked" : ""}`;
      swatch.style.setProperty("--swatch-color", color);
      swatch.dataset.hex = color.toUpperCase();
      swatch.setAttribute("aria-label", `Palette color ${index + 1}: ${color}`);
      swatch.addEventListener("click", () => focusColorInput(index));

      const hexLabel = document.createElement("span");
      hexLabel.className = "swatch-hex-label";
      hexLabel.textContent = color.toUpperCase();
      swatch.appendChild(hexLabel);

      const lockBtn = document.createElement("button");
      lockBtn.type = "button";
      lockBtn.className = "ps-lock-btn";
      lockBtn.setAttribute("aria-label", isLocked ? "Unlock color" : "Lock color");
      lockBtn.innerHTML = isLocked ? LOCK_SVG : UNLOCK_SVG;
      lockBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleLock(index);
      });
      swatch.appendChild(lockBtn);

      previewEl.appendChild(swatch);

      const control = document.createElement("label");
      control.className = "palette-studio-control";
      control.innerHTML = `
        <span>Color ${index + 1}</span>
        <input type="color" value="${color}" aria-label="Change palette color ${index + 1}">
        <code>${color.toUpperCase()}</code>
      `;
      const input = control.querySelector("input");
      const code = control.querySelector("code");
      input.addEventListener("input", () => {
        colors[index] = input.value;
        code.textContent = input.value.toUpperCase();
        currentMood = "Custom palette";
        statusEl.textContent = "Your palette is updating live.";
        renderPreviewOnly();
      });
      controlsEl.appendChild(control);
    });
  }

  function renderPreviewOnly() {
    moodEl.textContent = currentMood;
    [...previewEl.children].forEach((swatch, index) => {
      swatch.style.setProperty("--swatch-color", colors[index]);
      swatch.dataset.hex = colors[index].toUpperCase();
      swatch.setAttribute("aria-label", `Palette color ${index + 1}: ${colors[index]}`);
      const hexLabel = swatch.querySelector(".swatch-hex-label");
      if (hexLabel) hexLabel.textContent = colors[index].toUpperCase();
    });
  }

  function focusColorInput(index) {
    const input = controlsEl.querySelectorAll("input")[index];
    if (input) input.focus();
  }

  function randomizePalette() {
    const preset = presets[Math.floor(Math.random() * presets.length)];
    const newColors = preset.colors.map((c) => shiftColor(c, Math.floor(Math.random() * 23) - 11));
    colors = colors.map((c, i) => lockedIndices.has(i) ? c : newColors[i]);
    currentMood = lockedIndices.size === 0 ? preset.mood : "Custom palette";
    statusEl.textContent = lockedIndices.size > 0
      ? `Shuffled ${colors.length - lockedIndices.size} colors — ${lockedIndices.size} kept.`
      : "Fresh palette loaded. Lock your favorites, then shuffle the rest.";
    renderStudio();
  }

  function shiftColor(hex, amount) {
    const channels = hex.replace("#", "").match(/.{2}/g).map((value) => parseInt(value, 16));
    const shifted = channels.map((channel) => {
      const next = Math.max(0, Math.min(255, channel + amount));
      return next.toString(16).padStart(2, "0");
    });
    return `#${shifted.join("")}`;
  }

  async function copyPalette() {
    const text = colors.map((c) => c.toUpperCase()).join("  ");
    try {
      await navigator.clipboard.writeText(text);
      statusEl.textContent = "Hex codes copied to clipboard.";
    } catch {
      statusEl.textContent = text;
    }
  }

  async function copyCSSVariables() {
    const lines = colors.map((c, i) => `  --color-${i + 1}: ${c.toUpperCase()};`).join("\n");
    const text = `:root {\n${lines}\n}`;
    try {
      await navigator.clipboard.writeText(text);
      statusEl.textContent = "CSS variables copied — paste into your stylesheet.";
    } catch {
      statusEl.textContent = text;
    }
  }

  randomizeBtn.addEventListener("click", randomizePalette);
  copyBtn.addEventListener("click", copyPalette);
  if (cssBtn) cssBtn.addEventListener("click", copyCSSVariables);
  renderStudio();
}
