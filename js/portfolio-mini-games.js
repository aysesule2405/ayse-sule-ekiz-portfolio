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
  { title: "Moonlit Conservatory", story: "Pale parchment, aqua glass, violet night plants, dusty rose, and deep night.", colors: ["#FBF6DE", "#7ED6D3", "#9860B8", "#E9A7AF", "#171126"] },
  { title: "Pressed Petals", story: "Cream herbarium paper, teal stems, soft pressed lavender, and a dried rose.", colors: ["#FAF4DA", "#7DD7D2", "#8858A8", "#E9A7AF", "#AC5F6B"] },
  { title: "Fern & Ink", story: "Graphite green, pistachio light, ink-dark fern, and old notebook cream.", colors: ["#F5EED1", "#BBCB92", "#82985A", "#596B3D", "#08090B"] },
  { title: "Cold Lake Field Notes", story: "Fogged paper, aquamarine wash, lake blue, deep water, and a warm amber specimen pin.", colors: ["#F8F2D7", "#B6D9D5", "#67AEDF", "#3F5F8E", "#C4884A"] },
  { title: "Rust Botany", story: "Botanical greens warmed by rust pins, clay notes, and cream margins.", colors: ["#F6F0D7", "#C3C784", "#9FA75F", "#C4664C", "#762C1E"] },
  { title: "Twilight Herbarium", story: "Aqua glass, pressed rose, violet ink, and a near-black evening base.", colors: ["#FFF9E1", "#7ED3D1", "#E7A4B1", "#453C72", "#100B1F"] },
  { title: "Amber Atlas", story: "Map-paper neutrals, old ink, amber roads, and deep ocean pins.", colors: ["#2f1b12", "#7c3f1d", "#d99a3d", "#f5e6c8", "#0f4c5c"] },
  { title: "Blue Hour Letter", story: "Soft evening paper, fountain pen blue, and the last warm window light.", colors: ["#0f172a", "#1d4ed8", "#93c5fd", "#f8fafc", "#f59e0b"] },
  { title: "Apricot Circuit", story: "Warm product light wrapped around crisp code and quiet hardware gray.", colors: ["#1f2937", "#475569", "#ffb703", "#fb8500", "#fff7ed"] },
  { title: "Forest Archive", story: "A library corner of moss greens, aged paper, and polished wood.", colors: ["#1b4332", "#40916c", "#95d5b2", "#f1faee", "#7f4f24"] },
  { title: "Velvet Debug", story: "Dark editor ground, ember error glow, electric cyan trace, soft violet highlight, and bright white text.", colors: ["#09090b", "#c84b28", "#22d3ee", "#a78bfa", "#f4f4f5"] },
  { title: "Peach Kiln", story: "Peach clay, soft ash, terracotta edges, and sage glaze.", colors: ["#5c2e1f", "#c56a43", "#ffcab0", "#f8ead8", "#7a8f63"] },
  { title: "Rainy Terminal", story: "Terminal greens through rainy glass and midnight blue reflections.", colors: ["#020617", "#064e3b", "#10b981", "#a7f3d0", "#38bdf8"] },
  { title: "Paper Lantern", story: "Cream paper, candle gold, red silk, and dusky violet shadow.", colors: ["#3b0a0a", "#991b1b", "#f59e0b", "#fff7ed", "#6d28d9"] },
  { title: "Ocean Schema", story: "Structured ocean blues, foam white, and a coral annotation.", colors: ["#082f49", "#0369a1", "#7dd3fc", "#f0f9ff", "#fb7185"] },
  { title: "Fig Orchard", story: "Fig skins, garden leaves, cream linen, and ripe amber fruit.", colors: ["#3b0764", "#7e22ce", "#365314", "#fef3c7", "#f59e0b"] },
  { title: "Rose Algorithm", story: "Charcoal type, deep rose, soft pink glass, pale blush, and a precise warm gold accent.", colors: ["#111827", "#be123c", "#fb7185", "#ffe4e6", "#d97706"] },
  { title: "Juniper Notebook", story: "Juniper ink, soft ruled paper, and a brass bookmark.", colors: ["#0f2f2f", "#0f766e", "#99f6e4", "#f8fafc", "#b45309"] },
  { title: "Saffron Graph", story: "Dark axes, mid gray, cool silver, saffron data points, and a teal trend line.", colors: ["#1f2937", "#6b7280", "#e5e7eb", "#f59e0b", "#0ea5e9"] },
  { title: "Lilac Console", story: "Cool console panels softened with lilac, mist, and moon white.", colors: ["#111827", "#4338ca", "#a5b4fc", "#e0e7ff", "#f8fafc"] },
  { title: "Terra Prototype", story: "Grounded terracotta, practical neutrals, and a clean blue action.", colors: ["#431407", "#9a3412", "#fed7aa", "#f5f5f4", "#2563eb"] },
  { title: "Mint Thesis", story: "Dark cover green, bright mint diagram, ivory margins, slate annotation, and warm academic gold.", colors: ["#052e16", "#86efac", "#f7fee7", "#334155", "#d4a040"] },
  { title: "Coral Dataset", story: "Clean data blues with coral outliers and paper-soft highlights.", colors: ["#0f172a", "#0284c7", "#bae6fd", "#fff7ed", "#f97316"] },
  { title: "Plum Interface", story: "A plush dark product palette with plum panels and warm focus rings.", colors: ["#1e1b4b", "#581c87", "#c084fc", "#faf5ff", "#f59e0b"] },
  { title: "Golden Blueprint", story: "Blueprint navy, drafting lines, and precise golden measurements.", colors: ["#0c1b33", "#1d4ed8", "#bfdbfe", "#fef3c7", "#d97706"] },
  { title: "Sage Portfolio", story: "Soft sage, warm cream, red-brown signature, and gallery charcoal.", colors: ["#1f2937", "#6b705c", "#a5a58d", "#ffe8d6", "#850f01"] },
  { title: "Cherry Terminal", story: "Dark terminal ground, cool panel blue, deep cherry alert, soft pink glow, and bright white output.", colors: ["#09090b", "#3a4a58", "#e11d48", "#fb7185", "#f4f4f5"] },
  { title: "Cloud Ceramic", story: "Cloud glaze, pale clay, mineral blue, and kiln-smoke gray.", colors: ["#334155", "#94a3b8", "#e2e8f0", "#f5e6c8", "#2563eb"] },
  { title: "Olive Diagram", story: "Olive structure, inked labels, cream boards, and orange emphasis.", colors: ["#1c1917", "#4d7c0f", "#a3e635", "#fefce8", "#ea580c"] },
  { title: "Vermilion Grid", story: "Poster red, layout cream, charcoal type, and a bright cyan guide.", colors: ["#1f1f1f", "#b91c1c", "#ef4444", "#fff7ed", "#06b6d4"] },
  { title: "Iris Research", story: "Research-night blues, iris violet, and a clear annotation yellow.", colors: ["#020617", "#312e81", "#818cf8", "#eef2ff", "#facc15"] },
  { title: "Honeyed Clay", story: "Dark clay, raw umber, honey amber, pale golden glaze, and a sage ceramic accent.", colors: ["#3b2417", "#78350f", "#d97706", "#fde68a", "#6a9060"] },
  { title: "Cypress Lab", story: "Cypress greens, sterile lab white, and one controlled amber signal.", colors: ["#022c22", "#047857", "#6ee7b7", "#ecfdf5", "#f59e0b"] },
  { title: "Ink Bloom", story: "Spreading blue-black ink with bloom pink and paper white.", colors: ["#020617", "#1e3a8a", "#60a5fa", "#fdf2f8", "#db2777"] },
  { title: "Tangerine Model", story: "A warm ML dashboard palette with tangerine insight and slate structure.", colors: ["#0f172a", "#334155", "#f8fafc", "#fb923c", "#14b8a6"] },
  { title: "Lavender Studio", story: "Lavender shadows, cream table light, and a grounded brown accent.", colors: ["#3b0764", "#8b5cf6", "#ddd6fe", "#fff7ed", "#7c2d12"] },
  { title: "Pine Presentation", story: "Dark pine, crisp mint slides, cream background, warm gold emphasis, and a confident blue accent.", colors: ["#052e16", "#bbf7d0", "#fffbeb", "#ca8a04", "#1d4ed8"] },
  { title: "Ruby Product", story: "Dark charcoal, deep ruby, vivid crimson, soft blush, and a clean blue interaction state.", colors: ["#111827", "#9f1239", "#e11d48", "#ffe4e6", "#3b82f6"] },
  { title: "Slate Garden", story: "Slate UI panels with garden green, dew blue, and morning cream.", colors: ["#0f172a", "#334155", "#16a34a", "#93c5fd", "#fefce8"] },
  { title: "Marigold Poster", story: "Deep graphic outline, tomato red, marigold ink, cream paper, and a print green.", colors: ["#1f1f1f", "#dc2626", "#f59e0b", "#fefce8", "#2a7a2a"] },
  { title: "Arctic Notebook", story: "Icy notes, blue-gray shadows, and a sharp cyan underline.", colors: ["#0f172a", "#475569", "#cbd5e1", "#f8fafc", "#22d3ee"] },
  { title: "Cocoa Interface", story: "Cocoa surfaces, caramel accents, and a restrained blue interaction.", colors: ["#2a120c", "#5d3124", "#a16207", "#fff7ed", "#0ea5e9"] },
  { title: "Frosted Plum", story: "Frosty lavender highlights over plum shadows and snow white.", colors: ["#2e1065", "#6b21a8", "#d8b4fe", "#faf5ff", "#94a3b8"] },
  { title: "Signal Sunset", story: "Deep night sky, dark navy, vivid signal cyan, sunset orange, and warm cream horizon.", colors: ["#020617", "#1a3a5a", "#06b6d4", "#f97316", "#ffedd5"] },
  { title: "Botanical Wireframe", story: "Wireframe gray with fresh botanical green and cream UI space.", colors: ["#18181b", "#71717a", "#d4d4d8", "#84cc16", "#fefce8"] },
  { title: "Mulberry Sketch", story: "Mulberry ink, sketchbook paper, dusty rose, and graphite marks.", colors: ["#3f0f2f", "#9d174d", "#f9a8d4", "#fff7ed", "#374151"] },
  { title: "Cobalt Ceramic", story: "Cobalt glaze, white porcelain, and warm kiln shadow.", colors: ["#172554", "#1d4ed8", "#bfdbfe", "#f8fafc", "#92400e"] },
  { title: "Sunlit Query", story: "Deep database dark, warm yellow query highlight, pale mint result, fresh green success, and a red error row.", colors: ["#030712", "#facc15", "#dcfce7", "#22c55e", "#e11d48"] },
  { title: "Blush Framework", story: "Dark burgundy, soft mauve, blush cards, pale lavender surface, and a cool blue action.", colors: ["#450a0a", "#c084aa", "#fecdd3", "#f4f0ff", "#2563eb"] },
  { title: "Topaz Dashboard", story: "Dark dashboard ground, amber alert, glassy topaz blue, bright readout, and a red warning pulse.", colors: ["#111827", "#d97706", "#38bdf8", "#f8fafc", "#ef4444"] },
  { title: "Fern Collage", story: "Deep fern, bright lime cutout, warm cream backing, portfolio red stamp, and amber washi tape.", colors: ["#14532d", "#d9f99d", "#fff7ed", "#850f01", "#c8a040"] },
  { title: "Night Gallery", story: "Gallery-black walls, warm amber track light, cool gray panel, pale plaster, and a single cyan placard.", colors: ["#030712", "#b87820", "#9898a0", "#f0ece8", "#06b6d4"] },
  { title: "Copper Function", story: "Near-black editor, copper code comment, warm amber string, pale cream background, and a vivid green function call.", colors: ["#0c0a09", "#c2410c", "#fed7aa", "#fef3c7", "#22c55e"] },
  { title: "Seaglass Flow", story: "Deep sea teal, bright sea-glass, white foam, warm sand, and a tiny coral marker.", colors: ["#042f2e", "#5eead4", "#f0fdfa", "#d4b880", "#fb7185"] },
  { title: "Orchid Sprint", story: "Sprint-board purples, focused navy, and optimistic orange tags.", colors: ["#111827", "#4c1d95", "#a78bfa", "#f5f3ff", "#f97316"] },
  { title: "Linen Wire", story: "Linen backgrounds, ink wires, rust pins, and cool blue references.", colors: ["#1f2937", "#6b7280", "#f5f5dc", "#b45309", "#2563eb"] },
  { title: "Electric Sage", story: "Sage greens energized by electric cyan and almost-black structure.", colors: ["#020617", "#365314", "#84cc16", "#ccfbf1", "#06b6d4"] },
  { title: "Ember Meeting", story: "Warm meeting-room light, ember red notes, and polished charcoal.", colors: ["#1c1917", "#44403c", "#b91c1c", "#fb923c", "#fff7ed"] },
  { title: "Azure Ceramic", story: "Azure glaze, pale slip, gray clay, and sunny studio trim.", colors: ["#0c4a6e", "#0284c7", "#bae6fd", "#f8fafc", "#f59e0b"] },
  { title: "Pomegranate UI", story: "Dark skin, deep crimson, vivid red seed, blush pink inner wall, and leafy green stem.", colors: ["#1a0808", "#8a2018", "#e83838", "#f8c8d8", "#4a8048"] },
  { title: "Mint Compiler", story: "Compiler-dark panels with mint syntax and a soft white output pane.", colors: ["#020617", "#111827", "#34d399", "#d1fae5", "#f8fafc"] },
  { title: "Ochre Roadmap", story: "Roadmap ochre, planning grays, and blue milestone markers.", colors: ["#1f2937", "#6b7280", "#fef3c7", "#d97706", "#2563eb"] },
  { title: "Dusk Weave", story: "Dusk violet, woven rose, warm cream, and a navy base.", colors: ["#111827", "#4c1d95", "#be185d", "#fbcfe8", "#fff7ed"] },
  { title: "Basil Grid", story: "Deep basil, bright mint, pale cream grid, warm gold rules, and dark charcoal labels.", colors: ["#052e16", "#86efac", "#f7fee7", "#c8a830", "#1f2937"] },
  { title: "Quartz Product", story: "Quartz white cards, cool grays, cyan actions, and amber moments.", colors: ["#111827", "#64748b", "#e2e8f0", "#f8fafc", "#06b6d4"] },
  { title: "Spiced Interface", story: "Spiced orange, soft cream, brown ink, and a crisp teal accent.", colors: ["#2a120c", "#9a3412", "#fdba74", "#fff7ed", "#0f766e"] },
  { title: "Night Orchard", story: "Dark orchard greens, plum fruit, and moonlit cream highlights.", colors: ["#052e16", "#14532d", "#581c87", "#c084fc", "#fefce8"] },
  { title: "Cyan Monograph", story: "Pure black, dark charcoal, neutral mid-gray, soft white, and one precise cyan signature.", colors: ["#09090b", "#4a4a4e", "#a8a8b0", "#f4f4f5", "#06b6d4"] },
  { title: "Rosewood Lab", story: "Dark rosewood cabinet, dusty rose glass, pale pink notes, fresh lab white, and a controlled green signal.", colors: ["#3f1d1d", "#a06070", "#fecaca", "#f0f8f0", "#16a34a"] },
  { title: "Butterfly Query", story: "Butterfly blue, lilac query trails, and a warm nectar accent.", colors: ["#172554", "#2563eb", "#c4b5fd", "#f5f3ff", "#f59e0b"] },
  { title: "Stone Fruit", story: "Peach, plum, stone gray, and leafy green for warm editorial pages.", colors: ["#3f0f2f", "#be185d", "#fed7aa", "#78716c", "#4d7c0f"] },
  { title: "Graphite Sunrise", story: "Graphite foundations with sunrise orange and pale yellow lift.", colors: ["#111827", "#374151", "#f97316", "#fde68a", "#f8fafc"] },
  { title: "Indigo Clay", story: "Indigo shadows, brown clay, pale glaze, and a quiet sky highlight.", colors: ["#1e1b4b", "#4338ca", "#8a4f2a", "#f4e0bd", "#93c5fd"] },
  { title: "Lemon Syntax", story: "Dark syntax, lemon highlights, and cool green confirmation.", colors: ["#020617", "#1e293b", "#fef08a", "#84cc16", "#f8fafc"] },
  { title: "Cranberry Board", story: "Charcoal base, deep cranberry, vivid red section, pale blush card, and a cool slate divider.", colors: ["#111827", "#881337", "#e11d48", "#ffe4e6", "#94a3b8"] },
  { title: "Blue Porcelain", story: "Porcelain white, blue ornament, and a small gold rim.", colors: ["#172554", "#1d4ed8", "#bfdbfe", "#f8fafc", "#d97706"] },
  { title: "Lush Wireframe", story: "A lush green wireframe over charcoal with bright lime nodes.", colors: ["#09090b", "#27272a", "#166534", "#a3e635", "#f7fee7"] },
  { title: "Paprika Sprint", story: "Paprika planning notes, warm cards, slate structure, and sky tags.", colors: ["#1e293b", "#b45309", "#f97316", "#ffedd5", "#38bdf8"] },
  { title: "Museum Teal", story: "Deep teal walls, soft mint air, pale cream labels, warm gold light, and dark polished wood.", colors: ["#042f2e", "#ccfbf1", "#fff7ed", "#a16207", "#5a3820"] },
  { title: "Berry Dataset", story: "Berry chart marks, dark axes, and pale interface canvas.", colors: ["#111827", "#701a75", "#d946ef", "#fae8ff", "#f8fafc"] },
  { title: "Candlelit Repo", story: "Dark wood desk, git-green addition, amber diff, warm gold light, and cream page.", colors: ["#1c1917", "#2e7d32", "#92400e", "#f59e0b", "#fef3c7"] },
  { title: "Glacier Method", story: "Glacier blues, precise gray, and a small warm proof mark.", colors: ["#082f49", "#0284c7", "#e0f2fe", "#f8fafc", "#f97316"] },
  { title: "Persimmon Form", story: "Persimmon buttons, cream fields, cedar text, and cool validation.", colors: ["#2a120c", "#c2410c", "#fb923c", "#fff7ed", "#0e7490"] },
  { title: "Pistachio Sketch", story: "Pistachio paper, graphite lines, soft cream, and a red correction.", colors: ["#1f2937", "#6b7280", "#d9f99d", "#fefce8", "#dc2626"] },
  { title: "Midnight Ceramic", story: "Midnight glaze, cream slip, cobalt depth, and ember reflection.", colors: ["#020617", "#172554", "#1d4ed8", "#fff7ed", "#f97316"] },
  { title: "Raspberry Console", story: "Raspberry console alerts on dark panels with cool blue clarity.", colors: ["#09090b", "#1f2937", "#be123c", "#f9a8d4", "#38bdf8"] },
  { title: "Golden Garden", story: "Dark forest green, olive leaves, golden wildflowers, pale petals, and a warm sunset orange.", colors: ["#14532d", "#4d7c0f", "#facc15", "#fef3c7", "#f97316"] },
  { title: "Steel Blossom", story: "Steel UI neutrals softened by blossom pink and fresh cyan.", colors: ["#111827", "#475569", "#cbd5e1", "#f9a8d4", "#06b6d4"] },
  { title: "Cinnamon Docs", story: "Documentation cream, cinnamon headings, and reliable navy links.", colors: ["#1e293b", "#7c2d12", "#c2410c", "#fed7aa", "#fff7ed"] },
  { title: "Peacock Query", story: "Deep peacock teal, jewel blue, pale foam output, vivid orange caret, and warm terracotta accent.", colors: ["#042f2e", "#1d4ed8", "#f0fdfa", "#f97316", "#9a4a20"] },
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
  { title: "Sienna Notebook", story: "Sienna covers, ivory pages, slate ink, and blue margin notes.", colors: ["#1f2937", "#7c2d12", "#c2410c", "#fed7aa", "#2563eb"] },

  // — Nature & seasons —
  // 4 pale blue-gray neutrals + 1 vivid dusty rose horizon line
  { title: "Salt Flats", story: "Blinding white expanse, pale sky, cool haze, distant mountain, and a single dusty rose horizon.", colors: ["#F2EFE9", "#D8E0E8", "#A8B8C8", "#708090", "#C07878"] },
  // 4 warm wheat/gold tones + 1 saturated olive hill on the horizon
  { title: "Late August Wheat", story: "Dark soil furrow, warm straw, ripe wheat gold, pale chaff, and a strip of harvest-green hill.", colors: ["#2B1B0E", "#8B6914", "#D4A843", "#F0D897", "#6A9040"] },
  // 4 blue-teal tones + 1 warm kelp-brown contrast
  { title: "Tide Pool", story: "Dark sea rock, gray stone, sea-glass aqua, shallow teal, and a strand of warm kelp brown.", colors: ["#3C3B3A", "#6E7C7C", "#8ABFBF", "#A8D5C2", "#C4A882"] },
  // 4 dark/neutral tones + 1 vivid turquoise wave
  { title: "Volcanic Shore", story: "Black lava sand, dark iron seam, bleached bone, pale shore, and a single turquoise wave.", colors: ["#1A1A1A", "#3A2A2A", "#6A5040", "#C4AB8A", "#2EC4C4"] },
  // 4 cool blue-white tones + 1 vivid red berry
  { title: "First Snow", story: "Untouched snow, pale gray sky, ice shadow, pine dark, and one solitary red berry.", colors: ["#F8F9FA", "#D0D9E0", "#8AA4B0", "#3E5B6A", "#C0392B"] },
  // 4 warm brown/amber tones + 1 dark violet treeline
  { title: "Marshland Dusk", story: "Reed gold, amber marsh light, brown water, warm bank, and a violet distant treeline.", colors: ["#E8CEAA", "#D4A85A", "#9C6E3A", "#4A3728", "#3A1848"] },
  // 4 ocean blue tones + 1 vivid living coral
  { title: "Coral Atoll", story: "Deep ocean navy, reef blue, shallow teal, white sand, and a burst of living coral.", colors: ["#0B2545", "#1B6CA8", "#51C4C4", "#F8F0E3", "#FF6B6B"] },
  // 4 stone/gray neutrals + 1 vivid yellow-green lichen
  { title: "Lichen on Stone", story: "Dark shadow, iron oxide, worn stone, pale limestone, and a patch of vivid yellow-green lichen.", colors: ["#5C5A48", "#7A6A58", "#AFAA8C", "#D6CCBD", "#7AAA28"] },
  // 4 warm amber/bark tones + 1 cool pearl-blue mist
  { title: "Autumn Fog", story: "Dark wet bark, deep amber leaves, warm fog, pale mist, and a single pearl-blue sky.", colors: ["#3A2418", "#8C6040", "#C4A87A", "#E8E0D8", "#88A8C8"] },
  // 4 warm sand/earth tones + 1 dark indigo sky
  { title: "Desert Night", story: "Pale moonlit sand, warm sandstone, cool sand, deep dune, and a dark indigo sky.", colors: ["#E8E0C4", "#D4BFA0", "#A08B6E", "#5A4A30", "#0D0D2B"] },
  // 4 dark blue/green tones + 1 vivid gold sunbeam
  { title: "Kelp Forest", story: "Dark sea floor, deep water, forest green canopy, light sage, and one shaft of gold light.", colors: ["#0A1628", "#1B4D6A", "#2E8B57", "#8FBC8F", "#F4C842"] },
  // 4 cold blue-gray tones + 1 vivid amber sun
  { title: "Tundra Thaw", story: "Dark frozen blue, deep slate, lichen gray, pale ice, and the one amber sun close to the horizon.", colors: ["#2A3A48", "#4A7080", "#8C9070", "#C8C8C0", "#D4903A"] },

  // — Art studio & craft —
  // 4 warm paper/cream tones + 1 vivid prussian blue pigment
  { title: "Wet Watercolor", story: "Fresh paper, damp ivory, warm grain, aged cream, and a bloom of prussian blue pigment.", colors: ["#F5EDD8", "#EADFC8", "#D8CEB4", "#C4B898", "#4A7AA8"] },
  // 4 warm paper/ivory tones + 1 vivid red ink impression
  { title: "Lino Block Print", story: "Cream paper, off-white sheet, ivory grain, aged tan, and one deep red print.", colors: ["#F8F0E0", "#E8D8C0", "#D0C0A0", "#A89070", "#B83A2A"] },
  // 4 dark bronze/gold tones + 1 vivid forge-orange flame
  { title: "Bronze Foundry", story: "Midnight workshop, dark iron, weathered bronze, hammered gold, and forge-orange fire.", colors: ["#1A1208", "#3A2818", "#6A5028", "#9A7840", "#E07820"] },
  // 4 dark-to-medium indigo tones + 1 pale resist-white
  { title: "Indigo Vat", story: "Deep indigo cloth, dark blue dye, medium vat blue, soft woad haze, and the resist-white pattern.", colors: ["#0D1B3A", "#1E3A6E", "#4A6EA8", "#A8C4D8", "#F0EAD8"] },
  // 4 warm neutral tones + 1 vivid red smear of paint
  { title: "Sketchbook Spread", story: "Warm page cream, old paper, graphite gray, deep pencil, and a smear of red paint.", colors: ["#F0E8D8", "#C8B898", "#6A5A4A", "#3A3028", "#B84040"] },
  // 4 dark navy tones + 1 vivid molten-orange glow
  { title: "Glassblower's Glow", story: "Midnight studio, night cobalt, deep blue glass, cooled indigo, and one fierce molten-orange glow.", colors: ["#0A0A14", "#1A1A3A", "#2A4A8A", "#4A6AAA", "#E07820"] },
  // 4 warm wood/amber tones + 1 vivid red block-print ink
  { title: "Relief Woodcut", story: "Pale uncarved cream, warm wood grain, amber block, dark carved edge, and a vivid red ink impression.", colors: ["#F2E8D0", "#C4A870", "#6A4E28", "#2A1E10", "#C03A18"] },
  // full warm gradient — charcoal to beeswax, each step a distinct encaustic layer
  { title: "Encaustic Panel", story: "Charred black base, dark wax ground, burnt umber layer, damar gold, and beeswax cream surface.", colors: ["#0C0804", "#3A2A0A", "#8C5A1A", "#D4A84A", "#F4E8C4"] },

  // — Travel & architecture —
  // 4 warm terracotta/amber tones + 1 vivid mosaic teal
  { title: "Marrakech Noon", story: "Deep shadow, terracotta wall, brass lantern gold, pale plaster, and a single mosaic blue-green.", colors: ["#1A0A04", "#8C3A1A", "#D4843A", "#F0E0C0", "#4A8C8C"] },
  // 4 green/moss tones + 1 vivid persimmon red gate
  { title: "Kyoto Rainy Season", story: "Dark temple moss, bamboo green, silver rain, wet stone gray, and a persimmon gate.", colors: ["#2A3A1A", "#4A6A3A", "#8AB080", "#C0C8B8", "#D43A18"] },
  // 4 warm brown/gold tones + 1 vivid mint-green wall
  { title: "Havana Afternoon", story: "Dark cobblestone, tobacco brown, sun-bleached gold, pale cream, and a peeling mint-green wall.", colors: ["#1A1408", "#6A5028", "#C4A83A", "#E8D4B0", "#6AAA8A"] },
  // 4 dark wood tones + 1 vivid Swedish red
  { title: "Nordic Cabin", story: "Tarred black wood, dark bark, cedar brown, birch cream, and painted Swedish red.", colors: ["#1A1410", "#4A3020", "#7A5028", "#E8E0D0", "#9A2A1A"] },
  // 4 blue tones + 1 warm gold stone
  { title: "Aegean Afternoon", story: "Deep Mediterranean blue, cobalt dome, mid-blue sea, sky haze, and warm gold stone.", colors: ["#0A1E4A", "#1A4A9A", "#5A8ACA", "#A8C8E8", "#D4AA5A"] },
  // 4 warm spice tones + 1 vivid indigo cloth
  { title: "Cairo Souq", story: "Dark shadow, clay tile, spice saffron, dusty rose, and a bolt of worn indigo cloth.", colors: ["#1A1208", "#6A3A1A", "#C48A28", "#B04A3A", "#4A4870"] },
  // 4 warm stone/mortar tones + 1 vivid cobalt azulejo
  { title: "Lisbon Tiles", story: "Whitewashed wall, warm mortar, worn stone, aged wood, and a single cobalt azulejo.", colors: ["#F0EDE4", "#D4C4A8", "#B8A888", "#8A7858", "#2A6AA8"] },

  // — Emotion & atmosphere —
  // 4 dark blue tones + 1 warm amber lamp
  { title: "3AM Insomnia", story: "Dark blue ceiling, deep blue shadow, gray sheets, pale glow, and one warm amber lamp.", colors: ["#080C18", "#141E30", "#2A3A50", "#8898A8", "#C47A28"] },
  // 4 dark green tones + 1 faded lavender
  { title: "Grief Garden", story: "Dark overgrown green, deep leaf, muted sage, grey stone, and a forgotten lavender.", colors: ["#1A2010", "#3A4A28", "#7A8A6A", "#B8B8C8", "#8A78A0"] },
  // 4 warm neutral tones + 1 pale Sunday-sky blue
  { title: "Quiet Sunday", story: "Warm dust, soft cream, pale morning light, a faint tea amber, and a quiet window of pale sky.", colors: ["#F4EEE4", "#E0D4C0", "#C8B898", "#A89878", "#7898B8"] },
  // 4 very dark panel tones + 1 vivid cursor green
  { title: "Deep Focus", story: "Near-black panel, deep editor dark, dark slate, cool gray, and one single cursor green.", colors: ["#0A0C0E", "#141A20", "#2A3040", "#3A4858", "#2DA44E"] },
  // 4 faded neutral tones + 1 vivid toy red
  { title: "Childhood Bedroom", story: "Faded wallpaper, old cream, worn linen, dusty wood, and one bright toy-red accent.", colors: ["#F0ECE4", "#D8C8B0", "#A89880", "#786858", "#C02828"] },
  // 4 dark blue-gray tones + 1 vivid yellow-green sky
  { title: "Storm Rolling In", story: "Deep storm dark, steel cloud, rain-blue dusk, slate horizon, and a pale yellow-green sky.", colors: ["#1A1E28", "#384050", "#3A5A6A", "#6A7868", "#C8C870"] },
  // dark to golden gradient — each step is a clearly different tone
  { title: "Golden Hour Drive", story: "Night asphalt, dark leather, warm shadow, amber glow, and vivid golden-hour light.", colors: ["#0A0808", "#3A2010", "#7A4818", "#C07830", "#E8A020"] },
  // 4 warm neutral tones + 1 cool steam blue-gray
  { title: "Sauna Steam", story: "Cedar brown, warm amber, birch cream, pale wood, and a drift of cool steam blue-gray.", colors: ["#3A3028", "#6A5A48", "#D4A868", "#F4EEE0", "#88A8C0"] },

  // — Food & warmth —
  // 4 warm bread tones + 1 vivid olive-green (caraway)
  { title: "Sourdough Morning", story: "Crust brown, warm crumb, pale dough, flour-dust white, and a pop of caraway olive.", colors: ["#6A3818", "#B47840", "#E0C898", "#F8F4EC", "#4A7840"] },
  // 4 green matcha tones + 1 warm tan bowl
  { title: "Matcha Ritual", story: "Dark forest, bamboo green, ceremonial matcha, pale foam, and the warm tan of an earthen bowl.", colors: ["#1E2A10", "#3A5A20", "#7A9A50", "#C8D4A8", "#D4B888"] },
  // 4 dark chocolate tones + 1 vivid gold foil
  { title: "Dark Chocolate", story: "Cacao black, dark cocoa, warm chocolate, cream dust, and a shimmer of gold foil.", colors: ["#120A04", "#3A2010", "#7A4820", "#D4A870", "#C8C030"] },
  // 4 red-pink cherry tones + 1 vivid glass-jar blue
  { title: "Cherry Jam", story: "Deep cherry crimson, vivid red, sugar-blush pink, pale cream, and the tint of a glass jar.", colors: ["#6A0A14", "#B81830", "#E86878", "#F8D8D8", "#3A7898"] },
  // 4 warm espresso/coffee tones + 1 vivid tile blue
  { title: "Afternoon Café", story: "Espresso dark, roast brown, cinnamon steam, worn wood, and a glimpse of glazed tile blue.", colors: ["#1A0E08", "#4A2E18", "#9A6830", "#D4A870", "#4888A8"] },

  // — Digital & moody —
  // 4 dark warm tones + 1 vivid play-button green
  { title: "Cassette Dub", story: "Tape black, magnetic brown, faded label cream, marker orange, and a play-button green.", colors: ["#1A1410", "#4A3820", "#C4A868", "#E07820", "#4A8A5A"] },
  // 4 very dark green tones + 1 vivid hot amber pixel
  { title: "CRT Phosphor", story: "CRT black, phosphor void, scan-line dark, glowing green, and one hot amber pixel.", colors: ["#050A05", "#0A180A", "#1E4A1E", "#3A8A3A", "#C87820"] },
  // 4 dark purple tones + 1 vivid hot pink neon
  { title: "Synthwave Bleed", story: "Deep purple night, dark void, indigo haze, electric violet, and a hot pink neon line.", colors: ["#0D0118", "#2A0A40", "#4A0878", "#7A28A8", "#D4007A"] },
  // 4 warm dark tones + 1 vivid tape-label blue
  { title: "Analog Warmth", story: "Vinyl black, tape grain, warm amber, dusty rose, and a faded tape-label blue.", colors: ["#1A1208", "#4A3828", "#B87840", "#E0B090", "#4A7898"] },
  // 4 gray-neutral tones + 1 vivid fluorescent orange tab
  { title: "Floppy Archive", story: "Rubber black, plastic gray, label off-white, cream case, and one fluorescent orange tab.", colors: ["#2A2A2A", "#4A4A48", "#D0CCB8", "#F4F0E4", "#E87820"] },
  // 4 dark/neutral tones + 1 vivid success green
  { title: "Error Log", story: "Terminal black, error red, warning amber, white output, and one success green.", colors: ["#080808", "#B81818", "#D48018", "#F0F0F0", "#28A028"] }
];

