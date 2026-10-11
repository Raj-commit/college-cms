import { memo } from "react";
import { Link } from "react-router-dom";

function CourseCard({ course, onDelete }) {
  return (
    <tr>
      <td>{course.code}</td>
      <td><Link to={`/courses/${course.id}`}>{course.name}</Link></td>
      <td>{course.faculty}</td>
      <td>{course.credits}</td>
      <td>
        <Link className="btn btn--ghost" to={`/courses/${course.id}`}>View</Link>{" "}
        <button className="btn btn--danger" onClick={() => onDelete(course.id)}>Delete</button>
      </td>
    </tr>
  );
}
export default memo(CourseCard);
