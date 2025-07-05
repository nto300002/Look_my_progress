const features = [
  {
    title: "シンプルな日報作成",
    description:
      "マークダウン対応のエディタで、今日やったことを簡単にまとめられます。",
    icon: "📝",
  },
  {
    title: "進捗の可視化",
    description:
      "カレンダー表示で、過去の日報をいつでも振り返ることができます。",
    icon: "📊",
  },
  {
    title: "チームでの共有",
    description:
      "チームメンバーの日報にコメントして、フィードバックを送り合えます。",
    icon: "👥",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">主な機能</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-8 bg-white dark:bg-gray-700 rounded-lg shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
