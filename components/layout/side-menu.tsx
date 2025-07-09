"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "@/lib/definitions";
import { fetchAllUsers } from "@/lib/api/users";
import { User, Users, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedUsers = await fetchAllUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleUserClick = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  return (
    <>
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onToggle}
        className="fixed top-4 left-4 z-50"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onToggle} />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 pt-16">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5" />
            <h2 className="text-lg font-semibold">ユーザー一覧</h2>
          </div>

          {loading && (
            <div className="text-sm text-muted-foreground">
              Loading users...
            </div>
          )}

          {error && <div className="text-sm text-red-500">Error: {error}</div>}

          {!loading && !error && (
            <div className="space-y-2">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                >
                  <User className="h-4 w-4" />
                  <div>
                    <div className="font-medium">{user.name || "No name"}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.role}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
