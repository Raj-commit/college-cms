export default function DashboardCard({ label, value }) {
  return (
    <div className="card stat">
      <span className="stat__value">{value}</span>
      <span className="stat__label">{label}</span>
    </div>
  );
}
