import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../UI/Navbar";
import Alert from '../../Alert';
import axios from 'axios';

function Teacher() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/v1/teachers/login', {
        email: formData.email,
        password: formData.password,
      });
      if (response.data.data.user.roles !== 'teacher') {
        Alert('Access denied. Only teacher are allowed to log in.', 'error');
        return;
      }
      const { token } = response.data;

      // Store the JWT token in local storage or state for authentication
      localStorage.setItem('jwtToken', token);

      // Redirect to the teacher dashboard
      navigate("/teacher/dashboard");
      Alert('Logged in', 'success');
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message; // Assuming your error response has a 'message' field
        Alert(errorMessage, 'error');
      } else {
        Alert('Login failed', 'error');
      }
    }
  }

  return (
    <>
      <Navbar />
      <section className="bg-light min-vh-100 d-flex align-items-center justify-content-center overflow-y-hidden">
        <div className="container bg-white rounded-2 shadow-lg p-5 w-50">
          <div className="row">
            <div className="col-md-6">
              <h2 className="font-bold text-2xl">Teacher Login</h2>
              <p className="text-sm mt-4">If you are already a member, easy login</p>
              <form className="d-flex flex-column gap-3" onSubmit={submitHandler}>
                <input
                  className="form-control mt-3"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder="Email"
                />
                <div className="form-group">
                  <input
                    className="form-control mt-3"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="Password"
                  />
                </div>
                <div className="d-flex mt-3">
                  <input type="submit" value="Login" className="btn btn-primary" />
                </div>
              </form>
            </div>
            <div className="col-md-6 d-md-block d-none d-flex justify-content-center">
              <img
                className="img-fluid mt-4"
                src="https://img.freepik.com/free-vector/teacher-standing-near-blackboard-holding-stick-isolated-flat-vector-illustration-cartoon-woman-character-near-chalkboard-pointing-alphabet_74855-8600.jpg?w=996&t=st=1694978047~exp=1694978647~hmac=865a5f6ffcbdc1660fa336fc5292f65201296614c356c005830145c85b8e5015"
                alt="Teacher Image"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Teacher;
