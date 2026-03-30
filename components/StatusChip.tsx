type StatusTone = "idle" | "loading" | "success" | "error";

type StatusChipProps = {
  tone: StatusTone;
  text: string;
};

export function StatusChip({ tone, text }: StatusChipProps) {
  return <div className={`status-chip ${tone}`}>{text}</div>;
}
