export type TimelineEra = {
  year: string;
  title: string;
  body: string;
  power: string;
  topSpeed: string;
  material: string;
  tech: string;
  accent: "red" | "blue" | "gold" | "silver";
};

export const TIMELINE: TimelineEra[] = [
  {
    year: "1970",
    title: "The Analog Age",
    body: "Pure mechanical fury. Naturally aspirated V12s scream through aluminium chassis. Drivers wrestle 600 kg missiles with no aids, no telemetry — only instinct.",
    power: "470 HP",
    topSpeed: "305 km/h",
    material: "Aluminium Monocoque",
    tech: "Mechanical Slide Throttle",
    accent: "silver",
  },
  {
    year: "1985",
    title: "Turbo Genesis",
    body: "1.5L turbocharged V6s push 1,400 horsepower in qualifying trim. Ground-effect outlawed; designers turn to wings, splitters, and pure brute force.",
    power: "1,400 HP",
    topSpeed: "352 km/h",
    material: "Carbon-Kevlar Tub",
    tech: "Twin-Turbo V6",
    accent: "red",
  },
  {
    year: "1995",
    title: "Electronic Awakening",
    body: "Semi-automatic gearboxes, drive-by-wire, active suspension — banned almost as fast as they appeared. The cockpit becomes a software interface.",
    power: "780 HP",
    topSpeed: "362 km/h",
    material: "Full Carbon Monocoque",
    tech: "Sequential Paddle Shift",
    accent: "silver",
  },
  {
    year: "2005",
    title: "Aerodynamic Theatre",
    body: "Three-litre V10s spinning past 19,000 RPM. Tunnels, bargeboards, and vortex generators turn race cars into upside-down jets.",
    power: "950 HP",
    topSpeed: "372 km/h",
    material: "Honeycomb Carbon",
    tech: "Mass Damper / Tuned Vortex",
    accent: "gold",
  },
  {
    year: "2015",
    title: "Hybrid Hegemony",
    body: "1.6L V6 turbo-hybrids with ERS-K and ERS-H deliver thermal efficiency above 50%. The grid silences itself between corners and re-detonates on exit.",
    power: "1,000 HP",
    topSpeed: "378 km/h",
    material: "Forged Composite",
    tech: "MGU-K + MGU-H",
    accent: "blue",
  },
  {
    year: "2025",
    title: "Ground-Effect Revival",
    body: "Venturi tunnels return. Active aero, drag-reduction zones, sustainable e-fuel. Cars heavier, faster, more violent through high-speed corners.",
    power: "1,030 HP",
    topSpeed: "382 km/h",
    material: "Bio-Resin Carbon",
    tech: "Active DRS + E-Fuel",
    accent: "red",
  },
  {
    year: "2050",
    title: "Hyper-Electric Prototype",
    body: "Solid-state battery, four hub motors, AI co-driver. The car learns the track lap by lap and re-tunes its torque map mid-corner.",
    power: "2,200 HP",
    topSpeed: "478 km/h",
    material: "Graphene Lattice",
    tech: "Neural Torque Vectoring",
    accent: "blue",
  },
];

export type ShowcaseCar = {
  id: string;
  category: string;
  name: string;
  tagline: string;
  hp: number;
  weight: number;
  zeroSixty: string;
  hue: string; // accent color
  silhouette: "f1" | "gt3" | "hyper" | "prototype" | "ev";
  /** Optional real photograph URL — if set, renders instead of the SVG silhouette */
  image?: string;
  /** Photographer credit (Unsplash) */
  credit?: string;
};

/**
 * Real-world cars — photos sourced from Unsplash under their free
 * commercial license. Photographer credits surface on the stage at runtime.
 * Specs are publicly-quoted manufacturer figures.
 */
