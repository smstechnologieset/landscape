"use client";

import { useState } from "react";
import { updateContactSettingsAction } from "@/app/actions/admin-crud";
import type { SiteSettings } from "@/lib/types";

interface ContactDetailsFormProps {
  settings: SiteSettings | null;
}

export default function ContactDetailsForm({ settings }: ContactDetailsFormProps) {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await updateContactSettingsAction(formData);

    setSaving(false);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } else {
      setError(res.error || "Failed to update contact settings.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {success && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-semibold flex items-center gap-2">
          <span>✓</span> Contact details and social links saved successfully! Live website and footer updated.
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
          {error}
        </div>
      )}

      {/* 1. Phone Numbers & Email */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-brand-950 flex items-center gap-2 border-b pb-2">
          <span>📞</span> 1. Direct Telephone Lines & Primary Email
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="label text-xs font-semibold text-gray-700">
              Primary Office Phone Line
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              defaultValue={settings?.phone || "+251 11 667 8901"}
              required
              className="input text-sm"
              placeholder="+251 11 667 8901"
            />
            <p className="text-[11px] text-gray-500 mt-1">Displayed in website footer & contact page.</p>
          </div>

          <div>
            <label htmlFor="alt_phone" className="label text-xs font-semibold text-gray-700">
              Direct / Mobile Line
            </label>
            <input
              id="alt_phone"
              name="alt_phone"
              type="text"
              defaultValue={settings?.alt_phone || "+251 91 123 4567"}
              className="input text-sm"
              placeholder="+251 91 123 4567"
            />
            <p className="text-[11px] text-gray-500 mt-1">Alternative direct line for client calls.</p>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="label text-xs font-semibold text-gray-700">
            Official Inquiries Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={settings?.email || "admin@pinnaclelandscapesolution.com"}
            required
            className="input text-sm"
            placeholder="admin@pinnaclelandscapesolution.com"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            Receives notifications and appears as the official mailto contact.
          </p>
        </div>
      </div>

      {/* 2. Physical Headquarters & Map */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-brand-950 flex items-center gap-2 border-b pb-2">
          <span>📍</span> 2. Office Location & Google Maps
        </h3>

        <div>
          <label htmlFor="address" className="label text-xs font-semibold text-gray-700">
            Physical Office Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            defaultValue={settings?.address || "Sur Construction Building, 8th Floor, Addis Ababa, Ethiopia"}
            required
            className="input text-sm"
            placeholder="Sur Construction Building, 8th Floor, Addis Ababa, Ethiopia"
          />
          <p className="text-[11px] text-gray-500 mt-1">Full office address shown in the footer and contact page.</p>
        </div>

        <div>
          <label htmlFor="google_maps_url" className="label text-xs font-semibold text-gray-700">
            Google Maps Embed Iframe URL
          </label>
          <input
            id="google_maps_url"
            name="google_maps_url"
            type="url"
            defaultValue={
              settings?.google_maps_url ||
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.548483584877!2d38.78345237494578!3d9.013589991047127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850d998276f7%3A0xc6cb697e06a380e2!2sSur%20Construction!5e0!3m2!1sen!2set!4v1711200000000!5m2!1sen!2set"
            }
            className="input text-xs font-mono"
            placeholder="https://www.google.com/maps/embed?pb=..."
          />
          <p className="text-[11px] text-gray-500 mt-1">
            Embed URL for the live interactive map on the contact page.
          </p>
        </div>
      </div>

      {/* 3. Social Media & Digital Channels */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-brand-950 flex items-center gap-2 border-b pb-2">
          <span>🌐</span> 3. Social Media Links & Instant Messaging
        </h3>
        <p className="text-xs text-gray-500">
          Links configured here will appear in the website header, footer, and contact page.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="whatsapp" className="label text-xs font-semibold text-gray-700">
              WhatsApp Contact Number or Direct Link
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="text"
              defaultValue={settings?.whatsapp || "+251911234567"}
              className="input text-sm"
              placeholder="+251911234567"
            />
          </div>

          <div>
            <label htmlFor="telegram_url" className="label text-xs font-semibold text-gray-700">
              Telegram Channel / User Link
            </label>
            <input
              id="telegram_url"
              name="telegram_url"
              type="url"
              defaultValue={settings?.telegram_url || "https://t.me/pinnaclelandscape"}
              className="input text-sm"
              placeholder="https://t.me/pinnaclelandscape"
            />
          </div>

          <div>
            <label htmlFor="instagram_url" className="label text-xs font-semibold text-gray-700">
              Instagram Profile URL
            </label>
            <input
              id="instagram_url"
              name="instagram_url"
              type="url"
              defaultValue={settings?.instagram_url || "https://instagram.com"}
              className="input text-sm"
              placeholder="https://instagram.com/pinnaclelandscape"
            />
          </div>

          <div>
            <label htmlFor="tiktok_url" className="label text-xs font-semibold text-gray-700">
              TikTok Profile URL
            </label>
            <input
              id="tiktok_url"
              name="tiktok_url"
              type="url"
              defaultValue={settings?.tiktok_url || "https://tiktok.com"}
              className="input text-sm"
              placeholder="https://tiktok.com/@pinnaclelandscape"
            />
          </div>

          <div>
            <label htmlFor="facebook_url" className="label text-xs font-semibold text-gray-700">
              Facebook Page URL
            </label>
            <input
              id="facebook_url"
              name="facebook_url"
              type="url"
              defaultValue={settings?.facebook_url || "https://facebook.com"}
              className="input text-sm"
              placeholder="https://facebook.com/pinnaclelandscape"
            />
          </div>

          <div>
            <label htmlFor="linkedin_url" className="label text-xs font-semibold text-gray-700">
              LinkedIn Company Page
            </label>
            <input
              id="linkedin_url"
              name="linkedin_url"
              type="url"
              defaultValue={settings?.linkedin_url || "https://linkedin.com"}
              className="input text-sm"
              placeholder="https://linkedin.com/company/pinnacle-landscape"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="youtube_url" className="label text-xs font-semibold text-gray-700">
              YouTube Channel URL
            </label>
            <input
              id="youtube_url"
              name="youtube_url"
              type="url"
              defaultValue={settings?.youtube_url || "https://youtube.com"}
              className="input text-sm"
              placeholder="https://youtube.com/@pinnaclelandscape"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary !text-sm !py-2.5 !px-6 shadow-md font-semibold"
        >
          {saving ? "Saving Changes…" : "Save Contact & Social Details"}
        </button>
      </div>
    </form>
  );
}
