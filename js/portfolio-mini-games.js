document.addEventListener("DOMContentLoaded", () => {
  initializePaletteOracle();
  initializePaletteStudio();
  initializeSandCanvas();
});

const EXTRA_PALETTES = [
  { title: "Moss Archive", story: "Cream paper, mineral blues, softened teal, and a deep forest frame.", colors: ["#F7F1D5", "#88AFAE", "#67AEDF", "#3F5F8E", "#15283E"] },
  { title: "Lichen Study", story: "Aged paper, airy cyan, lichen yellow-green, and muted field notes.", colors: ["#F8F3DD", "#B9DDE5", "#C7C58A", "#A2A866", "#5C919B"] },
  { title: "Kiln Garden", story: "Cream slip, moss glaze, fired rust, and dark botanical edges.", colors: ["#F6EFD4", "#A9B76F", "#7F8C45", "#BE644C", "#6E281B"] },
  { title: "Olive Nocturne", story: "Moonlit cream, antique olive, dark leaves, and walnut shadow.", colors: ["#F4EDCF", "#B9C995", "#849B59", "#546538", "#20170B"] },
  { title: "Moonlit Conservatory", story: "Pale parchment, aqua glass, dusty rose, and violet night plants.", colors: ["#FBF6DE", "#7ED6D3", "#59A9A4", "#E9A7AF", "#171126"] },
  { title: "Pressed Petals", story: "Cream herbarium paper, teal stems, pressed pink, and rose shadow.", colors: ["#FAF4DA", "#7DD7D2", "#5BAAA5", "#E9A7AF", "#AC5F6B"] },
  { title: "Fern & Ink", story: "Graphite green, pistachio light, ink-dark fern, and old notebook cream.", colors: ["#F5EED1", "#BBCB92", "#82985A", "#596B3D", "#08090B"] },
  { title: "Cold Lake Field Notes", story: "Lake blues, fogged paper, and quiet natural-history neutrals.", colors: ["#F8F2D7", "#B6D9D5", "#84AEAA", "#67AEDF", "#3F5F8E"] },
  { title: "Rust Botany", story: "Botanical greens warmed by rust pins, clay notes, and cream margins.", colors: ["#F6F0D7", "#C3C784", "#9FA75F", "#C4664C", "#762C1E"] },
  { title: "Twilight Herbarium", story: "Aqua glass, pressed rose, violet ink, and a near-black evening base.", colors: ["#FFF9E1", "#7ED3D1", "#E7A4B1", "#453C72", "#100B1F"] },
  { title: "Amber Atlas", story: "Map-paper neutrals, old ink, amber roads, and deep ocean pins.", colors: ["#2f1b12", "#7c3f1d", "#d99a3d", "#f5e6c8", "#0f4c5c"] },
  { title: "Blue Hour Letter", story: "Soft evening paper, fountain pen blue, and the last warm window light.", colors: ["#0f172a", "#1d4ed8", "#93c5fd", "#f8fafc", "#f59e0b"] },
  { title: "Apricot Circuit", story: "Warm product light wrapped around crisp code and quiet hardware gray.", colors: ["#1f2937", "#475569", "#ffb703", "#fb8500", "#fff7ed"] },
  { title: "Forest Archive", story: "A library corner of moss greens, aged paper, and polished wood.", colors: ["#1b4332", "#40916c", "#95d5b2", "#f1faee", "#7f4f24"] },
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
  const allPalettes = [...basePalettes, ...EXTRA_PALETTES].map((palette, index) => {
    const answerIdx = pickBestAnswerIndex(palette.colors, index);
    const answer = palette.answer || palette.colors[answerIdx];
    return {
      title: palette.title,
      story: palette.story,
      colors: palette.colors,
      answer,
      decoys: getDecoyColors(answer, index, palette.colors)
    };
  });

  return allPalettes.slice(0, 100);
}

function createStudioPresets(basePresets) {
  const inspirationPresets = [
    {
      mood: "Moss Archive",
      colors: ["#F7F1D5", "#D8D2AA", "#AFA77C", "#88AFAE", "#5F8D88", "#486F76", "#2B4B63", "#15283E"]
    },
    {
      mood: "Lichen Study",
      colors: ["#F8F3DD", "#DED7B7", "#C7C58A", "#A2A866", "#7A8440", "#B9DDE5", "#7FB5BF", "#5C919B"]
    },
    {
      mood: "Kiln Garden",
      colors: ["#F6EFD4", "#D7CDA8", "#B8AA78", "#A9B76F", "#7F8C45", "#BE644C", "#963F2D", "#6E281B"]
    },
    {
      mood: "Olive Nocturne",
      colors: ["#F4EDCF", "#D4CBA4", "#AFA67C", "#B9C995", "#849B59", "#546538", "#263317", "#20170B"]
    },
    {
      mood: "Moonlit Conservatory",
      colors: ["#FBF6DE", "#DDD8B8", "#BDB98B", "#7ED6D3", "#59A9A4", "#448C88", "#463D72", "#171126"]
    },
    {
      mood: "Pressed Petals",
      colors: ["#FAF4DA", "#DED8B7", "#BDB98A", "#7DD7D2", "#5BAAA5", "#E9A7AF", "#CA7D89", "#AC5F6B"]
    },
    {
      mood: "Fern & Ink",
      colors: ["#F5EED1", "#D3CAA2", "#B1A77B", "#BBCB92", "#82985A", "#596B3D", "#253315", "#08090B"]
    },
    {
      mood: "Cold Lake Field Notes",
      colors: ["#F8F2D7", "#DCD6B5", "#BDB687", "#B6D9D5", "#84AEAA", "#6A918C", "#67AEDF", "#3F5F8E"]
    },
    {
      mood: "Rust Botany",
      colors: ["#F6F0D7", "#DCD4AF", "#C3C784", "#9FA75F", "#777F3F", "#C4664C", "#96422F", "#762C1E"]
    },
    {
      mood: "Twilight Herbarium",
      colors: ["#FFF9E1", "#E2DDBB", "#C4BD8E", "#7ED3D1", "#58AAA7", "#E7A4B1", "#453C72", "#100B1F"]
    }
  ];
  const extra = EXTRA_PALETTES.map((palette) => ({
    mood: palette.title,
    colors: palette.colors
  }));

  return [...basePresets, ...inspirationPresets, ...extra].slice(0, 100);
}

