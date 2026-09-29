import Link from "next/link";
import { COMPANY_INFO } from "@/lib/company-data";

export interface SocialLinksProps {
  variant?: "dark" | "light" | "colored";
  size?: "sm" | "md" | "lg";
  className?: string;
  showLabels?: boolean;
}

export default function SocialLinks({
  variant = "dark",
  size = "md",
  className = "",
  showLabels = false
}: SocialLinksProps) {
  const socials = [
    {
      name: "WhatsApp",
      url: COMPANY_INFO.socialLinks.whatsapp,
      color: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
      label: "WhatsApp",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.82 2.791.82 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.385 8.167c-.145.407-.84.774-1.168.824-.316.05-.694.06-2.285-.599-1.905-.79-3.13-2.73-3.226-2.856-.095-.126-.774-1.03-.774-1.964s.49-1.393.664-1.583c.174-.19.38-.238.507-.238.127 0 .253 0 .364.007.119.006.277-.045.435.333.166.396.57 1.393.62 1.496.051.103.084.222.016.356-.068.134-.103.218-.205.337-.103.119-.216.265-.308.356-.103.103-.211.214-.091.42.12.206.533.88 1.144 1.424.787.701 1.45.918 1.656 1.02.206.103.327.087.448-.051.121-.138.518-.602.657-.808.139-.206.277-.172.464-.103.187.069 1.187.56 1.391.662.204.103.34.153.391.238.051.085.051.493-.094.9zM12.03 2C6.49 2 2 6.49 2 12.03c0 1.97.57 3.81 1.56 5.37L2 22l4.75-1.52c1.51.93 3.27 1.47 5.28 1.47 5.54 0 10.03-4.49 10.03-10.03C22.06 6.49 17.57 2 12.03 2zm0 18.25c-1.74 0-3.35-.55-4.68-1.49l-.33-.23-2.81.9.92-2.74-.24-.35A8.19 8.19 0 0 1 3.78 12.03c0-4.55 3.7-8.25 8.25-8.25s8.25 3.7 8.25 8.25-3.7 8.25-8.25 8.25z" />
        </svg>
      )
    },
    {
      name: "Instagram",
      url: COMPANY_INFO.socialLinks.instagram,
      color: "hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]",
      label: "Instagram",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      name: "TikTok",
      url: COMPANY_INFO.socialLinks.tiktok,
      color: "hover:bg-black hover:text-white hover:border-black",
      label: "TikTok",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      )
    },
    {
      name: "Facebook",
      url: COMPANY_INFO.socialLinks.facebook,
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
      label: "Facebook",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      name: "Telegram",
      url: COMPANY_INFO.socialLinks.telegram,
      color: "hover:bg-[#229ED9] hover:text-white hover:border-[#229ED9]",
      label: "Telegram",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.63 3.73-.53.36-1.02.54-1.45.53-.48-.01-1.4-.27-2.08-.49-.84-.27-1.51-.42-1.45-.89.03-.25.38-.51 1.07-.78 4.2-1.83 7.01-3.04 8.42-3.64 4.01-1.71 4.84-2.01 5.39-2.02.12 0 .39.03.56.18.15.12.19.29.21.41-.01.07.01.23 0 .39z" />
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: COMPANY_INFO.socialLinks.linkedin,
      color: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
      label: "LinkedIn",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      name: "YouTube",
      url: COMPANY_INFO.socialLinks.youtube,
      color: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
      label: "YouTube",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    }
  ];

  const sizeClasses = {
    sm: "h-8 w-8 p-1.5 text-xs",
    md: "h-9 w-9 p-2 text-sm",
    lg: "h-11 w-11 p-2.5 text-base"
  };

  const variantClasses = {
    dark: "bg-brand-900/80 border border-brand-800 text-brand-200 hover:text-white",
    light: "bg-white border border-gray-200 text-gray-700 hover:text-white shadow-sm",
    colored: "bg-brand-50 border border-brand-200 text-brand-900 hover:text-white"
  };

  if (showLabels) {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${className}`}>
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit Landscape Solution PLC on ${s.name}`}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 group ${variant === "dark" ? "bg-brand-900/60 border-brand-800 text-white hover:border-sprout-400" : "bg-white border-gray-200 hover:border-brand-300 shadow-sm hover:shadow-md"}`}
          >
            <span className={`inline-flex items-center justify-center rounded-lg p-2 transition-transform duration-200 group-hover:scale-110 ${sizeClasses.md} ${variantClasses[variant]} ${s.color}`}>
              {s.icon}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-brand-950 dark:text-white group-hover:text-sprout-600 transition truncate">
                {s.name}
              </p>
              <p className="text-[10px] text-gray-500 truncate">
                @landscapesolutionet
              </p>
            </div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {socials.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Follow Landscape Solution on ${s.name}`}
          aria-label={`Landscape Solution on ${s.name}`}
          className={`inline-flex items-center justify-center rounded-lg border transition-all duration-200 hover:scale-105 active:scale-95 ${sizeClasses[size]} ${variantClasses[variant]} ${s.color}`}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
