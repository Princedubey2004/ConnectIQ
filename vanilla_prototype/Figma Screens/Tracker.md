# Figma Screen Specification: Kanban Tracker

## Screen Name: Outreach Kanban Tracker

---

## 1. Layout & Grid
* **Layout Structure:** Left Sidebar (240px) + Main Viewport.
* **Kanban Grid:** 5-column horizontal layout. Width spans full remaining viewport. Horizontal scrolling active for smaller screens.
* **Column Spacing:** 16px gap between columns.
* **Gutters & Spacing:** 12px padding inside column containers.

---

## 2. Components

### 2.1. Kanban Columns (5 Stages)
* **Columns:** Wishlist, Contacted, In Discussion, Interviewing, Closed.
* **Frame Style:** Slate Surface (`#141417`), 1px borders (`#262629`), height 100%.
* **Column Header:** 48px height, title font size 13px bold, contains count badge (e.g. `[ 3 ]`) floating right.

### 2.2. Kanban Card Component
* **Dimensions:** Width fits column (approx. 240px) x variable height (110px).
* **Frame Style:** Deep Obsidian background (`#0a0a0c`), 1px borders (`#262629`), cursor pointer hover states.
* **Inner Elements:**
  * Title: 13px Bold, White, ellipsis overflow.
  * Subtitle: 11px Regular, Zinc Gray (`#a1a1aa`), company details.
  * Footer separator: Thin dashed line.
  * Left footer: Follow-up alarm icon + date (Turns Amber Gold `#f59e0b` if overdue).
  * Right footer: Quick action buttons (AI message generator shortcut icon).
