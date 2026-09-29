"use client";

import { useState } from "react";
import Link from "next/link";
import { saveJobAction } from "@/app/actions/admin-crud";
import type { JobOpening } from "@/lib/company-data";

const PRESET_JOB_TYPES = ["Full-time", "Part-time", "Contract", "Seasonal", "Internship"];

const PRESET_DEPARTMENTS = [
  "Operations & Field Construction",
  "Design & Master Planning",
  "Horticulture & Nursery Management",
  "Irrigation & Water Engineering",
  "Environmental & Ecological Science",
  "Project Management & Supervision"
];

const PRESET_RESPONSIBILITIES = [
  "Lead conceptual landscape design and master planning for commercial and public projects",
  "Oversee site preparation, earthmoving, grading, and drainage construction",
  "Coordinate with municipal authorities, city administrations, and environmental protection agencies",
  "Manage plant nursery propagation, seed germination, and seedling inventory health",
  "Conduct regular site inspections and quality assurance for active greening projects",
  "Develop technical specifications, cost estimations, and bill of quantities (BOQ)",
  "Supervise daily on-site landscaping crews and contractor installation activities",
  "Design automated water-efficient drip and micro-sprinkler irrigation layouts",
  "Implement soil bio-engineering and riverbank erosion stabilization interventions",
  "Prepare client progress reports, landscape presentations, and maintenance manuals"
];

const PRESET_REQUIREMENTS = [
  "B.Sc. or M.Sc. in Landscape Architecture, Urban Planning, Forestry, or Civil Engineering",
  "Minimum 3-5 years of hands-on experience in landscape construction or botanical design",
  "Proficiency in AutoCAD, SketchUp, Lumion, GIS, and 3D architectural rendering software",
  "Deep technical knowledge of Ethiopian indigenous flora and climate-adaptive plants",
  "Strong on-site project management, contractor coordination, and leadership abilities",
  "Fluency in Amharic and English; excellent written and verbal communication skills",
  "Valid Ethiopian driver's license and willingness to undertake occasional regional field travel",
  "Degree or Diploma in Horticulture, Plant Science, Agronomy, or Botany",
  "Demonstrated expertise in drip irrigation hydraulics and water pumping infrastructure"
];

interface CareerJobEditorProps {
  initialJob?: JobOpening | null;
}

