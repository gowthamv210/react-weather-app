export default function FlipCard({ flipIt, children }) {
  return (
    <div className={`flip_card${flipIt ? "_active" : ""}`}>{children}</div>
  );
}
