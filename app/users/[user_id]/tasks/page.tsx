import { TaskContent } from "@/components/tasks/task-content";
import Loading from "./loading";
import { Suspense } from "react";

type Props = {
  params: {
    user_id: string;
  };
};

export default function TasksPage({ params }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <TaskContent userId={params.user_id} />
    </Suspense>
  );
}
