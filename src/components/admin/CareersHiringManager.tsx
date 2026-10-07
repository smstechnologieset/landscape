"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import {
  deleteJobAction,
  updateApplicationStatusAction,
  deleteApplicationAction
} from "@/app/actions/admin-crud";
import type { JobOpening } from "@/lib/company-data";

export interface ApplicationItem {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  jobTitle: string;
  jobId: number;
  status: string;
  coverLetter?: string;
  resumeUrl?: string;
  createdAt: string;
}

interface CareersHiringManagerProps {
  jobs: JobOpening[];
  applications: ApplicationItem[];
  defaultTab?: "jobs" | "applications";
}

const APPLICATION_STATUSES = ["new", "reviewing", "shortlisted", "rejected", "hired"] as const;

export default function CareersHiringManager({
  jobs,
  applications: initialApplications,
  defaultTab = "jobs"
}: CareersHiringManagerProps) {
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">(defaultTab);
  const [applications, setApplications] = useState<ApplicationItem[]>(initialApplications);
  const [activeModalApplication, setActiveModalApplication] = useState<ApplicationItem | null>(null);

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (id: number, newStatus: string) => {
    startTransition(async () => {
      await updateApplicationStatusAction(id, newStatus);
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
      if (activeModalApplication?.id === id) {
        setActiveModalApplication({ ...activeModalApplication, status: newStatus });
      }
    });
  };

  const handleDeleteApplication = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete application from ${name}?`)) {
      startTransition(async () => {
        await deleteApplicationAction(id);
        setApplications((prev) => prev.filter((a) => a.id !== id));
        if (activeModalApplication?.id === id) {
          setActiveModalApplication(null);
        }
      });
    }
  };

  const newApplicationsCount = applications.filter((a) => a.status === "new").length;

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    if (statusFilter !== "all" && app.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        app.fullName.toLowerCase().includes(q) ||
        app.email.toLowerCase().includes(q) ||
        (app.phone && app.phone.toLowerCase().includes(q)) ||
        app.jobTitle.toLowerCase().includes(q) ||
        (app.coverLetter && app.coverLetter.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        job.title.en.toLowerCase().includes(q) ||
        job.department.en.toLowerCase().includes(q) ||
        job.location.en.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950 flex items-center gap-2">
            <span>💼</span> Careers & Talent Management
            {newApplicationsCount > 0 && (
              <span className="rounded-full bg-sprout-600 text-white text-xs px-2.5 py-0.5 font-bold animate-pulse">
                {newApplicationsCount} New Applicant(s)
              </span>
            )}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage public job vacancies, career requirements, and review incoming job applicant resumes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder={activeTab === "jobs" ? "Search job openings…" : "Search applicants…"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input !w-60 !py-1.5 text-xs bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "jobs"
                ? "bg-brand-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>💼 Job Vacancies</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeTab === "jobs" ? "bg-brand-800 text-brand-100" : "bg-gray-200 text-gray-700"
              }`}
            >
              {jobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "applications"
                ? "bg-brand-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>📄 Candidate Applications</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeTab === "applications" ? "bg-brand-800 text-brand-100" : "bg-gray-200 text-gray-700"
              }`}
            >
              {applications.length}
            </span>
            {newApplicationsCount > 0 && (
              <span className="rounded-full bg-sprout-500 text-white text-[10px] px-1.5 py-0.2 font-bold">
                {newApplicationsCount}
              </span>
            )}
          </button>
        </div>

        {activeTab === "jobs" ? (
          <Link
            href="/admin/careers/new"
            className="btn-primary !text-xs !py-2 font-semibold shadow-sm inline-flex items-center gap-1.5"
          >
            <span>+ Post Job Opening</span>
          </Link>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500 font-medium mr-1">Filter:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input !w-auto !py-1 text-xs bg-white shadow-sm"
            >
              <option value="all">All Statuses ({applications.length})</option>
              {APPLICATION_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st.toUpperCase()} (
                  {applications.filter((a) => a.status === st).length}
                  )
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: JOB VACANCIES */}
      {activeTab === "jobs" && (
        <div className="card overflow-hidden bg-white border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Role Title</th>
                  <th className="px-5 py-3.5">Department</th>
                  <th className="px-5 py-3.5">Type & Location</th>
                  <th className="px-5 py-3.5">Responsibilities & Reqs</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50/80 transition">
                    <td className="px-5 py-4">
                      <div className="font-bold text-brand-950">{job.title.en}</div>
                      {job.title.am && (
                        <div className="text-xs text-gray-500 mt-0.5">{job.title.am}</div>
                      )}
                      <div className="text-[11px] text-gray-400 font-mono mt-0.5">/{job.id}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
                        {job.department.en}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs">
                      <div className="font-semibold text-brand-900">
                        {typeof job.type === "string" ? job.type : job.type.en}
                      </div>
                      <div className="text-gray-500 text-[11px]">
                        {typeof job.location === "string" ? job.location : job.location.en}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-600">
                      <span className="font-semibold text-brand-800">
                        {Array.isArray(job.responsibilities)
                          ? job.responsibilities.length
                          : job.responsibilities?.en?.length || 0}
                      </span>{" "}
                      duties,{" "}
                      <span className="font-semibold text-brand-800">
                        {Array.isArray(job.requirements)
                          ? job.requirements.length
                          : job.requirements?.en?.length || 0}
                      </span>{" "}
                      reqs
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/careers/${job.id}`}
                          className="text-xs font-semibold text-brand-700 hover:text-brand-900 transition hover:underline"
                        >
                          Edit
                        </Link>
                        <AdminDeleteButton
                          id={job.id}
                          itemTitle={job.title.en}
                          onDelete={deleteJobAction}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredJobs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-gray-500 text-sm">
                      No job vacancies found. Click &quot;+ Post Job Opening&quot; to publish one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CANDIDATE APPLICATIONS */}
      {activeTab === "applications" && (
        <div className="card overflow-hidden bg-white border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Candidate</th>
                  <th className="px-5 py-3.5">Role Applied</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setActiveModalApplication(app)}
                    className={`cursor-pointer transition-colors ${
                      app.status === "new"
                        ? "bg-sprout-50/20 hover:bg-sprout-50/50 font-medium"
                        : "hover:bg-gray-50/80"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="font-bold text-brand-950">{app.fullName}</div>
                      <div className="text-xs text-gray-500">{app.email}</div>
                      {app.phone && <div className="text-[11px] text-gray-400">{app.phone}</div>}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-brand-900">{app.jobTitle}</div>
                      {app.coverLetter && (
                        <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {app.coverLetter}
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={app.status}
                        disabled={isPending}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`input !w-auto !py-1 text-xs font-semibold rounded-lg ${
                          app.status === "new"
                            ? "bg-accent-50 text-accent-700 border-accent-300"
                            : app.status === "hired"
                            ? "bg-green-50 text-green-700 border-green-300"
                            : app.status === "shortlisted"
                            ? "bg-blue-50 text-blue-700 border-blue-300"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {APPLICATION_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </td>

                    <td className="px-5 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-3 text-xs">
                        {app.resumeUrl && (
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-brand-700 hover:underline"
                          >
                            Resume ↗
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => setActiveModalApplication(app)}
                          className="font-semibold text-gray-700 hover:text-brand-900 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded"
                        >
                          Review →
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredApplications.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-gray-500 text-sm">
                      No candidate applications found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* APPLICANT REVIEW MODAL */}
      {activeModalApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="card w-full max-w-xl bg-white p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <span className="rounded bg-brand-100 text-brand-900 px-2.5 py-0.5 text-xs font-bold">
                  Applicant Review
                </span>
                <h2 className="text-xl font-bold text-brand-950 mt-2">
                  {activeModalApplication.fullName}
                </h2>
                <p className="text-xs text-gray-500">
                  Applied for <strong>{activeModalApplication.jobTitle}</strong> on{" "}
                  {new Date(activeModalApplication.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalApplication(null)}
                className="rounded-lg p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                ✕
              </button>
            </div>

            <div className="rounded-xl bg-gray-50 p-4 border border-gray-200 grid sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-400 block font-medium">Contact:</span>
                <a
                  href={`mailto:${activeModalApplication.email}`}
                  className="font-semibold text-brand-700 hover:underline block"
                >
                  ✉️ {activeModalApplication.email}
                </a>
                {activeModalApplication.phone && (
                  <a
                    href={`tel:${activeModalApplication.phone}`}
                    className="font-semibold text-brand-700 hover:underline block mt-0.5"
                  >
                    📞 {activeModalApplication.phone}
                  </a>
                )}
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Application Status:</span>
                <select
                  value={activeModalApplication.status}
                  disabled={isPending}
                  onChange={(e) =>
                    handleStatusChange(activeModalApplication.id, e.target.value)
                  }
                  className="input !w-auto !py-1 text-xs font-semibold mt-1"
                >
                  {APPLICATION_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {activeModalApplication.coverLetter && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Cover Letter / Introduction
                </h3>
                <div className="p-4 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {activeModalApplication.coverLetter}
                </div>
              </div>
            )}

            {activeModalApplication.resumeUrl && (
              <div className="p-4 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-brand-900">Curriculum Vitae / Resume</div>
                  <div className="text-xs text-gray-500">Official document submitted by candidate</div>
                </div>
                <a
                  href={activeModalApplication.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !text-xs !py-2 inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>Download Resume</span>
                  <span>↗</span>
                </a>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() =>
                  handleDeleteApplication(
                    activeModalApplication.id,
                    activeModalApplication.fullName
                  )
                }
                className="text-xs font-semibold text-red-600 hover:text-red-800"
              >
                Delete Application
              </button>
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${activeModalApplication.email}?subject=${encodeURIComponent(
                    `Regarding your application for ${activeModalApplication.jobTitle} - Landscape Solution PLC`
                  )}`}
                  className="btn-primary !text-xs !py-2 font-semibold"
                >
                  Email Candidate ↗
                </a>
                <button
                  type="button"
                  onClick={() => setActiveModalApplication(null)}
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
