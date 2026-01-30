# Neo Brutalism Portfolio Wireframes

> **Fidelity:** Hi-Fi | **Style:** Neo Brutalism
> **Reference:** Marjo Ballabani portfolio

---

## Design System Preview

### Color Palette
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| Background | `#FFFEF0` (cream) | `#1A1A1A` |
| Surface | `#FFFFFF` | `#2A2A2A` |
| Primary | `#FFD700` (yellow) | `#FFD700` |
| Secondary | `#FF6B6B` (coral) | `#FF6B6B` |
| Tertiary | `#4ECDC4` (teal) | `#4ECDC4` |
| Border | `#000000` | `#FFFFFF` |
| Text | `#000000` | `#FFFFFF` |

### Core Styling
```css
/* Neo Brutalism Essentials */
border: 3px solid var(--border);
box-shadow: 4px 4px 0 var(--border);
border-radius: 0px;
```

---

## 1. Navbar

### Desktop Layout (>1024px)
```
┌─────────────────────────────────────────────────────────────────────┐
│ bg: white | border-bottom: 3px solid black                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────┐                                                │
│  │ [LOGO] Fachri   │     Home   About   Portfolio   Contact         │
│  │ 3px border      │                                                │
│  └─────────────────┘                                   ┌──────────┐ │
│                                                        │ HIRE ME  │ │
│                                     [🌙]               │ yellow   │ │
│                                     toggle             │ 3px bdr  │ │
│                                                        └──────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### Mobile Layout (<768px)
```
┌─────────────────────────────────────┐
│                                     │
│  [☰]              [🌙]              │
│  hamburger        toggle            │
│                                     │
└─────────────────────────────────────┘

Mobile Drawer (open):
┌─────────────────────────────────────┐
│ bg: yellow | full screen            │
├─────────────────────────────────────┤
│                                     │
│  [X] Close                          │
│                                     │
│  ╔═══════════════════════════════╗  │
│  ║ HOME                          ║  │
│  ╠═══════════════════════════════╣  │
│  ║ ABOUT                         ║  │
│  ╠═══════════════════════════════╣  │
│  ║ PORTFOLIO                     ║  │
│  ╠═══════════════════════════════╣  │
│  ║ CONTACT                       ║  │
│  ╚═══════════════════════════════╝  │
│                                     │
│  each link: 3px border, offset shadow│
└─────────────────────────────────────┘
```

---

## 2. Hero Section

### Desktop Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│ bg: cream (#FFFEF0) | NO floating decorations                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ╔══════════════════════╗                                          │
│   ║ Hi there! 👋         ║  ← Yellow sticky note                    │
│   ║ border: 3px #000     ║     shadow: 4px 4px 0 #000               │
│   ╚══════════════════════╝                                          │
│                                                                     │
│   ┌──────────────────────────────────┐    ┌─────────────────────┐   │
│   │                                  │    │                     │   │
│   │  I'm Fachri                      │    │    [AVATAR]         │   │
│   │  Azka.                           │    │                     │   │
│   │                                  │    │  border: 4px #000   │   │
│   │  font: 72px, bold, black         │    │  shadow: 8px 8px 0  │   │
│   │                                  │    │                     │   │
│   └──────────────────────────────────┘    └─────────────────────┘   │
│                                                                     │
│   Fullstack Developer & UI/UX Designer                              │
│   ═══════════════════════════════════                               │
│        ^ underline: 4px yellow                                      │
│                                                                     │
│   "I build modern websites that blend design and functionality."    │
│                                                                     │
│   ┌────────────────┐   ┌────────────────┐                           │
│   │  ✉️ HIRE ME    │   │  📄 RESUME     │                           │
│   │  bg: yellow    │   │  bg: white     │                           │
│   │  3px border    │   │  3px border    │                           │
│   │  4px 4px shadow│   │  4px 4px shadow│                           │
│   └────────────────┘   └────────────────┘                           │
│                                                                     │
│   ┌────┐ ┌────┐ ┌────┐ ┌────┐                                       │
│   │ GH │ │ IG │ │ LI │ │ FV │  ← Social icons, 3px border each     │
│   └────┘ └────┘ └────┘ └────┘                                       │
│                                                                     │
│   ─ ─ ─ Home ─ About ─ Skills ─ Portfolio ─ Contact ─ ─ ─           │
│          ^ inline nav dots (optional)                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Mobile Layout
```
┌─────────────────────────────────────┐
│                                     │
│ ╔═══════════════════════════════╗   │
│ ║ Hi there! 👋                  ║   │
│ ╚═══════════════════════════════╝   │
│                                     │
│ ┌───────────────────────────────┐   │
│ │                               │   │
│ │        [AVATAR]               │   │
│ │      centered, large          │   │
│ │                               │   │
│ └───────────────────────────────┘   │
│                                     │
│   I'm Fachri                        │
│   Azka.                             │
│   ═══════════                       │
│                                     │
│   Fullstack Developer               │
│   & UI/UX Designer                  │
│                                     │
│   "I build modern websites..."      │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │        ✉️ HIRE ME               │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │        📄 RESUME                │ │
│ └─────────────────────────────────┘ │
│                                     │
│   [GH] [IG] [LI] [FV]              │
│                                     │
└─────────────────────────────────────┘
```

### Styling Specs
| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | `#FFFEF0` | `#1A1A1A` |
| Sticky Note | `bg: #FFD700, border: 3px #000` | `bg: #FFD700, border: 3px #FFF` |
| Avatar Box | `border: 4px #000, shadow: 8px 8px 0 #000` | `border: 4px #FFF, shadow: 8px 8px 0 #FFD700` |
| Primary CTA | `bg: #FFD700, border: 3px #000` | `bg: #FFD700, border: 3px #FFF` |
| Secondary CTA | `bg: #FFF, border: 3px #000` | `bg: #2A2A2A, border: 3px #FFF` |

