import { useState, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Students from "./pages/Students.jsx";
import StudentDetails from "./pages/StudentDetails.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import { initialStudents, initialCourses } from "./data.js";

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [courses, setCourses] = useState(initialCourses);

  // useCallback keeps these references stable so memoized children don't re-render needlessly
  const addStudent = useCallback((s) => setStudents((p) => [...p, { ...s, id: Date.now(), subjects: [] }]), []);
  const updateStudent = useCallback((s) => setStudents((p) => p.map((x) => (x.id === s.id ? { ...x, ...s } : x))), []);
  const deleteStudent = useCallback((id) => setStudents((p) => p.filter((x) => x.id !== id)), []);
  const addCourse = useCallback((c) => setCourses((p) => [...p, { ...c, id: Date.now(), active: true }]), []);
  const deleteCourse = useCallback((id) => setCourses((p) => p.filter((x) => x.id !== id)), []);

  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard students={students} courses={courses} />} />
          <Route path="/students" element={<Students students={students} onAdd={addStudent} onUpdate={updateStudent} onDelete={deleteStudent} />} />
          <Route path="/students/:id" element={<StudentDetails students={students} />} />
          <Route path="/courses" element={<Courses courses={courses} onAdd={addCourse} onDelete={deleteCourse} />} />
          <Route path="/courses/:id" element={<CourseDetails courses={courses} />} />
          <Route path="*" element={<p className="alert alert--warning">Page not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
