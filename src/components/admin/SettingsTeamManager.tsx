"use client";

import { useState } from "react";
import { setUserRole } from "@/app/actions/admin";
import { updatePassword, updateAdminEmail } from "@/app/actions/auth";

export interface UserProfileItem {
  id: string;
  full_name?: string | null;
  email: string;
  role: string;
  created_at: string;
}

interface SettingsTeamManagerProps {
  profiles: UserProfileItem[];
  currentUserId: string;
  currentUserEmail?: string;
  defaultTab?: "security" | "users";
}

export default function SettingsTeamManager({
  profiles,
  currentUserId,
  currentUserEmail = "admin@pinnaclelandscapesolution.com",
  defaultTab = "security"
}: SettingsTeamManagerProps) {
  const [activeTab, setActiveTab] = useState<"security" | "users">(defaultTab);

  // Email update state
  const [adminEmail, setAdminEmail] = useState(currentUserEmail);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  // Password state
  const [pwdNew, setPwdNew] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdStatus, setPwdStatus] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailStatus(null);

    const formData = new FormData();
    formData.append("email", adminEmail);

    const res = await updateAdminEmail({}, formData);
    setEmailLoading(false);
    if (res.error) {
      setEmailStatus({ error: res.error });
    } else {
      setEmailStatus({ success: true, message: res.message || "Admin login email updated successfully!" });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdLoading(true);
    setPwdStatus(null);

    const formData = new FormData();
    formData.append("password", pwdNew);
    formData.append("confirm", pwdConfirm);

    const res = await updatePassword({}, formData);
    setPwdLoading(false);
    if (res.error) {
      setPwdStatus({ error: res.error });
    } else {
      setPwdStatus({ success: true, message: res.message || "Password updated successfully!" });
      setPwdNew("");
      setPwdConfirm("");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950 flex items-center gap-2">
            <span>⚙️</span> Admin Account & Team Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your administrator login email, update password credentials, and oversee staff user roles.
          </p>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === "security"
              ? "bg-brand-900 text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <span>🔐 Admin Account & Credentials</span>
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === "users"
              ? "bg-brand-900 text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <span>👥 Team Accounts & Access Roles</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              activeTab === "users" ? "bg-brand-800 text-brand-100" : "bg-gray-200 text-gray-700"
            }`}
          >
            {profiles.length}
          </span>
        </button>
      </div>

      {/* TAB 1: ADMIN ACCOUNT & CREDENTIALS (EMAIL + PASSWORD) */}
      {activeTab === "security" && (
        <div className="space-y-8 animate-fade-in">
          {/* SECTION A: UPDATE ADMIN LOGIN EMAIL */}
          <div className="card p-6 sm:p-7 bg-white border border-gray-200 shadow-sm max-w-2xl space-y-5">
            <div>
              <h2 className="text-base font-bold text-brand-950 flex items-center gap-2">
                <span>✉️</span> Admin Login Email Address
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                This is the official email address used to log in to the administrator portal.
              </p>
            </div>

            {emailStatus?.success && (
              <div className="p-3.5 rounded-xl bg-sprout-50 border border-sprout-200 text-sprout-900 text-xs font-medium flex items-center gap-2">
                <span>✅</span>
                <span>{emailStatus.message}</span>
              </div>
            )}

            {emailStatus?.error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-medium flex items-center gap-2">
                <span>⚠️</span>
                <span>{emailStatus.error}</span>
              </div>
            )}

            <form onSubmit={handleEmailChange} className="space-y-4">
              <div>
                <label htmlFor="admin-email" className="label text-xs font-semibold text-gray-700">
                  Administrator Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                  placeholder="admin@pinnaclelandscapesolution.com"
                  className="input text-sm font-mono"
                />
                <p className="text-[11px] text-gray-400 mt-1.5">
                  Current Session: <span className="font-mono text-gray-600">{currentUserEmail}</span>
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={emailLoading || adminEmail === currentUserEmail}
                  className="btn-primary py-2 px-5 font-semibold text-xs shadow-sm disabled:opacity-50"
                >
                  {emailLoading ? "Updating Email…" : "Save New Login Email"}
                </button>
              </div>
            </form>
          </div>

          {/* SECTION B: CHANGE ADMIN PASSWORD */}
          <div className="card p-6 sm:p-7 bg-white border border-gray-200 shadow-sm max-w-2xl space-y-5">
            <div>
              <h2 className="text-base font-bold text-brand-950 flex items-center gap-2">
                <span>🔑</span> Change Administrator Password
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Enter a strong new password to update your login credentials.
              </p>
            </div>

            {pwdStatus?.success && (
              <div className="p-3.5 rounded-xl bg-sprout-50 border border-sprout-200 text-sprout-900 text-xs font-medium flex items-center gap-2">
                <span>✅</span>
                <span>{pwdStatus.message}</span>
              </div>
            )}

            {pwdStatus?.error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-medium flex items-center gap-2">
                <span>⚠️</span>
                <span>{pwdStatus.error}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="new-pwd" className="label text-xs font-semibold text-gray-700">
                  New Password
                </label>
                <input
                  id="new-pwd"
                  type="password"
                  value={pwdNew}
                  onChange={(e) => setPwdNew(e.target.value)}
                  required
                  minLength={6}
                  placeholder="Enter new password (min. 6 characters)"
                  className="input text-sm"
                />
              </div>

              <div>
                <label htmlFor="confirm-pwd" className="label text-xs font-semibold text-gray-700">
                  Confirm New Password
                </label>
                <input
                  id="confirm-pwd"
                  type="password"
                  value={pwdConfirm}
                  onChange={(e) => setPwdConfirm(e.target.value)}
                  required
                  minLength={6}
                  placeholder="Re-type new password"
                  className="input text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={pwdLoading}
                  className="btn-primary py-2 px-5 font-semibold text-xs shadow-sm"
                >
                  {pwdLoading ? "Updating Password…" : "Update Admin Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: ADMIN USERS & ROLES */}
      {activeTab === "users" && (
        <div className="space-y-4 max-w-4xl animate-fade-in">
          <div className="card p-6 bg-white border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-brand-950 mb-1">Administrative Team Accounts</h2>
            <p className="text-xs text-gray-500 mb-4">
              Control permissions across the CMS dashboard. Editors have access to content creation, while Admins have full access.
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
                      <td className="px-5 py-4 font-bold text-brand-950">{p.full_name || "Staff Member"}</td>
                      <td className="px-5 py-4 text-xs text-gray-600 font-mono">{p.email}</td>
                      <td className="px-5 py-4">
                        {p.id === currentUserId || p.email === currentUserEmail ? (
                          <span className="rounded-full bg-sprout-100 px-3 py-1 text-xs font-bold uppercase text-sprout-900 border border-sprout-200">
                            {p.role} (Current User)
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
