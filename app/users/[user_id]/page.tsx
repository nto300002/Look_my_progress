import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Book, Calendar, ListChecks } from "lucide-react";
import { UpdateRoleForm } from "@/components/users/update-role-form";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const { user_id } = await params;
  const supabase = await createClient();

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user_id)
    .single();

  if (error || !profile) {
    notFound();
  }

  const links = [
    {
      href: `/users/${user_id}/daily_reports`,
      label: "日報一覧",
      description: "このユーザーの日報を確認します",
      icon: Book,
    },
    {
      href: `/users/${user_id}/tasks`,
      label: "タスク一覧",
      description: "このユーザーのタスクを確認します",
      icon: ListChecks,
    },
    {
      href: `/users/${user_id}/schedule`,
      label: "スケジュール",
      description: "チーム共通のスケジュールを確認します",
      icon: Calendar,
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{profile.name}</h1>
        <p className="text-lg text-muted-foreground capitalize">
          {profile.role}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link href={link.href} key={link.href} passHref>
            <div className="flex h-full flex-col justify-between rounded-lg border p-6 transition-shadow hover:shadow-md">
              <div className="flex items-center gap-4">
                <link.icon className="h-6 w-6 text-muted-foreground" />
                <span className="text-lg font-semibold">{link.label}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {currentUser && currentUser.id === profile.id && (
        <UpdateRoleForm userId={profile.id} currentRole={profile.role} />
      )}
    </div>
  );
}
