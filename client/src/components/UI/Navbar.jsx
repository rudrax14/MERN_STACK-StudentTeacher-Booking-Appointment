import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();
  const isRootRoute = location.pathname === "/";
  const shouldShowLink = !isRootRoute;


  const localData = localStorage.getItem("Teacher jwtToken") || localStorage.getItem("Student jwtToken") || localStorage.getItem("jwtToken");

  const changeHandler = () => {
    localStorage.removeItem("Teacher jwtToken");
    localStorage.removeItem("Student jwtToken");
    localStorage.removeItem("Student Name");
    localStorage.removeItem("email");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("Teacher Name");
    localStorage.removeItem("Admin Name");
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/");
  };

  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     localStorage.removeItem("Teacher jwtToken");
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
      <nav className="bg-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link className="text-white text-xl font-bold" to="/" onClick={changeHandler}>
            Tutor-Time
          </Link>

          <button
            className="text-white sm:hidden"
            type="button"
            onClick={() => document.getElementById('navbarSupportedContent').classList.toggle('hidden')}
          >
            <span className="material-icons">menu</span>
          </button>

          <div className="hidden sm:flex sm:items-center sm:w-auto" id="navbarSupportedContent">
            <ul className="flex space-x-4 items-center">
              <li className="hidden sm:block">
                <button className="btn btn-icon btn-transparent-dark dropdown-toggle"></button>
              </li>
            </ul>

            {userData && (
              <span className="text-white text-lg mr-4">Welcome, {userData}!</span>
            )}
            {localData && (
              <button
                className="text-white text-2xl"
                type="button"
                onClick={changeHandler}
              >
                <IoIosLogOut />
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
