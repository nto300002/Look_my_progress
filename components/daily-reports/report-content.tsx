import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export async function ReportContent({ userId }: { userId: string }) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", userId)
    .single();

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/users/${userId}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {profile?.name ?? "ユーザー"}の詳細へ戻る
          </p>
          <h1 className="text-3xl font-bold">日報一覧</h1>
        </div>
      </div>

      {/* TODO: 実際の日報データをここに表示 */}
      <p>このユーザーの日報一覧がここに表示されます。</p>
    </div>
  );
}
