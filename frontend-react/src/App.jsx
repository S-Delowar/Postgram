import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NavigationBar from "./components/NavigationBar";
import SinglePost from "./pages/SinglePost";
import ProfileDetails from "./components/profile/ProfileDetails";
import UpdateProfile from "./pages/UpdateProfile";


function App() {

  return (
    <>
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
          <Route
            path="/user/:userId/"
            element={
              <ProtectedRoute>
                <ProfileDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:userId/profile/update/"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />


          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/nav" element={<NavigationBar />} />
        </Routes>
    </>
  );
}

export default App;
