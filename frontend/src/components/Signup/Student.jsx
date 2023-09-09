import React from "react";
import { Link } from "react-router-dom";

function Student() {
  return (
    <section className=" bg-gray-100 min-h-screen flex items-center justify-center">
      {/* Register Container */}
      <div className="bg-white flex rounded-2xl shadow-lg md:h-[601px] md:w-[900px] p-16 px-16 items-center">
        {/* Form */}
        <div className=" md:w-1/2 px-8 md:px-8 ">
          <h2 className="font-bold text-4xl">Register</h2>
          <p className="text-base mt-2">For New Members, Register</p>
          <form action="" className="flex flex-col gap-2">
            <input
              className="p-2 mt-3 rounded-xl border"
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className="p-2 mt-3 rounded-xl border"
              type="text"
              name="Department"
              placeholder="Department"
            />
            <input
              className="p-2 mt-3 rounded-xl border"
              type="number"
              name="Age"
              placeholder="Age"
            />
            <input
              className="p-2 mt-3 rounded-xl border"
              type="email"
              name="Email"
              placeholder="Email"
            />
            <div className="">
              <input
                className="p-2 mt-3 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <input
              className="p-2 mt-3 rounded-xl border"
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
            />
            <div className="flex mt-3">
              <Link to="/" className="mr-7">
                <button className="bg-blue-700 mr-7 w-full rounded-xl text-white py-2 hover:scale-110 duration-300">Register</button>
              </Link>
              <Link to="/login">
                <button className=" bg-blue-700 w-full mr-7 rounded-xl text-white py-2 hover:scale-110 duration-300">Login</button>
              </Link>
            </div>
          </form>
        </div>
        {/* Image */}
        <div className="md:block hidden w-1/2 px-16  ">
          <img
            className=""
            src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
            alt=""
          />
        </div>
      </div>
    </section >
  );
}

export default Student;
