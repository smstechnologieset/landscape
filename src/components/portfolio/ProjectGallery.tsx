"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export interface GalleryProject {
  id: string;
  title: { en: string; am: string };
  category: { en: string; am: string };
  location: string;
  year: string;
  description: { en: string; am: string };
  coverImage: string;
  galleryImages: {
    url: string;
    caption: { en: string; am: string };
  }[];
}

interface ProjectGalleryProps {
  projects: GalleryProject[];
  locale: string;
}

export default function ProjectGallery({ projects, locale }: ProjectGalleryProps) {
  const [activeProject, setActiveProject] = useState<GalleryProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const closeModal = useCallback(() => {
    setActiveProject(null);
    setCurrentImageIndex(0);
  }, []);

  const galleryImages = activeProject
    ? activeProject.galleryImages && activeProject.galleryImages.length > 0
      ? activeProject.galleryImages
      : [{ url: activeProject.coverImage || "/images/hero_landscape.jpg", caption: activeProject.title }]
    : [];

  const nextImage = useCallback(() => {
    if (!activeProject || galleryImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [activeProject, galleryImages.length]);

  const prevImage = useCallback(() => {
    if (!activeProject || galleryImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  }, [activeProject, galleryImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeProject) return;
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject, closeModal, nextImage, prevImage]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeProject]);

  const openProject = (project: GalleryProject) => {
    setActiveProject(project);
    setCurrentImageIndex(0);
  };

  const currentImage = galleryImages[currentImageIndex] || galleryImages[0];
  const currentImageUrl =
    currentImage && failedImages[currentImage.url]
      ? activeProject?.coverImage || "/images/hero_landscape.jpg"
      : currentImage?.url || "/images/hero_landscape.jpg";

  return (
    <div>
      {/* GALLERY GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => {
          const coverUrl = failedImages[project.coverImage] ? "/images/hero_landscape.jpg" : project.coverImage;
          const photoCount = project.galleryImages?.length || (project.coverImage ? 1 : 0);

          return (
            <div
              key={project.id}
              onClick={() => openProject(project)}
              className="card group hover-lift flex flex-col overflow-hidden border border-gray-100 bg-white transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              {/* Cover Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-900/10 img-zoom">
                <Image
                  src={coverUrl}
                  alt={locale === "am" ? project.title.am : project.title.en}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  onError={() => setFailedImages((prev) => ({ ...prev, [project.coverImage]: true }))}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Photo Count Pill */}
                <div className="absolute top-3 right-3 rounded-full bg-brand-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-sprout-300 border border-brand-800 flex items-center gap-1.5 shadow-sm">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {photoCount} {locale === "am" ? "ምስሎች" : "Photos"}
                  </span>
                </div>

                {/* Category & Location */}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-mono font-bold text-sprout-400 uppercase tracking-wider block">
                    {locale === "am" ? project.category.am : project.category.en}
                  </span>
                  <span className="text-xs text-gray-200 block mt-0.5">
                    {project.location} • {project.year}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium text-brand-950 group-hover:text-sprout-700 transition">
                    {locale === "am" ? project.title.am : project.title.en}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {locale === "am" ? project.description.am : project.description.en}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-800 group-hover:text-sprout-600 transition flex items-center gap-1.5">
                    <span>{locale === "am" ? "የስራ ጋለሪውን ይመልከቱ" : "View Photo Gallery"}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIGHTBOX POPUP SLIDESHOW MODAL */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={closeModal}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0b1c13] border border-emerald-900/60 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-900/50 bg-[#07130c] shrink-0">
              <div>
                <div className="flex items-center gap-2 text-xs text-sprout-400 font-mono">
                  <span>{locale === "am" ? activeProject.category.am : activeProject.category.en}</span>
                  <span>•</span>
                  <span>{activeProject.location}</span>
                </div>
                <h2 className="font-serif text-lg sm:text-xl text-white font-medium mt-0.5">
                  {locale === "am" ? activeProject.title.am : activeProject.title.en}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/portfolio/${activeProject.id}`}
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-sprout-400 hover:text-sprout-300 underline underline-offset-4"
                >
                  Full Details ↗
                </Link>
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="h-9 w-9 rounded-full bg-emerald-950/80 hover:bg-emerald-800 border border-emerald-700/50 text-gray-300 hover:text-white flex items-center justify-center transition"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main Slideshow Stage */}
            <div className="relative w-full h-[54vh] min-h-[340px] max-h-[580px] bg-gradient-to-b from-[#09150e] via-[#040805] to-[#09150e] flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                  src={currentImageUrl}
                  alt={
                    locale === "am"
                      ? currentImage?.caption?.am || activeProject.title.am
                      : currentImage?.caption?.en || activeProject.title.en
                  }
                  className="max-h-full max-w-full w-auto h-auto object-contain select-none transition-all duration-300 shadow-2xl"
                  onError={() => {
                    if (currentImage) {
                      setFailedImages((prev) => ({ ...prev, [currentImage.url]: true }));
                    }
                  }}
                />
              </div>

              {/* Prev Button */}
              {galleryImages.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/60 hover:bg-emerald-900/90 border border-white/20 text-white flex items-center justify-center transition shadow-lg hover:scale-105 z-10 text-xl font-bold"
                  aria-label="Previous image"
                >
                  ‹
                </button>
              )}

              {/* Next Button */}
              {galleryImages.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/60 hover:bg-emerald-900/90 border border-white/20 text-white flex items-center justify-center transition shadow-lg hover:scale-105 z-10 text-xl font-bold"
                  aria-label="Next image"
                >
                  ›
                </button>
              )}

              {/* Image Counter Badge */}
              <div className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-mono text-sprout-300 border border-white/10 z-10">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Slideshow Caption & Thumbnail Strip Footer */}
            <div className="p-4 sm:p-5 bg-[#07130c] border-t border-emerald-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
              <div className="max-w-xl">
                <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                  {locale === "am"
                    ? currentImage?.caption?.am || activeProject.title.am
                    : currentImage?.caption?.en || activeProject.title.en}
                </p>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                  {locale === "am" ? activeProject.description.am : activeProject.description.en}
                </p>
              </div>

              {/* Thumbnails row */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {galleryImages.map((img, idx) => {
                    const thumbUrl = failedImages[img.url] ? "/images/hero_landscape.jpg" : img.url;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative h-12 w-16 sm:h-14 sm:w-20 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                          idx === currentImageIndex
                            ? "border-sprout-400 ring-2 ring-sprout-400/30 scale-105"
                            : "border-emerald-900/60 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={thumbUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={() => setFailedImages((prev) => ({ ...prev, [img.url]: true }))}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
