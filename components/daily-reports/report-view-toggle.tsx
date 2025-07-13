"use client";

import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

interface ReportViewToggleProps {
  onViewChange: (view: "masonry" | "table") => void;
  currentView: "masonry" | "table";
}

export function ReportViewToggle({ onViewChange, currentView }: ReportViewToggleProps) {
  return (
    <div className="flex gap-1 border rounded-lg p-1">
      <Button
        variant={currentView === "masonry" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("masonry")}
        className="h-8"
      >
        <Grid className="h-4 w-4" />
        <span className="ml-1 hidden sm:inline">カード</span>
      </Button>
      <Button
        variant={currentView === "table" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("table")}
        className="h-8"
      >
        <List className="h-4 w-4" />
        <span className="ml-1 hidden sm:inline">テーブル</span>
      </Button>
    </div>
  );
}