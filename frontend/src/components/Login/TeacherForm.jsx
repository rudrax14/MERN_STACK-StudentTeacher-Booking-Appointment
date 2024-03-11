import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../UI/Spinner";

function Teacher() {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
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
      setSpinner(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/teachers/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );
      if (response.data.data.user.roles !== "teacher") {
        toast.error("Access denied. Only teacher are allowed to log in.");
        setSpinner(false);
        return;
      }
      setSpinner(false);
      const { token } = response.data;
      const name = response.data.data.user.name;
      // Store the JWT token in local storage or state for authentication
      localStorage.setItem("Teachers jwtToken", token);
      localStorage.setItem("Teacher Name", name);
      // Redirect to the teacher dashboard
      navigate("/teacher/dashboard");
      toast.success("Logged in");
    } catch (error) {
      setSpinner(false);
      if (error.response) {
        const errorMessage = error.response.data.message; // Assuming your error response has a 'message' field
        toast.error(errorMessage);
      } else {
        toast.error("Login failed");
      }
    }
  }

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          {/* <Navbar /> */}
          <section className="bg-light min-vh-100 d-flex align-items-center justify-content-center overflow-y-hidden">
            <div className="container bg-white rounded-2 shadow-lg p-5">
              <div className="row">
                <div className="col-md-6">
                  <h2 className="font-bold text-2xl">Teacher Login</h2>
                  <p className="text-sm mt-4">
                    If you are already a member, easy login
                  </p>
                  <form
                    className="d-flex flex-column gap-3"
                    onSubmit={submitHandler}
                  >
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
                      <input
                        type="submit"
                        value="Login"
                        className="btn btn-primary"
                      />
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
      )}
    </>
  );
}

export default Teacher;
