const baseStudents = [
  { id: 1, name: "Rahul Sharma", enrollment: "1023", email: "rahul@gsfc.edu", course: "B.Tech CSE", semester: 5, gender: "Male", attendance: 82,
    subjects: [{ name: "Web Technology", marks: 85 }, { name: "DBMS", marks: 90 }, { name: "AI", marks: 78 }] },
  { id: 2, name: "Amit Patel", enrollment: "1024", email: "amit@gsfc.edu", course: "B.Tech CSE", semester: 5, gender: "Male", attendance: 58,
    subjects: [{ name: "Web Technology", marks: 62 }, { name: "DBMS", marks: 55 }, { name: "AI", marks: 60 }] },
  { id: 3, name: "Neha Shah", enrollment: "1025", email: "neha@gsfc.edu", course: "B.Tech IT", semester: 5, gender: "Female", attendance: 71,
    subjects: [{ name: "Web Technology", marks: 74 }, { name: "DBMS", marks: 80 }, { name: "AI", marks: 69 }] },
  { id: 4, name: "Priya Desai", enrollment: "1026", email: "priya@gsfc.edu", course: "BCA", semester: 3, gender: "Female", attendance: 91,
    subjects: [{ name: "Web Technology", marks: 92 }, { name: "DBMS", marks: 88 }, { name: "AI", marks: 84 }] },
];

const baseCourses = [
  { id: 1, code: "BCS101", name: "Web Tech", faculty: "Dr. A", credits: 4, active: true, description: "HTML, CSS, JavaScript and React fundamentals." },
  { id: 2, code: "BCS102", name: "DBMS", faculty: "Dr. B", credits: 4, active: true, description: "Relational model, SQL, normalization and transactions." },
  { id: 3, code: "BCS103", name: "AI", faculty: "Dr. C", credits: 3, active: true, description: "Search, knowledge representation and intro to machine learning." },
];

const first = ["Aarav","Vivaan","Diya","Ishita","Karan","Meera","Rohan","Sneha","Tanvi","Yash","Anika","Dev","Harsh","Jiya","Kabir"];
const last = ["Mehta","Joshi","Trivedi","Bhatt","Parikh","Thakkar","Modi","Pandya","Gandhi","Vyas"];
const COURSES = ["B.Tech CSE", "B.Tech IT", "BCA"];
const extraStudents = Array.from({ length: 250 - baseStudents.length }, (_, k) => {
  const i = k + baseStudents.length;
  const subj = ["Web Technology", "DBMS", "AI"];
  return {
    id: i + 1, name: `${first[i % first.length]} ${last[(i * 3) % last.length]}`,
    enrollment: String(1023 + i), email: `student${1023 + i}@gsfc.edu`,
    course: COURSES[i % 3], semester: 1 + (i % 8), gender: i % 2 ? "Female" : "Male",
    attendance: 64 + ((i * 11) % 37),
    subjects: subj.map((name, j) => ({ name, marks: 55 + ((i * (j + 5)) % 41) })),
  };
});
export const initialStudents = [...baseStudents, ...extraStudents];

const names = ["Data Structures","Operating Systems","Computer Networks","Software Engineering","Python","Java","Cloud Computing","Cyber Security","Machine Learning","Mobile Apps","Data Science","Compiler Design","Discrete Maths","Statistics","UI/UX"];
const extraCourses = names.map((name, k) => ({
  id: k + 4, code: `BCS${104 + k}`, name, faculty: `Dr. ${String.fromCharCode(68 + (k % 20))}`,
  credits: 2 + (k % 3), active: k < 12, description: `Core concepts and practical work in ${name}.`,
}));
export const initialCourses = [...baseCourses, ...extraCourses];

export const COURSE_OPTIONS = ["B.Tech CSE", "B.Tech IT", "BCA"];

// Attendance rules from the assignment
export const getStatus = (a) => (a < 60 ? "Detained" : a < 75 ? "Warning" : "Eligible");
