import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();
  const isRootRoute = location.pathname === "/";

  const localData =
    localStorage.getItem("Teacher jwtToken") ||
    localStorage.getItem("Student jwtToken") ||
    localStorage.getItem("jwtToken");

  const changeHandler = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/");
  };

  useEffect(() => {
    if (isRootRoute) {
      localStorage.clear();
    }
  }, [localData]);

  const userData =
    localStorage.getItem("Student Name") ||
    localStorage.getItem("Teacher Name") ||
    localStorage.getItem("Admin Name");

  return (
    <>
      <nav className="bg-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link
            className="text-white text-xl font-bold"
            // to="/"
            onClick={() => {
              toast.success("Welcome to Tutor-Time");
            }}
          >
            Tutor-Time
          </Link>

          <div className="flex items-center w-auto">
            {userData && (
              <span className="text-white text-lg mr-4">
                Welcome, {userData}!
              </span>
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
