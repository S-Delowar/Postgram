import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {
  getAccessToken,
  getRefreshToken,
  getUser,
} from "../hooks/user.actions";

const baseURL = "http://localhost:8000/api";

const axiosService = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosService.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosService.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err)
);

const refreshAuthLogic = (failedRequest) => {
  return axios
    .post(`${baseURL}/auth/refresh/`, {
      refresh: getRefreshToken(),
    })
    .then((resp) => {
      const { access, refresh } = resp.data;
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + access;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          access,
          refresh: refresh || getRefreshToken(),
          user: getUser(),
        })
      );
    })
    .catch(() => {
      localStorage.removeItem("auth");
      window.location.href = "/login";
    });
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher(url) {
  return axiosService.get(url).then((res) => res.data);
}

export default axiosService;
