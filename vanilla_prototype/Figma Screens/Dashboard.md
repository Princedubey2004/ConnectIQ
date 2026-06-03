# Figma Screen Specification: Dashboard

## Screen Name: Dashboard (Home)

---

## 1. Layout & Grid
* **Layout Structure:** Left Sidebar (240px) + Main Viewport (100% remaining width).
* **Main Area Layout:** 2-column grid. Left side (2fr width) contains Welcome Hero and Metric Cards. Right side (1fr width) contains Follow-up Overdue list.
* **Canvas Margin:** 32px standard margins around the content grid.
* **Gutters & Spacing:** 24px spacing between cards.

---

## 2. Components

### 2.1. Welcome Hero Banner
* **Dimensions:** Responsive width x 180px height.
* **Aesthetics:** HSL gradient background from deep indigo (`bg: rgba(99, 102, 241, 0.15)`) to transparent surface. 1px border colored with `#6366f1` at 20% opacity.
* **Typography:**
  * Header H1: 24px Bold, tracking -0.01em, white color.
  * Paragraph text: 13px Regular, Zinc Gray (`#a1a1aa`).
* **Interactions:** Hovering primary CTA button shifts color from `#6366f1` to `#818cf8`.

### 2.2. Metric Cards (Row of 3)
* **Dimensions:** Responsive width x 110px height.
* **Aesthetics:** Slate Surface (`#141417`), 1px borders (`#262629`).
* **Inner Elements:**
  * Top Label: 12px Medium, Zinc Gray (`#a1a1aa`).
  * Big Stat Value: 32px SemiBold, Outfit font, White (`#f2f2f2`).
  * Bottom Trend pill: Green text (`#10b981`) or Gray (`#71717a`) with micro line trend graph icon.

### 2.3. Follow-up Due List Widget (Right Column)
* **Dimensions:** Responsive width x 480px max height.
* **Card Frame:** Slate Surface (`#141417`), thin border (`#262629`), vertical scrolling enabled inside list body.
* **Timeline Items:**
  * Individual Row height: 56px, background `#0a0a0c`, border `#262629`.
  * Left side details: Name (13px bold, White), Company/Title (11px, Gray).
  * Right side details: Red/Gold badge `"Due"` + Ghost utility button `"Write"`.
