import { Task } from "@/lib/definitions";

export async function fetchTasksByUserId(userId: string): Promise<Task[]> {
  const response = await fetch(`/api/users/${userId}/tasks`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  
  const tasks = await response.json();
  return tasks;
}