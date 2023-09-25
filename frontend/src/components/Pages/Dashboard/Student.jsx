import React, { useState } from 'react';
import Navbar from '../../UI/Navbar';
import { BsChevronRight } from 'react-icons/bs';
import { toast } from 'react-toastify';

function Student() {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [lectureDetails, setLectureDetails] = useState([]);
  const [teachers, setTeachers] = useState([
    { name: 'Teacher Name 1', subject: 'Subject Description 1' },
    { name: 'Teacher Name 2', subject: 'Subject Description 2' },
    // Add more teachers as needed
  ]);

  const showToast = (message) => {
    toast.success(message);
  };

  const handleTeacherClick = (teacherName, subject) => {
    setSelectedTeacher(teacherName);
    setSelectedSubject(subject);

    // Add the selected teacher and subject to the lecture details table
    setLectureDetails((prevDetails) => [
      ...prevDetails,
      {
        teacher: teacherName,
        subject: subject,
      },
    ]);

    // Remove the booked teacher from the list of teachers
    setTeachers((prevTeachers) =>
      prevTeachers.filter((teacher) => teacher.name !== teacherName)
    );
  };

  return (
    <>
      <Navbar />
      <div className="header-container shadow p-3 mb-5 bg-primary text-white ">
        <div className="container d-flex justify-content-center">
          <p className='fs-1'>Student Dashbord</p>
        </div>
      </div>
      {/* container */}
      <div className="container py-4">
        <div className="pagecontent">
          <h2>Status</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
          <hr className='mt-0 mb-4' />
          <div className="row justify-content-around row-cols-4 text-center gy-5">
            <div className="card bg-primary text-white h-100" style={{ width: '18rem' }}>
              <div className="card-body ">
                <p className='fw-semibold fs-5'>Upcoming Lectures</p>
                <p className='fw-normal fs-6'>3</p>
              </div>
              <div className="card-footer d-flex">
                View Details
                <span className='ms-auto'>
                  <BsChevronRight />
                </span>
              </div>
            </div>
            <div className="card bg-warning text-black h-100" style={{ width: '18rem' }}>
              <div className="card-body ">
                <p className='fw-semibold fs-5'>Upcoming Lectures</p>
                <p className='fw-normal fs-6'>3</p>
              </div>
              <div className="card-footer d-flex">
                View Details
                <span className='ms-auto'>
                  <BsChevronRight />
                </span>
              </div>
            </div>
            <div className="card bg-success text-white h-100" style={{ width: '18rem' }}>
              <div className="card-body ">
                <p className='fw-semibold fs-5'>Teachers Available</p>
                <p className='fw-normal fs-6'>3</p>
              </div>
              <div className="card-footer d-flex">
                View Details
                <span className='ms-auto'>
                  <BsChevronRight />
                </span>
              </div>
            </div>
            <div className="card bg-danger text-white h-100" style={{ width: '18rem' }}>
              <div className="card-body ">
                <p className='fw-semibold fs-5'>Lectures Missed</p>
                <p className='fw-normal fs-6'>3</p>
              </div>
              <div className="card-footer d-flex">
                View Details
                <span className='ms-auto'>
                  <BsChevronRight />
                </span>
              </div>
            </div>
          </div >
        </div >
      </div>


      <div className="container py-4">
        <h2>Your Upcoming Lectures Details</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
        <hr className="mt-0 mb-4" />
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Teacher</th>
              <th scope="col">Subject</th>
            </tr>
          </thead>
          <tbody>
            {lectureDetails.map((detail, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{detail.teacher}</td>
                <td>{detail.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container py-4">
        <div className="pagecontent">
          <h2>Status</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
          <hr className="mt-0 mb-4" />
          <div
            className="d-flex flex-wrap justify-content-center"
            style={{ gap: '1rem' }}
          >
            {teachers.map((teacher, index) => (
              <div className="card" style={{ width: '18rem' }} key={index}>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/002/406/452/non_2x/female-teacher-teaching-a-lesson-at-the-school-free-vector.jpg"
                  className="card-img-top"
                  alt="..."
                  style={{ height: '256px' }}
                />
                <div className="card-body">
                  <h5
                    className="card-title"
                    onClick={() =>
                      handleTeacherClick(teacher.name, teacher.subject)
                    }
                  >
                    {teacher.name}
                  </h5>
                  <p className="card-text">{teacher.subject}</p>
                  <div className="d-flex justify-content-around">
                    <button
                      className="bg-primary text-white rounded p-2 border-0"
                      onClick={() => {
                        handleTeacherClick(teacher.name, teacher.subject);
                        showToast('Booked');
                      }}
                    >
                      Book Lectures
                    </button>
                    <button className="bg-primary text-white rounded p-2 border-0">
                      Message
                    </button>
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

export default Student;
