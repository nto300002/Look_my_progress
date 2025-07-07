import { TaskContent } from "@/components/tasks/task-content";
import Loading from "./loading";
import { Suspense } from "react";

export default async function TasksPage({
  params,
}: {
  params: {
    user_id: string;
  };
}) {
  return (
    <Suspense fallback={<Loading />}>
      <TaskContent userId={params.user_id} />
    </Suspense>
  );
}
