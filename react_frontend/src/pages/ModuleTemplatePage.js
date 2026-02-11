import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import { ErrorState, LoadingState } from "../components/Status";
import styles from "./ModulePages.module.css";

// PUBLIC_INTERFACE
export default function ModuleTemplatePage({ title, description, plannedEndpoint }) {
  /**
   * Generic module page with backend wiring demo and consistent loading/error states.
   * plannedEndpoint is a hint for the API path intended for this module.
   */
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

  if (loading) return <LoadingState label={`Loading ${title}...`} />;
  if (error) return <ErrorState title={`${title} error`} message={error} onRetry={load} />;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
          <div className={styles.heroTitle}>{title}</div>
          <div className={styles.heroDesc}>{description}</div>
        </div>
        <div className={styles.endpointChip}>Planned: {plannedEndpoint}</div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelTitle}>Backend wiring status</div>
        <div className={styles.panelBody}>
          Backend reachable: <strong>yes</strong> (health check successful).
        </div>
        <pre className={styles.pre}>{JSON.stringify(health, null, 2)}</pre>
      </div>
    </div>
  );
}
