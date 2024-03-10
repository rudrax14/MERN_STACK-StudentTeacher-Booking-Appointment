import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const isRootRoute = location.pathname === "/";
  const shouldShowLink = !isRootRoute;

  const changeHandler = () => {
    localStorage.removeItem("Teachers jwtToken");
    localStorage.removeItem("Student jwtToken");
    localStorage.removeItem("Student Name");
    localStorage.removeItem("email");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("Teacher Name");
    localStorage.removeItem("Admin Name");
    toast.success("Logout Successfully");
    navigate("/");
  };

  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     localStorage.removeItem("Teachers jwtToken");
  //     localStorage.removeItem("Student jwtToken");
  //     localStorage.removeItem("Student Name");
  //     localStorage.removeItem("email");
  //     localStorage.removeItem("jwtToken");
  //     localStorage.removeItem("Teacher Name");
  //     localStorage.removeItem("Admin Name");
  //   }
  // }, []);

  const userData =
    localStorage.getItem("Student Name") ||
    localStorage.getItem("Teacher Name") ||
    localStorage.getItem("Admin Name");

  return (
    <>
      <nav className="navbar navbar-dark bg-dark sticky-top navbar-expand-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeHandler}>
            Tutor-Time
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav align-items-center ms-auto">
              <li className="nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications">
                <a className="btn btn-icon btn-transparent-dark dropdown-toggle"></a>
              </li>
            </ul>

            {userData && (
              <span className="text-white fs-5 me-5">Welcome, {userData}!</span>
            )}
            {shouldShowLink && (
              <a
                className="text-white me-2 fs-3"
                type="button"
                onClick={changeHandler}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