export const SHOWCASE: ShowcaseCar[] = [
  {
    id: "porsche-911-carrera",
    category: "Porsche · Sports",
    name: "Porsche 911 Carrera",
    tagline: "Rear-engined heresy, perfected across six decades.",
    hp: 388,
    weight: 1505,
    zeroSixty: "4.0s",
    hue: "#D4AF37",
    silhouette: "hyper",
    image:
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?fm=jpg&q=80&w=2000&auto=format&fit=crop",
    credit: "Laurent Perren · Unsplash",
  },
  {
    id: "porsche-911-noir",
    category: "Porsche · GT",
    name: "Porsche 911 · Noir",
    tagline: "Studio-grade monochrome. Carbon, chrome, and shadow.",
    hp: 480,
    weight: 1505,
    zeroSixty: "3.4s",
    hue: "#BFC3C7",
    silhouette: "hyper",
    image:
      "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?fm=jpg&q=80&w=2000&auto=format&fit=crop",
    credit: "redcharlie · Unsplash",
  },
  {
    id: "porsche-911-forest",
    category: "Porsche · Touring",
    name: "Porsche 911 · Onyx",
    tagline: "Backroad savant. The grand tour starts the moment you turn the key.",
    hp: 480,
    weight: 1520,
    zeroSixty: "3.7s",
    hue: "#00D4FF",
    silhouette: "hyper",
    image:
      "https://images.unsplash.com/photo-1598814165187-ed79437d7490?fm=jpg&q=80&w=2000&auto=format&fit=crop",
    credit: "Louis Meeckers · Unsplash",
  },
  {
    id: "bmw-m4-comp",
    category: "BMW M · Coupé",
    name: "BMW M4 Competition",
    tagline: "Twin-turbo S58 inline-six. Bavarian violence, polished.",
    hp: 543,
    weight: 1730,
    zeroSixty: "3.5s",
    hue: "#00D4FF",
    silhouette: "gt3",
    image:
      "https://images.unsplash.com/photo-1744782558819-061b352200fa?fm=jpg&q=80&w=2000&auto=format&fit=crop",
    credit: "Unsplash",
  },
  {
    id: "bmw-m4-night",
    category: "BMW M · Coupé",
    name: "BMW M4 · Frozen Black",
    tagline: "Laser headlights cut the night. The S58 answers the prompt.",
    hp: 543,
    weight: 1730,
    zeroSixty: "3.5s",
    hue: "#FF1E1E",
    silhouette: "gt3",
    image:
      "https://images.unsplash.com/photo-1728060838342-cb9744a27d1b?fm=jpg&q=80&w=2000&auto=format&fit=crop",
    credit: "Mathew Antony · Unsplash",
  },
  {
    id: "bmw-m4-dark",
    category: "BMW M · Coupé",
    name: "BMW M4 · Apex",
    tagline: "Track-honed chassis. Carbon roof. M Driver's Package.",
    hp: 543,
    weight: 1725,
    zeroSixty: "3.4s",
    hue: "#D4AF37",
    silhouette: "gt3",
    image:
      "https://images.unsplash.com/photo-1728060703475-d17c93c0b430?fm=jpg&q=80&w=2000&auto=format&fit=crop",
    credit: "Mathew Antony · Unsplash",
  },
  {
    id: "bmw-m4-classic",
    category: "BMW M · Coupé",
    name: "BMW M4 · Heritage",
    tagline: "Three letters. Two doors. One job — make the road bend.",
    hp: 503,
    weight: 1705,
    zeroSixty: "3.8s",
    hue: "#BFC3C7",
    silhouette: "gt3",
    image:
      "https://images.unsplash.com/photo-1570356528233-b442cf2de345?fm=jpg&q=80&w=2000&auto=format&fit=crop",
    credit: "Martin Katler · Unsplash",
  },
  {
    id: "bmw-m3-comp",
    category: "BMW M · Sedan",
    name: "BMW M3 Competition",
    tagline: "Four doors, no apologies. The benchmark every sedan still chases.",
    hp: 503,
    weight: 1730,
    zeroSixty: "3.8s",
    hue: "#FF1E1E",
    silhouette: "gt3",
    image:
      "https://images.unsplash.com/photo-1742545980689-feb2425f64e7?fm=jpg&q=80&w=2000&auto=format&fit=crop",
    credit: "Samuele Macauda · Unsplash",
  },
  {
    id: "bmw-m3-touring-silver",
    category: "BMW M · Touring",
    name: "BMW M3 Touring",
    tagline: "Five doors. Track DNA. The M-wagon BMW finally built.",
    hp: 510,
    weight: 1865,
    zeroSixty: "3.6s",
    hue: "#D4AF37",
    silhouette: "gt3",
    image:
      "https://images.unsplash.com/photo-1701985203003-1e52f637cf98?fm=jpg&q=80&w=2000&auto=format&fit=crop",
    credit: "Dmitriy Sidorov · Unsplash",
  },
  {
    id: "bmw-m3-touring-noir",
    category: "BMW M · Touring",
    name: "BMW M3 Touring · Noir",
    tagline: "All-weather AWD launch control. The estate that bites back.",
    hp: 510,
    weight: 1870,
    zeroSixty: "3.6s",
    hue: "#00D4FF",
    silhouette: "gt3",
    image:
      "https://images.unsplash.com/photo-1761040100969-aa46f2349830?fm=jpg&q=80&w=2000&auto=format&fit=crop",
    credit: "Václav Pechar · Unsplash",
  },
];

