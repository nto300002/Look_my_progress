"use client";

import { Tag } from "@/lib/definitions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type TagListProps = {
  tags: Tag[];
  onRemoveTag?: (tagId: string) => void;
  showRemoveButton?: boolean;
};

export function TagList({ tags, onRemoveTag, showRemoveButton = false }: TagListProps) {
  if (tags.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        タグがありません
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag.id} variant="secondary" className="flex items-center gap-1">
          <span>{tag.name}</span>
          {showRemoveButton && onRemoveTag && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 hover:bg-transparent"
              onClick={() => onRemoveTag(tag.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </Badge>
      ))}
    </div>
  );
}