type RuleListProps = {
  rules: string[];
};

export function RuleList({ rules }: RuleListProps) {
  return (
    <section className="card">
      <h2 className="section-title">Rules</h2>
      <ul className="rule-list">
        {rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </section>
  );
}
