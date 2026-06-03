/* ==========================================================================
   ConnectIQ Application Logic & Interactive State
   ========================================================================== */

// 1. Initial State Setup
let userProfile = {
  name: "Sarah Chen",
  roles: "Software Engineer Intern, Entry Level Software Engineer",
  resume: "Sarah Chen is a Senior Computer Science student at State University (GPA: 3.8/4.0). Skills: React, Node.js, Python, CSS, JavaScript, SQL. Developed a full-stack portfolio site and a group calendar collaboration tool. Completed a 3-month Software Engineering Internship at TechCorp where she developed REST APIs and improved database query speeds by 20%."
};

let recruiters = [
  {
    id: "rec-1",
    name: "Alex Mercer",
    title: "Senior Technical Recruiter",
    company: "Stripe",
    industry: "Tech",
    location: "San Francisco",
    status: "discussion",
    tags: ["Hires Juniors", "Stripe Tech"],
    followUpDate: getRelativeDateString(-1), // Overdue follow-up
    notes: [
      { text: "Had a quick chat. Suggested emailing resume highlights directly.", date: getRelativeDateString(-3) }
    ]
  },
  {
    id: "rec-2",
    name: "Jane Sterling",
    title: "University Recruiting Manager",
    company: "Google",
    industry: "Tech",
    location: "Remote",
    status: "wishlist",
    tags: ["Alumni Connection", "Internships Focus"],
    followUpDate: null,
    notes: []
  },
  {
    id: "rec-3",
    name: "Marcus Vance",
    title: "Lead Finance Recruiter",
    company: "Goldman Sachs",
    industry: "Finance",
    location: "New York",
    status: "contacted",
    tags: ["Active Poster"],
    followUpDate: getRelativeDateString(3), // Upcoming
    notes: [
      { text: "Sent cold outreach via LinkedIn connection request.", date: getRelativeDateString(-2) }
    ]
  },
  {
    id: "rec-4",
    name: "Elena Rostova",
    title: "Talent Acquisition Lead",
    company: "McKinsey & Co",
    industry: "Consulting",
    location: "New York",
    status: "interview",
    tags: ["Hiring Fast"],
    followUpDate: getRelativeDateString(0), // Due today
    notes: [
      { text: "Scheduled a 15-minute phone screening interview.", date: getRelativeDateString(-1) }
    ]
  },
  {
    id: "rec-5",
    name: "David Kim",
    title: "Technical Recruiter",
    company: "Netflix",
    industry: "Tech",
    location: "Remote",
    status: "wishlist",
    tags: ["Response rate: high"],
    followUpDate: null,
    notes: []
  }
];

// Helper to calculate date relative strings (e.g. "2026-06-02" relative to today)
function getRelativeDateString(daysOffset) {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
}

// 2. SPA Navigation / Views Swapping
const navLinks = document.querySelectorAll('.nav-link');
const views = document.querySelectorAll('.view-content');
const viewTitleLabel = document.getElementById('view-title-label');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const targetView = link.getAttribute('data-view');
    switchView(targetView);
  });
});

