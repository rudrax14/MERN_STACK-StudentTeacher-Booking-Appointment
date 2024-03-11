import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../UI/Navbar";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../UI/Spinner";

function admin() {
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
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/student/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );
      if (response.data.data.user.roles !== "admin") {
        toast.error("Access denied. Only Admin are allowed to log in.");
        setSpinner(false);
        return;
      }
      setSpinner(false);
      const { token } = response.data;
      const name = response.data.data.user.name;
      localStorage.setItem("Admin Name", name);
      localStorage.setItem("jwtToken", token);
      // console.log(token);
      navigate("/admin/dashboard");
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
          <section className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
            {/* Register Container */}
            <div className="container bg-white rounded-2 shadow-lg p-5">
              {/* Form */}
              <div className="row">
                <div className="col-md-6">
                  <h2 className="font-bold text-2xl">Admin Login</h2>
                  <p className="text-sm mt-4">
                    If you are already a member, easy login
                  </p>
                  {/* form start */}
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
                        value={formData.password}
                        onChange={changeHandler}
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="d-flex mt-3 ">
                      <input
                        type="submit"
                        value="Login"
                        className="btn btn-primary"
                      />
                      <Link to="/student/dashboard" className="me-3"></Link>
                      <Link to="/student/signup">
                        <button className="btn btn-primary">Register</button>
                      </Link>
                    </div>
                  </form>
                </div>
                {/* Image */}
                <div className="col-md-6 d-md-block d-none d-flex justify-content-center">
                  <img
                    className="img-fluid"
                    src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"
                    alt="img error"
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

export default admin;
