import React from "react";
import styles from "./Status.module.css";

export function LoadingState({ label = "Loading..." }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <div className={styles.text}>{label}</div>
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className={styles.error} role="alert">
      <div className={styles.errorTitle}>{title}</div>
      {message ? <div className={styles.errorMessage}>{message}</div> : null}
      {onRetry ? (
        <button className={styles.retryBtn} type="button" onClick={onRetry}>
          Retry
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({ title = "No data", message }) {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyTitle}>{title}</div>
      {message ? <div className={styles.emptyMessage}>{message}</div> : null}
    </div>
  );
}
