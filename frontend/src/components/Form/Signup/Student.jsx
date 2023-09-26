import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../UI/Navbar";
import Alert from '../../Alert';

function Student() {
  return (
    <>
      <Navbar />
      <section className="mt-4">
        {/* Register Container */}
        <div className="container bg-white rounded-2 shadow-lg p-5 w-50">
          {/* Form */}
          <div className="row">
            <div className="col-md-6">
              <h2 className="font-bold text-2xl">Student Register</h2>
              {/* <p className="text-sm mt-3">Easy Register</p> */}
              <form className="d-flex flex-column gap-3">
                <input
                  className="form-control mt-4"
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <input
                  className="form-control mt-2"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                />
                <input
                  className="form-control mt-2"
                  type="number"
                  name="age"
                  placeholder="Age"
                />
                <input
                  className="form-control mt-2"
                  type="email"
                  name="Email"
                  placeholder="Email"
                />
                <div className="form-group">
                  <input
                    className="form-control mt-2"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control mt-2"
                    type="password"
                    name="cpassword"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="d-flex mt-3 ">
                  <Link to="/student/dashboard" className="me-3">
                    <button className="btn btn-primary" onClick={() => Alert('Register Successfully', 'success')}>Register</button>
                  </Link>
                  <Link to="/student/login" >
                    <button className="btn btn-primary" >Login</button>
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
  );
}

export default Student;
