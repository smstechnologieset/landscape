import { getStoredMessages } from "@/lib/data-store";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteSettings } from "@/lib/queries";
import MessagesInbox, {
  type ConsultationItem,
  type QuoteItem,
  type MessageType
} from "@/components/admin/MessagesInbox";
import ContactDetailsForm from "@/components/admin/ContactDetailsForm";
import Link from "next/link";

export const metadata = { title: "Contact Page & Messages Inbox | Admin Portal" };
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  searchParams?: {
    tab?: "inbox" | "details";
    type?: string;
  };
}

export default async function AdminContactPage({ searchParams }: PageProps) {
  const supabase = createAdminClient();

  // Fetch inquiries, consultations, quotes, and site settings
  const [inquiries, consultationsRes, quotesRes, settings] = await Promise.all([
    getStoredMessages(),
    supabase.from("consultation_requests").select("*").order("created_at", { ascending: false }),
    supabase.from("quote_requests").select("*, services(title)").order("created_at", { ascending: false }),
    getSiteSettings()
  ]);

  // Map consultations
  const consultations: ConsultationItem[] = (consultationsRes.data || []).map((c: any) => ({
    id: c.id,
    fullName: c.full_name,
    email: c.email,
    phone: c.phone || undefined,
    preferredDate: c.preferred_date || undefined,
    preferredTime: c.preferred_time || undefined,
    consultationType: c.consultation_type || undefined,
    projectDetails: c.project_details || undefined,
    message: c.message || undefined,
    status: c.status || "pending",
    adminNotes: c.admin_notes || undefined,
    createdAt: c.created_at
  }));

  // Map quotes
  const quotesData = quotesRes.data || [];
  const quotes: QuoteItem[] = [];

  for (const q of quotesData) {
    let attachmentUrl = q.attachment_url;
    if (attachmentUrl && !/^https?:\/\//.test(attachmentUrl)) {
      const { data: signed } = await supabase.storage
        .from("attachments")
        .createSignedUrl(attachmentUrl, 3600);
      if (signed?.signedUrl) {
        attachmentUrl = signed.signedUrl;
      }
    }

    quotes.push({
      id: q.id,
      fullName: q.full_name,
      email: q.email,
      phone: q.phone || undefined,
      whatsapp: q.whatsapp || undefined,
      company: q.company || undefined,
      serviceTitle: (q.services?.title as { en?: string })?.en || undefined,
      projectLocation: q.project_location || undefined,
      projectType: q.project_type || undefined,
      projectSize: q.project_size || undefined,
      budgetRange: q.budget_range || undefined,
      desiredTimeline: q.desired_timeline || undefined,
      description: q.description || undefined,
      attachmentUrl: attachmentUrl || undefined,
      status: q.status || "new",
      adminNotes: q.admin_notes || undefined,
      createdAt: q.created_at
    });
  }

  const activeTab = searchParams?.tab || "inbox";
  const defaultSubTab: MessageType =
    searchParams?.type === "inquiries"
      ? "inquiries"
      : searchParams?.type === "consultations"
      ? "consultations"
      : searchParams?.type === "quotes"
      ? "quotes"
      : "all";

  const totalUnread = inquiries.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950 flex items-center gap-2">
            <span>✉️</span> Contact Page & Messages Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review client messages & consultations, and edit telephone lines, office address, and digital social media channels.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/contact" target="_blank" className="btn-secondary !text-xs !py-2 font-semibold">
            View Live Contact Page ↗
          </Link>
        </div>
      </div>

      {/* Main Tabs: Inbox vs Edit Contact Info */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
        <Link
          href="/admin/contact?tab=inbox"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === "inbox"
              ? "bg-brand-900 text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <span>📨 Client Messages & Inquiries</span>
          {totalUnread > 0 && (
            <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
              {totalUnread} new
            </span>
          )}
        </Link>

        <Link
          href="/admin/contact?tab=details"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === "details"
              ? "bg-brand-900 text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <span>📍 Edit Contact Info & Social Media Links</span>
        </Link>
      </div>

      {/* TAB 1: INBOX */}
      {activeTab === "inbox" && (
        <div className="py-2">
          <MessagesInbox
            initialInquiries={inquiries}
            initialConsultations={consultations}
            initialQuotes={quotes}
            defaultTab={defaultSubTab}
          />
        </div>
      )}

      {/* TAB 2: EDIT CONTACT INFO & SOCIAL MEDIA */}
      {activeTab === "details" && (
        <div className="card p-6 sm:p-8 bg-white border border-gray-200 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-brand-950">
              Corporate Contact Details & Social Media Links
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Changes made here update the contact page, consultation page, and site footer immediately.
            </p>
          </div>
          <ContactDetailsForm settings={settings} />
        </div>
      )}
    </div>
  );
}
