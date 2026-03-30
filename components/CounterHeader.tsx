type CounterHeaderProps = {
  title?: string;
  subtitle?: string;
};

export function CounterHeader({
  title = "BaseCounter",
  subtitle = "Onchain behavior ticker",
}: CounterHeaderProps) {
  return (
    <header className="card counter-header">
      <div className="header-pill">Base Mini App</div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}
