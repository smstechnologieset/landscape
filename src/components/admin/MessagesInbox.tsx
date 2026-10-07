"use client";

import { useState, useTransition, useEffect } from "react";
import {
  toggleMessageReadAction,
  deleteMessageAction,
  updateConsultationAction,
  deleteConsultationAction,
  updateQuoteAction,
  deleteQuoteAction
} from "@/app/actions/admin-crud";
import type { ContactInquiry } from "@/lib/data-store";

export interface ConsultationItem {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  preferredDate?: string;
  preferredTime?: string;
  consultationType?: string;
  projectDetails?: string;
  message?: string;
  status: "pending" | "approved" | "rejected" | "rescheduled" | "completed" | string;
  adminNotes?: string;
  createdAt: string;
}

export interface QuoteItem {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  company?: string;
  serviceTitle?: string;
  projectLocation?: string;
  projectType?: string;
  projectSize?: string;
  budgetRange?: string;
  desiredTimeline?: string;
  description?: string;
  attachmentUrl?: string;
  status: "new" | "reviewing" | "contacted" | "quoted" | "won" | "closed" | string;
  adminNotes?: string;
  createdAt: string;
}

export type MessageType = "all" | "inquiries" | "consultations" | "quotes";

interface MessagesInboxProps {
  initialInquiries: ContactInquiry[];
  initialConsultations?: ConsultationItem[];
  initialQuotes?: QuoteItem[];
  defaultTab?: MessageType;
}

const CONSULTATION_STATUSES = ["pending", "approved", "rejected", "rescheduled", "completed"] as const;
const QUOTE_STATUSES = ["new", "reviewing", "contacted", "quoted", "won", "closed"] as const;