---

## 3. About Section

### Desktop Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│ bg: white                                                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ╔═══════════════╗                                                 │
│   ║ ABOUT         ║  ← Yellow label, 3px border                     │
│   ╚═══════════════╝                                                 │
│                                                                     │
│   ┌─────────────────────────────┐   ┌───────────────────────────┐   │
│   │                             │   │                           │   │
│   │  Behind the                 │   │      [PHOTO]              │   │
│   │  Code                       │   │                           │   │
│   │  ════                       │   │   border: 4px #000        │   │
│   │  ^ underline yellow         │   │   shadow: 8px 8px 0       │   │
│   │                             │   │                           │   │
│   │  "Hi, I'm Fachri — a        │   │   ┌─────────────────────┐ │   │
│   │  Fullstack Developer..."    │   │   │  3+                 │ │   │
│   │                             │   │   │  Projects           │ │   │
│   │  ┌────────┐ ┌────────┐      │   │   │  bg: yellow         │ │   │
│   │  │ GitHub │ │ Insta  │      │   │   └─────────────────────┘ │   │
│   │  │ 3px bdr│ │ 3px bdr│      │   │   ^ floating stats box    │   │
│   │  └────────┘ └────────┘      │   │                           │   │
│   │  ┌────────┐                 │   │                           │   │
│   │  │Spotify │                 │   │                           │   │
│   │  └────────┘                 │   │                           │   │
│   │                             │   │                           │   │
│   └─────────────────────────────┘   └───────────────────────────┘   │
│        60% width                          40% width                 │

│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Social Card Styling
```
┌──────────────────────────┐
│  [ICON]                  │  border: 3px solid #000
│                          │  shadow: 4px 4px 0 #000
│  Platform Name           │  bg: white
│  @username               │  hover: translate(-2px, -2px)
│                          │         shadow: 6px 6px 0 #000
└──────────────────────────┘
```

---

## 4. Skills Section (Logo Marquee)

### Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│ bg: yellow (#FFD700) | border-top: 3px #000 | border-bottom: 3px    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ◀──── [HTML] [CSS] [JS] [React] [Node] [PHP] [MySQL] ... ────▶     │
│                                                                     │
│        each icon: 3px black border, white bg, no shadow             │
│        continuous scroll animation                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. Portfolio Showcase

### Tabs Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│ bg: cream                                                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Portfolio Showcase                                                │
│   ══════════════════                                                │
│                                                                     │
│   ╔═══════════════╦══════════════════╦═══════════════╗              │
│   ║   PROJECTS    ║  QUALIFICATIONS  ║  TECH STACK   ║              │
│   ║   active:     ║                  ║               ║              │
│   ║   bg yellow   ║  bg white        ║  bg white     ║              │
│   ╚═══════════════╩══════════════════╩═══════════════╝              │
│        ^ 3px border all, active tab has yellow bg                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Project Card
```
┌─────────────────────────────┐
│ ┌─────────────────────────┐ │
│ │      [IMAGE]            │ │  border: 3px solid #000
│ └─────────────────────────┘ │  shadow: 6px 6px 0 #000
│                             │  bg: white
│  Project Title              │
│  ────────────               │  hover: translate(-4px, -4px)
│  Description text...        │         shadow: 10px 10px 0 #000
│                             │
│  ┌────┐ ┌────┐ ┌────┐       │
│  │React│ │TS │ │TW │       │  tags: 2px border, no shadow
│  └────┘ └────┘ └────┘       │
│                             │
└─────────────────────────────┘
```

