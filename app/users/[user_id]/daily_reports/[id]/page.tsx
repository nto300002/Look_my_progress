import Link from "next/link";
import { notFound } from "next/navigation";
import { getDailyReportById } from "@/lib/data/daily-reports";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CommentsSection } from "@/components/comments/comments-section";

const moodMap: { [key: string]: { label: string; className: string } } = {
  smile: { label: "😊 良い", className: "bg-green-100 text-green-800" },
  normal: { label: "😐 普通", className: "bg-yellow-100 text-yellow-800" },
  sad: { label: "😥 悪い", className: "bg-red-100 text-red-800" },
};

export default async function DailyReportDetailPage({
  params,
}: {
  params: Promise<{ user_id: string; id: string }>;
}) {
  const { user_id, id } = await params;
  const report = await getDailyReportById(id);

  if (!report) {
    notFound();
  }

  const renderMarkdown = (text: string | null) => {
    if (!text) return <p className="text-muted-foreground">記載なし</p>;
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/users/${user_id}/daily_reports`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            一覧へ戻る
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{report.title}</CardTitle>
          <CardDescription className="flex items-center gap-4 pt-2">
            <span>
              日付: {new Date(report.report_date).toLocaleDateString()}
            </span>
            <span>
              気分:{" "}
              <Badge
                variant="outline"
                className={moodMap[report.mood]?.className}
              >
                {moodMap[report.mood]?.label ?? report.mood}
              </Badge>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold border-b pb-2">
              よかった事 (Achievements)
            </h3>
            <div className="p-2">{renderMarkdown(report.achievements)}</div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold border-b pb-2">
              悪かった事 (Challenges)
            </h3>
            <div className="p-2">{renderMarkdown(report.challenges)}</div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold border-b pb-2">
              伝えたい事 (Learnings)
            </h3>
            <div className="p-2">{renderMarkdown(report.learnings)}</div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <CommentsSection dailyReportId={id} userId={user_id} />
      </div>
    </div>
  );
}
