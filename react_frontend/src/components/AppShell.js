import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { hasAnyRole, useAuth } from "../context/AuthContext";
import styles from "./AppShell.module.css";

function NavItem({ to, label, allowedRoles }) {
  const { role } = useAuth();
  const canSee = hasAnyRole(role, allowedRoles);
  if (!canSee) return null;

  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
    >
      <span className={styles.navBullet} aria-hidden="true">
        ▸
      </span>
      {label}
    </NavLink>
  );
}

// PUBLIC_INTERFACE
export function AppShell({ children }) {
  /** Application frame: sidebar + header + main content area. */
  const location = useLocation();
  const { role, logout } = useAuth();

  const title = useMemo(() => {
    const map = {
      "/": "Dashboard",
      "/students": "Students",
      "/teachers": "Teachers",
      "/classes": "Classes",
      "/subjects": "Subjects",
      "/attendance": "Attendance",
      "/exams": "Exams",
      "/fees": "Fees",
      "/timetable": "Timetable",
      "/notices": "Notices",
      "/reports": "Reports",
      "/settings": "Settings"
    };
    return map[location.pathname] || "School Management System";
  }, [location.pathname]);

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar} aria-label="Primary">
        <div className={styles.brand}>
          <div className={styles.brandMark} aria-hidden="true">
            SMS
          </div>
          <div>
            <div className={styles.brandTitle}>Retro School</div>
            <div className={styles.brandSub}>Management Console</div>
          </div>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navGroupTitle}>Core</div>
          <NavItem to="/" label="Dashboard" allowedRoles={["admin", "teacher", "student", "parent"]} />
          <NavItem to="/notices" label="Notices" allowedRoles={["admin", "teacher", "student", "parent"]} />

          <div className={styles.navGroupTitle}>Academics</div>
          <NavItem to="/students" label="Students" allowedRoles={["admin", "teacher"]} />
          <NavItem to="/teachers" label="Teachers" allowedRoles={["admin"]} />
          <NavItem to="/classes" label="Classes" allowedRoles={["admin", "teacher"]} />
          <NavItem to="/subjects" label="Subjects" allowedRoles={["admin", "teacher"]} />
          <NavItem to="/attendance" label="Attendance" allowedRoles={["admin", "teacher"]} />
          <NavItem to="/exams" label="Exams" allowedRoles={["admin", "teacher"]} />
          <NavItem to="/timetable" label="Timetable" allowedRoles={["admin", "teacher", "student", "parent"]} />

          <div className={styles.navGroupTitle}>Finance</div>
          <NavItem to="/fees" label="Fees" allowedRoles={["admin", "parent"]} />

          <div className={styles.navGroupTitle}>Insights</div>
          <NavItem to="/reports" label="Reports" allowedRoles={["admin", "teacher"]} />
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.rolePill}>Role: {role || "guest"}</div>
          <button type="button" className={styles.logoutBtn} onClick={logout}>
            Log out
          </button>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>{title}</div>
          <div className={styles.headerRight}>
            <div className={styles.pathChip}>{location.pathname}</div>
          </div>
        </header>

        <main className={styles.content} aria-label="Content">
          {children}
        </main>
      </div>
    </div>
  );
}
