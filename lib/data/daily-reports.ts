// lib/data/daily-reports.ts
import { createClient } from "@/lib/supabase/server";
import { DailyReport } from "@/lib/definitions";
import { unstable_noStore as noStore } from "next/cache";

// DBから取得した生の型 (カラム名に準拠)
// この型はエクスポートせず、このファイル内でのみ使用する
type RawDailyReport = {
  id: string;
  user_id: string;
  title: string;
  face: "良い" | "普通" | "悪い";
  good_thing: string;
  bad_thing: string;
  message: string;
  report_date: string;
  created_at: string;
  updated_at: string;
};

// 生のDBデータをフロントエンドの型に変換する
const transformReport = (raw: RawDailyReport): DailyReport => {
  return {
    id: raw.id,
    user_id: raw.user_id,
    title: raw.title,
    report_date: raw.report_date,
    created_at: raw.created_at,
    updated_at: raw.updated_at,
    // カラム名とプロパティ名のマッピング
    mood: raw.face,
    achievements: raw.good_thing,
    challenges: raw.bad_thing,
    learnings: raw.message,
    next_day_goals: "", // DBにカラムがないため空文字
  };
};

// ユーザーIDに基づいて日報一覧を取得
export const getDailyReportsByUserId = async (
  userId: string
): Promise<DailyReport[]> => {
  noStore(); // 動的レンダリングを強制
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("daily_reports")
    .select("*")
    .eq("user_id", userId)
    .order("report_date", { ascending: false });

  if (error) {
    console.error("Error fetching daily reports:", error);
    throw new Error("Failed to fetch daily reports.");
  }
  // 取得したデータを変換
  return data.map(transformReport);
};

// IDによって特定の日報を取得
export const getDailyReportById = async (
  id: string
): Promise<DailyReport | null> => {
  noStore();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("daily_reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116は行が見つからない場合のエラーコードなので、それは無視する
    console.error("Error fetching daily report:", error);
    throw new Error("Failed to fetch daily report.");
  }

  if (!data) {
    return null;
  }
  // 取得したデータを変換
  return transformReport(data);
};
