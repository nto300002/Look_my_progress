import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TasksDisplay } from "@/components/tasks/tasks-display";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getTasksWithTagsByUserId } from "@/lib/data/tasks";

export async function TaskContent({ userId }: { userId: string }) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", userId)
    .single();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const tasks = await getTasksWithTagsByUserId(userId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/users/${userId}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {profile?.name ?? "ユーザー"}の詳細へ戻る
          </p>
          <h1 className="text-3xl font-bold">タスク一覧</h1>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <Input placeholder="タスクを検索..." />
        </div>
        {authUser?.id === userId && (
          <Link href={`/users/${userId}/tasks/new`}>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              新規作成
            </Button>
          </Link>
        )}
      </div>

      <TasksDisplay 
        tasks={tasks} 
        userId={userId} 
        authUser={authUser} 
        profileName={profile?.name}
      />
    </div>
  );
}
