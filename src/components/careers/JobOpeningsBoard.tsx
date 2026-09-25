"use client";

import { useState } from "react";
import type { JobOpening } from "@/lib/company-data";
import { type Locale, t } from "@/lib/types";

interface JobOpeningsBoardProps {
  jobs: JobOpening[];
  locale: Locale;
}

export default function JobOpeningsBoard({ jobs, locale }: JobOpeningsBoardProps) {
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [applyModalJob, setApplyModalJob] = useState<JobOpening | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolioUrl: "",
    coverNote: ""
  });

  // Extract unique departments
  const departments = ["ALL", ...Array.from(new Set(jobs.map((j) => j.department.en)))];

  const filteredJobs = jobs.filter((job) => {
    const matchesDept = selectedDept === "ALL" || job.department.en === selectedDept;
    const titleText = t(job.title, locale);
    const summaryText = t(job.summary, locale);
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      q === "" ||
      titleText.toLowerCase().includes(q) ||
      summaryText.toLowerCase().includes(q) ||
      job.department.en.toLowerCase().includes(q);
    return matchesDept && matchesQuery;
  });

  const toggleExpand = (id: string) => {
    setExpandedJobId((prev) => (prev === id ? null : id));
  };

  const handleOpenApplyModal = (job: JobOpening) => {
    setApplyModalJob(job);
    setApplicationSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      portfolioUrl: "",
      coverNote: ""
    });
  };

  const handleCloseApplyModal = () => {
    setApplyModalJob(null);
    setApplicationSubmitted(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate swift submission
    setTimeout(() => {
      setSubmitting(false);
      setApplicationSubmitted(true);
    }, 600);
  };

  return (
    <div>
      {/* FILTER & SEARCH BAR */}
      <div className="bg-white border border-brand-100 rounded-2xl p-4 sm:p-6 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Department Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-1">
              {locale === "am" ? "ክፍል:" : "Department:"}
            </span>
            {departments.map((dept) => {
              const count = dept === "ALL" ? jobs.length : jobs.filter((j) => j.department.en === dept).length;
              const isSelected = selectedDept === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-brand-800 text-white shadow-sm"
                      : "bg-brand-50 text-brand-900 hover:bg-brand-100"
                  }`}
                >
                  {dept === "ALL" ? (locale === "am" ? "ሁሉም መደቦች" : "All Roles") : dept}
                  <span
                    className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected ? "bg-brand-900/60 text-white" : "bg-brand-200/60 text-brand-800"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === "am" ? "የስራ መደብ ይፈልጉ..." : "Search positions..."}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* JOBS COUNT HEADER */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs sm:text-sm font-medium text-gray-600">
          {locale === "am"
            ? `${filteredJobs.length} ክፍት የሥራ መደቦች ተገኝተዋል`
            : `Showing ${filteredJobs.length} active position${filteredJobs.length === 1 ? "" : "s"}`}
        </p>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {locale === "am" ? "ማመልከቻዎች ክፍት ናቸው" : "Actively Hiring"}
        </span>
      </div>

      {/* JOB CARDS LIST */}
      {filteredJobs.length === 0 ? (
        <div className="card p-12 text-center bg-brand-50/40 border border-brand-100">
          <p className="text-gray-600 text-sm">
            {locale === "am"
              ? "ከተመረጠው ፍለጋ ጋር የሚዛመድ ክፍት የስራ መደብ አልተገኘም።"
              : "No vacancies match your filter criteria at this time."}
          </p>
          <button
            onClick={() => {
              setSelectedDept("ALL");
              setSearchQuery("");
            }}
            className="mt-4 text-xs font-semibold text-brand-800 underline uppercase tracking-wider"
          >
            {locale === "am" ? "ሁሉንም መደቦች አሳይ" : "Reset Filter"}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map((job) => {
            const isExpanded = expandedJobId === job.id;
            const title = t(job.title, locale);
            const dept = locale === "am" ? (job.department.am || job.department.en) : job.department.en;
            const loc = t(job.location, locale);
            const jobType = t(job.type, locale);
            const exp = t(job.experience, locale);
            const summary = t(job.summary, locale);
            const responsibilities = (locale === "am" && job.responsibilities.am && job.responsibilities.am.length > 0)
              ? job.responsibilities.am
              : job.responsibilities.en;
            const requirements = (locale === "am" && job.requirements.am && job.requirements.am.length > 0)
              ? job.requirements.am
              : job.requirements.en;
            const salary = t(job.salary, locale);

            return (
              <div
                key={job.id}
                className={`card border transition-all duration-300 ${
                  isExpanded
                    ? "border-brand-600 bg-white shadow-md ring-1 ring-brand-600/20"
                    : "border-brand-100 bg-white hover:border-brand-300 hover:shadow-sm"
                }`}
              >
                <div className="p-6 sm:p-8">
                  {/* Card Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-brand-100/70 text-brand-900 border border-brand-200">
                          {dept}
                        </span>
                        <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {jobType}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-medium text-brand-950">
                        {title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 shrink-0">
                      <span className="inline-flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded border border-gray-200">
                        📍 {loc}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded border border-gray-200">
                        ⏳ {exp}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="mt-4 text-xs sm:text-sm text-gray-700 leading-relaxed max-w-3xl">
                    {summary}
                  </p>

                  {/* Compensation & Deadline Row */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-4 text-gray-600">
                      <span>
                        <strong className="text-gray-900 font-medium">
                          {locale === "am" ? "ደመወዝ:" : "Compensation:"}
                        </strong>{" "}
                        {salary}
                      </span>
                      <span>
                        <strong className="text-gray-900 font-medium">
                          {locale === "am" ? "የማመልከቻ ቀነ-ገደብ:" : "Deadline:"}
                        </strong>{" "}
                        {job.deadline}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                      <button
                        onClick={() => toggleExpand(job.id)}
                        className="text-xs font-semibold text-brand-800 hover:text-brand-950 flex items-center gap-1 underline underline-offset-4 py-1.5"
                      >
                        {isExpanded
                          ? locale === "am"
                            ? "ዝርዝሩን ደብቅ ▲"
                            : "Hide Details ▲"
                          : locale === "am"
                          ? "ሙሉ ዝርዝር አሳይ ▼"
                          : "View Job Details ▼"}
                      </button>

                      <button
                        onClick={() => handleOpenApplyModal(job)}
                        className="btn-primary text-xs uppercase tracking-wider px-4 py-2 font-medium"
                      >
                        {locale === "am" ? "አመልክት" : "Apply Now"}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Accordion: Responsibilities, Requirements & Apply info */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-brand-100 space-y-6 animate-fade-up">
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Responsibilities */}
                        <div className="bg-brand-50/50 rounded-xl p-5 border border-brand-100">
                          <h4 className="font-semibold text-xs uppercase tracking-wider text-brand-950 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-700" />
                            {locale === "am" ? "ዋና ዋና የስራ ኃላፊነቶች" : "Key Responsibilities"}
                          </h4>
                          <ul className="space-y-2.5">
                            {responsibilities.map((resp, idx) => (
                              <li key={idx} className="text-xs text-gray-700 flex items-start gap-2 leading-relaxed">
                                <span className="text-sprout-700 font-bold shrink-0 mt-0.5">✓</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Requirements */}
                        <div className="bg-brand-50/50 rounded-xl p-5 border border-brand-100">
                          <h4 className="font-semibold text-xs uppercase tracking-wider text-brand-950 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-700" />
                            {locale === "am" ? "የስራው መስፈርቶች እና ክህሎቶች" : "Qualifications & Requirements"}
                          </h4>
                          <ul className="space-y-2.5">
                            {requirements.map((req, idx) => (
                              <li key={idx} className="text-xs text-gray-700 flex items-start gap-2 leading-relaxed">
                                <span className="text-sprout-700 font-bold shrink-0 mt-0.5">✓</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Application options bar inside expanded section */}
                      <div className="bg-brand-950 text-white rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-sprout-400">
                            {locale === "am" ? "ለዚህ መደብ ዝግጁ ነዎት?" : "Ready to Shape Ethiopia's Landscapes?"}
                          </p>
                          <p className="text-xs text-brand-100/80 mt-1">
                            {locale === "am"
                              ? "የማመልከቻ ሰነድዎን በቀጥታ ያስገቡ ወይም በኢሜይል ይላኩልን።"
                              : "Submit your credentials via our online form or email your CV to careers@landscapesolutionet.com"}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <a
                            href={`mailto:careers@landscapesolutionet.com?subject=Application for ${job.title.en} - [Your Name]&body=Dear Landscape Solution PLC Recruitment Team,%0D%0A%0D%0APlease find attached my CV and portfolio for the position of ${job.title.en}.%0D%0A%0D%0AFull Name: %0D%0APhone: %0D%0AExperience: %0D%0A%0D%0ABest regards,%0D%0A`}
                            className="btn-secondary text-xs uppercase tracking-wider px-4 py-2 font-medium bg-white/10 text-white border-white/20 hover:bg-white/20"
                          >
                            ✉ {locale === "am" ? "በኢሜይል አመልክት" : "Apply via Email"}
                          </a>
                          <button
                            onClick={() => handleOpenApplyModal(job)}
                            className="btn-primary text-xs uppercase tracking-wider px-5 py-2 font-medium"
                          >
                            {locale === "am" ? "የማመልከቻ ፎርም ሙላ" : "Fill Online Application"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SPECULATIVE APPLICATIONS CARD */}
      <div className="mt-14 card p-8 sm:p-10 border border-brand-200 bg-brand-50/60 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-800">
          {locale === "am" ? "አጠቃላይ ማመልከቻ" : "General Inquiries"}
        </span>
        <h4 className="mt-2 font-serif text-xl sm:text-2xl font-medium text-brand-950">
          {locale === "am"
            ? "ከሙያዎ ጋር የሚስማማ ክፍት የስራ መደብ አላገኙም?"
            : "Don't See a Position Matching Your Profile?"}
        </h4>
        <p className="mt-2 text-xs sm:text-sm text-gray-700 max-w-xl mx-auto leading-relaxed">
          {locale === "am"
            ? "በመልክአ ምድር አርክቴክቸር፣ በሆርቲካልቸር፣ በመስኖ እና በቦታኒካል ሳይንስ የሰለጠኑ ባለሙያዎችን ሁልጊዜ በደስታ እንቀበላለን። ሲቪዎን እና የስራ ናሙናዎን ወደ careers@landscapesolutionet.com ይላኩልን።"
            : "Landscape Solution PLC is continually growing. If you are an experienced botanist, irrigation technician, heavy machine operator, or landscape estimator, send your resume and portfolio to our talent desk."}
        </p>
        <div className="mt-5 flex justify-center">
          <a
            href="mailto:careers@landscapesolutionet.com?subject=Speculative Application - Professional Landscape Network&body=Dear Landscape Solution PLC,%0D%0A%0D%0AI would like to submit my CV and portfolio for future project openings.%0D%0A%0D%0AName:%0D%0AField of Expertise:%0D%0APhone:%0D%0A"
            className="btn-secondary text-xs uppercase tracking-wider px-6 py-2.5"
          >
            ✉ {locale === "am" ? "ሲቪዎን በኢሜይል ይላኩ" : "Email Your CV to Talent Desk"}
          </a>
        </div>
      </div>

      {/* APPLICATION MODAL POPUP */}
      {applyModalJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-950/80 backdrop-blur-sm animate-fade-in"
          onClick={handleCloseApplyModal}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-brand-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-brand-950 text-white p-6 flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-sprout-400 font-bold">
                  {locale === "am" ? "የስራ ማመልከቻ ፎርም" : "Application Form"}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-medium mt-1">
                  {t(applyModalJob.title, locale)}
                </h3>
                <p className="text-xs text-brand-200 mt-0.5">
                  {applyModalJob.location.en} · {applyModalJob.department.en}
                </p>
              </div>
              <button
                onClick={handleCloseApplyModal}
                className="text-brand-300 hover:text-white p-1 text-lg leading-none"
                aria-label="Close application modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {applicationSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-serif text-xl text-brand-950 font-medium">
                    {locale === "am" ? "ማመልከቻዎ በተሳካ ሁኔታ ደርሶናል!" : "Application Submitted Successfully!"}
                  </h4>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                    {locale === "am"
                      ? "የላኩልን መረጃ ተመዝግቧል። የቅጥር ቡድናችን መረጃዎትን መርምሮ በቅርቡ ያነጋግርዎታል።"
                      : "Thank you for applying to Landscape Solution PLC. Our recruitment team will review your qualifications and reach out if your profile matches the role."}
                  </p>
                  <button
                    onClick={handleCloseApplyModal}
                    className="btn-primary text-xs uppercase tracking-wider px-6 py-2.5 mt-2"
                  >
                    {locale === "am" ? "ዝጋ" : "Close"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      {locale === "am" ? "ሙሉ ስም *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Abebe Bekele"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        {locale === "am" ? "ኢሜይል አድራሻ *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        {locale === "am" ? "ስልክ ቁጥር *" : "Phone Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+251 91 123 4567"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      {locale === "am" ? "የፖርትፎሊዮ ወይም የLinkedIn ሊንክ" : "Portfolio / LinkedIn Profile Link"}
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/... or drive link"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      {locale === "am" ? "አጭር ማስታወሻ / የልምድ ማጠቃለያ" : "Brief Cover Note / Relevant Experience"}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.coverNote}
                      onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                      placeholder={
                        locale === "am"
                          ? "ስለ ልምድዎ እና ለዚህ መደብ ያለዎትን ዝግጁነት ባጭሩ ይግለጹ..."
                          : "Summarize your relevant project experience and why you are interested in this role..."
                      }
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 resize-none"
                    />
                  </div>

                  <p className="text-[11px] text-gray-500 italic">
                    {locale === "am"
                      ? "ማስታወሻ፡ ለቃለ መጠይቅ ሲጠሩ ሙሉ የትምህርትና የስራ ልምድ ማስረጃዎችዎን ይዘው እንዲቀርቡ ይጠየቃሉ።"
                      : "Note: Shortlisted candidates will be invited to submit official educational credentials and technical drawings during the interview stage."}
                  </p>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCloseApplyModal}
                      className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 uppercase tracking-wider"
                    >
                      {locale === "am" ? "ሰርዝ" : "Cancel"}
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary text-xs uppercase tracking-wider px-6 py-2.5 font-medium flex items-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {locale === "am" ? "በመላክ ላይ..." : "Submitting..."}
                        </>
                      ) : (
                        locale === "am" ? "ማመልከቻውን ላክ" : "Submit Application"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
