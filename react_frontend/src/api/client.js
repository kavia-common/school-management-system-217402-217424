/**
 * Minimal fetch wrapper for the School Management System frontend.
 * Uses REACT_APP_API_BASE_URL and attaches JWT access token (if present).
 */

const DEFAULT_BASE_URL = "http://localhost:3001";

function getBaseUrl() {
  return (process.env.REACT_APP_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");
}

function getToken() {
  try {
    return localStorage.getItem("sms_access_token");
  } catch {
    return null;
  }
}

async function parseJsonSafely(resp) {
  const text = await resp.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function request(path, { method = "GET", body, headers } = {}) {
  const url = `${getBaseUrl()}${path.startsWith("/") ? "" : "/"}${path}`;
  const token = getToken();

  const resp = await fetch(url, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await parseJsonSafely(resp);

  if (!resp.ok) {
    const message =
      (data && typeof data === "object" && (data.detail || data.message)) ||
      (typeof data === "string" ? data : "") ||
      `Request failed (${resp.status})`;
    const err = new Error(message);
    err.status = resp.status;
    err.data = data;
    throw err;
  }

  return data;
}

// PUBLIC_INTERFACE
export const api = {
  /** Health check. */
  health: () => request("/", { method: "GET" }),

  /**
   * Placeholder auth endpoints. Backend currently only exposes / health in OpenAPI.
   * These are wired for when backend implements JWT auth endpoints.
   */
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  me: () => request("/auth/me", { method: "GET" })
};
