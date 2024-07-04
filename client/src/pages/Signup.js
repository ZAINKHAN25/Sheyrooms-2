import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import { useUser } from "../context/user-state";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const navigate = useNavigate();
  const { registerUserRequest, registerUserSuccess, registerUserFail, user, error } = useUser();

  const handleSignup = async (event) => {
    event.preventDefault();
    registerUserRequest();
    try {
      const response = await axios.post(`http://localhost:4000/api/register`, formData);
      registerUserSuccess(response.data);
      navigate("/login");
    } catch (err) {
      registerUserFail(err.message || "Registration failed");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div style={{ height: "90vh" }}>
            <div className="signup-form-wrapper">
              <div className="signup-form-block">
                <SignupForm
                  formData={formData}
                  handleChange={handleChange}
                  handleSignup={handleSignup}
                  error={error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
