import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
function Student() {

  const navigate = useNavigate();



  const [formData, setFormData] = useState({
    name: '',
    email: "",
    age: '',
    department: '',
    password: "",
    passwordConfirm: "",
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      // console.log(prevFormData);
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }


  function submitHandler(event) {
    event.preventDefault();
    console.log("Form Data");
    console.log(formData);

    const requestData = {
      email: formData.email,
      name: formData.name,
      department: formData.department,
      age: formData.age,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
    };

    fetch("http://localhost:5000/api/v1/student/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          // Save the JWT token in localStorage
          localStorage.setItem("token", data.token);
          console.log("token", data.token);


          // Navigate to the student dashboard
          navigate("/student/dashboard");
          toast.success('Logged in');
        } else {
          // Handle registration errors or show appropriate error messages.
          toast.error('Failed to register');
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle network errors or other issues.
      });
  }


  return (
    <>
      {/* <Navbar /> */}
      <section className="mx-auto">
        {/* Register Container */}
        <div className="container bg-white rounded-2 shadow-lg p-5 w-50 my-5">
          {/* Form */}
          <div className="row">
            <div className="col-md-6">
              <h2 className="font-bold text-2xl">Student Register</h2>
              {/* <p className="text-sm mt-3">Easy Register</p> */}
              <form className="d-flex flex-column gap-3" onSubmit={submitHandler}>
                <input
                  className="form-control mt-4"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={changeHandler}
                  placeholder="Name"
                />
                <input
                  className="form-control mt-2"
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={changeHandler}
                  placeholder="Department"
                />
                <input
                  className="form-control mt-2"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={changeHandler}
                  placeholder="Age"
                />
                <input
                  className="form-control mt-2"
                  type="email"
                  value={formData.email}
                  onChange={changeHandler}
                  name="email"
                  placeholder="Email"
                />
                <div className="form-group">
                  <input
                    className="form-control mt-2"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control mt-2"
                    type="password"
                    value={formData.passwordConfirm}
                    onChange={changeHandler}
                    name="passwordConfirm"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="d-flex mt-3 ">
                  <input type="submit" value="Sign Up" className="btn btn-primary me-2" />
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
