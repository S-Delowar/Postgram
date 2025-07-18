import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NavigationBar from "./components/NavigationBar";
import SinglePost from "./pages/SinglePost";

export const Context = React.createContext();

function App() {
  const data = {
    message: "Hello, World!",
  };

  return (
    <>
      <Context.Provider value={data}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:postId/"
            element={
              <ProtectedRoute>
                <SinglePost />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/nav" element={<NavigationBar />} />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
