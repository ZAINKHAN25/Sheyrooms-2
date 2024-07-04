import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useUser } from "../context/user-state";
import localforage from "localforage";

function Login() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const { loginUserRequest, loginSuccess, loginFail, error, loading, isAuthenticated } = useUser();

  const handleLogin = (event, data) => {
    event.preventDefault();
    loginUserRequest();
    setUserInfo(data); // Set user info immediately
  };

  useEffect(() => {
    let current = true;
    if (current && userInfo) {
      axios
        .post(`http://localhost:4000/api/login`, userInfo)
        .then(({ data }) => {
          loginSuccess(data);
          localforage.setItem("auth", data);
          navigate("/");
        })
        .catch((err) => {
          loginFail();
          console.log(err);
        });
    }
    return () => {
      current = false;
    };
  }, [userInfo, navigate, loginSuccess, loginFail]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 ">
          <div style={{ height: "100vh" }}>
            <div className="login-form-wrapper">
              <LoginForm handleLogin={handleLogin} error={error} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
