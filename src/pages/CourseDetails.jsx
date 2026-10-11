import { useParams, Link } from "react-router-dom";

export default function CourseDetails({ courses }) {
  const { id } = useParams();
  const c = courses.find((x) => x.id === Number(id));
  if (!c) return <p className="alert alert--danger">Course not found. <Link to="/courses">Back to courses</Link></p>;
  return (
    <div className="card details">
      <h1>{c.code} – {c.name}</h1>
      <p>Faculty: <strong>{c.faculty}</strong></p>
      <p>Credits: <strong>{c.credits}</strong></p>
      <p>Status: <strong>{c.active ? "Active" : "Inactive"}</strong></p>
      <p>{c.description || "No description provided."}</p>
      <Link className="btn btn--ghost" to="/courses">Back</Link>
    </div>
  );
}
