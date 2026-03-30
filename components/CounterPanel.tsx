type CounterPanelProps = {
  address?: string;
  countLabel: string;
  isLoading?: boolean;
  animateKey?: string;
};

function shortAddress(address?: string) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function CounterPanel({
  address,
  countLabel,
  isLoading = false,
  animateKey,
}: CounterPanelProps) {
  return (
    <section className="card counter-panel">
      <p className="panel-label">Current Onchain Count</p>
      <p key={animateKey} className={`counter-value ${isLoading ? "loading" : "bump"}`}>
        {isLoading ? "..." : countLabel}
      </p>
      <div className="wallet-row">
        <span>Wallet</span>
        <strong>{shortAddress(address)}</strong>
      </div>
    </section>
  );
}
