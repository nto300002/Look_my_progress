import { TaskContent } from "@/components/tasks/task-content";
import Loading from "./loading";
import { Suspense } from "react";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const { user_id } = await params;
  return (
    <Suspense fallback={<Loading />}>
      <TaskContent userId={user_id} />
    </Suspense>
  );
}
