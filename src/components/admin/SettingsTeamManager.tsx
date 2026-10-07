"use client";

import { useState } from "react";
import SettingsForm from "@/components/admin/SettingsForm";
import { setUserRole } from "@/app/actions/admin";

export interface UserProfileItem {
  id: string;
  full_name?: string | null;
  email: string;
  role: string;
  created_at: string;
}

interface SettingsTeamManagerProps {
  settingsData: Record<string, string>;
  profiles: UserProfileItem[];
  currentUserId: string;
  defaultTab?: "settings" | "users";
}

export default function SettingsTeamManager({
  settingsData,
  profiles,
  currentUserId,
  defaultTab = "settings"
}: SettingsTeamManagerProps) {
  const [activeTab, setActiveTab] = useState<"settings" | "users">(defaultTab);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950 flex items-center gap-2">
            <span>⚙️</span> Settings & Administration
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure contact coordinates, brand channels, and manage staff user access levels.
          </p>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "settings"
                ? "bg-brand-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>⚙️ Site Settings</span>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "users"
                ? "bg-brand-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>👥 Admin Users & Roles</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeTab === "users" ? "bg-brand-800 text-brand-100" : "bg-gray-200 text-gray-700"
              }`}
            >
              {profiles.length}
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: SITE SETTINGS */}
      {activeTab === "settings" && (
        <div className="card p-6 bg-white border border-gray-200 shadow-sm max-w-4xl">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-brand-950">Site & Communication Settings</h2>
            <p className="text-xs text-gray-500">
              Corporate email addresses, phone contacts, WhatsApp, physical address, and social links.
            </p>
          </div>
          <SettingsForm data={settingsData} />
        </div>
      )}

      {/* TAB 2: ADMIN USERS */}
      {activeTab === "users" && (
        <div className="space-y-4 max-w-4xl">
          <div className="card p-5 bg-white border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-brand-950 mb-1">Administrative Team Accounts</h2>
            <p className="text-xs text-gray-500 mb-4">
              Control permissions across the CMS dashboard. Editors have access to content creation, while Admins can manage users and site settings.
            </p>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[560px] text-sm text-left">
                <thead className="border-b bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  <tr>
                    <th className="px-5 py-3.5">Name</th>
                    <th className="px-5 py-3.5">Email</th>
                    <th className="px-5 py-3.5">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {profiles.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition">
                      <td className="px-5 py-4 font-bold text-brand-950">{p.full_name || "—"}</td>
                      <td className="px-5 py-4 text-xs text-gray-500 font-mono">{p.email}</td>
                      <td className="px-5 py-4">
                        {p.id === currentUserId ? (
                          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase text-brand-900 border border-brand-200">
                            {p.role} (You)
                          </span>
                        ) : (
                          <form action={setUserRole} className="flex items-center gap-2">
                            <input type="hidden" name="id" value={p.id} />
                            <label htmlFor={`r-${p.id}`} className="sr-only">Role</label>
                            <select
                              id={`r-${p.id}`}
                              name="role"
                              defaultValue={p.role}
                              className="input !w-auto !py-1 text-xs bg-white font-medium shadow-sm"
                            >
                              <option value="editor">editor</option>
                              <option value="admin">admin</option>
                            </select>
                            <button className="btn-secondary !px-3 !py-1 text-xs font-semibold">
                              Save
                            </button>
                          </form>
                        )}
                      </td>
                    </tr>
                  ))}
                  {profiles.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-5 py-8 text-center text-gray-500 text-sm">
                        No team accounts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
