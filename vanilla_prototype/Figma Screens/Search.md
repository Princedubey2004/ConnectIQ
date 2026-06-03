# Figma Screen Specification: Recruiter Search

## Screen Name: Recruiter Search / Discovery

---

## 1. Layout & Grid
* **Layout Structure:** Left Sidebar (240px) + Main Viewport.
* **Top Search Area:** Horizontal Flex Row. Spans full width of the main content column.
* **Search Grid:** 3-column responsive card grid.
* **Gutters & Spacing:** 20px spacing between cards.

---

## 2. Components

### 2.1. Search Bar & Dropdowns (Top Row)
* **Search Input Field:**
  * Width: 50% of screen. Height: 40px.
  * Border: 1px Slate border (`#262629`). Focus state: `#6366f1` with glow.
  * Placeholder text: 13px Regular, Zinc Gray (`#a1a1aa`).
* **Filter Dropdowns (Industry, Location):**
  * Width: 20% each. Height: 40px.
  * Standard dropdown icon floating on the right edge.

### 2.2. Recruiter Profile Cards
* **Dimensions:** Width responsive x 210px height.
* **Frame Style:** Slate Surface (`#141417`), 1px borders (`#262629`).
* **Inner Elements:**
  * Top Avatar block: 44px x 44px square, rounded `8px`, dark background, bold initials in center.
  * Recruiter Text details: Name (14px bold, White), Title & Company (12px Zinc Gray), Location (11px Muted Gray).
  * Tag Row: Group of flex pills. Font size 10px, background `#1e1b4b` (Wishlist), `#064e3b` (Discussion).
  * Action Buttons: Primary button `"Track Recruiter"` and Ghost button `"Draft Message"` sitting side-by-side at card base.
