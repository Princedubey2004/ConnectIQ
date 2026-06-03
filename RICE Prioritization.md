# RICE Prioritization Framework
**Product:** ConnectIQ  

The RICE framework helps objectively prioritize features by evaluating Reach, Impact, Confidence, and Effort.

**Formula:** `(Reach * Impact * Confidence) / Effort = RICE Score`

*   **Reach:** How many users will this feature affect in a given month? (Scale: Number of users/percentage)
*   **Impact:** How much will this feature increase our North Star Metric? (Scale: 3 = Massive, 2 = High, 1 = Medium, 0.5 = Low, 0.25 = Minimal)
*   **Confidence:** How confident are we about our estimates? (Scale: 100% = High, 80% = Medium, 50% = Low)
*   **Effort:** How much time will this take from engineering, design, and product? (Scale: Person-months, minimum 0.5)

---

## Feature Evaluation Table

| Feature | Reach (1000 users) | Impact (0.25 - 3) | Confidence (50-100%) | Effort (Months) | RICE Score | Priority Rank |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AI Message Generator** | 1000 (100%) | 3 (Massive) | 90% | 1.0 | **2,700** | **1** |
| **Recruiter CRM (Kanban)** | 1000 (100%) | 3 (Massive) | 90% | 1.5 | **1,800** | **2** |
| **LinkedIn Import Extension** | 800 (80%) | 2 (High) | 70% | 2.0 | **560** | **3** |
| **Follow-up Automation** | 600 (60%) | 2 (High) | 80% | 1.5 | **640** | **4** |
| **Analytics Dashboard** | 700 (70%) | 1 (Medium) | 100% | 1.0 | **700** | **5** |
| **Resume Upload (Parsing)** | 1000 (100%) | 1 (Medium) | 80% | 2.0 | **400** | **6** |
| **Notification Center** | 800 (80%) | 0.5 (Low) | 90% | 1.0 | **360** | **7** |

## Strategic Decisions Based on RICE

1.  **AI Message Generator & CRM are absolute priorities (MVP).** They yield the highest scores due to massive impact and high confidence in their technical feasibility.
2.  **Analytics Dashboard** scores surprisingly high because it has 100% confidence and requires relatively low effort compared to building browser extensions. It should be prioritized early in Phase 2.
3.  **LinkedIn Import** has a high impact but low confidence due to potential API changes and higher effort. It will be deferred to Phase 3.
4.  **Resume Upload** requires high effort (parsing PDFs/Docs accurately) for medium impact. We will simulate this in the MVP or push full parsing to a later release.
