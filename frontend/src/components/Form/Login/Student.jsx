import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../UI/Navbar";

function Student() {
  const notify = () => {
    toast.success('Logout', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <>
      <Navbar />
      <section className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
        {/* Register Container */}
        <div className="container bg-white rounded-2 shadow-lg p-5 w-50">
          {/* Form */}
          <div className="row">
            <div className="col-md-6">
              <h2 className="font-bold text-2xl">Student Login</h2>
              <p className="text-sm mt-4">If you are already a member, easy login</p>
              <form className="d-flex flex-column gap-3">
                <input
                  className="form-control mt-3"
                  type="email"
                  name="Email"
                  placeholder="Email"
                />
                <div className="form-group">
                  <input
                    className="form-control mt-3"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="d-flex mt-3 ">
                  <Link to="/student/dashboard" className="me-3">
                    <button className="btn btn-primary">Login</button>
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
  );
}

export default Student;
