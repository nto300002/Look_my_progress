"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { DailyReport } from "@/lib/definitions";

// Mappings to handle mood value conversion between API (face) and form (mood)
const moodApiToForm: { [key: string]: "良い" | "普通" | "悪い" } = {
  smile: "良い",
  good: "良い",
  normal: "普通",
  sad: "悪い",
  bad: "悪い",
  良い: "良い",
  普通: "普通",
  悪い: "悪い",
};

const moodFormToApi: { 良い: "smile"; 普通: "normal"; 悪い: "sad" } = {
  良い: "smile",
  普通: "normal",
  悪い: "sad",
};

type ReportFormProps = {
  initialData?: DailyReport | null;
};

export function ReportForm({ initialData }: ReportFormProps) {
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState<"良い" | "普通" | "悪い" | "">("");
  const [achievements, setAchievements] = useState("");
  const [challenges, setChallenges] = useState("");
  const [learnings, setLearnings] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useParams();
  const router = useRouter();
  const userId = params.user_id as string;
  const reportId = params.id as string;

  const isEditMode = !!initialData;

  useEffect(() => {
    if (isEditMode && initialData) {
      setTitle(initialData.title);
      setMood(moodApiToForm[initialData.mood] || "");
      setAchievements(initialData.achievements || "");
      setChallenges(initialData.challenges || "");
      setLearnings(initialData.learnings || "");
    }
  }, [isEditMode, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title || !mood) {
      toast.error("タイトルと今の気分は必須です。");
      setIsSubmitting(false);
      return;
    }

    const reportData = {
      title,
      mood: mood ? moodFormToApi[mood] : undefined,
      achievements,
      challenges,
      learnings,
    };

    try {
      const url = isEditMode
        ? `/api/users/${userId}/daily_reports/${reportId}/edit`
        : `/api/users/${userId}/daily_reports/new`;
      const method = isEditMode ? "PATCH" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error(
          `日報の${isEditMode ? "更新" : "作成"}に失敗しました。`
        );
      }

      toast.success(`日報を${isEditMode ? "更新" : "作成"}しました！`);
      router.push(`/users/${userId}/daily_reports`);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "不明なエラーが発生しました。"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>日報の内容</CardTitle>
          <CardDescription>
            {isEditMode
              ? "日報を編集します。"
              : "今日一日の活動を記録しましょう。"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">タイトル</Label>
              <Input
                id="title"
                placeholder="例: ○○機能の実装"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mood">今の気分</Label>
              <Select
                onValueChange={(value: "良い" | "普通" | "悪い") =>
                  setMood(value)
                }
                value={mood}
                required
              >
                <SelectTrigger id="mood">
                  <SelectValue placeholder="気分を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="良い">😊 良い</SelectItem>
                  <SelectItem value="普通">😐 普通</SelectItem>
                  <SelectItem value="悪い">😥 悪い</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="achievements">よかった事 (Achievements)</Label>
            <Textarea
              id="achievements"
              placeholder="今日達成できたこと、うまくいったことなどを記入してください。"
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="challenges">悪かった事 (Challenges)</Label>
            <Textarea
              id="challenges"
              placeholder="課題だと感じたこと、うまくいかなかったことなどを記入してください。"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="learnings">伝えたい事 (Learnings)</Label>
            <Textarea
              id="learnings"
              placeholder="学んだこと、気づいたこと、チームに共有したいことなどを記入してください。"
              value={learnings}
              onChange={(e) => setLearnings(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "提出中..."
              : isEditMode
              ? "日報を更新"
              : "日報を提出"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