function hexLuma(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function hexToHSL(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

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
    const sortedColors = [...current.colors].sort((a, b) => hexLuma(a) - hexLuma(b));
    const missingIndex = sortedColors.indexOf(current.answer);

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

    sortedColors.forEach((color, index) => {
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
  const CELL = 1;           // pixels per grid cell
  const CW = 560, CH = 500; // canvas pixel dimensions
  canvas.width = CW; canvas.height = CH;
  const GW = CW / CELL;     // 560 grid columns
  const GH = CH / CELL;     // 500 grid rows

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  // grid stores packed ABGR (0 = empty). One Uint32 per cell.
  const grid = new Uint32Array(GW * GH);
  const imgData = ctx.createImageData(CW, CH);
  const pixBuf  = new Uint32Array(imgData.data.buffer);

  // Pre-computed noisy background (warm cream with subtle grain)
  const bgBuf = new Uint32Array(GW * GH);
  for (let i = 0; i < GW * GH; i++) {
    const n = Math.floor(Math.random() * 10) - 5;
    bgBuf[i] = (0xFF << 24) | ((clampBg(224 + n)) << 16) | ((clampBg(247 + n)) << 8) | clampBg(255 + n);
  }
  function clampBg(v) { return v < 0 ? 0 : v > 255 ? 255 : v; }

  // ── State ────────────────────────────────────────────────────
  let isPouring = false;
  let continuousPouring = false;
  let lastTapTime = 0;
  const DOUBLE_TAP_MS = 280;
  let lastGX = -1, lastGY = -1;
  let prevPourX = -1, prevPourY = -1; // position poured at last frame, for path interpolation
  const brushSize = 16;   // spray radius in grid cells — fixed, controls spread width
  let pourDensity = 0.30; // Gaussian centre probability — controlled by flow slider
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
        if (dist > r*r) continue;
        // Gaussian falloff: dense centre (~30%), scattered sparse edge (~1%)
        // gives the natural spray cone instead of a visible disc blob
        const norm = Math.sqrt(dist) / r;
        if (Math.random() > pourDensity * Math.exp(-3.5 * norm * norm)) continue;
        const nx = gx + dx, ny = gy + dy;
        if (nx < 0 || nx >= GW || ny < 0 || ny >= GH || grid[ny*GW+nx]) continue;
        const [sr, sg, sb] = samplePourColor();
        const v = Math.round((Math.random() - 0.5) * 16);
        const sparkle = Math.random() < 0.025 ? 40 : 0;
        grid[ny*GW+nx] = pack(clamp(sr+v+sparkle), clamp(sg+v+sparkle), clamp(sb+v+sparkle));
      }
    }
    if (!hasSand) { hasSand = true; hintEl && hintEl.classList.add('gone'); }
  }

  function pourLine(x0, y0, x1, y1) {
    const dx = x1-x0, dy = y1-y0;
    const dist = Math.max(Math.abs(dx), Math.abs(dy));
    // Space samples by half the brush radius so coverage is gapless but not
    // redundant. Old multiplier (×1.65) predates the larger brush and caused
    // massive over-deposition on fast pointer moves.
    const steps = Math.max(1, Math.round(dist / (brushSize * 0.5)));
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      pourAt(Math.round(x0 + dx*t), Math.round(y0 + dy*t));
    }
  }

  // ── Physics update ───────────────────────────────────────────
  // Two-phase per grain:
  //   1. Free-fall: move 1 cell straight down, stop. Keeps the falling stream
  //      dense — consecutive pour events stay within brush-width of each other.
  //   2. Landing roll: once resting, cascade diagonally up to ROLL_LIMIT times
  //      so grains flow naturally down slopes rather than locking into steep piles.
  const ROLL_LIMIT = 4;
  function update(doShake, sub) {
    if (doShake && shakeFrames > 0) {
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

    const dir = (frame + sub) % 2 ? 1 : -1;
    for (let y = GH - 2; y >= 0; y--) {
      for (let xi = 0; xi < GW; xi++) {
        const x = dir === 1 ? xi : GW - 1 - xi;
        if (!grid[y*GW+x]) continue;

        const col = grid[y*GW+x];

        // Phase 1 — free-fall: stochastic rate + slight drift breaks up blob patterns
        // 82% fall probability staggers grains from the same pour event vertically;
        // 6% horizontal drift fans the stream into a natural widening cone.
        if (!grid[(y+1)*GW+x]) {
          if (Math.random() < 0.82) {
            let nx = x;
            if (Math.random() < 0.06) nx += Math.random() < 0.5 ? -1 : 1;
            if (nx < 0 || nx >= GW || grid[(y+1)*GW+nx]) nx = x;
            grid[y*GW+x] = 0;
            grid[(y+1)*GW+nx] = col;
          }
          continue;
        }

        // Phase 2 — landing roll: cascade down slopes until settled
        let gx = x, gy = y;
        for (let roll = 0; roll < ROLL_LIMIT; roll++) {
          if (gy + 1 >= GH) break;
          // If open below after a diagonal move, keep falling
          if (!grid[(gy+1)*GW+gx]) { gy++; continue; }
          const l = gx - 1, r = gx + 1;
          const sl = l >= 0 && !grid[(gy+1)*GW+l];
          const sr = r < GW  && !grid[(gy+1)*GW+r];
          if      (sl && sr) { gx = Math.random() < 0.5 ? l : r; gy++; }
          else if (sl)       { gx = l; gy++; }
          else if (sr)       { gx = r; gy++; }
          else               { break; }
        }

        if (gx !== x || gy !== y) {
          grid[y*GW+x] = 0;
          grid[gy*GW+gx] = col;
        }
      }
    }
  }

  // ── Render ───────────────────────────────────────────────────
  // 1-pixel grains with ambient occlusion: top-exposed = bright, buried = dark.
  function render() {
    pixBuf.set(bgBuf);
    for (let y = 0; y < GH; y++) {
      const rowBase = y * GW;
      for (let x = 0; x < GW; x++) {
        const i = rowBase + x;
        const c = grid[i];
        if (!c) continue;
        const aboveEmpty = y === 0 || !grid[i - GW];
        pixBuf[i] = aboveEmpty ? shade(c, 1.08) : c;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  // ── Main loop ────────────────────────────────────────────────
  const SUBSTEPS = 6; // physics passes per rendered frame — drives free-fall speed
  function tick() {
    if (isPouring && lastGX >= 0) {
      if (prevPourX >= 0 && (prevPourX !== lastGX || prevPourY !== lastGY)) {
        // Pointer moved since last frame — interpolate along the path so no gaps
        pourLine(prevPourX, prevPourY, lastGX, lastGY);
      } else {
        pourAt(lastGX, lastGY);
      }
      prevPourX = lastGX; prevPourY = lastGY;
    } else if (!isPouring) {
      prevPourX = -1; prevPourY = -1;
    }
    if (pourMode === 'gradient' && getActivePourColors().length > 1) {
      gradientPhase += gradientDir * GRADIENT_SPEED;
      if (gradientPhase >= 1) { gradientPhase = 1; gradientDir = -1; }
      if (gradientPhase <= 0) { gradientPhase = 0; gradientDir = 1; }
    }
    for (let s = 0; s < SUBSTEPS; s++) update(s === 0, s);
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
    prevPourX = lastGX; prevPourY = lastGY;
    window.SFX?.pourStart();
    pourAt(lastGX, lastGY);
  }
  function onMove(cx, cy) {
    if (!isPouring) return;
    [lastGX, lastGY] = toGrid(cx, cy);
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
    // Map slider 1–20 → density 0.04–0.60; value 10 ≈ default 0.30
    pourDensity = 0.04 + (+flowRange.value - 1) * (0.56 / 19);
    if (flowValueEl) flowValueEl.textContent = flowRange.value;
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
