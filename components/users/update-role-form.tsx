"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { UserRole } from "@/lib/definitions";
import { toast } from "sonner";

export function UpdateRoleForm({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: UserRole;
}) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleRoleUpdate() {
    setIsSubmitting(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // TODO: Implement proper authorization. For now, any logged-in user can change roles.
    if (!user) {
      toast.error("You must be logged in to change a user's role.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ role: selectedRole })
      .eq("id", userId);

    setIsSubmitting(false);

    if (error) {
      toast.error("Failed to update role: " + error.message);
    } else {
      toast.success("User role updated successfully!");
      router.refresh();
    }
  }

  return (
    <div className="mt-6 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Change Role</h3>
      <div className="flex items-center gap-4">
        <Select
          onValueChange={(value: UserRole) => setSelectedRole(value)}
          defaultValue={selectedRole}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="commenter">Commenter</SelectItem>
            <SelectItem value="task_manager">Task Manager</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleRoleUpdate}
          disabled={isSubmitting || selectedRole === currentRole}
        >
          {isSubmitting ? "Updating..." : "Update Role"}
        </Button>
      </div>
    </div>
  );
}
