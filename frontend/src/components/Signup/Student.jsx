import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../UI/Spinner";
import axios from "axios";

function StudentRegister() {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    department: "",
    password: "",
    passwordConfirm: "",
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

    const requestData = {
      email: formData.email,
      name: formData.name,
      department: formData.department,
      age: formData.age,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
    };
    setSpinner(true);
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/student/register`, requestData)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setSpinner(false);
          navigate("/student/login");
          toast.success("Account Created Successfully");
        } else {
          setSpinner(false);
          console.log(response.data);
          toast.error("Failed to register");
        }
      })
      .catch((error) => {
        setSpinner(false);
        toast.error(error.response.data.message);
        console.error("Error:", error);
      });
  }

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <section className="bg-gray-100 min-h-screen dark:bg-slate-900 flex items-center justify-center p-8 w-full">
          <div className="bg-white rounded-lg dark:bg-slate-800 dark:text-white dark:border- dark:border shadow-lg p-8 w-full max-w-md">
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-2xl">Student Register</h2>
              <form
                className="flex flex-col gap-3 mt-4 w-full"
                onSubmit={submitHandler}
              >
                <input
                  className="mt-3 p-2 border rounded dark:bg-slate-700"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={changeHandler}
                  placeholder="Name"
                  required
                />
                <input
                  className="mt-2 p-2 border rounded dark:bg-slate-700"
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={changeHandler}
                  placeholder="Department"
                  required
                />
                <input
                  className="mt-2 p-2 border rounded dark:bg-slate-700"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={changeHandler}
                  placeholder="Age"
                  required
                />
                <input
                  className="mt-2 p-2 border rounded dark:bg-slate-700"
                  type="email"
                  value={formData.email}
                  onChange={changeHandler}
                  name="email"
                  placeholder="Email"
                  required
                />
                <input
                  className="mt-2 p-2 border rounded dark:bg-slate-700"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  placeholder="Password"
                  required
                />
                <input
                  className="mt-2 p-2 border rounded dark:bg-slate-700"
                  type="password"
                  value={formData.passwordConfirm}
                  onChange={changeHandler}
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  required
                />
                <div className="flex mt-3 gap-3 w-full">
                  <input
                    type="submit"
                    value="Sign Up"
                    className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600 w-full"
                  />
                  <Link to="/student/login" className="w-full">
                    <button className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600 w-full">
                      Login
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default StudentRegister;
