import { BottomNav } from "@/components/BottomNav";
import { CounterHeader } from "@/components/CounterHeader";
import { RuleList } from "@/components/RuleList";

const rules = [
  "Each tap sends one real Base onchain transaction via increase().",
  "Your counter is bound to your wallet address.",
  "Counts can be used for daily check-ins or interaction milestones.",
  "Recent successful tx hash is shown on Home for quick verification.",
  "App also sends silent offchain tracking for dashboard attribution.",
];

export default function AboutPage() {
  return (
    <main className="app-shell">
      <CounterHeader title="BaseCounter Rules" subtitle="Lightweight behavior recorder" />
      <RuleList rules={rules} />
      <BottomNav />
    </main>
  );
}
