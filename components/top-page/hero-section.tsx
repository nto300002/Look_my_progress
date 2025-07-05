import Link from "next/link";

export default function HeroSection({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <section className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">日々の進捗を、可視化しよう。</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Progressは、あなたの毎日の頑張りを記録し、チームと共有するためのシンプルな日報ツールです。
      </p>
      {isLoggedIn ? (
        <Link href="/daily_reports">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
            ダッシュボードへ
          </button>
        </Link>
      ) : (
        <Link href="/auth/sign-up">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
            今すぐ無料で始める
          </button>
        </Link>
      )}
    </section>
  );
}
