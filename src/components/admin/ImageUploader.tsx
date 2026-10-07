"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { uploadImageAction } from "@/app/actions/admin-crud";

interface PresetImage {
  label: string;
  url: string;
}

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  name?: string;
  bucket?: string;
  label?: string;
  presetImages?: PresetImage[];
  aspectRatio?: "video" | "square" | "wide";
}

export default function ImageUploader({
  value,
  onChange,
  name = "image",
  bucket = "general-media",
  label = "Image",
  presetImages,
  aspectRatio = "video"
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WebP, SVG).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image file size cannot exceed 10MB.");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);

      const result = await uploadImageAction(formData);

      if (result.success && result.url) {
        onChange(result.url);
      } else {
        setError(result.error || "Failed to upload image.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const aspectClasses = {
    video: "aspect-[16/10]",
    square: "aspect-square",
    wide: "aspect-[21/9]"
  };

  return (
    <div className="space-y-3">
      {/* Hidden input to pass value into server action form submissions */}
      {name && <input type="hidden" name={name} value={value || ""} />}

      <div className="flex items-center justify-between">
        <label className="label text-xs font-semibold text-gray-800">{label}</label>
        <div className="flex items-center gap-2 text-xs">
          {presetImages && presetImages.length > 0 && (
            <button
              type="button"
              onClick={() => setShowPresets(!showPresets)}
              className="text-brand-700 hover:text-brand-900 font-medium underline"
            >
              {showPresets ? "Hide Presets" : "Choose from Library"}
            </button>
          )}
          <span className="text-gray-300">•</span>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-gray-500 hover:text-gray-700 underline"
          >
            {showUrlInput ? "Hide URL Box" : "Enter URL"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-2.5 text-xs text-red-700 border border-red-200">
          {error}
        </div>
      )}

      {/* Main Image State: Active Preview OR Drag & Drop Upload Zone */}
      {value ? (
        <div className="rounded-xl border border-brand-200 bg-white p-3 shadow-sm space-y-3">
          <div className={`relative ${aspectClasses[aspectRatio]} w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200`}>
            <Image
              src={value}
              alt="Uploaded visual preview"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white text-xs gap-2">
                <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Uploading replacement…</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
            <span className="text-gray-500 font-mono truncate max-w-[260px] sm:max-w-xs" title={value}>
              {value}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="btn-secondary !py-1 !px-3 text-xs flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Replace
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                disabled={isUploading}
                className="btn !py-1 !px-2.5 text-xs text-red-600 hover:bg-red-50 hover:border-red-200"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Upload Dropzone */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
            isDragging
              ? "border-sprout-500 bg-sprout-50/50 scale-[1.01]"
              : "border-gray-300 hover:border-brand-500 bg-gray-50/50 hover:bg-brand-50/20"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-4 text-xs text-brand-900 gap-2">
              <div className="h-8 w-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
              <p className="font-semibold">Uploading to Cloud Storage…</p>
              <p className="text-gray-500 text-[11px]">Please wait while your image is stored</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-2 space-y-2 text-center">
              <div className="h-10 w-10 rounded-full bg-brand-100/80 flex items-center justify-center text-brand-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-brand-800">Click to upload from device</span>
                <span className="text-gray-500"> or drag and drop</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Supports PNG, JPG, WebP up to 10MB (stored in Supabase Cloud)
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {/* Optional Manual URL Input */}
      {showUrlInput && (
        <div className="pt-2 animate-fade-in">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input text-xs"
            placeholder="Paste external image link: https://..."
          />
        </div>
      )}

      {/* Optional Preset Image Grid */}
      {showPresets && presetImages && presetImages.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-3 pt-2 space-y-2 animate-fade-in">
          <p className="text-[11px] font-semibold text-gray-600">Select an existing website photo:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {presetImages.map((img) => (
              <button
                type="button"
                key={img.url}
                onClick={() => {
                  onChange(img.url);
                  setShowPresets(false);
                }}
                className={`text-left rounded-lg border p-1.5 text-xs transition bg-white ${
                  value === img.url
                    ? "border-sprout-500 ring-2 ring-sprout-400"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="relative h-16 w-full rounded overflow-hidden mb-1 bg-gray-100">
                  <Image src={img.url} alt={img.label} fill sizes="120px" className="object-cover" />
                </div>
                <div className="font-medium text-[10px] text-gray-800 truncate">{img.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
