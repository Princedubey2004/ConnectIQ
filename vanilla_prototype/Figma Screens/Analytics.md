# Figma Screen Specification: Analytics

## Screen Name: Analytics Dashboard

---

## 1. Layout & Grid
* **Layout Structure:** Left Sidebar (240px) + Main Viewport.
* **Analytics Grid:** 2-column responsive layout. Left side contains Bar Chart. Right side contains Pipeline Donut Chart.
* **Canvas Margin:** 32px standard margins around the content grid.
* **Spacing:** 24px spacing between chart cards.

---

## 2. Components

### 2.1. Weekly Outreach Trend Card (Bar Chart)
* **Frame Style:** Slate Surface (`#141417`), 1px borders (`#262629`).
* **Inside Chart Area:**
  * Height: 250px.
  * Grid lines: 4 horizontal rows, color `#262629`. Text labels left (y-axis limits: 0 to 15).
  * Bar Pillars: 20px wide columns, color `#6366f1` (Electric Indigo), rounded top edges (3px radius).
  * X-Axis: Text labels centered beneath each bar (Mon, Tue, Wed...).

### 2.2. Pipeline Conversion Card (Donut Chart)
* **Frame Style:** Slate Surface (`#141417`), 1px borders (`#262629`).
* **Donut Ring Graph:**
  * Center at X: 100, Y: 100. Donut radius: 60px.
  * Ring slice strokes: 16px wide paths. Colored by status category (Wishlist: Indigo, Contacted: Gold, Discussion: Emerald, Interviewing: Purple, Closed: Silver).
  * Central Core text: Total quantity numeral in 24px Bold, plus subtitle label `"Total Tracked"` in 11px Gray.
* **Legend (Base Row):** Row of colored indicator dots with category counts aligned horizontally beneath the donut.
