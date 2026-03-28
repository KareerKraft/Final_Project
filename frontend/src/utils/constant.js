const normalizeBaseUrl = (url) => (url ? url.replace(/\/+$/, "") : "");

const isLocalHost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const LOCAL_API_URL = normalizeBaseUrl(
  import.meta.env.VITE_LOCAL_API_URL || "http://localhost:8000"
);

const PRODUCTION_API_URL = normalizeBaseUrl(
  import.meta.env.VITE_API_URL || "https://final-project-0g4s.onrender.com"
);

export const BASE_URL = isLocalHost ? LOCAL_API_URL : PRODUCTION_API_URL;

export const USER_API_END_POINT = `${BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/api/v1/company`;
