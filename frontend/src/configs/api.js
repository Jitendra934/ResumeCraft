import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

let timeoutId;

api.interceptors.request.use((config) => {
  timeoutId = setTimeout(() => {
    window.dispatchEvent(new Event("server-waking"));
  }, 2000); // show only if slow

  return config;
});

api.interceptors.response.use(
  (response) => {
    clearTimeout(timeoutId);
    window.dispatchEvent(new Event("server-awake"));
    return response;
  },
  (error) => {
    clearTimeout(timeoutId);
    window.dispatchEvent(new Event("server-awake"));
    return Promise.reject(error);
  }
);

export default api;