function getDecoyColors(answer, offset, paletteColors = []) {
  function rgbDist(a, b) {
    const ra = parseInt(a.slice(1, 3), 16), ga = parseInt(a.slice(3, 5), 16), ba = parseInt(a.slice(5, 7), 16);
    const rb = parseInt(b.slice(1, 3), 16), gb = parseInt(b.slice(3, 5), 16), bb = parseInt(b.slice(5, 7), 16);
    return Math.sqrt((ra - rb) ** 2 + (ga - gb) ** 2 + (ba - bb) ** 2);
  }

  const naturalDecoys = [
    "#3f2a1d", "#7c4a2d", "#c56a43", "#e8b86d", "#f6dfb8",
    "#2f3e2f", "#5f7f52", "#9caf88", "#d8d2a6", "#f4ead5",
    "#12372a", "#2f6f5e", "#7fb7a3", "#cfe8d8", "#f8f0dc",
    "#1d3557", "#457b9d", "#a8dadc", "#e8eef2", "#f2d7c4",
    "#35243a", "#6d4c73", "#b58bbd", "#ead7e9", "#f7efe5",
    "#5a1f1f", "#9b3d2e", "#d9825b", "#f1c8a8", "#fff3df",
    "#2b2b2b", "#6b625a", "#a99a88", "#ded2bf", "#f7f1e6",
    "#254441", "#5b8c7a", "#b7b095", "#e6d5a8", "#fff8dc"
  ];

  const disallowed = new Set(paletteColors.map((color) => color.toLowerCase()));
  const candidates = naturalDecoys.filter((color) => {
    const lower = color.toLowerCase();
    if (lower === answer.toLowerCase() || disallowed.has(lower)) return false;
    if (rgbDist(color, answer) < 105) return false;
    return paletteColors.every((paletteColor) => rgbDist(color, paletteColor) > 46);
  });

  const rotated = [
    ...candidates.slice(offset % Math.max(1, candidates.length)),
    ...candidates.slice(0, offset % Math.max(1, candidates.length))
  ];

  const picked = [];
  for (const color of rotated) {
    if (picked.length >= 3) break;
    if (picked.every((selected) => rgbDist(color, selected) > 82)) {
      picked.push(color);
    }
  }

  if (picked.length < 3) {
    for (const color of naturalDecoys) {
      if (picked.length >= 3) break;
      if (color.toLowerCase() !== answer.toLowerCase() && picked.every((selected) => rgbDist(color, selected) > 70)) {
        picked.push(color);
      }
    }
  }

  return picked.slice(0, 3);
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
      decoys: ["#bfdbfe", "#93c5fd", "#94a3b8"]
    },
    {
      title: "Ceramic Earth",
      story: "Warm clay, fired edges, and a studio table covered in dust and sunlight.",
      colors: ["#3b2417", "#8a4f2a", "#d7a36a", "#f4e0bd", "#6f7d4f"],
      answer: "#d7a36a",
      decoys: ["#e2a97e", "#c49450", "#b87355"]
    },
    {
      title: "Sunset Logo",
      story: "The portfolio mark translated into flame, ember, red, and soft cream.",
      colors: ["#941b0c", "#c24118", "#ffad1f", "#fff7ed", "#4a1309"],
      answer: "#ffad1f",
      decoys: ["#fbbf24", "#fb923c", "#f59e0b"]
    },
    {
      title: "Digital Garden",
      story: "Interface blues and leafy greens for systems that feel alive.",
      colors: ["#052e2f", "#0e7490", "#84cc16", "#e6f4d7", "#f59e0b"],
      answer: "#84cc16",
      decoys: ["#a3e635", "#65a30d", "#4ade80"]
    },
    {
      title: "Reverie Room",
      story: "A soft interior palette for memory, mood boards, and quiet reflection.",
      colors: ["#312e81", "#818cf8", "#f0abfc", "#f8fafc", "#f59e0b"],
      answer: "#f0abfc",
      decoys: ["#e879f9", "#d8b4fe", "#f9a8d4"]
    },
    {
      title: "Hackathon Night",
      story: "Deep focus blues, terminal glow, and one warm spark for late-build energy.",
      colors: ["#020617", "#0b1322", "#06b6d4", "#dbeafe", "#ffad1f"],
      answer: "#06b6d4",
      decoys: ["#22d3ee", "#0891b2", "#38bdf8"]
    },
    {
      title: "Clay Kiln",
      story: "A fired ceramic palette with oxides, ash, and a soft glaze highlight.",
      colors: ["#2f1b12", "#7f341b", "#b85c38", "#ead2b1", "#2f3e46"],
      answer: "#b85c38",
      decoys: ["#c2410c", "#92400e", "#d97706"]
    },
    {
      title: "Gallery Wall",
      story: "Clean wall space, dark frames, warm track lights, and a quiet accent.",
      colors: ["#fffaf4", "#eadfce", "#2a120c", "#b23600", "#7c8a5d"],
      answer: "#eadfce",
      decoys: ["#fef3c7", "#f5e6c8", "#e7d5be"]
    },
    {
      title: "Code Bloom",
      story: "A product palette where system blues meet botanical growth and sunlight.",
      colors: ["#0f172a", "#0e7490", "#2dd4bf", "#d9f99d", "#fbbf24"],
      answer: "#2dd4bf",
      decoys: ["#34d399", "#22d3ee", "#5eead4"]
    },
    {
      title: "Paint Water",
      story: "Cloudy rinse water, pigment blooms, paper cream, and one decisive red.",
      colors: ["#172554", "#64748b", "#cbd5e1", "#fff7ed", "#941b0c"],
      answer: "#64748b",
      decoys: ["#94a3b8", "#475569", "#6b7280"]
    },
    {
      title: "Resume Ink",
      story: "Professional, readable, and a little warm around the edges.",
      colors: ["#111827", "#374151", "#f8fafc", "#f2d6a1", "#850f01"],
      answer: "#374151",
      decoys: ["#1f2937", "#4b5563", "#334155"]
    },
    {
      title: "Ghibli Guard",
      story: "Soft greens, storybook sky, warm lantern light, and protective shadow.",
      colors: ["#12372a", "#436850", "#adbc9f", "#fbfada", "#f59e0b"],
      answer: "#adbc9f",
      decoys: ["#c4d4ae", "#91a882", "#b5c9a0"]
    },
    {
      title: "Print Studio",
      story: "Ink, paper grain, registration marks, and a punchy poster accent.",
      colors: ["#111111", "#f5f1e8", "#d6c6a8", "#e11d48", "#2563eb"],
      answer: "#e11d48",
      decoys: ["#be123c", "#f43f5e", "#dc2626"]
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
    statusEl.textContent   = "Tap or drag the distinct swatch that completes this natural mood palette.";
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
      window.SFX?.oracleCorrect();
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
      window.SFX?.oracleWrong();
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
      window.SFX?.advance();
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
    if (typeof window.showGameComplete === 'function') {
      window.setTimeout(() => window.showGameComplete('oracle', { score: correct }), 700);
    }
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
      window.SFX?.unlock();
      statusEl.textContent = "Color unlocked — Surprise Me will shuffle it.";
    } else {
      lockedIndices.add(index);
      window.SFX?.lock();
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
    window.SFX?.shuffle();
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
    window.SFX?.copy();
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

// ═══════════════════════════════════════════════════════════════
//  SAND CANVAS  —  cellular-automata sand physics + 3D grain shading
// ═══════════════════════════════════════════════════════════════
function initializeSandCanvas() {
  const canvas    = document.getElementById('ss-canvas');
  const stripEl   = document.getElementById('ss-strip');
  const stripWrap = document.getElementById('ss-strip-wrap');
  const thumbEl   = document.getElementById('ss-thumb');
  const swatchEl  = document.getElementById('ss-swatch');
  const hintEl    = document.getElementById('ss-hint');
  const presetsEl = document.getElementById('ss-presets');
  const clearBtn    = document.getElementById('ss-clear');
  const shakeBtn    = document.getElementById('ss-shake');
  const flowRange   = document.getElementById('ss-flow');
  const addBtn      = document.getElementById('ss-add');
  const downloadBtn = document.getElementById('ss-download');
  const palEl       = document.getElementById('ss-custom-palette');
  const singleModeBtn   = document.getElementById('ss-mode-single');
  const gradientModeBtn = document.getElementById('ss-mode-gradient');
  const modeHintEl      = document.getElementById('ss-mode-hint');
  const currentLabelEl  = document.getElementById('ss-current-label');
  const flowValueEl     = document.getElementById('ss-flow-value');
  if (!canvas || !stripEl) return;

  // ── Grid constants ───────────────────────────────────────────
  const CELL = 2;           // pixels per grid cell
  const CW = 560, CH = 500; // canvas pixel dimensions
  canvas.width = CW; canvas.height = CH;
  const GW = CW / CELL;     // 280 grid columns
  const GH = CH / CELL;     // 250 grid rows

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  // grid stores packed ABGR (0 = empty). One Uint32 per cell.
  const grid = new Uint32Array(GW * GH);
  const imgData = ctx.createImageData(CW, CH);
  const pixBuf  = new Uint32Array(imgData.data.buffer);
  const BG      = 0xFFE0F7FF; // #fff7e0, packed ABGR

  // ── State ────────────────────────────────────────────────────
  let isPouring = false;
  let continuousPouring = false;
  let lastTapTime = 0;
  const DOUBLE_TAP_MS = 280;
  let lastGX = -1, lastGY = -1;
  let brushSize = 4;
  let frame = 0;
  let hasSand = false;
  let shakeFrames = 0;
  let gradientPhase = 0;
  let gradientDir = 1;
  const GRADIENT_SPEED = 0.0025;
  let cr = 194, cg = 74, cb = 55; // current RGB (default: terracotta)
  let pourMode = 'single';

  // ── Colour helpers ───────────────────────────────────────────
  function clamp(v)       { return v < 0 ? 0 : v > 255 ? 255 : v; }
  function pack(r, g, b)  { return (0xFF << 24) | (b << 16) | (g << 8) | r; }
  function shade(c, f) {   // brighten/darken a packed ABGR pixel
    return pack(
      clamp(Math.round((c & 0xFF) * f)),
      clamp(Math.round(((c >> 8)  & 0xFF) * f)),
      clamp(Math.round(((c >> 16) & 0xFF) * f))
    );
  }
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  }
  function hexToRgb(hex) {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16)
    ];
  }
  function mixColor(a, b, t) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * t),
      Math.round(a[1] + (b[1] - a[1]) * t),
      Math.round(a[2] + (b[2] - a[2]) * t)
    ];
  }

  // ── 2D colour map ────────────────────────────────────────────
  // X axis: full hue spectrum (0–360°)
  // Y axis: white (top) → vivid (middle) → black (bottom)
  // Right 40px column: white → grey → black (neutral tones)
  const STRIP_W = 800;
  const STRIP_H = 200;
  stripEl.width  = STRIP_W;
  stripEl.height = STRIP_H;

  (function buildStrip() {
    const sc   = stripEl.getContext('2d', { willReadFrequently: true });
    const GS_W = 40; // grayscale column width
    const SP_W = STRIP_W - GS_W;

    // Base: full vivid hue spectrum across the whole area
    const hueGrad = sc.createLinearGradient(0, 0, SP_W, 0);
    for (let h = 0; h <= 360; h += 4) {
      hueGrad.addColorStop(h / 360, `hsl(${h},100%,50%)`);
    }
    sc.fillStyle = hueGrad;
    sc.fillRect(0, 0, SP_W, STRIP_H);

    // White veil: opaque at top → transparent at midpoint
    const whiteGrad = sc.createLinearGradient(0, 0, 0, STRIP_H);
    whiteGrad.addColorStop(0,    'rgba(255,255,255,1)');
    whiteGrad.addColorStop(0.48, 'rgba(255,255,255,0)');
    sc.fillStyle = whiteGrad;
    sc.fillRect(0, 0, SP_W, STRIP_H);

    // Black veil: transparent at midpoint → opaque at bottom
    const blackGrad = sc.createLinearGradient(0, 0, 0, STRIP_H);
    blackGrad.addColorStop(0.52, 'rgba(0,0,0,0)');
    blackGrad.addColorStop(1,    'rgba(0,0,0,1)');
    sc.fillStyle = blackGrad;
    sc.fillRect(0, 0, SP_W, STRIP_H);

    // Grayscale column (right): white → mid-grey → black
    const gsGrad = sc.createLinearGradient(0, 0, 0, STRIP_H);
    gsGrad.addColorStop(0,    '#ffffff');
    gsGrad.addColorStop(0.5,  '#808080');
    gsGrad.addColorStop(1,    '#000000');
    sc.fillStyle = gsGrad;
    sc.fillRect(SP_W, 0, GS_W, STRIP_H);

    // Subtle divider
    sc.fillStyle = 'rgba(255,255,255,0.15)';
    sc.fillRect(SP_W, 0, 1, STRIP_H);
  })();

  function sampleStrip(ex, ey) {
    // ex/ey are CSS pixel offsets from the top-left corner of stripWrap
    const sw = stripWrap.clientWidth;
    const sh = stripWrap.clientHeight;
    const px = Math.round(Math.max(0, Math.min(STRIP_W - 1, ex * (STRIP_W / sw))));
    const py = Math.round(Math.max(0, Math.min(STRIP_H - 1, ey * (STRIP_H / sh))));
    const d  = stripEl.getContext('2d').getImageData(px, py, 1, 1).data;
    activeEntryIdx = -1;
    pourMode = 'single';
    window.SFX?.colorPick();
    setColor(d[0], d[1], d[2]);
    thumbEl.style.left = Math.max(0, Math.min(100, (ex / sw) * 100)) + '%';
    thumbEl.style.top  = Math.max(0, Math.min(100, (ey / sh) * 100)) + '%';
  }

  function setColor(r, g, b) {
    cr = r; cg = g; cb = b;
    const rgb = `rgb(${r},${g},${b})`;
    updatePourPreview();
    updatePourControls();
    thumbEl.style.background  = rgb;
    if (currentLabelEl) currentLabelEl.textContent = getNearestColorName(r, g, b);
    if (presetsEl) presetsEl.querySelectorAll('.ss-preset-dot').forEach(d => d.classList.remove('active'));
    if (palEl)     palEl.querySelectorAll('.ss-pal-slot').forEach(s => s.classList.remove('active'));
  }

  // ── Preset palette dots ──────────────────────────────────────
  const PRESETS = [
    { name: 'Terracotta', r: 194, g: 74,  b: 55  },
    { name: 'Parchment',  r: 247, g: 241, b: 213 },
    { name: 'Lake Blue',  r: 103, g: 174, b: 223 },
    { name: 'Moss',       r: 127, g: 140, b: 69  },
    { name: 'Lichen',     r: 185, g: 201, b: 149 },
    { name: 'Sea Glass',  r: 126, g: 211, b: 209 },
    { name: 'Dusty Rose', r: 233, g: 167, b: 177 },
    { name: 'Rust Clay',  r: 196, g: 102, b: 76  },
    { name: 'Olive Ink',  r: 38,  g: 51,  b: 23  },
    { name: 'Violet Dusk', r: 69, g: 60,  b: 114 },
    { name: 'Night Plum', r: 16,  g: 11,  b: 31  },
    { name: 'Cobalt',     r: 37,  g: 99,  b: 235 },
    { name: 'Amber',      r: 245, g: 158, b: 11  },
  ];

  function getNearestColorName(r, g, b) {
    let best = PRESETS[0];
    let bestDist = Infinity;
    PRESETS.forEach((preset) => {
      const dist = (preset.r - r) ** 2 + (preset.g - g) ** 2 + (preset.b - b) ** 2;
      if (dist < bestDist) {
        best = preset;
        bestDist = dist;
      }
    });
    return best ? best.name : 'Custom';
  }

  if (presetsEl) {
    PRESETS.forEach((p) => {
      const dot = document.createElement('button');
      dot.className = 'ss-preset-dot';
      dot.title = p.name;
      dot.setAttribute('aria-label', p.name);
      dot.style.background = `rgb(${p.r},${p.g},${p.b})`;
      dot.addEventListener('click', () => {
        activeEntryIdx = -1;
        pourMode = 'single';
        window.SFX?.colorPick();
        setColor(p.r, p.g, p.b);
        dot.classList.add('active');
        thumbEl.style.background = swatchEl.style.background;
      });
      presetsEl.appendChild(dot);
    });
  }

  // ── Custom palette ───────────────────────────────────────────
  const paletteEntries = []; // { type:'single', hex } | { type:'gradient', colors:[] }
  const gradientBuilder = [];
  let activeEntryIdx = -1;
  const MAX_PAL = 24;

  function getActivePourColors() {
    if (pourMode === 'gradient' && activeEntryIdx >= 0) {
      const e = paletteEntries[activeEntryIdx];
      if (e && e.type === 'gradient' && e.colors.length > 1) return e.colors;
    }
    return [rgbToHex(cr, cg, cb)];
  }

  function updatePourControls() {
    const activeEntry = activeEntryIdx >= 0 ? paletteEntries[activeEntryIdx] : null;
    const canGradient = activeEntry?.type === 'gradient' && activeEntry.colors.length > 1;
    if (!canGradient && pourMode === 'gradient') pourMode = 'single';

    singleModeBtn?.classList.toggle('is-active', pourMode === 'single');
    gradientModeBtn?.classList.toggle('is-active', pourMode === 'gradient');
    singleModeBtn?.setAttribute('aria-pressed', String(pourMode === 'single'));
    gradientModeBtn?.setAttribute('aria-pressed', String(pourMode === 'gradient'));
    if (gradientModeBtn) gradientModeBtn.disabled = !canGradient;

    if (modeHintEl) {
      if (pourMode === 'gradient' && activeEntry) {
        modeHintEl.innerHTML = `<strong>Gradient mode:</strong> cycling ${activeEntry.colors.length} colours — forward then back. Double-tap canvas to lock the pour.`;
      } else if (canGradient) {
        modeHintEl.innerHTML = `<strong>Single mode.</strong> Click a gradient swatch to cycle its colours. Double-tap canvas to lock the pour.`;
      } else {
        modeHintEl.textContent = 'Pick a colour and pour. Use + to save singles, → to build gradients. Double-tap canvas to lock the pour.';
      }
    }
  }

  function updatePourPreview() {
    if (!swatchEl) return;
    const colors = getActivePourColors();
    swatchEl.classList.toggle('ss-swatch-gradient', colors.length > 1);
    if (colors.length > 1) {
      swatchEl.style.background = `linear-gradient(135deg, ${colors.join(', ')})`;
      swatchEl.title = 'Gradient pour from My Palette';
      if (currentLabelEl) currentLabelEl.textContent = 'Gradient';
    } else {
      swatchEl.style.background = colors[0];
      swatchEl.title = 'Drag to My Palette · or click + below';
    }
  }

  function samplePourColor() {
    const colors = getActivePourColors();
    if (colors.length === 1) return hexToRgb(colors[0]);

    const n = colors.length;
    const scaled = gradientPhase * (n - 1);
    const i = Math.min(Math.floor(scaled), n - 2);
    const frac = scaled - i;
    const base = mixColor(hexToRgb(colors[i]), hexToRgb(colors[i + 1]), frac);
    const v = Math.round((Math.random() - 0.5) * 14);
    return [clamp(base[0] + v), clamp(base[1] + v), clamp(base[2] + v)];
  }

  function renderPaletteArea() {
    // ── Gradient builder section ──
    const builderSection = document.getElementById('ss-grad-builder-section');
    const slotsEl = document.getElementById('ss-grad-slots');
    const saveGradBtn = document.getElementById('ss-save-grad');
    if (builderSection && slotsEl) {
      builderSection.style.display = gradientBuilder.length > 0 ? '' : 'none';
      slotsEl.innerHTML = '';
      gradientBuilder.forEach((hex, i) => {
        const dot = document.createElement('div');
        dot.className = 'ss-grad-color-dot';
        dot.style.background = hex;
        dot.title = hex;
        const rm = document.createElement('button');
        rm.className = 'ss-pal-remove';
        rm.innerHTML = '&times;';
        rm.setAttribute('aria-label', 'Remove');
        rm.addEventListener('click', () => { gradientBuilder.splice(i, 1); renderPaletteArea(); });
        dot.appendChild(rm);
        slotsEl.appendChild(dot);
      });
      if (gradientBuilder.length >= 2) {
        const preview = document.createElement('div');
        preview.className = 'ss-grad-preview';
        preview.style.background = `linear-gradient(90deg, ${gradientBuilder.join(', ')})`;
        slotsEl.appendChild(preview);
      }
    }
    if (saveGradBtn) saveGradBtn.disabled = gradientBuilder.length < 2;

    // ── Palette entries ──
    if (!palEl) return;
    palEl.innerHTML = '';
    palEl.classList.toggle('has-gradient', paletteEntries.some(e => e.type === 'gradient'));
    updatePourControls();
    if (paletteEntries.length === 0) {
      const hint = document.createElement('span');
      hint.className = 'ss-pal-hint';
      hint.textContent = 'your saved colours will appear here';
      palEl.appendChild(hint);
      updatePourPreview();
      return;
    }
    paletteEntries.forEach((entry, i) => {
      if (entry.type === 'single') {
        const slot = document.createElement('button');
        slot.className = 'ss-pal-slot';
        if (activeEntryIdx === i && pourMode === 'single') slot.classList.add('active');
        slot.style.background = entry.hex;
        slot.title = entry.hex;
        const rm = document.createElement('button');
        rm.className = 'ss-pal-remove';
        rm.innerHTML = '&times;';
        rm.setAttribute('aria-label', 'Remove');
        rm.addEventListener('click', e => {
          e.stopPropagation();
          paletteEntries.splice(i, 1);
          if (activeEntryIdx === i) { activeEntryIdx = -1; pourMode = 'single'; }
          else if (activeEntryIdx > i) activeEntryIdx--;
          renderPaletteArea();
        });
        slot.appendChild(rm);
        slot.addEventListener('click', () => {
          activeEntryIdx = i;
          pourMode = 'single';
          const [r, g, b] = hexToRgb(entry.hex);
          cr = r; cg = g; cb = b;
          thumbEl.style.background = entry.hex;
          if (currentLabelEl) currentLabelEl.textContent = getNearestColorName(r, g, b);
          updatePourPreview();
          updatePourControls();
          palEl.querySelectorAll('.ss-pal-slot').forEach(s => s.classList.remove('active'));
          slot.classList.add('active');
        });
        palEl.appendChild(slot);
      } else {
        const gradSlot = document.createElement('button');
        gradSlot.className = 'ss-pal-slot ss-pal-gradient-slot';
        if (activeEntryIdx === i && pourMode === 'gradient') gradSlot.classList.add('active');
        gradSlot.style.background = `linear-gradient(90deg, ${entry.colors.join(', ')})`;
        gradSlot.title = `Gradient · ${entry.colors.length} colours`;
        const rm = document.createElement('button');
        rm.className = 'ss-pal-remove';
        rm.innerHTML = '&times;';
        rm.setAttribute('aria-label', 'Remove gradient');
        rm.addEventListener('click', e => {
          e.stopPropagation();
          paletteEntries.splice(i, 1);
          if (activeEntryIdx === i) { activeEntryIdx = -1; pourMode = 'single'; }
          else if (activeEntryIdx > i) activeEntryIdx--;
          renderPaletteArea();
          updatePourPreview();
        });
        gradSlot.appendChild(rm);
        gradSlot.addEventListener('click', () => {
          activeEntryIdx = i;
          pourMode = 'gradient';
          gradientPhase = 0;
          gradientDir = 1;
          updatePourPreview();
          updatePourControls();
          palEl.querySelectorAll('.ss-pal-slot').forEach(s => s.classList.remove('active'));
          gradSlot.classList.add('active');
        });
        palEl.appendChild(gradSlot);
      }
    });
    updatePourPreview();
  }
  const renderPalette = renderPaletteArea; // alias for any remaining calls

  function addCurrentAsSingle() {
    const hex = rgbToHex(cr, cg, cb);
    if (paletteEntries.some(e => e.type === 'single' && e.hex === hex)) return;
    if (paletteEntries.length >= MAX_PAL) return;
    paletteEntries.push({ type: 'single', hex });
    window.SFX?.paletteSave();
    renderPaletteArea();
  }

  function addToGradientBuilder() {
    const hex = rgbToHex(cr, cg, cb);
    if (gradientBuilder.includes(hex) || gradientBuilder.length >= 8) return;
    gradientBuilder.push(hex);
    window.SFX?.gradientAdd();
    renderPaletteArea();
  }

  function saveGradientEntry() {
    if (gradientBuilder.length < 2) return;
    paletteEntries.push({ type: 'gradient', colors: [...gradientBuilder] });
    gradientBuilder.length = 0;
    window.SFX?.gradientSave();
    renderPaletteArea();
  }

  // Drag from swatch → drop onto palette
  if (swatchEl) {
    swatchEl.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', rgbToHex(cr, cg, cb));
      e.dataTransfer.effectAllowed = 'copy';
      swatchEl.classList.add('ss-dragging');
    });
    swatchEl.addEventListener('dragend', () => swatchEl.classList.remove('ss-dragging'));
  }

  if (palEl) {
    palEl.addEventListener('dragover',  e => { e.preventDefault(); palEl.classList.add('drag-over'); });
    palEl.addEventListener('dragleave', ()  => palEl.classList.remove('drag-over'));
    palEl.addEventListener('drop', e => {
      e.preventDefault();
      palEl.classList.remove('drag-over');
      const hex = e.dataTransfer.getData('text/plain');
      if (/^#[0-9a-f]{6}$/i.test(hex) && !paletteEntries.some(en => en.type === 'single' && en.hex === hex) && paletteEntries.length < MAX_PAL) {
        paletteEntries.push({ type: 'single', hex });
        renderPaletteArea();
      }
    });
  }

  singleModeBtn?.addEventListener('click', () => {
    pourMode = 'single';
    updatePourPreview();
    updatePourControls();
  });

  gradientModeBtn?.addEventListener('click', () => {
    if (!(activeEntryIdx >= 0 && paletteEntries[activeEntryIdx]?.type === 'gradient')) return;
    pourMode = 'gradient';
    updatePourPreview();
    updatePourControls();
  });

  addBtn && addBtn.addEventListener('click', addCurrentAsSingle);
  document.getElementById('ss-add-grad')?.addEventListener('click', addToGradientBuilder);
  document.getElementById('ss-save-grad')?.addEventListener('click', saveGradientEntry);
  renderPaletteArea();

  // ── Pouring ──────────────────────────────────────────────────
  function toGrid(clientX, clientY) {
    const r = canvas.getBoundingClientRect();
    return [
      Math.floor(((clientX - r.left)  / r.width)  * GW),
      Math.floor(((clientY - r.top)   / r.height) * GH)
    ];
  }

  function pourAt(gx, gy) {
    const r = brushSize;
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        const dist = dx*dx + dy*dy;
        if (dist > r*r + 0.5) continue;
        const falloff = 1 - Math.sqrt(dist) / (r + 0.6);
        if (Math.random() > 0.68 + falloff * 0.22) continue;
        const nx = gx + dx, ny = gy + dy;
        if (nx < 0 || nx >= GW || ny < 0 || ny >= GH || grid[ny*GW+nx]) continue;
        const [sr, sg, sb] = samplePourColor();
        const v = Math.round((Math.random() - 0.5) * 18);
        grid[ny*GW+nx] = pack(clamp(sr+v), clamp(sg+v), clamp(sb+v));
      }
    }
    if (!hasSand) { hasSand = true; hintEl && hintEl.classList.add('gone'); }
  }

  function pourLine(x0, y0, x1, y1) {
    const dx = x1-x0, dy = y1-y0;
    const steps = Math.max(Math.abs(dx), Math.abs(dy)) * 1.65;
    if (!steps) { pourAt(x0, y0); return; }
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      pourAt(Math.round(x0 + dx*t), Math.round(y0 + dy*t));
    }
  }

  // ── Physics update ───────────────────────────────────────────
  // Classic bottom-to-top falling sand with alternating direction to prevent drift.
  function update() {
    // Shake mode: randomly nudge grains sideways
    if (shakeFrames > 0) {
      shakeFrames--;
      for (let i = 0; i < GW*GH; i++) {
        if (!grid[i] || Math.random() > 0.05) continue;
        const y = Math.floor(i / GW), x = i % GW;
        const nx = x + Math.round((Math.random() - 0.5) * 6);
        if (nx >= 0 && nx < GW && !grid[y*GW+nx]) {
          grid[y*GW+nx] = grid[i]; grid[i] = 0;
        }
      }
    }

    // Gravity pass — alternate scan direction each frame for natural spreading
    const dir = frame % 2 ? 1 : -1;
    for (let y = GH - 2; y >= 0; y--) {
      for (let xi = 0; xi < GW; xi++) {
        const x = dir === 1 ? xi : GW - 1 - xi;
        const idx = y*GW + x;
        if (!grid[idx]) continue;

        const bIdx = (y+1)*GW + x;
        if (!grid[bIdx]) {
          grid[bIdx] = grid[idx]; grid[idx] = 0; continue;
        }
        // Try diagonal slides — prefer the scan direction for natural pile shapes
        const lx = x - dir, rx = x + dir;
        const lOk = lx >= 0 && lx < GW && !grid[(y+1)*GW+lx];
        const rOk = rx >= 0 && rx < GW && !grid[(y+1)*GW+rx];
        if (lOk && rOk) {
          const tx = Math.random() < 0.5 ? lx : rx;
          grid[(y+1)*GW+tx] = grid[idx]; grid[idx] = 0;
        } else if (lOk) {
          grid[(y+1)*GW+lx] = grid[idx]; grid[idx] = 0;
        } else if (rOk) {
          grid[(y+1)*GW+rx] = grid[idx]; grid[idx] = 0;
        }
      }
    }
  }

  // ── Render ───────────────────────────────────────────────────
  // Each 2×2 cell gets 4 slightly different brightness levels
  // (top-lighter, bottom-darker) giving a subtle 3-D grain look.
  function render() {
    pixBuf.fill(BG);
    for (let y = 0; y < GH; y++) {
      for (let x = 0; x < GW; x++) {
        const c = grid[y*GW + x];
        if (!c) continue;
        const tl = shade(c, 1.22); const tr = shade(c, 1.10);
        const bl = shade(c, 0.86); const br = shade(c, 0.76);
        const base = y*CELL*CW + x*CELL;
        pixBuf[base]         = tl;
        pixBuf[base + 1]     = tr;
        pixBuf[base + CW]    = bl;
        pixBuf[base + CW+1]  = br;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  // ── Main loop ────────────────────────────────────────────────
  function tick() {
    if (isPouring && lastGX >= 0) pourAt(lastGX, lastGY);
    if (pourMode === 'gradient' && getActivePourColors().length > 1) {
      gradientPhase += gradientDir * GRADIENT_SPEED;
      if (gradientPhase >= 1) { gradientPhase = 1; gradientDir = -1; }
      if (gradientPhase <= 0) { gradientPhase = 0; gradientDir = 1; }
    }
    update();
    render();
    frame++;
    requestAnimationFrame(tick);
  }

  // ── Canvas pointer events ────────────────────────────────────
  function updateContinuousIndicator() {
    canvas.parentElement.classList.toggle('is-continuous', continuousPouring);
  }

  function onDown(cx, cy) {
    const now = Date.now();
    if (now - lastTapTime < DOUBLE_TAP_MS) {
      continuousPouring = !continuousPouring;
      lastTapTime = 0;
      isPouring = continuousPouring;
      if (continuousPouring) {
        [lastGX, lastGY] = toGrid(cx, cy);
        window.SFX?.continuousLock();
        window.SFX?.pourStart();
      } else {
        window.SFX?.continuousLock();
        window.SFX?.pourStop();
      }
      updateContinuousIndicator();
      return;
    }
    lastTapTime = now;
    if (continuousPouring) {
      [lastGX, lastGY] = toGrid(cx, cy);
      return;
    }
    isPouring = true;
    [lastGX, lastGY] = toGrid(cx, cy);
    window.SFX?.pourStart();
    pourAt(lastGX, lastGY);
  }
  function onMove(cx, cy) {
    if (!isPouring) return;
    const [gx, gy] = toGrid(cx, cy);
    pourLine(lastGX, lastGY, gx, gy);
    lastGX = gx; lastGY = gy;
  }
  function onUp() {
    if (!continuousPouring) {
      isPouring = false;
      window.SFX?.pourStop();
    }
  }

  canvas.addEventListener('mousedown',  e => onDown(e.clientX, e.clientY));
  canvas.addEventListener('mousemove',  e => onMove(e.clientX, e.clientY));
  canvas.addEventListener('mouseup',    onUp);
  canvas.addEventListener('mouseleave', onUp);
  canvas.addEventListener('touchstart', e => { e.preventDefault(); onDown(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
  canvas.addEventListener('touchmove',  e => { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
  canvas.addEventListener('touchend',   e => { e.preventDefault(); onUp(); }, { passive: false });

  // ── Strip pointer events ─────────────────────────────────────
  let stripActive = false;
  function onStripAt(clientX, clientY) {
    const r = stripWrap.getBoundingClientRect();
    sampleStrip(clientX - r.left, clientY - r.top);
  }
  stripWrap.addEventListener('mousedown',  e => { stripActive = true; onStripAt(e.clientX, e.clientY); });
  window.addEventListener('mousemove',     e => { if (stripActive) onStripAt(e.clientX, e.clientY); });
  window.addEventListener('mouseup',       () => { stripActive = false; });
  stripWrap.addEventListener('touchstart', e => { e.preventDefault(); onStripAt(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
  stripWrap.addEventListener('touchmove',  e => { e.preventDefault(); onStripAt(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });

  // ── Control events ───────────────────────────────────────────
  clearBtn && clearBtn.addEventListener('click', () => {
    window.SFX?.clear();
    grid.fill(0);
    hasSand = false;
    hintEl && hintEl.classList.remove('gone');
  });
  shakeBtn && shakeBtn.addEventListener('click', () => { window.SFX?.shake(); shakeFrames = 55; });
  flowRange && flowRange.addEventListener('input', () => {
    brushSize = +flowRange.value;
    if (flowValueEl) flowValueEl.textContent = String(brushSize);
  });

  downloadBtn && downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'sand-canvas.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    if (hasSand && typeof window.showGameComplete === 'function') {
      window.setTimeout(() => window.showGameComplete('sand'), 600);
    }
  });

  // ── Init: set initial color + start ─────────────────────────
  setColor(cr, cg, cb);
  thumbEl.style.left = '4%';
  thumbEl.style.top  = '50%'; // start at vivid row (midpoint)
  tick();
}
