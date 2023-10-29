import React, { useState } from 'react';
import Navbar from '../../UI/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { BsChevronRight } from 'react-icons/bs';
import Alert from '../../Alert';
import StudentData from '../../../../data.json';
import axios from 'axios';
function Admin() {

  const navigate = useNavigate();


  const [teacherName, setTeacherName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [department, setDepartment] = useState('');
  const [teachers, setTeachers] = useState([]);

  const handleAddTeacher = () => {
    const newTeacher = {
      teacherName,
      subjectName,
      department,
    };

    setTeachers([...teachers, newTeacher]);
    setTeacherName('');
    setSubjectName('');
    setDepartment('');
  };

  const [students, setStudents] = useState(StudentData.studentApprovals)

  const handleApproveReject = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
  };

  const handleDeleteTeacher = (index) => {
    const updatedTeachers = teachers.filter((teacher, i) => i !== index);
    setTeachers(updatedTeachers);
  };


  ///////////////////////////

  const [formData, setFormData] = useState({
    name: '',
    email: "",
    age: '',
    subject: '',
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

  async function submitHandler(event) {
    event.preventDefault();
    console.log('Form Data');
    console.log(formData);



    // if (jwtToken) {
    //   console.log('JWT token:', jwtToken);
    // } else {
    //   console.log('No JWT token found.');
    // }

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
      // Make a POST request using Axios
      const jwtToken = localStorage.getItem('jwtToken');
      const response = await axios.post('http://localhost:5000/api/v1/admin', requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      navigate("/admin/dashboard");
      Alert('Teacher Added', 'success');
    } catch (error) {
      if (error.response) {
        console.log(error.response)
        const errorMessage = error.response.data.message;
        Alert(errorMessage, 'error');
      } else {
        Alert('Something Gone Wrong', 'error');
      }
    }
  }








  return (
    <>
      {/* <Navbar /> */}
      <div className="header-container shadow p-3 mb-5 bg-danger text-white">
        <div className="container d-flex justify-content-center">
          <p className="fs-1">Admin Dashboard</p>
        </div>
      </div>
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
                <input type="submit" value="Add Teacher" className="btn btn-primary" />

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
      </div >

      <div className="container py-4">
        <div className="pagecontent">
          <h2>Status</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
          <hr className="mt-0 mb-4" />
          <div className="row justify-content-around row-cols-4 text-center gy-5">
            {/* Add Teacher Card */}
            <div className="card bg-primary text-white h-100" style={{ width: '18rem' }}>
              <div className="card-body">
                <p className="fw-semibold fs-5">Add Teacher</p>
                <p className="fw-normal fs-6">{teachers.length}</p>
              </div>
              <div className="card-footer d-flex" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add
                <span className="ms-auto">
                  <BsChevronRight />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <h2>All Teachers</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
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
                <td>{teacher.teacherName}</td>
                <td>{teacher.subjectName}</td>
                <td>{teacher.department}</td>
                <td>
                  {/* <button
                    className="bg-success text-white rounded p-2 border-0 me-2"
                    onClick={() => handleEditTeacher(index)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button> */}
                  <button
                    className="bg-danger text-white rounded p-2 border-0"
                    onClick={() => handleDeleteTeacher(index)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <div className="container py-4">
        <div className="teacher">
          <h2>Approve/Reject Student</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
          <hr className='mt-0 mb-4' />
          <div className="row justify-content-center">
            {students.map(student => (
              <div className="col-3 mb-4" key={student.id}>
                <div className="card" style={{ width: '18rem' }}>
                  <img src="https://static.vecteezy.com/system/resources/previews/001/942/923/large_2x/student-boy-with-school-suitcase-back-to-school-free-vector.jpg" className="card-img-top" alt="..." style={{ height: '256px' }} />
                  <div className="card-body">
                    <h5 className="card-title">{student.name}</h5>
                    <p className="card-text">{student.description}</p>
                    <div className='d-flex justify-content-around'>
                      <button
                        className='bg-success text-white rounded p-2 border-0'
                        onClick={() => { handleApproveReject(student.id); Alert('Student Approved', 'success') }}
                      >
                        Approve
                      </button>
                      <button
                        className='bg-danger text-white rounded p-2 border-0'
                        onClick={() => { handleApproveReject(student.id); Alert('Student Rejected', 'info') }}
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
      </div >
    </>
  );
}

export default Admin;
