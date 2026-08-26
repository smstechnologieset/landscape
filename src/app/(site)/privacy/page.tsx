export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container-page py-16">
      <div className="prose-content mx-auto max-w-3xl">
        <h1>Privacy Policy</h1>
        <p>
          We collect only the information you provide through our forms (name, contact
          details and project information) in order to respond to your inquiries, prepare
          quotes and process job applications.
        </p>
        <h2>How we use your data</h2>
        <ul>
          <li>To respond to your messages and requests</li>
          <li>To prepare quotes and schedule consultations</li>
          <li>To evaluate job applications</li>
        </ul>
        <h2>Data storage &amp; security</h2>
        <p>
          Your data is stored securely and access is restricted to authorized staff.
          Uploaded resumes and attachments are private and never publicly accessible.
        </p>
        <p className="text-sm text-gray-500">
          Note: replace this placeholder with the client&apos;s approved legal text before launch.
        </p>
      </div>
    </div>
  );
}
