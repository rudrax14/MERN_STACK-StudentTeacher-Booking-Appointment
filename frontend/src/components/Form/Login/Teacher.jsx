import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../UI/Navbar";

function Teacher() {
  return (
    <>
      <Navbar />
      <section className="bg-light min-vh-100 d-flex align-items-center justify-content-center overflow-y-hidden">
        {/* Register Container */}
        <div className="container bg-white rounded-2 shadow-lg p-5 w-50">
          {/* Form */}
          <div className="row">
            <div className="col-md-6">
              <h2 className="font-bold text-2xl">Teacher Login</h2>
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
                <div className="d-flex mt-3">
                  <Link to="/teacher/dashboard" className="me-3">
                    <button className="btn btn-primary">Login</button>
                  </Link>

                </div>
              </form>
            </div>
            {/* Image */}
            <div className="col-md-6 d-md-block d-none d-flex justify-content-center">
              <img
                className="img-fluid mt-4"
                src="https://img.freepik.com/free-vector/teacher-standing-near-blackboard-holding-stick-isolated-flat-vector-illustration-cartoon-woman-character-near-chalkboard-pointing-alphabet_74855-8600.jpg?w=996&t=st=1694978047~exp=1694978647~hmac=865a5f6ffcbdc1660fa336fc5292f65201296614c356c005830145c85b8e5015"
                alt="img error"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Teacher;
