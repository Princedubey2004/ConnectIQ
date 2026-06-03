# Figma Screen Specification: AI Generator

## Screen Name: AI Outreach Assistant

---

## 1. Layout & Grid
* **Layout Structure:** Left Sidebar (240px) + Main Viewport.
* **Main Area Layout:** 50/50 Split Column Panel.
  * Left Column: Form inputs and goals.
  * Right Column: AI Output reader panel.
* **Canvas Margin:** 32px standard margins around the content grid.
* **Spacing:** 32px spacing between panels.

---

## 2. Components

### 2.1. Parameter Input Panel (Left Column)
* **Frame Style:** Slate Surface (`#141417`), 1px borders (`#262629`).
* **Input Elements:**
  * Recipient Dropdown: 40px height, select dropdown containing tracked recruiters.
  * Goal Selector: 40px height, select dropdown (Cold Outreach, Informational, Follow-up).
  * Segmented Tone Control: Tabbed segments container, rounded `6px`. Individual text pills switch active highlights (`active: bg #1e1e24`).
  * Textarea Input: Height 120px, scrollable, background `#0a0a0c`.
  * CTA Button: Primary Solid Indigo (`#6366f1`), full card width.

### 2.2. Output Draft Reader (Right Column)
* **Frame Style:** Deep Obsidian background (`#0a0a0c`), 1px borders (`#262629`), rounded `10px`.
* **Output Editor Text:** 14px Regular, line-height 1.6, White color. Scrollable.
* **Character Counter:** Small floating tag, bottom-right edge, font size 11px, Slate Gray text.
* **Action Footer:** Primary copy button (`"Copy to Clipboard"`) sitting below the reader frame.
