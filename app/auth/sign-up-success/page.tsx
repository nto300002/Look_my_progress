import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Thank you for signing up!
              </CardTitle>
              <CardDescription>Check your email to confirm</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                サインアップが完了しました。メールを確認してアカウントを有効化してください。<br />
              　メールアドレスのリンクをクリック後、ログインが可能になります。<br />
              　もしメールが届かない場合は、迷惑メールフォルダを確認してください。<br />
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