export type EnginePart = {
  name: string;
  detail: string;
  offset: [number, number];
  accent: string;
};

export const ENGINE_PARTS: EnginePart[] = [
  { name: "TURBOCHARGER", detail: "Variable-vane / 165k RPM impeller", offset: [-260, -160], accent: "#FF1E1E" },
  { name: "MGU-H", detail: "Heat energy recovery — 120kW continuous", offset: [240, -180], accent: "#D4AF37" },
  { name: "INTAKE PLENUM", detail: "Printed Inconel, knife-edge runners", offset: [-280, 0], accent: "#00D4FF" },
  { name: "CYLINDER BANK", detail: "V6 / 1.6L / 100mm bore", offset: [0, -220], accent: "#F5F5F5" },
  { name: "PISTONS", detail: "Forged titanium / DLC-coated skirts", offset: [0, 220], accent: "#FF1E1E" },
  { name: "CAMSHAFT", detail: "Pneumatic valve return / 16,500 RPM", offset: [260, 60], accent: "#BFC3C7" },
  { name: "MGU-K", detail: "Kinetic recovery — 161 HP burst", offset: [-240, 180], accent: "#00D4FF" },
  { name: "BATTERY", detail: "Solid-state 4 MJ, 4.2 kg/kWh", offset: [240, 200], accent: "#D4AF37" },
];

export type PerformanceMetric = {
  label: string;
  value: number;
  max: number;
  unit: string;
  accent: string;
};

export const PERFORMANCE: PerformanceMetric[] = [
  { label: "Horsepower", value: 1030, max: 1500, unit: "HP", accent: "#FF1E1E" },
  { label: "Redline", value: 15000, max: 18000, unit: "RPM", accent: "#D4AF37" },
  { label: "0–100 km/h", value: 2.1, max: 4, unit: "s", accent: "#00D4FF" },
  { label: "Dry Weight", value: 798, max: 1500, unit: "kg", accent: "#BFC3C7" },
  { label: "Lateral G", value: 6.5, max: 8, unit: "g", accent: "#FF1E1E" },
  { label: "Braking", value: 5.3, max: 7, unit: "g", accent: "#00D4FF" },
];

export const STATS = [
  { value: 500, suffix: "+", label: "Races" },
  { value: 1200, suffix: "+", label: "Podiums" },
  { value: 350, suffix: "+", label: "Victories" },
  { value: 25, suffix: "M+", label: "Fans" },
];

export const GALLERY_CARDS = [
  { title: "Monza · Lesmo", meta: "Stage 04 · 14:22 GMT", hue: "#FF1E1E", t: "TRACK" },
  { title: "Spa · Eau Rouge", meta: "Stage 07 · 09:45 GMT", hue: "#00D4FF", t: "TRACK" },
  { title: "Pit Lane · Inferno", meta: "Sequence 12 · 21:08 GMT", hue: "#D4AF37", t: "PIT" },
  { title: "Suzuka · 130R", meta: "Stage 11 · 06:12 GMT", hue: "#FF1E1E", t: "TRACK" },
  { title: "Garage · Telemetry", meta: "Lab 03 · 23:55 GMT", hue: "#00D4FF", t: "GARAGE" },
  { title: "Le Mans · Mulsanne", meta: "Hour 18 · 02:30 GMT", hue: "#D4AF37", t: "ENDURANCE" },
  { title: "Nürburgring · Karussell", meta: "Stage 16 · 11:40 GMT", hue: "#BFC3C7", t: "TRACK" },
  { title: "Studio · Wind Tunnel", meta: "Test 41 · 17:00 GMT", hue: "#00D4FF", t: "R&D" },
];
