"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Calendar from "@/components/tasks/schedule/calendar";
import { Task, Profile } from "@/lib/definitions";
import { fetchTasksByUserId } from "@/lib/api/tasks";
import { fetchUserProfile } from "@/lib/api/users";

export default function SchedulePage() {
  const params = useParams();
  const userId = params.user_id as string;
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [fetchedTasks, fetchedProfile] = await Promise.all([
          fetchTasksByUserId(userId),
          fetchUserProfile(userId)
        ]);
        
        setTasks(fetchedTasks);
        setUserProfile(fetchedProfile);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">
            {userProfile?.name || userId}のスケジュール
          </p>
          <h1 className="text-3xl font-bold">Schedule</h1>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="text-muted-foreground">Loading tasks...</div>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-8">
          <div className="text-red-500">Error: {error}</div>
        </div>
      )}

      {!loading && !error && <Calendar tasks={tasks} />}
    </div>
  );
}