export default function MessagesInbox({
  initialInquiries,
  initialConsultations = [],
  initialQuotes = [],
  defaultTab = "all"
}: MessagesInboxProps) {
  const [activeTab, setActiveTab] = useState<MessageType>(defaultTab);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(initialInquiries);
  const [consultations, setConsultations] = useState<ConsultationItem[]>(initialConsultations);
  const [quotes, setQuotes] = useState<QuoteItem[]>(initialQuotes);

  const [activeItem, setActiveItem] = useState<{
    type: "inquiry" | "consultation" | "quote";
    data: any;
  } | null>(null);

  const [filterMode, setFilterMode] = useState<"all" | "attention" | "resolved">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  // Internal edit notes state for modal
  const [modalNotes, setModalNotes] = useState("");
  const [modalStatus, setModalStatus] = useState("");

  useEffect(() => {
    setInquiries(initialInquiries);
  }, [initialInquiries]);

  useEffect(() => {
    setConsultations(initialConsultations);
  }, [initialConsultations]);

  useEffect(() => {
    setQuotes(initialQuotes);
  }, [initialQuotes]);

  // Sync modal when active item changes
  useEffect(() => {
    if (activeItem) {
      setModalNotes(activeItem.data.adminNotes || "");
      setModalStatus(activeItem.data.status || "");
    }
  }, [activeItem]);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handlers for Inquiries
  const handleToggleInquiryRead = (id: string, newReadState?: boolean) => {
    startTransition(async () => {
      await toggleMessageReadAction(id, newReadState);
      setInquiries((prev) =>
        prev.map((m) => {
          if (m.id === id) {
            const updatedRead = newReadState !== undefined ? newReadState : !m.isRead;
            if (activeItem?.type === "inquiry" && activeItem.data.id === id) {
              setActiveItem({ type: "inquiry", data: { ...activeItem.data, isRead: updatedRead } });
            }
            return { ...m, isRead: updatedRead };
          }
          return m;
        })
      );
    });
  };

  const handleDeleteInquiry = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete inquiry from ${name}?`)) {
      startTransition(async () => {
        await deleteMessageAction(id);
        setInquiries((prev) => prev.filter((m) => m.id !== id));
        if (activeItem?.type === "inquiry" && activeItem.data.id === id) {
          setActiveItem(null);
        }
      });
    }
  };

  // Handlers for Consultations
  const handleUpdateConsultation = (id: number, status: string, notes: string) => {
    startTransition(async () => {
      await updateConsultationAction(id, status, notes);
      setConsultations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status, adminNotes: notes } : c))
      );
      if (activeItem?.type === "consultation" && activeItem.data.id === id) {
        setActiveItem({
          type: "consultation",
          data: { ...activeItem.data, status, adminNotes: notes }
        });
      }
    });
  };

  const handleDeleteConsultation = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete consultation request from ${name}?`)) {
      startTransition(async () => {
        await deleteConsultationAction(id);
        setConsultations((prev) => prev.filter((c) => c.id !== id));
        if (activeItem?.type === "consultation" && activeItem.data.id === id) {
          setActiveItem(null);
        }
      });
    }
  };

  // Handlers for Quotes
  const handleUpdateQuote = (id: number, status: string, notes: string) => {
    startTransition(async () => {
      await updateQuoteAction(id, status, notes);
      setQuotes((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status, adminNotes: notes } : q))
      );
      if (activeItem?.type === "quote" && activeItem.data.id === id) {
        setActiveItem({
          type: "quote",
          data: { ...activeItem.data, status, adminNotes: notes }
        });
      }
    });
  };

  const handleDeleteQuote = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete quote request from ${name}?`)) {
      startTransition(async () => {
        await deleteQuoteAction(id);
        setQuotes((prev) => prev.filter((q) => q.id !== id));
        if (activeItem?.type === "quote" && activeItem.data.id === id) {
          setActiveItem(null);
        }
      });
    }
  };

  // Counts
  const unreadInquiriesCount = inquiries.filter((i) => !i.isRead).length;
  const pendingConsultationsCount = consultations.filter((c) => c.status === "pending").length;
  const newQuotesCount = quotes.filter((q) => q.status === "new").length;
  const totalAttentionCount = unreadInquiriesCount + pendingConsultationsCount + newQuotesCount;

  // Build unified items
  const unifiedItems: Array<{
    uniqueKey: string;
    type: "inquiry" | "consultation" | "quote";
    id: string | number;
    fullName: string;
    email: string;
    phone?: string;
    organizationOrCompany?: string;
    topicOrService: string;
    summaryText: string;
    statusLabel: string;
    isAttention: boolean;
    date: string;
    raw: any;
  }> = [];

  if (activeTab === "all" || activeTab === "inquiries") {
    inquiries.forEach((item) => {
      const isAttn = !item.isRead;
      unifiedItems.push({
        uniqueKey: `inq-${item.id}`,
        type: "inquiry",
        id: item.id,
        fullName: item.fullName,
        email: item.email,
        phone: item.phone,
        organizationOrCompany: item.organization,
        topicOrService: item.serviceOfInterest || item.subject,
        summaryText: item.message,
        statusLabel: item.isRead ? "Read" : "Unread",
        isAttention: isAttn,
        date: item.createdAt,
        raw: item
      });
    });
  }

  if (activeTab === "all" || activeTab === "consultations") {
    consultations.forEach((item) => {
      const isAttn = item.status === "pending";
      unifiedItems.push({
        uniqueKey: `con-${item.id}`,
        type: "consultation",
        id: item.id,
        fullName: item.fullName,
        email: item.email,
        phone: item.phone,
        organizationOrCompany: item.consultationType,
        topicOrService: `Consultation (${item.preferredDate || "No date"} ${item.preferredTime || ""})`,
        summaryText: item.projectDetails || item.message || "",
        statusLabel: item.status.toUpperCase(),
        isAttention: isAttn,
        date: item.createdAt,
        raw: item
      });
    });
  }

  if (activeTab === "all" || activeTab === "quotes") {
    quotes.forEach((item) => {
      const isAttn = item.status === "new";
      unifiedItems.push({
        uniqueKey: `quo-${item.id}`,
        type: "quote",
        id: item.id,
        fullName: item.fullName,
        email: item.email,
        phone: item.phone,
        organizationOrCompany: item.company,
        topicOrService: item.serviceTitle || item.projectType || "Quote Request",
        summaryText: item.description || "",
        statusLabel: item.status.toUpperCase(),
        isAttention: isAttn,
        date: item.createdAt,
        raw: item
      });
    });
  }

  // Sort by newest date
  unifiedItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Filter items
  const filteredItems = unifiedItems.filter((item) => {
    if (filterMode === "attention" && !item.isAttention) return false;
    if (filterMode === "resolved" && item.isAttention) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.fullName.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        (item.phone && item.phone.toLowerCase().includes(q)) ||
        (item.organizationOrCompany && item.organizationOrCompany.toLowerCase().includes(q)) ||
        item.topicOrService.toLowerCase().includes(q) ||
        item.summaryText.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const openItemModal = (item: (typeof unifiedItems)[0]) => {
    setActiveItem({ type: item.type, data: item.raw });
    if (item.type === "inquiry" && !item.raw.isRead) {
      handleToggleInquiryRead(item.raw.id, true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950 flex items-center gap-2">
            <span>✉️</span> Messages & Inquiries Center
            {totalAttentionCount > 0 && (
              <span className="rounded-full bg-sprout-600 text-white text-xs px-2.5 py-0.5 font-bold animate-pulse">
                {totalAttentionCount} Action Required
              </span>
            )}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Consolidated communication inbox for client inquiries, consultation requests, and project quotation briefs.
          </p>
        </div>

        {/* Global Search Box */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search all communications…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input !w-64 !py-1.5 text-xs bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Main Stream Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "all"
                ? "bg-brand-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>📋 All Streams</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeTab === "all" ? "bg-brand-800 text-brand-100" : "bg-gray-200 text-gray-700"
              }`}
            >
              {inquiries.length + consultations.length + quotes.length}
            </span>
            {totalAttentionCount > 0 && (
              <span className="rounded-full bg-sprout-500 text-white text-[10px] px-1.5 py-0.2 font-bold">
                {totalAttentionCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "inquiries"
                ? "bg-brand-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>✉️ Contact Inquiries</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeTab === "inquiries" ? "bg-brand-800 text-brand-100" : "bg-gray-200 text-gray-700"
              }`}
            >
              {inquiries.length}
            </span>
            {unreadInquiriesCount > 0 && (
              <span className="rounded-full bg-sprout-500 text-white text-[10px] px-1.5 py-0.2 font-bold">
                {unreadInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("consultations")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "consultations"
                ? "bg-brand-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>📅 Consultations</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeTab === "consultations" ? "bg-brand-800 text-brand-100" : "bg-gray-200 text-gray-700"
              }`}
            >
              {consultations.length}
            </span>
            {pendingConsultationsCount > 0 && (
              <span className="rounded-full bg-amber-500 text-white text-[10px] px-1.5 py-0.2 font-bold">
                {pendingConsultationsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("quotes")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "quotes"
                ? "bg-brand-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>💰 Quote Requests</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeTab === "quotes" ? "bg-brand-800 text-brand-100" : "bg-gray-200 text-gray-700"
              }`}
            >
              {quotes.length}
            </span>
            {newQuotesCount > 0 && (
              <span className="rounded-full bg-accent-500 text-white text-[10px] px-1.5 py-0.2 font-bold">
                {newQuotesCount}
              </span>
            )}
          </button>
        </div>

        {/* Sub-status Filter Buttons */}
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 text-xs">
          <button
            onClick={() => setFilterMode("all")}
            className={`rounded-md px-3 py-1 font-medium transition ${
              filterMode === "all" ? "bg-brand-800 text-white font-semibold" : "text-gray-600 hover:text-brand-900"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterMode("attention")}
            className={`rounded-md px-3 py-1 font-medium transition ${
              filterMode === "attention"
                ? "bg-brand-800 text-white font-semibold"
                : "text-gray-600 hover:text-brand-900"
            }`}
          >
            Needs Action
          </button>
          <button
            onClick={() => setFilterMode("resolved")}
            className={`rounded-md px-3 py-1 font-medium transition ${
              filterMode === "resolved"
                ? "bg-brand-800 text-white font-semibold"
                : "text-gray-600 hover:text-brand-900"
            }`}
          >
            Handled / Closed
          </button>
        </div>
      </div>

      {/* Messages Table */}
      <div className="card overflow-hidden bg-white border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Type & Status</th>
                <th className="px-5 py-3.5">Sender & Organization</th>
                <th className="px-5 py-3.5">Topic / Brief Details</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <tr
                  key={item.uniqueKey}
                  onClick={() => openItemModal(item)}
                  className={`cursor-pointer transition-colors ${
                    item.isAttention
                      ? "bg-sprout-50/25 hover:bg-sprout-50/50 font-medium"
                      : "hover:bg-gray-50/80"
                  }`}
                >
                  {/* Type & Status */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1 items-start">
                      {item.type === "inquiry" && (
                        <span className="inline-flex items-center gap-1 rounded bg-blue-50 text-blue-800 px-2 py-0.5 text-[11px] font-bold border border-blue-200">
                          ✉️ Inquiry
                        </span>
                      )}
                      {item.type === "consultation" && (
                        <span className="inline-flex items-center gap-1 rounded bg-amber-50 text-amber-900 px-2 py-0.5 text-[11px] font-bold border border-amber-200">
                          📅 Consultation
                        </span>
                      )}
                      {item.type === "quote" && (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-50 text-emerald-900 px-2 py-0.5 text-[11px] font-bold border border-emerald-200">
                          💰 Quote Request
                        </span>
                      )}

                      {/* Status indicator */}
                      {item.isAttention ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sprout-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-sprout-600 animate-pulse" />
                          {item.statusLabel}
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-400 font-medium">
                          {item.statusLabel}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Sender */}
                  <td className="px-5 py-4">
                    <div className="font-bold text-brand-950">{item.fullName}</div>
                    {item.organizationOrCompany && (
                      <div className="text-xs text-gray-600 font-medium">{item.organizationOrCompany}</div>
                    )}
                    <div className="text-[11px] text-gray-400 font-mono mt-0.5">{item.email}</div>
                  </td>

                  {/* Topic / Details */}
                  <td className="px-5 py-4">
                    <div className="font-semibold text-brand-900 line-clamp-1">{item.topicOrService}</div>
                    <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.summaryText}</div>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => openItemModal(item)}
                      className="font-semibold text-xs text-brand-700 hover:text-brand-950 bg-gray-100 hover:bg-brand-50 px-2.5 py-1 rounded transition"
                    >
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-gray-500 text-sm">
                    No messages found matching this stream and filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* POPUP DETAIL MODAL */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="card w-full max-w-2xl bg-white p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <div className="flex items-center gap-2">
                  {activeItem.type === "inquiry" && (
                    <span className="rounded bg-blue-100 text-blue-900 px-2.5 py-0.5 text-xs font-bold">
                      ✉️ Contact Inquiry
                    </span>
                  )}
                  {activeItem.type === "consultation" && (
                    <span className="rounded bg-amber-100 text-amber-900 px-2.5 py-0.5 text-xs font-bold">
                      📅 Consultation Booking
                    </span>
                  )}
                  {activeItem.type === "quote" && (
                    <span className="rounded bg-emerald-100 text-emerald-900 px-2.5 py-0.5 text-xs font-bold">
                      💰 Project Quotation Request
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    Received on {new Date(activeItem.data.createdAt).toLocaleString()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-brand-950 mt-2">
                  {activeItem.type === "inquiry" && (activeItem.data.subject || "Inquiry Subject")}
                  {activeItem.type === "consultation" && `Consultation Request: ${activeItem.data.fullName}`}
                  {activeItem.type === "quote" && `Project Quote: ${activeItem.data.fullName}`}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="rounded-lg p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                aria-label="Close popup"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Sender Profile Box */}
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-200 grid sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-400 block font-medium">Contact Person:</span>
                <span className="font-bold text-brand-950 text-sm">{activeItem.data.fullName}</span>
                {(activeItem.data.organization || activeItem.data.company) && (
                  <span className="block text-gray-600 font-medium">
                    {activeItem.data.organization || activeItem.data.company}
                  </span>
                )}
              </div>

              <div>
                <span className="text-gray-400 block font-medium">Direct Coordinates:</span>
                <a
                  href={`mailto:${activeItem.data.email}`}
                  className="font-semibold text-brand-700 hover:underline block truncate"
                >
                  ✉️ {activeItem.data.email}
                </a>
                {activeItem.data.phone && (
                  <a
                    href={`tel:${activeItem.data.phone}`}
                    className="font-semibold text-brand-700 hover:underline block mt-0.5"
                  >
                    📞 {activeItem.data.phone}
                  </a>
                )}
                {activeItem.data.whatsapp && (
                  <div className="text-green-700 font-semibold mt-0.5">
                    WhatsApp: {activeItem.data.whatsapp}
                  </div>
                )}
              </div>
            </div>

            {/* Content Specific to Stream */}
            {activeItem.type === "inquiry" && (
              <div className="space-y-4">
                {activeItem.data.serviceOfInterest && (
                  <div>
                    <span className="text-xs text-gray-500 font-semibold">Service of Interest:</span>
                    <div className="mt-1 font-semibold text-sm text-brand-900 bg-brand-50 px-3 py-1.5 rounded-lg border border-brand-100">
                      {activeItem.data.serviceOfInterest}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Inquiry Message
                  </h3>
                  <div className="p-4 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {activeItem.data.message}
                  </div>
                </div>
              </div>
            )}

            {activeItem.type === "consultation" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-200 text-xs">
                  <div>
                    <span className="text-gray-500 font-semibold block">Preferred Date:</span>
                    <span className="font-bold text-brand-900">{activeItem.data.preferredDate || "—"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-semibold block">Preferred Time:</span>
                    <span className="font-bold text-brand-900">{activeItem.data.preferredTime || "—"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-semibold block">Consultation Type:</span>
                    <span className="font-bold text-brand-900">{activeItem.data.consultationType || "—"}</span>
                  </div>
                </div>

                {activeItem.data.projectDetails && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                      Project Details
                    </h3>
                    <div className="p-3 rounded-lg border border-gray-200 bg-white text-gray-800 text-xs leading-relaxed whitespace-pre-wrap">
                      {activeItem.data.projectDetails}
                    </div>
                  </div>
                )}

                {activeItem.data.message && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                      Additional Message
                    </h3>
                    <div className="p-3 rounded-lg border border-gray-200 bg-white text-gray-800 text-xs leading-relaxed whitespace-pre-wrap">
                      {activeItem.data.message}
                    </div>
                  </div>
                )}

                {/* Consultation Status & Internal Notes */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 uppercase">Consultation Workflow Status</span>
                    <select
                      value={modalStatus}
                      onChange={(e) => setModalStatus(e.target.value)}
                      className="input !w-auto !py-1 text-xs bg-white"
                    >
                      {CONSULTATION_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">Internal Admin Notes</label>
                    <textarea
                      rows={2}
                      value={modalNotes}
                      onChange={(e) => setModalNotes(e.target.value)}
                      placeholder="Add private staff notes on this booking…"
                      className="input text-xs bg-white"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() =>
                      handleUpdateConsultation(activeItem.data.id, modalStatus, modalNotes)
                    }
                    className="btn-primary !text-xs !py-1.5"
                  >
                    Save Status & Notes
                  </button>
                </div>
              </div>
            )}

            {activeItem.type === "quote" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs">
                  <div>
                    <span className="text-gray-500 font-semibold block">Service:</span>
                    <span className="font-bold text-brand-900">{activeItem.data.serviceTitle || "—"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-semibold block">Location:</span>
                    <span className="font-bold text-brand-900">{activeItem.data.projectLocation || "—"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-semibold block">Size:</span>
                    <span className="font-bold text-brand-900">{activeItem.data.projectSize || "—"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-semibold block">Budget Range:</span>
                    <span className="font-bold text-brand-900">{activeItem.data.budgetRange || "—"}</span>
                  </div>
                </div>

                {activeItem.data.description && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                      Project Scope & Description
                    </h3>
                    <div className="p-3 rounded-lg border border-gray-200 bg-white text-gray-800 text-xs leading-relaxed whitespace-pre-wrap">
                      {activeItem.data.description}
                    </div>
                  </div>
                )}

                {activeItem.data.attachmentUrl && (
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <span className="text-xs text-gray-600">Client Attachment / Site Plan:</span>
                    <a
                      href={activeItem.data.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary !text-xs !py-1 inline-flex items-center gap-1 font-semibold"
                    >
                      <span>Download Attachment</span>
                      <span>↗</span>
                    </a>
                  </div>
                )}

                {/* Quote Status & Internal Notes */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 uppercase">Quote Workflow Status</span>
                    <select
                      value={modalStatus}
                      onChange={(e) => setModalStatus(e.target.value)}
                      className="input !w-auto !py-1 text-xs bg-white"
                    >
                      {QUOTE_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">Internal Admin Notes</label>
                    <textarea
                      rows={2}
                      value={modalNotes}
                      onChange={(e) => setModalNotes(e.target.value)}
                      placeholder="Add quotation pricing, follow-up dates, or staff notes…"
                      className="input text-xs bg-white"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleUpdateQuote(activeItem.data.id, modalStatus, modalNotes)}
                    className="btn-primary !text-xs !py-1.5"
                  >
                    Save Status & Notes
                  </button>
                </div>
              </div>
            )}

            {/* Modal Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {activeItem.type === "inquiry" && (
                  <button
                    type="button"
                    onClick={() => handleToggleInquiryRead(activeItem.data.id)}
                    disabled={isPending}
                    className="btn-secondary !text-xs !py-2 font-semibold"
                  >
                    {activeItem.data.isRead ? "Mark as Unread" : "Mark as Read"}
                  </button>
                )}
                {activeItem.type === "inquiry" && (
                  <button
                    type="button"
                    onClick={() => handleDeleteInquiry(activeItem.data.id, activeItem.data.fullName)}
                    disabled={isPending}
                    className="text-xs font-semibold text-red-600 hover:text-red-800 px-3 py-2"
                  >
                    Delete Inquiry
                  </button>
                )}
                {activeItem.type === "consultation" && (
                  <button
                    type="button"
                    onClick={() => handleDeleteConsultation(activeItem.data.id, activeItem.data.fullName)}
                    disabled={isPending}
                    className="text-xs font-semibold text-red-600 hover:text-red-800 px-3 py-2"
                  >
                    Delete Booking
                  </button>
                )}
                {activeItem.type === "quote" && (
                  <button
                    type="button"
                    onClick={() => handleDeleteQuote(activeItem.data.id, activeItem.data.fullName)}
                    disabled={isPending}
                    className="text-xs font-semibold text-red-600 hover:text-red-800 px-3 py-2"
                  >
                    Delete Quote
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${activeItem.data.email}?subject=${encodeURIComponent(
                    `Re: Landscape Solution PLC Communication - ${activeItem.data.fullName}`
                  )}`}
                  className="btn-primary !text-xs !py-2 font-semibold inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>Reply via Email</span>
                  <span>↗</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="btn-secondary !text-xs !py-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
