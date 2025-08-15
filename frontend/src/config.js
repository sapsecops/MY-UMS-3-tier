// Central place to configure backend API.
// You can override via env: VITE_API_BASE_URL (e.g. http://<BACKEND_PRIVATE_IP>:8080)
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8080';
export default { apiBaseUrl };
