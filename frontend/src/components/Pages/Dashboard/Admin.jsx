import React, { useState, useEffect } from "react";
import Navbar from "../../UI/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
// import Alert from '../../Alert';
import { toast } from "react-toastify";
// import StudentData from '../../../../data.json';
import axios from "axios";
function Admin() {
  const navigate = useNavigate();

  const [teacherName, setTeacherName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [department, setDepartment] = useState("");
  const [teachers, setTeachers] = useState([]);

  // teachers get
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken == null) {
          navigate("/admin/login");
        } else {
          // Make an HTTP request to fetch data from the API using Axios
          const response = await axios.get(
            "http://localhost:5000/api/v1/admin",
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          // Update the state with the fetched data
          setTeachers(response.data.data.users);
          // console.log(response.data.data.users);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const [students, setStudents] = useState(StudentData.studentApprovals)
  const [students, setStudents] = useState([]);

  // Fetch All students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Make an HTTP request to fetch data from the API using Axios
        const response = await axios.get(
          "http://localhost:5000/api/v1/teachers",
          {
            params: {
              admissionStatus: false,
            },
          }
        ); // Replace with the correct endpoint
        // Update the state with the fetched data
        setStudents(response.data.students); // Assuming the response contains an array of students
        // console.log(response.data.students);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    fetchStudents();
  }, []);

  // const handleAddTeacher = () => {
  //   const newTeacher = {
  //     teacherName,
  //     subjectName,
  //     department,
  //   };

  //   setTeachers([...teachers, newTeacher]);
  //   setTeacherName("");
  //   setSubjectName("");
  //   setDepartment("");
  // };

  // const handleDeleteTeacher = (index) => {
  //   const updatedTeachers = teachers.filter((teacher, i) => i !== index);
  //   setTeachers(updatedTeachers);
  // };

  // detete teachers
  const handleDeleteTeacher = async (_id, index) => {
    try {
      // Make an HTTP request to delete the teacher using Axios
      const jwtToken = localStorage.getItem("jwtToken");
      await axios.delete(`http://localhost:5000/api/v1/admin/${_id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      // Remove the teacher from the state
      const updatedTeachers = [...teachers];
      updatedTeachers.splice(index, 1); // Remove the teacher at the specified index
      setTeachers(updatedTeachers);
      toast.success("Teacher deleted successfully");
    } catch (error) {
      console.error("Error deleting teacher:", error);
      toast.error("Error deleting teacher");
    }
  };

  ///////////////////////////

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    subject: "",
    department: "",
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

  async function submitHandler(event) {
    event.preventDefault();
    // console.log('Form Data');
    // console.log(formData);

    const requestData = {
      email: formData.email,
      name: formData.name,
      subject: formData.subject,
      department: formData.department,
      age: formData.age,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
    };

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await axios.post(
        "http://localhost:5000/api/v1/admin",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      navigate("/admin/dashboard");
      toast.success("Teacher Added");
    } catch (error) {
      if (error.response) {
        // console.log(error.response)
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Something Gone Wrong");
      }
    }
  }

  // admission

  // Function to update student's admission status
  const handleApproveReject = (_id) => {
    // Filter out the student that was approved or rejected
    const updatedStudents = students.filter((student) => student._id !== _id);
    setStudents(updatedStudents);
  };

  const approveStudent = async (_id) => {
    try {
      // Make an HTTP request to approve the student using Axios
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await axios.patch(
        `http://localhost:5000/api/v1/admin/approvestudent/${_id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      // console.log(response.data); // Log the response from the backend
    } catch (error) {
      console.error("Error approving student:", error);
      toast.error("Error approving student");
    }
  };

  const deleteStudent = async (_id) => {
    try {
      // Make an HTTP request to reject the student using Axios
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await axios.delete(
        `http://localhost:5000/api/v1/admin/rejectStudent/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      // console.log(response.data); // Log the response from the backend
    } catch (error) {
      console.error("Error rejecting student:", error);
      toast.error("Error rejecting student");
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="header-container shadow p-3 mb-5 bg-danger text-white">
        <div className="container d-flex justify-content-center">
          <p className="fs-1">Admin Dashboard</p>
        </div>
      </div>
      {/* ----------------------------------------------------------------------------------------------------- */}
      {/* modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Teacher
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* form start */}
            <form onSubmit={submitHandler}>
              <div className="modal-body">
                <input
                  className="form-control"
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
                    value={formData.passwordConfirm}
                    onChange={changeHandler}
                    name="passwordConfirm"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="submit"
                  value="Add Teacher"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  // onClick={()=> window.location.reload()}
                />

                {/* <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (teacherName && subjectName && department) {
                      handleAddTeacher();
                      Alert('Teacher Added', 'success');
                    } else {
                      // Display an alert or handle empty fields case
                      Alert('Please fill in all fields', 'error');
                    }
                  }}
                  data-bs-dismiss="modal"
                  disabled={!teacherName || !subjectName || !department} // Disable the button if any field is empty
                >
                  Add
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* ----------------------------------------------------------------------------------------------------- */}
      <div className="container py-4">
        <div className="pagecontent">
          <h2>Status</h2>
          {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p> */}
          <hr className="mt-0 mb-4" />
          <div className="row justify-content-around row-cols-4 text-center gy-5">
            {/*Top Add Teacher Card */}
            <div
              className="card bg-primary text-white h-100"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <p className="fw-semibold fs-5">Add Teacher</p>
                <p className="fw-normal fs-6">{teachers.length}</p>
              </div>
              <div
                className="card-footer d-flex"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add
                <span className="ms-auto">
                  <BsChevronRight />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------------------------------------------------------------------------------------- */}
      <div className="container py-4">
        <h2>All Teachers</h2>
        {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p> */}
        <hr className="mt-0 mb-4" />
        <table className="table table-hover me-5">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Name</th>
              <th scope="col">Subject</th>
              <th scope="col">Department</th>
              <th scope="col">Modify</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{teacher.name}</td>
                <td>{teacher.subject.join(", ")}</td>
                <td>{teacher.department}</td>
                <td>
                  {/* <button
                    className="bg-success text-white rounded p-2 border-0 me-2"
                    onClick={() => handleEditTeacher(teacher._id, index)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button> */}
                  <button
                    className="bg-danger text-white rounded p-2 border-0"
                    onClick={() => handleDeleteTeacher(teacher._id, index)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ----------------------------------------------------------------------------------------------------- */}
      <div className="container py-4">
        <div className="teacher">
          <h2>Students</h2>
          <p>List of students</p>
          <hr className="mt-0 mb-4" />
          <div className="row justify-content-center">
            {students.map((student, index) => (
              <div className="col-3 mb-4" key={student._id}>
                {/* Render student information */}
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/001/942/923/large_2x/student-boy-with-school-suitcase-back-to-school-free-vector.jpg"
                      className="card-img-top"
                      alt="..."
                      style={{ height: "256px" }}
                    />
                    <h5 className="card-title">Name={student.name}</h5>
                    <p className="card-text">Department={student.department}</p>
                    <p className="card-text">Email={student.email}</p>
                    <div className="d-flex justify-content-around">
                      <button
                        className="bg-success text-white rounded p-2 border-0"
                        onClick={() => {
                          // console.log(student._id) // Approve the student
                          handleApproveReject(student._id);
                          approveStudent(student._id);
                          toast.success("Student Approved");
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-danger text-white rounded p-2 border-0"
                        onClick={() => {
                          handleApproveReject(student._id);
                          deleteStudent(student._id); // Delete the student
                          toast.info("Student Rejected");
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
