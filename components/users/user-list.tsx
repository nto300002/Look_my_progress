import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function UserList() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profiles, error } = await supabase.from("profiles").select("*");

  if (error) {
    console.error("Error fetching profiles:", error);
    // TODO: エラーUIをここに表示
    return <p>Error loading users.</p>;
  }

  // profilesがnullまたは空の場合の表示
  if (!profiles || profiles.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Users</h1>
        <p>No users found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {profiles.map((profile: any) => (
          <Link
            href={`/users/${profile.id}`}
            key={profile.id}
            className="block p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold flex items-center">
              <span>{profile.name}</span>
              {user?.id === profile.id && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  (あなた)
                </span>
              )}
            </h2>
            <p className="text-sm text-muted-foreground">{profile.role}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
