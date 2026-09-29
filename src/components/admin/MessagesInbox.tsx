"use client";

import { useState, useTransition, useEffect } from "react";
import { toggleMessageReadAction, deleteMessageAction } from "@/app/actions/admin-crud";
import type { ContactInquiry } from "@/lib/data-store";

interface MessagesInboxProps {
  initialMessages: ContactInquiry[];
}

export default function MessagesInbox({ initialMessages }: MessagesInboxProps) {
  const [messages, setMessages] = useState<ContactInquiry[]>(initialMessages);
  const [activeModalMessage, setActiveModalMessage] = useState<ContactInquiry | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  // Keep state synced with props if refreshed
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalMessage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openMessage = (msg: ContactInquiry) => {
    setActiveModalMessage(msg);
    // If opening an unread message, mark it as read automatically
    if (!msg.isRead) {
      handleToggleRead(msg.id, true);
    }
  };

  const handleToggleRead = (id: string, newReadState?: boolean) => {
    startTransition(async () => {
      await toggleMessageReadAction(id, newReadState);
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id === id) {
            const updatedRead = newReadState !== undefined ? newReadState : !m.isRead;
            if (activeModalMessage?.id === id) {
              setActiveModalMessage({ ...activeModalMessage, isRead: updatedRead });
            }
            return { ...m, isRead: updatedRead };
          }
          return m;
        })
      );
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete message from ${name}?`)) {
      startTransition(async () => {
        await deleteMessageAction(id);
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (activeModalMessage?.id === id) {
          setActiveModalMessage(null);
        }
      });
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === "unread" && m.isRead) return false;
    if (filter === "read" && !m.isRead) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.fullName.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        (m.organization && m.organization.toLowerCase().includes(q)) ||
        m.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header with Search and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950 flex items-center gap-2">
            <span>✉️</span> Contact Inquiries Inbox
            {unreadCount > 0 && (
              <span className="rounded-full bg-sprout-600 text-white text-xs px-2.5 py-0.5 font-bold">
                {unreadCount} unread
              </span>
            )}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Click on any message row to open and inspect the full message in a detailed popup window.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Tabs */}
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-md px-3 py-1 font-medium transition ${
                filter === "all" ? "bg-brand-800 text-white font-semibold" : "text-gray-600 hover:text-brand-900"
              }`}
            >
              All ({messages.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`rounded-md px-3 py-1 font-medium transition ${
                filter === "unread" ? "bg-brand-800 text-white font-semibold" : "text-gray-600 hover:text-brand-900"
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter("read")}
              className={`rounded-md px-3 py-1 font-medium transition ${
                filter === "read" ? "bg-brand-800 text-white font-semibold" : "text-gray-600 hover:text-brand-900"
              }`}
            >
              Read ({messages.length - unreadCount})
            </button>
          </div>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search inquiries…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input !w-56 !py-1.5 text-xs bg-white"
          />
        </div>
      </div>

      {/* Messages List Table */}
      <div className="card overflow-hidden bg-white border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Sender & Organization</th>
                <th className="px-5 py-3.5">Subject & Service</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMessages.map((msg) => (
                <tr
                  key={msg.id}
                  onClick={() => openMessage(msg)}
                  className={`cursor-pointer transition-colors ${
                    !msg.isRead
                      ? "bg-sprout-50/30 hover:bg-sprout-50/60 font-medium"
                      : "hover:bg-gray-50/80"
                  }`}
                >
                  <td className="px-5 py-4 whitespace-nowrap">
                    {!msg.isRead ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-sprout-100 text-sprout-800 px-2.5 py-0.5 text-xs font-bold border border-sprout-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-sprout-600 animate-pulse" />
                        Unread
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-500 px-2.5 py-0.5 text-xs font-medium">
                        Read
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-brand-950">{msg.fullName}</div>
                    {msg.organization && (
                      <div className="text-xs text-gray-500">{msg.organization}</div>
                    )}
                    <div className="text-[11px] text-gray-400">{msg.email}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-brand-900 line-clamp-1">{msg.subject}</div>
                    <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">{msg.message}</div>
                    {msg.serviceOfInterest && (
                      <span className="inline-block mt-1 text-[10px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
                        {msg.serviceOfInterest}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-3 text-xs">
                      <button
                        type="button"
                        onClick={() => handleToggleRead(msg.id)}
                        disabled={isPending}
                        className="font-semibold text-brand-700 hover:text-brand-900 transition hover:underline"
                      >
                        {msg.isRead ? "Mark Unread" : "Mark Read"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(msg.id, msg.fullName)}
                        disabled={isPending}
                        className="font-semibold text-red-600 hover:text-red-800 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMessages.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-gray-500 text-sm">
                    No inquiries found matching this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* POPUP DETAIL MODAL WINDOW (USER SPECIAL REQUIREMENT) */}
      {activeModalMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="card w-full max-w-2xl bg-white p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      activeModalMessage.isRead
                        ? "bg-gray-100 text-gray-600"
                        : "bg-sprout-100 text-sprout-800 border border-sprout-300"
                    }`}
                  >
                    {activeModalMessage.isRead ? "Read" : "Unread Inquiry"}
                  </span>
                  <span className="text-xs text-gray-400">
                    Received on {new Date(activeModalMessage.createdAt).toLocaleString()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-brand-950 mt-2">
                  {activeModalMessage.subject}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalMessage(null)}
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
                <span className="text-gray-400 block font-medium">Full Name & Organization:</span>
                <span className="font-bold text-brand-950 text-sm">{activeModalMessage.fullName}</span>
                {activeModalMessage.organization && (
                  <span className="block text-gray-600 font-medium">{activeModalMessage.organization}</span>
                )}
              </div>

              <div>
                <span className="text-gray-400 block font-medium">Contact Details:</span>
                <a
                  href={`mailto:${activeModalMessage.email}`}
                  className="font-semibold text-brand-700 hover:underline block truncate"
                >
                  ✉️ {activeModalMessage.email}
                </a>
                {activeModalMessage.phone && (
                  <a
                    href={`tel:${activeModalMessage.phone}`}
                    className="font-semibold text-brand-700 hover:underline block mt-0.5"
                  >
                    📞 {activeModalMessage.phone}
                  </a>
                )}
              </div>

              {activeModalMessage.serviceOfInterest && (
                <div className="sm:col-span-2 pt-2 border-t border-gray-200/60">
                  <span className="text-gray-400 block font-medium">Service of Interest:</span>
                  <span className="font-semibold text-sprout-900 bg-sprout-100/70 border border-sprout-300 px-2 py-0.5 rounded inline-block mt-0.5">
                    {activeModalMessage.serviceOfInterest}
                  </span>
                </div>
              )}
            </div>

            {/* Message Body */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Inquiry Message
              </h3>
              <div className="p-4 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {activeModalMessage.message}
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleRead(activeModalMessage.id)}
                  disabled={isPending}
                  className="btn-secondary !text-xs !py-2 font-semibold"
                >
                  {activeModalMessage.isRead ? "Mark as Unread" : "Mark as Read"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(activeModalMessage.id, activeModalMessage.fullName)}
                  disabled={isPending}
                  className="text-xs font-semibold text-red-600 hover:text-red-800 px-3 py-2"
                >
                  Delete Message
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${activeModalMessage.email}?subject=${encodeURIComponent(
                    `Re: ${activeModalMessage.subject} - Landscape Solution PLC`
                  )}`}
                  className="btn-primary !text-xs !py-2 font-semibold inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>Reply via Email</span>
                  <span>↗</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveModalMessage(null)}
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
