import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../UI/Navbar";

function Student() {
  return (
    <>
      <Navbar />
      <section className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
        {/* Register Container */}
        <div className="container bg-white rounded-3 shadow-lg p-5">
          {/* Form */}
          <div className="row">
            <div className="col-md-6 px-4">
              <h2 className="font-bold display-4">Student Register</h2>
              <p className="text-base mt-2">For New Members, Register</p>
              <form className="d-flex flex-column gap-2">
                <input
                  className="form-control p-2 mt-3 rounded border"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <input
                  className="form-control p-2 mt-3 rounded border"
                  type="text"
                  name="Department"
                  placeholder="Department"
                />
                <input
                  className="form-control p-2 mt-3 rounded border"
                  type="number"
                  name="Age"
                  placeholder="Age"
                />
                <input
                  className="form-control p-2 mt-3 rounded border"
                  type="email"
                  name="Email"
                  placeholder="Email"
                />
                <div className="">
                  <input
                    className="form-control p-2 mt-3 rounded border"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <input
                  className="form-control p-2 mt-3 rounded border"
                  type="password"
                  name="cpassword"
                  placeholder="Confirm Password"
                />
                <div className="d-flex mt-3">
                  <Link to="/" className="me-3">
                    <button className="btn btn-primary w-full rounded-pill">Register</button>
                  </Link>
                  <Link to="/student/login">
                    <button className="btn btn-primary w-full rounded-pill">Login</button>
                  </Link>
                </div>
              </form>
            </div>
            {/* Image */}
            <div className="col-md-6 d-md-block d-none">
              <img
                className="img-fluid"
                src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Student;
