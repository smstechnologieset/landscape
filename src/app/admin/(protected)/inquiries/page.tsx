import { getStoredMessages } from "@/lib/data-store";
import { createAdminClient } from "@/lib/supabase/admin";
import MessagesInbox, {
  type ConsultationItem,
  type QuoteItem,
  type MessageType
} from "@/components/admin/MessagesInbox";

export const metadata = { title: "Messages & Inquiries | Admin Portal" };

interface PageProps {
  searchParams?: {
    type?: string;
  };
}

export default async function AdminInquiriesPage({ searchParams }: PageProps) {
  const supabase = createAdminClient();

  // Fetch inquiries, consultations, and quotes concurrently
  const [inquiries, consultationsRes, quotesRes] = await Promise.all([
    getStoredMessages(),
    supabase.from("consultation_requests").select("*").order("created_at", { ascending: false }),
    supabase.from("quote_requests").select("*, services(title)").order("created_at", { ascending: false })
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

  // Map quotes & generate signed URLs for attachments if stored in private bucket
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

  // Determine initial tab from query params
  let defaultTab: MessageType = "all";
  if (searchParams?.type === "inquiries") defaultTab = "inquiries";
  if (searchParams?.type === "consultations") defaultTab = "consultations";
  if (searchParams?.type === "quotes") defaultTab = "quotes";

  return (
    <div className="py-2">
      <MessagesInbox
        initialInquiries={inquiries}
        initialConsultations={consultations}
        initialQuotes={quotes}
        defaultTab={defaultTab}
      />
    </div>
  );
}
