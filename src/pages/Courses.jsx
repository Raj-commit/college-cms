import { useState, useMemo } from "react";
import CourseCard from "../components/CourseCard.jsx";

const blank = { code: "", name: "", faculty: "", credits: 3, description: "" };

export default function Courses({ courses, onAdd, onDelete }) {
  const [form, setForm] = useState(blank);
  const [query, setQuery] = useState("");
  const [credits, setCredits] = useState("All");
  const [error, setError] = useState("");

  const visible = useMemo(() => {
    const q = query.toLowerCase();
    return courses.filter(
      (c) => (credits === "All" || c.credits === Number(credits)) &&
             (c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q))
    );
  }, [courses, query, credits]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!form.code.trim() || !form.name.trim() || !form.faculty.trim()) return setError("Code, name and faculty are required.");
    onAdd({ ...form, credits: Number(form.credits) });
    setForm(blank); setError("");
  };

  return (
    <>
      <h1>Courses</h1>
      <form className="card form form--row" onSubmit={submit}>
        {error && <p className="alert alert--danger">{error}</p>}
        <input name="code" placeholder="Code (BCS104)" value={form.code} onChange={change} />
        <input name="name" placeholder="Course name" value={form.name} onChange={change} />
        <input name="faculty" placeholder="Faculty" value={form.faculty} onChange={change} />
        <input name="credits" type="number" min="1" max="6" value={form.credits} onChange={change} />
        <button className="btn" type="submit">Add course</button>
      </form>
      <div className="toolbar">
        <input placeholder="Search courses" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={credits} onChange={(e) => setCredits(e.target.value)}>
          <option value="All">All credits</option>
          {[2, 3, 4].map((c) => <option key={c} value={c}>{c} credits</option>)}
        </select>
      </div>
      {visible.length === 0 ? <p className="alert alert--warning">No courses found.</p> : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Course Code</th><th>Course Name</th><th>Faculty</th><th>Credits</th><th></th></tr></thead>
            <tbody>{visible.map((c) => <CourseCard key={c.id} course={c} onDelete={onDelete} />)}</tbody>
          </table>
        </div>
      )}
    </>
  );
}
