"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, LogOut } from "lucide-react";

// shadcn/uiのButtonが利用可能であると仮定
// import { Button } from '@/components/ui/button'

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link
          href="/"
          className="text-xl font-bold text-gray-800 dark:text-white"
        >
          ゆるく進捗管理
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              {/* PC用ナビゲーション */}
              <div className="hidden md:flex items-center gap-2">
                <Link href="/daily_reports" passHref>
                  <Button variant="ghost">日報一覧</Button>
                </Link>
                <Link href="/tasks" passHref>
                  <Button variant="ghost">タスク一覧</Button>
                </Link>
                <Link href="/tasks/schedule" passHref>
                  <Button variant="ghost">スケジュール</Button>
                </Link>
                <Button onClick={handleLogout} variant="ghost">
                  <LogOut className="mr-2 h-4 w-4" />
                  ログアウト
                </Button>
              </div>
              {/* モバイル用ハンバーガーメニュー */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">メニューを開く</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/daily-reports/today">今日の様子</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/tasks/today">今日のタスク</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/schedule">スケジュール</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/tasks">タスク一覧</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/retrospectives">振り返り</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-500"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>ログアウト</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/auth/sign-up" passHref>
                <Button variant="ghost">新規登録</Button>
              </Link>
              <Link href="/auth/login" passHref>
                <Button variant="ghost">ログイン</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