export default function CareerJobEditor({ initialJob }: CareerJobEditorProps) {
  const [titleEn, setTitleEn] = useState(initialJob?.title?.en || "");
  const [titleAm, setTitleAm] = useState(initialJob?.title?.am || "");
  const [deptEn, setDeptEn] = useState(initialJob?.department?.en || PRESET_DEPARTMENTS[0]);
  const [deptAm, setDeptAm] = useState(initialJob?.department?.am || "");
  const [location, setLocation] = useState(
    typeof initialJob?.location === "string" ? initialJob.location : initialJob?.location?.en || "Addis Ababa, Ethiopia"
  );
  const [jobType, setJobType] = useState(
    typeof initialJob?.type === "string" ? initialJob.type : initialJob?.type?.en || "Full-time"
  );
  const [customJobType, setCustomJobType] = useState("");
  const [deadline, setDeadline] = useState(initialJob?.deadline || "Open until filled");
  const [summaryEn, setSummaryEn] = useState(initialJob?.summary?.en || "");
  const [summaryAm, setSummaryAm] = useState(initialJob?.summary?.am || "");

  // Responsibilities
  const initialResp: string[] = Array.isArray(initialJob?.responsibilities)
    ? initialJob.responsibilities
    : initialJob?.responsibilities?.en || [
        "Lead conceptual landscape design and master planning for commercial and public projects",
        "Oversee site preparation, earthmoving, grading, and drainage construction",
        "Supervise daily on-site landscaping crews and contractor installation activities"
      ];
  const [responsibilities, setResponsibilities] = useState<string[]>(initialResp);
  const [customRespInput, setCustomRespInput] = useState("");

  const addResp = (item: string) => {
    const trimmed = item.trim();
    if (trimmed && !responsibilities.includes(trimmed)) {
      setResponsibilities([...responsibilities, trimmed]);
    }
  };

  const removeResp = (idx: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== idx));
  };

  // Requirements
  const initialReq: string[] = Array.isArray(initialJob?.requirements)
    ? initialJob.requirements
    : initialJob?.requirements?.en || [
        "B.Sc. or M.Sc. in Landscape Architecture, Urban Planning, Forestry, or Civil Engineering",
        "Minimum 3-5 years of hands-on experience in landscape construction or botanical design",
        "Fluency in Amharic and English; excellent written and verbal communication skills"
      ];
  const [requirements, setRequirements] = useState<string[]>(initialReq);
  const [customReqInput, setCustomReqInput] = useState("");

  const addReq = (item: string) => {
    const trimmed = item.trim();
    if (trimmed && !requirements.includes(trimmed)) {
      setRequirements([...requirements, trimmed]);
    }
  };

  const removeReq = (idx: number) => {
    setRequirements(requirements.filter((_, i) => i !== idx));
  };

  return (
    <form action={saveJobAction} className="space-y-8 max-w-4xl">
      {initialJob?.id && <input type="hidden" name="id" value={initialJob.id} />}
      <input type="hidden" name="responsibilities" value={JSON.stringify(responsibilities)} />
      <input type="hidden" name="requirements" value={JSON.stringify(requirements)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">
            {initialJob ? `Edit Job Opening: ${initialJob.title.en}` : "Post New Career Opportunity"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure job titles, department, employment type, responsibilities, and requirements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/careers" className="btn-secondary !text-xs !py-2">
            Cancel
          </Link>
          <button type="submit" className="btn-primary !text-xs !py-2 shadow-sm font-semibold">
            {initialJob ? "Save Career Changes" : "Publish Career Opening"}
          </button>
        </div>
      </div>

      {/* 1. Basic Job Details */}
      <div className="card p-6 bg-white space-y-5">
        <h2 className="text-base font-bold text-brand-900 border-b pb-2">1. Role & Department</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label text-xs font-semibold">Job Title (English) *</label>
            <input
              type="text"
              name="title_en"
              required
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="input font-semibold"
              placeholder="e.g. Senior Landscape Architect"
            />
          </div>

          <div>
            <label className="label text-xs font-semibold">Job Title (Amharic - አማርኛ)</label>
            <input
              type="text"
              name="title_am"
              value={titleAm}
              onChange={(e) => setTitleAm(e.target.value)}
              className="input"
              placeholder="e.g. ከፍተኛ የመልክአ ምድር አርክቴክት"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="label text-xs font-semibold">Department</label>
            <input
              type="text"
              name="department_en"
              value={deptEn}
              onChange={(e) => setDeptEn(e.target.value)}
              className="input text-xs"
              placeholder="Operations & Field Construction"
            />
            <div className="flex flex-wrap gap-1 mt-1.5">
              {PRESET_DEPARTMENTS.slice(0, 3).map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDeptEn(d)}
                  className="text-[10px] bg-gray-100 hover:bg-brand-50 px-1.5 py-0.5 rounded text-gray-700"
                >
                  {d.split("&")[0]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label text-xs font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input text-xs"
              placeholder="Addis Ababa, Ethiopia"
            />
          </div>

          <div>
            <label className="label text-xs font-semibold">Application Deadline</label>
            <input
              type="text"
              name="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="input text-xs"
              placeholder="Open until filled or 30 days"
            />
          </div>
        </div>

        {/* Job Type Requirement with Presets & Write Custom */}
        <div>
          <label className="label text-xs font-semibold">Employment Type (Select or Write Custom) *</label>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {PRESET_JOB_TYPES.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => {
                  setJobType(t);
                  setCustomJobType("");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  jobType === t
                    ? "bg-brand-800 text-white border-brand-900 shadow-sm"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex gap-2 max-w-sm">
            <input
              type="text"
              placeholder="Or write custom type (e.g. Consultancy / Part-time)"
              value={customJobType}
              onChange={(e) => {
                setCustomJobType(e.target.value);
                setJobType(e.target.value || "Full-time");
              }}
              className="input text-xs"
            />
          </div>
          <input type="hidden" name="type" value={jobType} />
        </div>
      </div>

      {/* 2. Job Overview / Summary */}
      <div className="card p-6 bg-white space-y-4">
        <h2 className="text-base font-bold text-brand-900 border-b pb-2">2. Job Overview / Summary</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label text-xs font-semibold">Overview (English) *</label>
            <textarea
              name="summary_en"
              rows={4}
              required
              value={summaryEn}
              onChange={(e) => setSummaryEn(e.target.value)}
              className="input text-xs leading-relaxed"
              placeholder="Brief summary of the role, responsibilities, and team impact..."
            />
          </div>

          <div>
            <label className="label text-xs font-semibold">Overview (Amharic - አማርኛ)</label>
            <textarea
              name="summary_am"
              rows={4}
              value={summaryAm}
              onChange={(e) => setSummaryAm(e.target.value)}
              className="input text-xs leading-relaxed"
              placeholder="የስራው አጭር ማጠቃለያ..."
            />
          </div>
        </div>
      </div>

      {/* 3. Key Responsibilities (USER SPECIAL REQUIREMENT) */}
      <div className="card p-6 bg-white space-y-5">
        <div className="flex items-center justify-between border-b pb-2">
          <div>
            <h2 className="text-base font-bold text-brand-900">3. Key Responsibilities</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Select from pre-prepared responsibilities or write custom duties.
            </p>
          </div>
          <span className="rounded-full bg-brand-100 text-brand-900 px-2.5 py-0.5 text-xs font-semibold">
            {responsibilities.length} active
          </span>
        </div>

        {/* Selected Responsibilities list */}
        <div className="space-y-2">
          {responsibilities.map((resp, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs">
              <span className="text-sprout-700 font-bold mt-0.5">•</span>
              <span className="flex-1 text-gray-800 leading-relaxed">{resp}</span>
              <button
                type="button"
                onClick={() => removeResp(idx)}
                className="text-red-500 hover:text-red-700 font-bold px-1.5"
                title="Remove responsibility"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Custom Responsibility Input */}
        <div>
          <label className="label text-xs font-semibold">Write Custom Responsibility</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customRespInput}
              onChange={(e) => setCustomRespInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (customRespInput.trim()) {
                    addResp(customRespInput);
                    setCustomRespInput("");
                  }
                }
              }}
              className="input text-xs flex-1"
              placeholder="Type a custom responsibility and press Add..."
            />
            <button
              type="button"
              onClick={() => {
                if (customRespInput.trim()) {
                  addResp(customRespInput);
                  setCustomRespInput("");
                }
              }}
              className="btn-secondary !text-xs !px-4 shrink-0 font-semibold"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Pre-prepared Responsibilities Picker */}
        <div>
          <label className="label text-xs font-semibold text-gray-600">
            Quick-Add from Pre-Prepared Responsibilities:
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto p-3 rounded-xl border border-gray-100 bg-gray-50/50">
            {PRESET_RESPONSIBILITIES.map((r) => {
              const added = responsibilities.includes(r);
              return (
                <button
                  type="button"
                  key={r}
                  onClick={() => (added ? setResponsibilities(responsibilities.filter((x) => x !== r)) : addResp(r))}
                  className={`text-xs px-2.5 py-1 rounded-md text-left transition border ${
                    added
                      ? "bg-brand-800 text-white border-brand-900"
                      : "bg-white text-gray-700 border-gray-200 hover:border-brand-400 hover:text-brand-900"
                  }`}
                >
                  {added ? `✓ ${r}` : `+ ${r}`}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Qualifications & Requirements (USER SPECIAL REQUIREMENT) */}
      <div className="card p-6 bg-white space-y-5">
        <div className="flex items-center justify-between border-b pb-2">
          <div>
            <h2 className="text-base font-bold text-brand-900">4. Qualifications & Requirements</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Select pre-prepared requirements or write specific criteria.
            </p>
          </div>
          <span className="rounded-full bg-brand-100 text-brand-900 px-2.5 py-0.5 text-xs font-semibold">
            {requirements.length} active
          </span>
        </div>

        {/* Selected Requirements list */}
        <div className="space-y-2">
          {requirements.map((req, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs">
              <span className="text-brand-700 font-bold mt-0.5">✓</span>
              <span className="flex-1 text-gray-800 leading-relaxed">{req}</span>
              <button
                type="button"
                onClick={() => removeReq(idx)}
                className="text-red-500 hover:text-red-700 font-bold px-1.5"
                title="Remove requirement"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Custom Requirement Input */}
        <div>
          <label className="label text-xs font-semibold">Write Custom Requirement</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customReqInput}
              onChange={(e) => setCustomReqInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (customReqInput.trim()) {
                    addReq(customReqInput);
                    setCustomReqInput("");
                  }
                }
              }}
              className="input text-xs flex-1"
              placeholder="Type a custom qualification and press Add..."
            />
            <button
              type="button"
              onClick={() => {
                if (customReqInput.trim()) {
                  addReq(customReqInput);
                  setCustomReqInput("");
                }
              }}
              className="btn-secondary !text-xs !px-4 shrink-0 font-semibold"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Pre-prepared Requirements Picker */}
        <div>
          <label className="label text-xs font-semibold text-gray-600">
            Quick-Add from Pre-Prepared Qualifications:
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto p-3 rounded-xl border border-gray-100 bg-gray-50/50">
            {PRESET_REQUIREMENTS.map((req) => {
              const added = requirements.includes(req);
              return (
                <button
                  type="button"
                  key={req}
                  onClick={() => (added ? setRequirements(requirements.filter((x) => x !== req)) : addReq(req))}
                  className={`text-xs px-2.5 py-1 rounded-md text-left transition border ${
                    added
                      ? "bg-brand-800 text-white border-brand-900"
                      : "bg-white text-gray-700 border-gray-200 hover:border-brand-400 hover:text-brand-900"
                  }`}
                >
                  {added ? `✓ ${req}` : `+ ${req}`}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Link href="/admin/careers" className="btn-secondary !text-xs !py-2.5">
          Cancel
        </Link>
        <button type="submit" className="btn-primary !text-xs !py-2.5 !px-6 shadow-md font-semibold">
          {initialJob ? "Save Career Changes" : "Publish Career Opening"}
        </button>
      </div>
    </form>
  );
}
