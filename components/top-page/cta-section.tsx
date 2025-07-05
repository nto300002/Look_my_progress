import Link from "next/link";

export default function CallToActionSection({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  return (
    <>
      {!isLoggedIn && (
        <section className="text-center py-20">
          <h2 className="text-3xl font-bold mb-4">
            さあ、あなたも進捗を記録しませんか？
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            アカウント作成は1分で完了します。
          </p>
          <Link href="/auth/sign-up">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
              無料でサインアップ
            </button>
          </Link>
        </section>
      )}
    </>
  );
}
