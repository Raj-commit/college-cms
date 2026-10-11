import { useState, useMemo, useCallback } from "react";
import StudentCard from "../components/StudentCard.jsx";
import StudentForm from "../components/StudentForm.jsx";
import { COURSE_OPTIONS } from "../data.js";

export default function Students({ students, onAdd, onUpdate, onDelete }) {
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");

  // useMemo: skip re-filtering when unrelated state (e.g. message) changes
  const visible = useMemo(() => {
    const q = query.toLowerCase();
    return students.filter(
      (s) => (courseFilter === "All" || s.course === courseFilter) &&
             (s.name.toLowerCase().includes(q) || s.enrollment.includes(q))
    );
  }, [students, query, courseFilter]);

  const handleEdit = useCallback((s) => setEditing(s), []);
  const handleDelete = useCallback((id) => {
    if (window.confirm("Delete this student?")) { onDelete(id); setMessage("Student deleted."); }
  }, [onDelete]);

  const handleSubmit = (data) => {
    if (editing) { onUpdate({ ...data, id: editing.id }); setMessage("Student updated."); setEditing(null); }
    else { onAdd(data); setMessage("Student added."); }
  };

  return (
    <>
      <h1>Students</h1>
      {message && <p className="alert alert--success">{message}</p>}
      <div className="split">
        <StudentForm editing={editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />
        <div>
          <div className="toolbar">
            <input placeholder="Search by name or enrollment" value={query} onChange={(e) => setQuery(e.target.value)} />
            <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
              <option>All</option>
              {COURSE_OPTIONS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          {visible.length === 0 ? <p className="alert alert--warning">No students match your search.</p> : (
            <div className="grid grid--cards">
              {visible.map((s) => <StudentCard key={s.id} student={s} onEdit={handleEdit} onDelete={handleDelete} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
