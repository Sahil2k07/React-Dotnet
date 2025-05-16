import axios from "axios";

const apiUrl = import.meta.env.DEV ? "http://localhost:5070" : "/";

function createAxiosInstance() {
  const token = localStorage.getItem("token");

  const instance = axios.create({
    baseURL: apiUrl,
  });

  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
}

export default createAxiosInstance();
