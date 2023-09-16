import React from "react";
import { Link } from "react-router-dom";

function Student() {
  return (
    <section className=" bg-gray-100 min-h-screen flex items-center justify-center">
      {/* Register Container */}
      <div className="bg-white flex rounded-2xl shadow-lg md:h-[601px] md:w-[900px] p-10 px-16 items-center ">
        {/* Form */}
        <div className=" md:w-1/2 px-8 md:px-8 ">
          <h2 className="font-bold text-2xl">Login</h2>
          <p className="text-sm mt-4">If you are already a member, easy login</p>
          <form action="" className="flex flex-col gap-3">



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
            <div className="flex mt-3">
              <Link to="/teacher/dashboard" className="mr-7">
                <button className=" bg-blue-700 w-full mr-7 rounded-xl text-white py-2 hover:scale-110 duration-300">Login</button>
              </Link>
              <Link to="/signup">
                <button className="bg-blue-700 mr-7 w-full rounded-xl text-white py-2 hover:scale-110 duration-300">Register</button>
              </Link>
            </div>
          </form>
        </div>
        {/* Image */}
        <div className="md:block w-1/2 pl-8 hidden  ">
          <img
            className=""
            src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"
            alt=""
          />
        </div>
      </div>
    </section >
  );
}

export default Student;
