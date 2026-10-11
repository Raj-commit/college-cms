import { useMemo } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "../components/DashboardCard.jsx";

export default function Dashboard({ students, courses }) {
  // useMemo: statistics are derived from arrays; recompute only when the arrays change
  const stats = useMemo(() => {
    const avg = students.length ? Math.round(students.reduce((s, x) => s + x.attendance, 0) / students.length) : 0;
    return [
      { label: "Total Students", value: students.length },
      { label: "Total Courses", value: courses.length },
      { label: "Active Courses", value: courses.filter((c) => c.active).length },
      { label: "Average Attendance", value: `${avg}%` },
    ];
  }, [students, courses]);

  const recent = students.slice(-5).reverse();

  return (
    <>
      <h1>College Management System</h1>
      <section className="grid">
        {stats.map((s) => <DashboardCard key={s.label} {...s} />)}
      </section>
      <h2>Recent Students</h2>
      {recent.length === 0 ? <p className="alert alert--warning">No students yet.</p> : (
        <ul className="list">
          {recent.map((s) => <li key={s.id}><Link to={`/students/${s.id}`}>{s.name}</Link> <span className="muted">{s.course}</span></li>)}
        </ul>
      )}
    </>
  );
}
