import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../UI/Spinner";

function Student() {
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
        "/api/v1/student/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      if (response.data.data.user.roles !== "student") {
        toast.error("Access denied. Only students are allowed to log in.");
        setSpinner(false);
        return;
      }
      setSpinner(false);
      // console.log('Role:', response.data.data.user.roles);
      // const { setUser } = useUser();
      const name = response.data.data.user.name;
      // setUser(name);
      // console.log("Responce", name);
      const { token } = response.data;
      localStorage.setItem("Student jwtToken", token);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("Student Name", name);
      console.log(
        "Approve student id:",
        response.data.data.user.admissionStatus
      );
      if (response.data.data.user.admissionStatus == true) {
        navigate(`/student/dashboard`);
      } else {
        navigate("/student/notapproved");
      }
      toast.success("Logged in");
    } catch (error) {
      setSpinner(false);
      if (error) {
        console.log(error);
        const errorMessage = error.response;
        // Assuming your error response has a 'message' field
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
            <div className="container bg-white rounded-2 shadow-lg p-5 w-50">
              {/* Form */}
              <div className="row">
                <div className="col-md-6">
                  <h2 className="font-bold text-2xl">Student Login</h2>
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
                      <Link to="/student/dashboard" className="me-3">
                        {/* <button className="btn btn-primary" onClick={() => Alert('Logged in', 'success')} type="submit" value="Submit">Login</button> */}
                      </Link>
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

export default Student;
