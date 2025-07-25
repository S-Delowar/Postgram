import axios from "axios";
import { useNavigate } from "react-router-dom";

function useUserActions() {
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/api";

  // Login the user
  function login(data) {
    return axios.post(`${baseURL}/auth/login/`, data).then((res) => {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          access: res.data.access,
          refresh: res.data.refresh,
          user: res.data.user,
        })
      );
      console.log("login success. redirecting to home", res);
      navigate("/");
    });
  }

  // Register the user
  function register(data) {
    return axios.post(`${baseURL}/auth/register/`, data).then((res) => {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          access: res.data.access,
          refresh: res.data.refresh,
          user: res.data.user,
        })
      );
      console.log("Registration success. redirecting to home", res);
      navigate("/");
    });
  }

  // Logout the user
  function logout() {
    localStorage.removeItem("auth");
    navigate("/login");
  }

  return {
    login,
    register,
    logout,
  };
}

// Get the user
function getUser() {
  const auth = JSON.parse(localStorage.getItem("auth")) || null;
  return auth ? auth.user : null;
}

// Get the access token
function getAccessToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth ? auth.access : null;
}

// Get the refresh token
function getRefreshToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth ? auth.refresh : null;
}

// Set the access, token and user property
function setUserData(data) {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      access: data.access,
      refresh: data.refresh,
      user: data.user,
    })
  );
}

export { useUserActions, getUser, getAccessToken, getRefreshToken, setUserData };
