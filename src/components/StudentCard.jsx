import { memo } from "react";
import { Link } from "react-router-dom";
import { getStatus } from "../data.js";

/*
 * WHY React.memo: StudentCard is rendered once per student in a list. Without memo,
 * typing in the search box re-renders the parent and every card. With memo (plus
 * useCallback'd onEdit/onDelete), only cards whose props changed re-render.
 */
function StudentCard({ student, onEdit, onDelete }) {
  const status = getStatus(student.attendance);
  const tone = status === "Eligible" ? "success" : status === "Warning" ? "warning" : "danger";
  return (
    <div className="card">
      <h3><Link to={`/students/${student.id}`}>{student.name}</Link></h3>
      <p className="muted">{student.enrollment} · {student.course} · Sem {student.semester}</p>
      <p>Attendance: <strong>{student.attendance}%</strong></p>
      <p className={`alert alert--${tone}`}>
        Status: {status}
        {status === "Warning" && " – below 75%"}
        {status === "Detained" && " – below 60%"}
      </p>
      <div className="actions">
        <button className="btn btn--ghost" onClick={() => onEdit(student)}>Edit</button>
        <button className="btn btn--danger" onClick={() => onDelete(student.id)}>Delete</button>
      </div>
    </div>
  );
}
export default memo(StudentCard);
