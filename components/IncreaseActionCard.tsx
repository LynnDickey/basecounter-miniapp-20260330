type IncreaseActionCardProps = {
  onIncrease: () => void;
  disabled: boolean;
  loading: boolean;
  lastTxHash?: string;
};

function shortHash(hash: string) {
  return `${hash.slice(0, 10)}...${hash.slice(-6)}`;
}

export function IncreaseActionCard({
  onIncrease,
  disabled,
  loading,
  lastTxHash,
}: IncreaseActionCardProps) {
  return (
    <section className="card action-card">
      <button
        className="button accent"
        type="button"
        disabled={disabled || loading}
        onClick={onIncrease}
      >
        {loading ? "Submitting..." : "Increase"}
      </button>
      <p className="hint">Each tap sends an independent onchain transaction.</p>
      {lastTxHash ? (
        <a
          className="tx-link"
          href={`https://basescan.org/tx/${lastTxHash}`}
          target="_blank"
          rel="noreferrer"
        >
          Last tx: {shortHash(lastTxHash)}
        </a>
      ) : (
        <p className="hint">No successful tx yet</p>
      )}
    </section>
  );
}
