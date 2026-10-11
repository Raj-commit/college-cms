import { useParams, Link } from "react-router-dom";
import { getStatus } from "../data.js";

export default function StudentDetails({ students }) {
  const { id } = useParams();
  const s = students.find((x) => x.id === Number(id));
  if (!s) return <p className="alert alert--danger">Student not found. <Link to="/students">Back to students</Link></p>;
  const status = getStatus(s.attendance);

  return (
    <div className="card details">
      <h1>Student Details</h1>
      <p>Name: <strong>{s.name}</strong></p>
      <p>Enrollment: <strong>{s.enrollment}</strong></p>
      <p>Course: <strong>{s.course}</strong></p>
      <p>Semester: <strong>{s.semester}</strong></p>
      <p>Attendance: <strong>{s.attendance}%</strong> – Status: <strong>{status}</strong></p>
      <h2>Subjects</h2>
      {s.subjects.length === 0 ? <p className="muted">No subject marks recorded.</p> : (
        <table>
          <tbody>{s.subjects.map((sub) => <tr key={sub.name}><td>{sub.name}</td><td>{sub.marks}%</td></tr>)}</tbody>
        </table>
      )}
      <Link className="btn btn--ghost" to="/students">Back</Link>
    </div>
  );
}
