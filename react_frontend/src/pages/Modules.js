import React from "react";
import ModuleTemplatePage from "./ModuleTemplatePage";

export function StudentsPage() {
  return (
    <ModuleTemplatePage
      title="Students"
      description="Manage student profiles, enrollments, and guardians."
      plannedEndpoint="/students"
    />
  );
}

export function TeachersPage() {
  return (
    <ModuleTemplatePage
      title="Teachers"
      description="Manage teacher profiles, assignments, and workload."
      plannedEndpoint="/teachers"
    />
  );
}

export function ClassesPage() {
  return (
    <ModuleTemplatePage
      title="Classes"
      description="Manage classes, sections, class teachers, and rosters."
      plannedEndpoint="/classes"
    />
  );
}

export function SubjectsPage() {
  return (
    <ModuleTemplatePage
      title="Subjects"
      description="Manage subject catalog and class-subject mappings."
      plannedEndpoint="/subjects"
    />
  );
}

export function AttendancePage() {
  return (
    <ModuleTemplatePage
      title="Attendance"
      description="Daily attendance marking and attendance summaries."
      plannedEndpoint="/attendance"
    />
  );
}

export function ExamsPage() {
  return (
    <ModuleTemplatePage
      title="Exams"
      description="Exam schedules, marks entry, and result generation."
      plannedEndpoint="/exams"
    />
  );
}

export function FeesPage() {
  return (
    <ModuleTemplatePage
      title="Fees"
      description="Fee structures, invoices, and payment tracking."
      plannedEndpoint="/fees"
    />
  );
}

export function TimetablePage() {
  return (
    <ModuleTemplatePage
      title="Timetable"
      description="Class and teacher timetables, room allocations."
      plannedEndpoint="/timetable"
    />
  );
}

export function NoticesPage() {
  return (
    <ModuleTemplatePage
      title="Notices"
      description="Notice board announcements and circulars."
      plannedEndpoint="/notices"
    />
  );
}

export function ReportsPage() {
  return (
    <ModuleTemplatePage
      title="Reports"
      description="Analytics and downloadable reports across modules."
      plannedEndpoint="/reports"
    />
  );
}
