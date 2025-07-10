"use client";

import { useState, useEffect, useCallback } from "react";
import { Tag } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

type TagEditorProps = {
  taskId: string;
  userId: string;
  onTagsChange?: (tags: Tag[]) => void;
};

export function TagEditor({ taskId, userId, onTagsChange }: TagEditorProps) {
  const [currentTags, setCurrentTags] = useState<Tag[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 現在のタグを取得
  const fetchCurrentTags = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/${userId}/tasks/${taskId}/tags`);
      if (!response.ok) throw new Error("Failed to fetch tags");
      const tags = await response.json();
      setCurrentTags(tags);
      onTagsChange?.(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      toast.error("タグの取得に失敗しました");
    }
  }, [userId, taskId, onTagsChange]); // ← toast を依存配列から除外

  // 全てのタグを取得
  const fetchAllTags = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/${userId}/tags`);
      if (!response.ok) throw new Error("Failed to fetch all tags");
      const tags = await response.json();
      setAllTags(tags);
    } catch (error) {
      console.error("Error fetching all tags:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchCurrentTags();
    fetchAllTags();
  }, [fetchCurrentTags, fetchAllTags]);

  // 新しいタグを作成して追加
  const handleCreateAndAddTag = async () => {
    if (!newTagName.trim()) {
      toast.error("タグ名を入力してください");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}/tasks/${taskId}/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tagName: newTagName.trim() }),
      });

      if (!response.ok) throw new Error("Failed to create tag");

      setNewTagName("");
      await fetchCurrentTags();
      await fetchAllTags();
      toast.success("タグを作成・追加しました");
    } catch (error) {
      console.error("Error creating tag:", error);
      toast.error("タグの作成に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  // 既存のタグを追加
  const handleAddExistingTag = async (tagId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}/tasks/${taskId}/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tagId }),
      });

      if (!response.ok) throw new Error("Failed to add tag");

      await fetchCurrentTags();
      toast.success("タグを追加しました");
    } catch (error) {
      console.error("Error adding tag:", error);
      toast.error("タグの追加に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  // タグを削除
  const handleRemoveTag = async (tagId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}/tasks/${taskId}/tags`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tagId }),
      });

      if (!response.ok) throw new Error("Failed to remove tag");

      await fetchCurrentTags();
      toast.success("タグを削除しました");
    } catch (error) {
      console.error("Error removing tag:", error);
      toast.error("タグの削除に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  // 現在のタグIDのセット
  const currentTagIds = new Set(currentTags.map(tag => tag.id));

  // 追加可能なタグ（現在のタグに含まれていないもの）
  const availableTags = allTags.filter(tag => !currentTagIds.has(tag.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">タグ管理</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 現在のタグ */}
        <div>
          <Label className="text-sm font-medium">現在のタグ</Label>
          <div className="mt-2">
            {currentTags.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                タグがありません
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {currentTags.map((tag) => (
                  <Badge key={tag.id} variant="secondary" className="flex items-center gap-1">
                    <span>{tag.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => handleRemoveTag(tag.id)}
                      disabled={isLoading}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 新しいタグを作成 */}
        <div>
          <Label className="text-sm font-medium">新しいタグを作成</Label>
          <div className="flex gap-2 mt-2">
            <Input
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="タグ名を入力..."
              onKeyPress={(e) => e.key === "Enter" && handleCreateAndAddTag()}
            />
            <Button
              onClick={handleCreateAndAddTag}
              disabled={isLoading || !newTagName.trim()}
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 既存のタグから選択 */}
        {availableTags.length > 0 && (
          <div>
            <Label className="text-sm font-medium">既存のタグから選択</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary"
                  onClick={() => handleAddExistingTag(tag.id)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}