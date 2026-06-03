"use client";

import { useEffect, useState } from "react";
import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent,
  closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus, Search, Building2, Calendar, Link as LinkIcon,
  MoreHorizontal, GripVertical, X, Loader2, UserPlus,
  AlertCircle, MessageSquarePlus, Edit3, ExternalLink
} from "lucide-react";
import { RecruiterStatus } from "@/models/Recruiter";

type Recruiter = {
  _id: string;
  name: string;
  role: string;
  company: string;
  status: RecruiterStatus;
  linkedinUrl?: string;
  lastContactDate?: string;
  nextFollowUpDate?: string;
  notes?: string;
};

const COLUMNS: { id: RecruiterStatus; title: string; color: string }[] = [
  { id: "To Contact", title: "To Contact", color: "bg-slate-400" },
  { id: "Contacted", title: "Contacted", color: "bg-blue-400" },
  { id: "Followed Up", title: "Followed Up", color: "bg-yellow-400" },
  { id: "Interview Scheduled", title: "Interviewing", color: "bg-primary" },
  { id: "Offer", title: "Offer 🎉", color: "bg-green-400" },
  { id: "Rejected", title: "Rejected", color: "bg-red-400" },
];

// ── Recruiter Card ────────────────────────────────────────────────
function SortableRecruiterCard({ recruiter }: { recruiter: Recruiter }) {
  const [showActions, setShowActions] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: recruiter._id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
    >
      <motion.div
        layoutId={`card-${recruiter._id}`}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="bg-background border border-border rounded-xl p-4 shadow-sm hover:border-border/80 hover:shadow-md transition-all group cursor-grab active:cursor-grabbing relative"
      >
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="relative">
            <button 
              className="h-6 w-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-hover flex items-center justify-center transition-colors"
              onClick={(e) => { e.stopPropagation(); setShowActions(!showActions); }}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {showActions && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 5 }}
                  className="absolute right-0 top-full mt-1 w-40 bg-surface border border-border rounded-md shadow-lg overflow-hidden py-1 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="w-full text-left px-3 py-2 text-xs hover:bg-surface-hover flex items-center gap-2 text-foreground" onClick={() => window.location.href='/dashboard/generator'}>
                    <MessageSquarePlus className="h-3 w-3" /> Generate Message
                  </button>
                  {recruiter.linkedinUrl && (
                    <button className="w-full text-left px-3 py-2 text-xs hover:bg-surface-hover flex items-center gap-2 text-foreground" onClick={() => window.open(recruiter.linkedinUrl, '_blank')}>
                      <ExternalLink className="h-3 w-3" /> Open LinkedIn
                    </button>
                  )}
                  <button className="w-full text-left px-3 py-2 text-xs hover:bg-surface-hover flex items-center gap-2 text-foreground" onClick={() => setShowActions(false)}>
                    <Edit3 className="h-3 w-3" /> Edit Notes
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-start gap-2.5" onClick={() => setShowActions(false)}>
          <div {...attributes} {...listeners} className="mt-0.5 text-muted-foreground/30 hover:text-muted-foreground/60 touch-none shrink-0">
            <GripVertical className="h-4 w-4" />
          </div>
          <div className="space-y-2.5 flex-1 min-w-0 pr-6">
            <div>
              <h4 className="font-semibold text-foreground text-sm truncate">{recruiter.name}</h4>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 truncate">
                <Building2 className="h-3 w-3 shrink-0" />
                {recruiter.role} · {recruiter.company}
              </p>
            </div>

            {(recruiter.linkedinUrl || recruiter.nextFollowUpDate) && (
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                {recruiter.linkedinUrl && (
                  <a
                    href={recruiter.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded flex items-center gap-1 hover:bg-primary/20 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LinkIcon className="h-2.5 w-2.5" /> LinkedIn
                  </a>
                )}
                {recruiter.nextFollowUpDate && (
                  <span className="text-[10px] bg-surface text-muted-foreground px-2 py-0.5 rounded flex items-center gap-1">
                    <Calendar className="h-2.5 w-2.5" />
                    {new Date(recruiter.nextFollowUpDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                )}
              </div>
            )}

            {recruiter.notes && (
              <p className="text-[10px] text-muted-foreground bg-surface px-2 py-1.5 rounded-lg line-clamp-2 leading-relaxed">
                {recruiter.notes}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Add Recruiter Modal ───────────────────────────────────────────
function AddRecruiterModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (r: Recruiter) => void;
}) {
  const [form, setForm] = useState({
    name: "", company: "", role: "Technical Recruiter",
    linkedinUrl: "", notes: "", status: "To Contact" as RecruiterStatus,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.company) {
      setError("Name and company are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/recruiters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      onAdd(data);
      onClose();
      setForm({ name: "", company: "", role: "Technical Recruiter", linkedinUrl: "", notes: "", status: "To Contact" });
    } catch {
      setError("Failed to add recruiter. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-primary/10">
                    <UserPlus className="h-4 w-4 text-primary" />
                  </div>
                  <h2 className="font-bold text-foreground">Add Recruiter</h2>
                </div>
                <button
                  onClick={onClose}
                  className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-hover flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Recruiter Name *</label>
                    <Input
                      placeholder="Jane Doe"
                      className="bg-background border-border h-9 text-sm"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      autoFocus
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Company *</label>
                    <Input
                      placeholder="Google"
                      className="bg-background border-border h-9 text-sm"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Their Role</label>
                    <Input
                      placeholder="Technical Recruiter"
                      className="bg-background border-border h-9 text-sm"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">LinkedIn URL</label>
                    <Input
                      placeholder="https://linkedin.com/in/..."
                      className="bg-background border-border h-9 text-sm"
                      value={form.linkedinUrl}
                      onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Initial Status</label>
                    <select
                      className="w-full h-9 rounded-md bg-background border border-border text-sm px-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value as RecruiterStatus })}
                    >
                      {COLUMNS.map((col) => (
                        <option key={col.id} value={col.id} className="bg-surface">{col.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Notes (optional)</label>
                    <textarea
                      placeholder="Met at career fair, interested in SWE intern..."
                      className="w-full rounded-lg bg-background border border-border text-sm px-3 py-2 min-h-[70px] resize-none focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1 border-border" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(109,93,246,0.3)]"
                  >
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                    {saving ? "Adding..." : "Add Recruiter"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main CRM Page ─────────────────────────────────────────────────
export default function CRMPage() {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => { fetchRecruiters(); }, []);

  const fetchRecruiters = async () => {
    try {
      const res = await fetch("/api/recruiters");
      const data = await res.json();
      if (Array.isArray(data)) setRecruiters(data);
    } catch (error) {
      console.error("Failed to fetch recruiters", error);
    } finally {
      setLoading(false);
    }
  };

  const updateRecruiterStatus = async (id: string, newStatus: RecruiterStatus) => {
    try {
      await fetch(`/api/recruiters/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDragStart = (event: DragStartEvent) => setActiveId(event.active.id as string);

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeIdStr = active.id as string;
    const overIdStr = over.id as string;
    const activeRecruiter = recruiters.find((r) => r._id === activeIdStr);
    if (!activeRecruiter) return;

    const isOverColumn = COLUMNS.some((col) => col.id === overIdStr);
    if (isOverColumn) {
      const newStatus = overIdStr as RecruiterStatus;
      if (activeRecruiter.status !== newStatus) {
        setRecruiters((prev) => prev.map((r) => (r._id === activeIdStr ? { ...r, status: newStatus } : r)));
        updateRecruiterStatus(activeIdStr, newStatus);
      }
      return;
    }

    const overRecruiter = recruiters.find((r) => r._id === overIdStr);
    if (overRecruiter && activeRecruiter.status !== overRecruiter.status) {
      const newStatus = overRecruiter.status;
      setRecruiters((prev) => prev.map((r) => (r._id === activeIdStr ? { ...r, status: newStatus } : r)));
      updateRecruiterStatus(activeIdStr, newStatus);
    }
  };

  const filteredRecruiters = recruiters.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeRecruiter = recruiters.find((r) => r._id === activeId);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 shrink-0"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">CRM Board</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">
            {recruiters.length} recruiter{recruiters.length !== 1 ? "s" : ""} in your pipeline
          </p>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search name or company..."
              className="pl-9 bg-surface border-border focus-visible:ring-primary h-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(109,93,246,0.25)] h-9"
              onClick={() => setModalOpen(true)}
            >
              <Plus className="mr-1.5 h-4 w-4" /> Add Recruiter
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm">Loading your pipeline...</p>
          </div>
        </div>
      )}

      {/* Empty State — No recruiters at all */}
      {!loading && recruiters.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center text-center space-y-5"
        >
          <div className="h-20 w-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <UserPlus className="h-9 w-9 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">No recruiters yet</h3>
            <p className="text-muted-foreground text-sm mt-1.5 max-w-xs">
              Add your first recruiter to start tracking your pipeline. You can also generate a message first and save them from there.
            </p>
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(109,93,246,0.3)]"
            onClick={() => setModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Your First Recruiter
          </Button>
        </motion.div>
      )}

      {/* Kanban Board */}
      {!loading && recruiters.length > 0 && (
        <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-4 h-full items-start min-w-max pr-4">
              {COLUMNS.map((col, index) => {
                const columnRecruiters = filteredRecruiters.filter((r) => r.status === col.id);
                return (
                  <motion.div
                    key={col.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
                    className="w-[270px] shrink-0 flex flex-col max-h-full"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-3 px-0.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                        <h3 className="font-semibold text-sm text-foreground">{col.title}</h3>
                        <motion.span
                          key={columnRecruiters.length}
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 20 }}
                          className="text-[11px] bg-surface text-muted-foreground px-2 py-0.5 rounded-full font-medium border border-border"
                        >
                          {columnRecruiters.length}
                        </motion.span>
                      </div>
                      <button
                        onClick={() => setModalOpen(true)}
                        className="h-6 w-6 rounded-md text-muted-foreground/50 hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-colors"
                        title="Add recruiter"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Column Body */}
                    <div
                      className="flex-1 bg-surface/40 border border-border rounded-2xl p-2.5 flex flex-col gap-2.5 overflow-y-auto custom-scrollbar min-h-[200px]"
                      id={col.id}
                    >
                      <SortableContext items={columnRecruiters.map((r) => r._id)}>
                        <AnimatePresence mode="popLayout">
                          {columnRecruiters.map((recruiter) => (
                            <motion.div
                              key={recruiter._id}
                              initial={{ opacity: 0, scale: 0.96 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.96, height: 0 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                              <SortableRecruiterCard recruiter={recruiter} />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </SortableContext>

                      {columnRecruiters.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="flex-1 min-h-[120px] flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-xl text-xs text-muted-foreground/40 gap-1.5"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Drag here or add</span>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <DragOverlay>
              {activeRecruiter && <SortableRecruiterCard recruiter={activeRecruiter} />}
            </DragOverlay>
          </DndContext>
        </div>
      )}

      {/* Add Recruiter Modal */}
      <AddRecruiterModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={(newRecruiter) => setRecruiters((prev) => [...prev, newRecruiter])}
      />
    </div>
  );
}
