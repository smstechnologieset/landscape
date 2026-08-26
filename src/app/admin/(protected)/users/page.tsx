import { createClient } from "@/lib/supabase/server";
import { setUserRole } from "@/app/actions/admin";

export default async function AdminUsersPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: me } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id ?? "")
    .maybeSingle();

  if (!me || me.role !== "admin") {
    return (
      <div className="card mx-auto max-w-lg p-8 text-center">
        <h1 className="text-xl font-bold text-red-700">Access denied</h1>
        <p className="mt-2 text-sm text-gray-600">Only administrators can manage users.</p>
      </div>
    );
  }

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id,full_name,email,role,created_at")
    .order("created_at");

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-2xl font-bold text-brand-900">Admin Users</h1>
      <p className="mb-6 text-sm text-gray-500">
        New accounts are created via Supabase Auth invites. New signups start as
        &ldquo;editor&rdquo; and must be promoted here.
      </p>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(profiles ?? []).map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium">{p.full_name || "—"}</td>
                <td className="px-4 py-3 text-gray-500">{p.email}</td>
                <td className="px-4 py-3">
                  {p.id === user?.id ? (
                    <span className="rounded bg-brand-100 px-2 py-0.5 text-xs font-semibold uppercase text-brand-800">
                      {p.role} (you)
                    </span>
                  ) : (
                    <form action={setUserRole} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={p.id} />
                      <label htmlFor={`r-${p.id}`} className="sr-only">Role</label>
                      <select id={`r-${p.id}`} name="role" defaultValue={p.role} className="input !w-auto !py-1 text-xs">
                        <option value="editor">editor</option>
                        <option value="admin">admin</option>
                      </select>
                      <button className="btn-secondary !px-2.5 !py-1 text-xs">Set</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
