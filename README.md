# College Course & Student Management System

A React application for managing students and courses, built for the AWT Fast Learner practical assignment (GSFC University, Semester 5). Data is stored in React state with sample data in `src/data.js`, so it resets on page reload.

## Features

- Dashboard with total students, total courses, active courses and average attendance, plus a Recent Students list
- Add, edit, delete, search and filter students (by course)
- Add, delete, search and filter courses (by credits)
- Student details page with attendance status and subject marks
- Course details page
- Attendance status using conditional rendering: 75% or more is Eligible, below 75% is Warning, below 60% is Detained
- Form validation with success and error alerts
- Performance optimization with `React.memo`, `useMemo` and `useCallback`
- Responsive layout styled with SCSS

## Technologies used

- React 18
- React Router 6
- Vite
- Sass (SCSS)

## Installation

```bash
npm install
npm run dev
```

The app runs at http://localhost:5173 by default. Other scripts: `npm run build` and `npm run preview`.

## Routes

| Route | Page |
|---|---|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Dashboard |
| `/students` | Student list, search, filter and form |
| `/students/:id` | Student details |
| `/courses` | Course list, search, filter and form |
| `/courses/:id` | Course details |

## Why memoization

`StudentCard` and `CourseCard` use `React.memo` and receive `useCallback` handlers, so typing in a search box does not re-render every row. `useMemo` caches the filtered lists and dashboard statistics, which are recalculated only when their inputs change.
