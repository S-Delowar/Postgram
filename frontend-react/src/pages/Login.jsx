import React from "react";
import { Context } from "../App";
import LoginForm from "../forms/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex align-items center">
            <div className="content text-center px-4">
              <h1 className="text-primary">Welcome to Postman!</h1>
              <p className="content">
                This is a new social media site that will allow you to share
                your thoughts and experiences with your friends. Login now
                and start enjoying! <br />
                Or if you have not any account, please <span> </span>
                <Link to="/registration/">register here</Link>.
              </p>
            </div>
          </div>
          <div className="col-md-6 p-5">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
