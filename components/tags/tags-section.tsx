"use client";

import { useState, useEffect } from "react";
import { Tag } from "@/lib/definitions";
import { TagList } from "./tag-list";
import { TagEditor } from "./tag-editor";

type TagsSectionProps = {
  taskId: string;
  userId: string;
  isOwner: boolean;
  initialTags: Tag[];
};

export function TagsSection({ taskId, userId, isOwner, initialTags }: TagsSectionProps) {
  const [tags, setTags] = useState<Tag[]>(initialTags);

  const handleTagsChange = (newTags: Tag[]) => {
    setTags(newTags);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">タグ</h2>
        <TagList tags={tags} />
      </div>
      
      {/* タグエディター（タスクの所有者のみ表示） */}
      {isOwner && (
        <TagEditor
          taskId={taskId}
          userId={userId}
          onTagsChange={handleTagsChange}
        />
      )}
    </div>
  );
}