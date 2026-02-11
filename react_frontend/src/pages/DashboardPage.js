import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import { ErrorState, LoadingState } from "../components/Status";
import styles from "./ModulePages.module.css";

function Widget({ title, value, sub }) {
  return (
    <div className={styles.widget}>
      <div className={styles.widgetTitle}>{title}</div>
      <div className={styles.widgetValue}>{value}</div>
      <div className={styles.widgetSub}>{sub}</div>
    </div>
  );
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [health, setHealth] = useState(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await api.health();
      setHealth(res);
    } catch (err) {
      setError(err?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <LoadingState label="Loading dashboard..." />;
  if (error) return <ErrorState title="Dashboard error" message={error} onRetry={load} />;

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <Widget title="Backend" value="Online" sub="GET / (health check)" />
        <Widget title="Students" value="—" sub="Will populate from /students" />
        <Widget title="Attendance" value="—" sub="Will populate from /attendance" />
        <Widget title="Fees" value="—" sub="Will populate from /fees" />
      </div>

      <div className={styles.panel}>
        <div className={styles.panelTitle}>API Response (Health)</div>
        <pre className={styles.pre}>{JSON.stringify(health, null, 2)}</pre>
      </div>
    </div>
  );
}