function switchView(viewName) {
  // Update sidebar active link
  navLinks.forEach(link => {
    if (link.getAttribute('data-view') === viewName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Toggle visible view content
  views.forEach(view => {
    if (view.id === `${viewName}-view`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  // Update header title
  const formattedTitle = viewName.charAt(0).toUpperCase() + viewName.slice(1);
  viewTitleLabel.textContent = formattedTitle === 'Search' ? 'Recruiter Discovery' : (formattedTitle === 'Generator' ? 'AI Outreach Assistant' : formattedTitle);

  // Close mobile sidebar on transition
  document.getElementById('sidebar').classList.remove('active');

  // Trigger specific view renders
  if (viewName === 'dashboard') {
    renderDashboard();
  } else if (viewName === 'search') {
    renderSearchGrid();
  } else if (viewName === 'generator') {
    populateGeneratorDropdown();
  } else if (viewName === 'tracker') {
    renderKanbanTracker();
  } else if (viewName === 'analytics') {
    renderAnalyticsCharts();
  }
}

// Mobile sidebar burger click toggle
document.getElementById('menu-toggle-btn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('active');
});

// 3. User Profile Modal Operations
const profileModalOverlay = document.getElementById('profile-modal-overlay');
const profileUserName = document.getElementById('profile-user-name');
const profileTargetRoles = document.getElementById('profile-target-roles');
const profileResumeBox = document.getElementById('profile-resume-box');
const sidebarName = document.getElementById('sidebar-name');
const sidebarAvatar = document.getElementById('sidebar-avatar');
const heroWelcomeName = document.getElementById('hero-welcome-name');

function openProfileModal() {
  profileUserName.value = userProfile.name;
  profileTargetRoles.value = userProfile.roles;
  profileResumeBox.value = userProfile.resume;
  updateProfileModalProgressBar();
  profileModalOverlay.classList.add('active');
}

function closeProfileModal() {
  profileModalOverlay.classList.remove('active');
}

function updateProfileModalProgressBar() {
  const nameLen = profileUserName.value.trim().length;
  const rolesLen = profileTargetRoles.value.trim().length;
  const resumeLen = profileResumeBox.value.trim().length;
  
  let progress = 0;
  if (nameLen > 0) progress += 20;
  if (rolesLen > 0) progress += 30;
  if (resumeLen > 100) progress += 50;
  else if (resumeLen > 0) progress += 25;

  document.getElementById('profile-progress-bar').style.width = `${progress}%`;
}

// Live validation listeners inside Profile modal
[profileUserName, profileTargetRoles, profileResumeBox].forEach(input => {
  input.addEventListener('input', updateProfileModalProgressBar);
});

document.getElementById('sidebar-profile-btn').addEventListener('click', openProfileModal);
document.getElementById('global-profile-btn').addEventListener('click', openProfileModal);
document.getElementById('profile-modal-close-btn').addEventListener('click', closeProfileModal);
document.getElementById('profile-modal-cancel-btn').addEventListener('click', closeProfileModal);

document.getElementById('profile-modal-save-btn').addEventListener('click', () => {
  if (!profileUserName.value.trim() || !profileResumeBox.value.trim()) {
    showToast("⚠️ Name and Resume Highlights are required.", "danger");
    return;
  }

  userProfile.name = profileUserName.value.trim();
  userProfile.roles = profileTargetRoles.value.trim();
  userProfile.resume = profileResumeBox.value.trim();

  // Update UI components showing name
  sidebarName.textContent = userProfile.name;
  heroWelcomeName.textContent = userProfile.name.split(' ')[0];
  
  // Calculate Initials
  const nameParts = userProfile.name.split(' ');
  const initials = nameParts.map(p => p[0]).join('').substring(0, 2);
  sidebarAvatar.textContent = initials;

  closeProfileModal();
  showToast("✅ Profile configurations saved successfully!");
  renderDashboard();
});

// 4. Recruiter Discovery (Search Grid View)
function renderSearchGrid() {
  const grid = document.getElementById('search-results-grid');
  const query = document.getElementById('search-input').value.toLowerCase().trim();
  const indFilter = document.getElementById('filter-industry').value;
  const locFilter = document.getElementById('filter-location').value;

  grid.innerHTML = '';

  // Filter local recruiters
  const filtered = recruiters.filter(rec => {
    const matchesSearch = rec.name.toLowerCase().includes(query) || 
                          rec.company.toLowerCase().includes(query) || 
                          rec.title.toLowerCase().includes(query);
    const matchesIndustry = indFilter === '' || rec.industry === indFilter;
    const matchesLocation = locFilter === '' || rec.location === locFilter;
    return matchesSearch && matchesIndustry && matchesLocation;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="card empty-state" style="grid-column: 1 / -1;">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
        <h3>No recruiters matched your filters</h3>
        <p>Try resetting the search terms, or create a brand new recruiter profile manually.</p>
        <button class="btn btn-secondary" onclick="openAddRecruiterModal()">Add Custom Recruiter</button>
      </div>
    `;
    return;
  }

  filtered.forEach(rec => {
    const initials = rec.name.split(' ').map(n => n[0]).join('');
    
    // Check status to see if they're in pipeline already
    const inPipeline = rec.status !== 'wishlist';

    const card = document.createElement('div');
    card.className = 'card recruiter-search-card';
    card.innerHTML = `
      <div class="recruiter-card-header">
        <div class="card-avatar">${initials}</div>
        <div class="recruiter-info-text">
          <div class="recruiter-name-title">${rec.name}</div>
          <div class="recruiter-company">${rec.title} &bull; <strong style="color: var(--text-primary);">${rec.company}</strong></div>
          <div class="recruiter-location">${rec.location} &bull; ${rec.industry}</div>
        </div>
      </div>
      <div class="recruiter-tags">
        ${rec.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="recruiter-actions">
        ${inPipeline ? 
          `<button class="btn btn-secondary" style="font-size:11px;" onclick="switchView('tracker')">View in Pipeline</button>` : 
          `<button class="btn btn-primary" style="font-size:11px;" onclick="addRecruiterToPipeline('${rec.id}')">Track Recruiter</button>`
        }
        <button class="btn btn-ghost" style="font-size:11px;" onclick="triggerDirectOutreach('${rec.id}')">Draft Message</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Attach Search event listeners
document.getElementById('search-input').addEventListener('input', renderSearchGrid);
document.getElementById('filter-industry').addEventListener('change', renderSearchGrid);
document.getElementById('filter-location').addEventListener('change', renderSearchGrid);

function addRecruiterToPipeline(id) {
  const rec = recruiters.find(r => r.id === id);
  if (rec) {
    rec.status = 'contacted'; // Promoted to pipeline contacted
    showToast(`📈 Added ${rec.name} to outreach pipeline!`);
    renderSearchGrid();
  }
}

function triggerDirectOutreach(id) {
  populateGeneratorDropdown();
  document.getElementById('generator-recruiter-select').value = id;
  switchView('generator');
}

// 5. Add Recruiter Modal Operations
const recruiterModalOverlay = document.getElementById('recruiter-modal-overlay');

function openAddRecruiterModal() {
  recruiterModalOverlay.classList.add('active');
}

function closeAddRecruiterModal() {
  // Clear values
  document.getElementById('recruiter-name-input').value = '';
  document.getElementById('recruiter-title-input').value = '';
  document.getElementById('recruiter-company-input').value = '';
  document.getElementById('recruiter-location-input').value = '';
  recruiterModalOverlay.classList.remove('active');
}

document.getElementById('add-recruiter-direct-btn').addEventListener('click', openAddRecruiterModal);
document.getElementById('recruiter-modal-close-btn').addEventListener('click', closeAddRecruiterModal);
document.getElementById('recruiter-modal-cancel-btn').addEventListener('click', closeAddRecruiterModal);

document.getElementById('recruiter-modal-save-btn').addEventListener('click', () => {
  const name = document.getElementById('recruiter-name-input').value.trim();
  const title = document.getElementById('recruiter-title-input').value.trim();
  const company = document.getElementById('recruiter-company-input').value.trim();
  const industry = document.getElementById('recruiter-industry-select').value;
  const location = document.getElementById('recruiter-location-input').value.trim() || "Remote";

  if (!name || !title || !company) {
    showToast("⚠️ Name, Title, and Company are required.", "danger");
    return;
  }

  const newRec = {
    id: `rec-${Date.now()}`,
    name,
    title,
    company,
    industry,
    location,
    status: 'wishlist',
    tags: ['Custom Entry'],
    followUpDate: null,
    notes: []
  };

  recruiters.push(newRec);
  closeAddRecruiterModal();
  showToast(`🎉 Logged ${name} into recruiter pipeline.`);
  
  // Re-render based on active view state
  renderSearchGrid();
  renderKanbanTracker();
  renderDashboard();
});

// 6. AI Message Generator View
let selectedTone = 'conversational';
const toneSegments = document.querySelectorAll('.tone-segment');

toneSegments.forEach(segment => {
  segment.addEventListener('click', () => {
    toneSegments.forEach(s => s.classList.remove('active'));
    segment.classList.add('active');
    selectedTone = segment.getAttribute('data-tone');
  });
});

function populateGeneratorDropdown() {
  const select = document.getElementById('generator-recruiter-select');
  select.innerHTML = '<option value="">-- Choose from Tracked Recruiters --</option>';
  
  recruiters.forEach(rec => {
    const opt = document.createElement('option');
    opt.value = rec.id;
    opt.textContent = `${rec.name} (${rec.company})`;
    select.appendChild(opt);
  });
}

document.getElementById('generator-submit-btn').addEventListener('click', () => {
  const recId = document.getElementById('generator-recruiter-select').value;
  const goal = document.getElementById('generator-goal-select').value;
  const context = document.getElementById('generator-context').value.trim();
  const outputBox = document.getElementById('generator-output-box');
  const copyBtn = document.getElementById('generator-copy-btn');

  if (!recId) {
    showToast("⚠️ Select a recruiter recipient to personalize the message.", "warning");
    return;
  }

  const rec = recruiters.find(r => r.id === recId);
  if (!rec) return;

  // Render a nice animated AI generation loading screen
  outputBox.innerHTML = `
    <div class="output-placeholder">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      <p>ConnectIQ AI is analyzing ${rec.name}'s profile and cross-referencing your resume highlights...</p>
    </div>
  `;
  copyBtn.disabled = true;

  // Simulate server computation
  setTimeout(() => {
    const finalMessage = compileAIMessage(rec, goal, selectedTone, context);
    outputBox.innerHTML = `
      <div>${finalMessage}</div>
      <div class="output-character-counter" id="char-counter">${finalMessage.length} characters</div>
    `;
    copyBtn.disabled = false;
  }, 1200);
});

// A complex client-side rules compiler that acts like a highly sophisticated customized generator
function compileAIMessage(recruiter, goal, tone, extraContext) {
  const firstName = recruiter.name.split(' ')[0];
  const company = recruiter.company;
  const targetRoles = userProfile.roles.split(',')[0];
  
  let opening = "";
  let body = "";
  let closing = "";

  // 1. TONE ADJUSTMENT
  if (tone === 'conversational') {
    opening = `Hi ${firstName}, hope you're having a good week.\n\n`;
    closing = `\n\nBest,\n${userProfile.name}`;
    
    if (goal === 'Cold Outreach') {
      body = `I recently stumbled upon your profile while researching engineering teams at ${company}. I'm a Senior CS student looking for entry-level ${targetRoles} roles. I've built full-stack tools using React/Node and completed a software internship where I focused on REST APIs. I'd love to chat briefly and learn what skills Stripe values most in junior engineers.`;
    } else if (goal === 'Informational Interview') {
      body = `I'm a senior majoring in Computer Science and I've been researching ${company}'s design culture. I saw you focus on campus recruitment there. If your schedule allows, I'd love to jump on a quick 10-minute coffee chat to learn about your career path and get advice on applying to Stripe.`;
    } else { // Follow-up
      body = `Thanks again for taking the time to sync earlier. I wanted to follow up and share that I just completed a new full-stack personal dashboard project implementing modern HSL CSS components, which aligns with the tech stack we discussed. Let me know if the team has any open interview cycles!`;
    }
  } else if (tone === 'formal') {
    opening = `Dear ${recruiter.name},\n\n`;
    closing = `\n\nSincerely,\n${userProfile.name}`;

    if (goal === 'Cold Outreach') {
      body = `I hope this message finds you well. I am reaching out to introduce myself as a graduating Computer Science student pursuing upcoming ${targetRoles} opportunities at ${company}. Having recently completed a Software Engineering Internship focused on building database-backed web applications, I am highly interested in joining your technical staff. I would appreciate the opportunity to discuss how my profile aligns with your hiring standards.`;
    } else if (goal === 'Informational Interview') {
      body = `I am writing to inquire if you would have 10 minutes available for an informational interview. I am preparing to apply for entry-level roles at ${company} and would greatly value your guidance regarding the key milestones and qualifications needed to stand out during the application process.`;
    } else { // Follow-up
      body = `I am writing to follow up on our previous discussion regarding engineering opportunities at ${company}. Since our conversation, I have continued to refine my technical skills, specifically optimization structures for REST API architectures. I wanted to reiterate my strong interest in joining your team.`;
    }
  } else { // Direct
    opening = `Hi ${firstName} — `;
    closing = `\n\nThanks,\n${userProfile.name}`;

    if (goal === 'Cold Outreach') {
      body = `I'm a senior CS major with prior Software Engineering internship experience. I'm highly interested in entry-level engineering roles at ${company}. Are you currently screening junior candidates for software tracks? I'd love to send over my portfolio.`;
    } else if (goal === 'Informational Interview') {
      body = `I'm building a project database and aiming for engineering tracks at ${company}. Do you have 10 minutes next week for a brief coffee call? I'd value your feedback on how juniors can stand out in your pipeline.`;
    } else { // Follow-up
      body = `Just following up on our previous discussion. I've recently deployed a new full-stack project utilizing React and PostgreSQL. Let me know if you have availability to connect for an interview screening.`;
    }
  }

  // Inject additional custom context if provided
  if (extraContext) {
    body += `\n\nI also wanted to mention: ${extraContext}`;
  }

  return `${opening}${body}${closing}`;
}

// Spin animation rules injected programmatically
const styleElement = document.createElement('style');
styleElement.innerHTML = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleElement);

// Clipboard Copy Action
document.getElementById('generator-copy-btn').addEventListener('click', () => {
  const text = document.getElementById('generator-output-box').innerText.replace(/\n\d+ characters$/, '');
  navigator.clipboard.writeText(text).then(() => {
    showToast("📋 Copied message to clipboard!");
  }).catch(() => {
    showToast("⚠️ Clipboard permission denied.", "danger");
  });
});

// 7. Kanban Outreach Tracker View
function renderKanbanTracker() {
  const columns = ['wishlist', 'contacted', 'discussion', 'interview', 'closed'];
  
  columns.forEach(col => {
    const container = document.getElementById(`cards-${col}`);
    const counter = document.getElementById(`count-${col}`);
    
    container.innerHTML = '';
    
    const filtered = recruiters.filter(r => r.status === col);
    counter.textContent = filtered.length;

    if (filtered.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding: 20px 0; color:var(--text-muted); font-size:11px;">Empty column</div>`;
    } else {
      filtered.forEach(rec => {
        const card = document.createElement('div');
        card.className = 'kanban-card';
        card.setAttribute('draggable', 'true');
        card.setAttribute('data-id', rec.id);

        let followUpMarkup = '';
        if (rec.followUpDate) {
          const today = new Date().toISOString().split('T')[0];
          const isOverdue = rec.followUpDate <= today && rec.status !== 'closed';
          followUpMarkup = `<span class="kanban-card-date ${isOverdue ? 'overdue' : ''}">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${isOverdue ? 'Overdue!' : rec.followUpDate}
          </span>`;
        }

        card.innerHTML = `
          <div class="kanban-card-title">${rec.name}</div>
          <div class="kanban-card-subtitle">${rec.title} at <strong>${rec.company}</strong></div>
          <div class="kanban-card-footer">
            ${followUpMarkup}
            <div class="kanban-card-actions">
              <div class="action-icon-btn" onclick="event.stopPropagation(); triggerDirectOutreach('${rec.id}')" title="AI Message Generator">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline></svg>
              </div>
            </div>
          </div>
        `;

        // Card Drag Events
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('click', () => openRecruiterDetailModal(rec.id));

        container.appendChild(card);
      });
    }

    // Attach Container Dragover/Drop Listeners
    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('dragleave', handleDragLeave);
    container.addEventListener('drop', handleDrop);
  });
}

// Drag & Drop Handlers
let draggedCardId = null;

function handleDragStart(e) {
  draggedCardId = this.getAttribute('data-id');
  this.classList.add('dragging');
  e.dataTransfer.setData('text/plain', draggedCardId);
}

function handleDragEnd() {
  this.classList.remove('dragging');
  draggedCardId = null;
}

function handleDragOver(e) {
  e.preventDefault();
  this.classList.add('drag-over');
}

function handleDragLeave() {
  this.classList.remove('drag-over');
}

function handleDrop(e) {
  e.preventDefault();
  this.classList.remove('drag-over');
  const id = e.dataTransfer.getData('text/plain');
  const newStatus = this.parentElement.getAttribute('data-status');

  const rec = recruiters.find(r => r.id === id);
  if (rec && rec.status !== newStatus) {
    rec.status = newStatus;
    
    // Automatically flag date if dragged to contacted to suggest a follow up
    if (newStatus === 'contacted' && !rec.followUpDate) {
      rec.followUpDate = getRelativeDateString(5); // Follow up in 5 days
    }

    showToast(`Updated ${rec.name}'s stage to: ${newStatus.toUpperCase()}`);
    renderKanbanTracker();
  }
}

// 8. Recruiter Detail Modal Operations
const detailModalOverlay = document.getElementById('detail-modal-overlay');
let selectedRecruiterId = null;

function openRecruiterDetailModal(id) {
  selectedRecruiterId = id;
  const rec = recruiters.find(r => r.id === id);
  if (!rec) return;

  document.getElementById('detail-recruiter-title').textContent = rec.name;
  document.getElementById('detail-recruiter-meta').innerHTML = `${rec.title} &bull; <strong>${rec.company}</strong> &bull; ${rec.location}`;
  document.getElementById('detail-status-select').value = rec.status;
  document.getElementById('detail-followup-input').value = rec.followUpDate || '';

  renderNotesTimeline(rec);
  detailModalOverlay.classList.add('active');
}

function closeRecruiterDetailModal() {
  detailModalOverlay.classList.remove('active');
  selectedRecruiterId = null;
  renderKanbanTracker();
}

function renderNotesTimeline(recruiter) {
  const container = document.getElementById('detail-notes-timeline');
  container.innerHTML = '';

  if (recruiter.notes.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); font-size:11px; text-align:center; padding: 12px 0;">No notes logged. Type above to add details.</p>`;
    return;
  }

  recruiter.notes.forEach(note => {
    const bubble = document.createElement('div');
    bubble.className = 'note-bubble';
    bubble.innerHTML = `
      <div>${note.text}</div>
      <div class="note-bubble-meta">${note.date}</div>
    `;
    container.appendChild(bubble);
  });
}

// Save status change inside modal
document.getElementById('detail-status-select').addEventListener('change', (e) => {
  const rec = recruiters.find(r => r.id === selectedRecruiterId);
  if (rec) {
    rec.status = e.target.value;
    showToast(`Updated status to: ${rec.status.toUpperCase()}`);
  }
});

// Save follow-up date change inside modal
document.getElementById('detail-followup-input').addEventListener('change', (e) => {
  const rec = recruiters.find(r => r.id === selectedRecruiterId);
  if (rec) {
    rec.followUpDate = e.target.value || null;
    showToast("📅 Updated follow-up reminder date.");
  }
});

// Add notes entry
document.getElementById('detail-save-note-btn').addEventListener('click', () => {
  const txtInput = document.getElementById('detail-new-note');
  const txt = txtInput.value.trim();

  if (!txt) return;

  const rec = recruiters.find(r => r.id === selectedRecruiterId);
  if (rec) {
    rec.notes.unshift({
      text: txt,
      date: new Date().toISOString().split('T')[0]
    });
    txtInput.value = '';
    renderNotesTimeline(rec);
    showToast("📝 Logged recruiter note entry!");
  }
});

// Delete Recruiter
document.getElementById('detail-delete-recruiter-btn').addEventListener('click', () => {
  if (confirm("Are you sure you want to delete this recruiter from your tracker? This cannot be undone.")) {
    recruiters = recruiters.filter(r => r.id !== selectedRecruiterId);
    closeRecruiterDetailModal();
    showToast("🗑️ Recruiter removed successfully.", "danger");
  }
});

document.getElementById('detail-modal-close-btn').addEventListener('click', closeRecruiterDetailModal);
document.getElementById('detail-modal-close-action-btn').addEventListener('click', closeRecruiterDetailModal);

// 9. Dashboard Analytics & Summaries
function renderDashboard() {
  // Update numbers
  const contactedCount = recruiters.filter(r => ['contacted', 'discussion', 'interview'].includes(r.status)).length;
  const interviewCount = recruiters.filter(r => r.status === 'interview').length;
  
  const totalSent = recruiters.filter(r => r.status !== 'wishlist').length;
  const responseCount = recruiters.filter(r => ['discussion', 'interview'].includes(r.status)).length;
  const rate = totalSent > 0 ? Math.round((responseCount / totalSent) * 100) : 0;

  document.getElementById('dashboard-stat-contacted').textContent = contactedCount;
  document.getElementById('dashboard-stat-rate').textContent = `${rate}%`;
  document.getElementById('dashboard-stat-interviews').textContent = interviewCount;

  // Build Overdue Follow-ups list
  const list = document.getElementById('dashboard-followups-list');
  list.innerHTML = '';

  const today = new Date().toISOString().split('T')[0];
  const overdueRecs = recruiters.filter(r => r.followUpDate && r.followUpDate <= today && r.status !== 'closed');
  
  document.getElementById('followup-alert-count').textContent = overdueRecs.length;

  if (overdueRecs.length === 0) {
    list.innerHTML = `
      <div class="empty-state" style="padding: 24px 0;">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <p style="font-size:12px; margin:0;">All caught up! No follow-up reminders due.</p>
      </div>
    `;
    return;
  }

  overdueRecs.forEach(rec => {
    const item = document.createElement('div');
    item.className = 'followup-item';
    item.innerHTML = `
      <div class="followup-recruiter-details">
        <span class="followup-name" style="cursor:pointer;" onclick="openRecruiterDetailModal('${rec.id}')">${rec.name}</span>
        <span class="followup-meta">${rec.title} &bull; ${rec.company}</span>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="followup-badge">Due</span>
        <button class="btn btn-ghost" style="padding:4px 8px; font-size:11px;" onclick="triggerDirectOutreach('${rec.id}')">Write</button>
      </div>
    `;
    list.appendChild(item);
  });
}

// CTA Dashboard button redirects
document.getElementById('dashboard-cta-btn').addEventListener('click', () => {
  switchView('search');
});

// 10. Analytics Dashboard Charts (Raw Custom SVG Drawings)
function renderAnalyticsCharts() {
  renderOutreachBarChart();
  renderPipelineDonutChart();
}

function renderOutreachBarChart() {
  const chart = document.getElementById('outreach-bar-chart');
  chart.innerHTML = '';

  // Fake volume for 7 days
  const data = [
    { day: "Mon", val: 4 },
    { day: "Tue", val: 8 },
    { day: "Wed", val: 5 },
    { day: "Thu", val: 12 },
    { day: "Fri", val: 9 },
    { day: "Sat", val: 2 },
    { day: "Sun", val: 6 }
  ];

  const maxVal = 15;
  const padding = 30;
  const width = 400;
  const height = 200;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Grid lines
  for (let i = 0; i <= 3; i++) {
    const y = padding + (chartHeight / 3) * i;
    const gridVal = Math.round(maxVal - (maxVal / 3) * i);
    
    chart.innerHTML += `
      <line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="var(--border-muted)" stroke-width="1" />
      <text x="${padding - 8}" y="${y + 4}" fill="var(--text-secondary)" font-size="10" text-anchor="end">${gridVal}</text>
    `;
  }

  // Render Bars
  const colWidth = chartWidth / data.length;
  data.forEach((d, index) => {
    const barHeight = (d.val / maxVal) * chartHeight;
    const x = padding + colWidth * index + (colWidth - 20) / 2;
    const y = height - padding - barHeight;

    chart.innerHTML += `
      <!-- Bar Rect with hover animation support -->
      <rect x="${x}" y="${y}" width="20" height="${barHeight}" fill="var(--accent-indigo)" rx="3" style="transition: fill 0.2s;" onmouseover="this.setAttribute('fill', 'var(--accent-indigo-hover)')" onmouseout="this.setAttribute('fill', 'var(--accent-indigo)')" />
      <!-- Day text label -->
      <text x="${x + 10}" y="${height - padding + 16}" fill="var(--text-secondary)" font-size="11" text-anchor="middle">${d.day}</text>
    `;
  });
}

function renderPipelineDonutChart() {
  const chart = document.getElementById('pipeline-donut-chart');
  const legend = document.getElementById('donut-legend');
  
  chart.innerHTML = '';
  legend.innerHTML = '';

  const columns = [
    { label: 'Wishlist', status: 'wishlist', color: '#818cf8' },
    { label: 'Contacted', status: 'contacted', color: '#fbbf24' },
    { label: 'Discussion', status: 'discussion', color: '#34d399' },
    { label: 'Interviewing', status: 'interview', color: '#a78bfa' },
    { label: 'Closed', status: 'closed', color: '#cbd5e1' }
  ];

  let total = recruiters.length;
  
  let currentAngle = 0;
  const radius = 60;
  const cx = 100;
  const cy = 100;
  const circumference = 2 * Math.PI * radius;

  // Center texts
  chart.innerHTML += `
    <circle cx="${cx}" cy="${cy}" r="${radius}" class="donut-circle-bg" />
  `;

  columns.forEach(col => {
    const count = recruiters.filter(r => r.status === col.status).length;
    if (count === 0) return;

    const proportion = count / total;
    const strokeDash = proportion * circumference;
    const strokeOffset = circumference - strokeDash;
    const rotationAngle = currentAngle;

    // Draw slice circle segment
    chart.innerHTML += `
      <circle cx="${cx}" cy="${cy}" r="${radius}" class="donut-circle-val"
              stroke="${col.color}" 
              stroke-dasharray="${strokeDash} ${circumference}"
              stroke-dashoffset="${strokeOffset}"
              transform="rotate(${-90 + rotationAngle} ${cx} ${cy})" />
    `;

    currentAngle += proportion * 360;

    // Inject Legend Row
    legend.innerHTML += `
      <div class="legend-item">
        <span class="legend-color-dot" style="background-color:${col.color};"></span>
        <span>${col.label} (${count})</span>
      </div>
    `;
  });

  // Render centered totals inside SVG Donut hole
  chart.innerHTML += `
    <text x="${cx}" y="${cy - 4}" class="donut-center-text">${total}</text>
    <text x="${cx}" y="${cy + 16}" class="donut-center-subtext">Total Tracked</text>
  `;
}

// 11. Custom Toast Notification
function showToast(message, type = "success") {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast`;
  
  if (type === "danger") {
    toast.style.borderColor = "var(--color-danger)";
    toast.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
      <span>${message}</span>
    `;
  } else if (type === "warning") {
    toast.style.borderColor = "var(--color-warning)";
    toast.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-warning)" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
      <span>${message}</span>
    `;
  } else {
    toast.style.borderColor = "var(--color-success)";
    toast.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${message}</span>
    `;
  }

  container.appendChild(toast);

  // Remove toast after animation ends
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px) scale(0.95)';
    toast.style.transition = 'opacity 0.2s, transform 0.2s';
    setTimeout(() => toast.remove(), 200);
  }, 3500);
}

// 12. App Initialization
window.addEventListener('DOMContentLoaded', () => {
  // Setup defaults
  renderDashboard();
});
