"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export interface MockBlogPost {
  id: string;
  slug: string;
  title: { en: string; am: string };
  category: { en: string; am: string };
  date: string;
  readTime: string;
  author: string;
  image: string;
  excerpt: { en: string; am: string };
  content: {
    en: {
      paragraphs: string[];
      takeaways: string[];
    };
    am: {
      paragraphs: string[];
      takeaways: string[];
    };
  };
}

interface BlogListWithModalProps {
  posts: MockBlogPost[];
  locale: string;
}

export default function BlogListWithModal({ posts, locale }: BlogListWithModalProps) {
  const [selectedPost, setSelectedPost] = useState<MockBlogPost | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPost) {
        setSelectedPost(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPost]);

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPost]);

  return (
    <div>
      {/* BLOG POSTS GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, idx) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="card group hover-lift flex flex-col h-full bg-white border border-brand-100 overflow-hidden cursor-pointer text-left"
          >
            {/* Image Thumbnail */}
            <div className="relative aspect-[16/10] overflow-hidden img-zoom">
              <Image
                src={post.image}
                alt={locale === "am" ? post.title.am : post.title.en}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-mono font-bold text-sprout-400">
                {locale === "am" ? post.category.am : post.category.en}
              </span>
            </div>

            {/* Post Content Summary */}
            <div className="p-6 flex flex-1 flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-brand-950 group-hover:text-sprout-700 transition leading-snug">
                  {locale === "am" ? post.title.am : post.title.en}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {locale === "am" ? post.excerpt.am : post.excerpt.en}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-800 group-hover:text-sprout-600 transition flex items-center gap-1.5">
                  <span>{locale === "am" ? "ዝርዝሩን አንብብ" : "Read Full Article"}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <span className="text-[11px] text-gray-400 font-mono">
                  #{String(idx + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EXPANDABLE BLOG DETAIL MODAL */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl overflow-y-auto shadow-2xl border border-brand-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Cover Image */}
            <div className="relative aspect-[16/9] w-full bg-brand-950">
              <Image
                src={selectedPost.image}
                alt={locale === "am" ? selectedPost.title.am : selectedPost.title.en}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-sm transition border border-white/20"
                aria-label="Close article"
              >
                ✕
              </button>

              {/* Title & Metadata on Header */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block rounded-full bg-sprout-500/90 text-brand-950 font-semibold text-[11px] px-3 py-1 uppercase tracking-wider mb-2">
                  {locale === "am" ? selectedPost.category.am : selectedPost.category.en}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium leading-tight text-white">
                  {locale === "am" ? selectedPost.title.am : selectedPost.title.en}
                </h2>
                <div className="flex items-center gap-3 text-xs text-gray-300 mt-2 font-mono">
                  <span>By {selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>
            </div>

            {/* Article Content Body */}
            <div className="p-6 sm:p-10 space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
              {(locale === "am"
                ? selectedPost.content.am.paragraphs
                : selectedPost.content.en.paragraphs
              ).map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Key Takeaways Box */}
              <div className="rounded-xl border border-brand-100 bg-brand-50/60 p-6 my-6">
                <h4 className="font-serif text-lg font-semibold text-brand-950 mb-3">
                  {locale === "am" ? "ዋና ዋና ነጥቦች (Key Takeaways)" : "Key Technical Takeaways"}
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  {(locale === "am"
                    ? selectedPost.content.am.takeaways
                    : selectedPost.content.en.takeaways
                  ).map((takeaway, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2.5">
                      <span className="text-sprout-600 font-bold mt-0.5">✓</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Actions */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Published by Landscape Solution PLC Technical Team
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="btn-primary text-xs uppercase tracking-wider py-2 px-5"
                >
                  {locale === "am" ? "ዝጋ" : "Close Article"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
