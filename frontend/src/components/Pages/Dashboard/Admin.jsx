import React, { useState } from 'react';
import Navbar from '../../UI/Navbar';
import { BsChevronRight } from 'react-icons/bs';
import Alert from '../../Alert';

function Admin() {
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



  const [students, setStudents] = useState([
    { id: 1, name: 'Student 1', subject: 'Subject A', description: 'Student Deatils ' },
    { id: 2, name: 'Student 2', subject: 'Subject B', description: 'Student Details 2' },

  ]);

  const handleApproveReject = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
  };

  const handleDeleteTeacher = (index) => {
    const updatedTeachers = teachers.filter((teacher, i) => i !== index);
    setTeachers(updatedTeachers);
  };
  return (
    <>
      <Navbar />
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
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="teacherName" className="form-label">
                    Teacher Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="teacherName"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subjectName" className="form-label">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subjectName"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">


              <button
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
              </button>

            </div>
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
