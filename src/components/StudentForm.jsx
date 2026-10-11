import { useState, useEffect } from "react";
import { COURSE_OPTIONS } from "../data.js";

const empty = { name: "", enrollment: "", email: "", course: COURSE_OPTIONS[0], semester: 1, gender: "Male", attendance: 75 };

export default function StudentForm({ editing, onSubmit, onCancel }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  useEffect(() => { setForm(editing ?? empty); setError(""); }, [editing]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.enrollment.trim()) return setError("Name and enrollment number are required.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Enter a valid email address.");
    const att = Number(form.attendance);
    if (att < 0 || att > 100) return setError("Attendance must be between 0 and 100.");
    onSubmit({ ...form, semester: Number(form.semester), attendance: att });
    setForm(empty);
    setError("");
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h2>{editing ? "Edit student" : "Add student"}</h2>
      {error && <p className="alert alert--danger">{error}</p>}
      <label>Student name<input name="name" value={form.name} onChange={change} /></label>
      <label>Enrollment number<input name="enrollment" value={form.enrollment} onChange={change} /></label>
      <label>Email<input name="email" type="email" value={form.email} onChange={change} /></label>
      <label>Course
        <select name="course" value={form.course} onChange={change}>
          {COURSE_OPTIONS.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      <label>Semester
        <select name="semester" value={form.semester} onChange={change}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <fieldset>
        <legend>Gender</legend>
        {["Male", "Female", "Other"].map((g) => (
          <label key={g} className="inline">
            <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={change} /> {g}
          </label>
        ))}
      </fieldset>
      <label>Attendance (%)<input name="attendance" type="number" min="0" max="100" value={form.attendance} onChange={change} /></label>
      <div className="actions">
        <button className="btn" type="submit">{editing ? "Save changes" : "Add student"}</button>
        {editing && <button className="btn btn--ghost" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
