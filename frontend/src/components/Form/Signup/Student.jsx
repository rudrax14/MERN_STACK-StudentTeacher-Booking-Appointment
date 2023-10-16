import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../UI/Navbar";
import Alert from '../../Alert';
import { useState } from "react";
function Student() {

  const navigate = useNavigate();



  const [formData, setFormData] = useState({
    name: '',
    email: "",
    password: "",
    age: '',
    subject: '',
    cpassword: "",
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
    console.log("Form Data")
    console.log(formData);
    navigate("/student/dashboard")
    Alert('Signed Up', 'success')
  }

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
                  name="subject"
                  value={formData.subject}
                  onChange={changeHandler}
                  placeholder="Subject"
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
                    value={formData.cpassword}
                    onChange={changeHandler}
                    name="cpassword"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="d-flex mt-3 ">
                  <input type="submit" value="Sign Up" className="btn btn-primary" />
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
