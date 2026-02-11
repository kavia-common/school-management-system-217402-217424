import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppShell } from "./components/AppShell";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import {
  AttendancePage,
  ClassesPage,
  ExamsPage,
  FeesPage,
  NoticesPage,
  ReportsPage,
  StudentsPage,
  SubjectsPage,
  TeachersPage,
  TimetablePage
} from "./pages/Modules";

function NotFound() {
  return <div>Page not found.</div>;
}

// PUBLIC_INTERFACE
function App() {
  /** Root application component that sets up providers and routing. */
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppShell>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/students" element={<StudentsPage />} />
                    <Route path="/teachers" element={<TeachersPage />} />
                    <Route path="/classes" element={<ClassesPage />} />
                    <Route path="/subjects" element={<SubjectsPage />} />
                    <Route path="/attendance" element={<AttendancePage />} />
                    <Route path="/exams" element={<ExamsPage />} />
                    <Route path="/fees" element={<FeesPage />} />
                    <Route path="/timetable" element={<TimetablePage />} />
                    <Route path="/notices" element={<NoticesPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AppShell>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
