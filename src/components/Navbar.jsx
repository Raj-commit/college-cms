import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar__brand">GSFC College CMS</span>
      <div className="navbar__links">
        {["dashboard", "students", "courses"].map((p) => (
          <NavLink key={p} to={`/${p}`} className={({ isActive }) => (isActive ? "active" : "")}>
            {p[0].toUpperCase() + p.slice(1)}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
