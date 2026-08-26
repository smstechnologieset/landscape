export default function SectionHeading({
  title,
  subtitle,
  align = "center"
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : ""}`}>
      <h2 className="text-3xl font-bold text-brand-900 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-gray-600">{subtitle}</p>}
    </div>
  );
}
export { SectionHeading };

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
      {message}
    </div>
  );
}
