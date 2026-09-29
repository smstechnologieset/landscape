import { getStoredMessages } from "@/lib/data-store";
import MessagesInbox from "@/components/admin/MessagesInbox";

export const metadata = { title: "Contact Inquiries | Admin Portal" };

export default async function AdminInquiriesPage() {
  const messages = await getStoredMessages();

  return (
    <div className="py-4">
      <MessagesInbox initialMessages={messages} />
    </div>
  );
}