---

## 6. Contact Section

### Desktop Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│ bg: cream                                                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ╔═════════════════╗                                               │
│   ║ GET IN TOUCH    ║  bg: yellow, 3px border                       │
│   ╚═════════════════╝                                               │
│                                                                     │
│   Let's Work Together                                               │
│   ═══════════════════                                               │
│                                                                     │
│   ┌─────────────────────────────┐   ┌───────────────────────────┐   │
│   │ FORM                        │   │ CONTACT INFO              │   │
│   │ border: 3px #000            │   │ border: 3px #000          │   │
│   │ bg: white                   │   │ bg: white                 │   │
│   │ shadow: 6px 6px 0           │   │ shadow: 6px 6px 0         │   │
│   │                             │   │                           │   │
│   │ ┌─────────────────────────┐ │   │ ┌───────────────────────┐ │   │
│   │ │ Your Name               │ │   │ │ 📧 Email              │ │   │
│   │ │ 3px border, no radius   │ │   │ │ fachri@gmail.com      │ │   │
│   │ └─────────────────────────┘ │   │ └───────────────────────┘ │   │
│   │ ┌─────────────────────────┐ │   │ ┌───────────────────────┐ │   │
│   │ │ Email Address           │ │   │ │ 📍 Location           │ │   │
│   │ └─────────────────────────┘ │   │ │ Sumedang, Indonesia   │ │   │
│   │ ┌─────────────────────────┐ │   │ └───────────────────────┘ │   │
│   │ │ Message...              │ │   ├───────────────────────────┤   │
│   │ └─────────────────────────┘ │   │ CONNECT WITH ME           │   │
│   │                             │   │ ┌────┐ ┌────┐             │   │
│   │ ┌─────────────────────────┐ │   │ │ GH │ │ IG │             │   │
│   │ │    SEND MESSAGE →       │ │   │ └────┘ └────┘             │   │
│   │ │    bg: yellow           │ │   │ ┌────┐ ┌────┐             │   │
│   │ └─────────────────────────┘ │   │ │ FV │ │ LI │             │   │
│   │                             │   │ └────┘ └────┘             │   │
│   └─────────────────────────────┘   └───────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Form States

#### Success Modal
```
┌─────────────────────────────────────────┐
│ bg: white, border: 4px #000             │
│ shadow: 8px 8px 0 #000                  │
├─────────────────────────────────────────┤
│        ╔═══════════════════╗            │
│        ║    ✓ SUCCESS      ║            │
│        ║    bg: green      ║            │
│        ╚═══════════════════╝            │
│    Message sent successfully!           │
│    ┌─────────────────────────────┐      │
│    │         CONTINUE            │      │
│    │         bg: yellow          │      │
│    └─────────────────────────────┘      │
└─────────────────────────────────────────┘
```

---

## 7. Footer

### Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│ border-top: 4px solid yellow                                        │
│ bg: black (dark) / white (light)                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌────────────────┐   ┌─────────────────┐   ┌──────────────────┐   │
│   │ BRAND          │   │ QUICK LINKS     │   │ LET'S COLLAB     │   │
│   │ ┌────────────┐ │   │ • Home          │   │ Have a project?  │   │
│   │ │ Fachri     │ │   │ • About         │   │ ┌──────────────┐ │   │
│   │ │ Azka       │ │   │ • Portfolio     │   │ │ GET IN TOUCH │ │   │
│   │ └────────────┘ │   │ • Contact       │   │ │ bg: yellow   │ │   │
│   │ Fullstack Dev  │   │                 │   │ └──────────────┘ │   │
│   └────────────────┘   └─────────────────┘   └──────────────────┘   │
│                                                                     │
│   ─────────────────────────────────────────────────────────────     │
│   © 2025 Fachri Azka                    Made with ❤️ and ☕         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Interaction Specifications

| Element | Hover Effect |
|---------|--------------|
| Buttons | `translate(-2px, -2px)`, shadow → `6px 6px 0` |
| Cards | `translate(-4px, -4px)`, shadow → `10px 10px 0` |
| Links | Yellow underline appears |
| Icons | Scale 1.1 |

---

## Next Steps

1. [x] Create wireframes ← **Done**
2. [ ] Review wireframes
3. [ ] Create design tokens CSS
4. [ ] Implement changes
