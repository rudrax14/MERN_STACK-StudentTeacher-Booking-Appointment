import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../UI/Navbar';
import { Link, useNavigate } from "react-router-dom";
// import { BsChevronRight } from 'react-icons/bs';
import { toast } from 'react-toastify';
import teachersData from '../../../../data.json';
import axios from 'axios';
function Student() {
  const navigate = useNavigate();
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [lectureDetails, setLectureDetails] = useState([]);
  // data coming
  // const [teachers, setTeachers] = useState(teachersData.teachers);
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem('Student jwtToken');
        if (jwtToken == null) {
          navigate("/student/login");
        } else {
          // Make an HTTP request to fetch data from the API using Axios
          const response = await axios.get('http://localhost:5000/api/v1/admin', {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            }
          });
          // Update the state with the fetched data
          setTeachers(response.data.data.users);
          // console.log(response.data.data.users);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);












  const modalRef = useRef();

  const handleTeacherClick = (teacherName, subject) => {
    setSelectedTeacher(teacherName);
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBooked = () => {
    if (selectedTeacher && selectedSubject && selectedTimeSlot) {
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();

      setLectureDetails((prevDetails) => [
        ...prevDetails,
        {
          teacher: selectedTeacher,
          subject: selectedSubject,
          date: currentDate,
          time: currentTime,
          timeSlot: selectedTimeSlot,
        },
      ]);

      setTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher.name !== selectedTeacher)
      );

      toast.success('Lecture booked successfully');

      // Reset selections
      setSelectedTeacher(null);
      setSelectedSubject(null);
      setSelectedTimeSlot(null);

      setIsModalOpen(false); // Close the modal
    } else {
      toast.success('Please select a time slot.');
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      {/* time slot modal */}
      <div
        className={`modal fade ${isModalOpen ? 'show' : ''}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!isModalOpen}
        style={{ display: isModalOpen ? 'block' : 'none' }}
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Lectures
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setIsModalOpen(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 row">
                  <label>Time Slot</label>
                  <div className="mt-1">
                    <button
                      type="button"
                      className={`btn ${selectedTimeSlot === '2pm-4pm' ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => setSelectedTimeSlot('2pm-4pm')}
                    >
                      2pm-4pm
                    </button>
                    <button
                      type="button"
                      className={`btn ${selectedTimeSlot === '5pm-6pm' ? 'btn-primary' : 'btn-outline-secondary'} ms-2`}
                      onClick={() => setSelectedTimeSlot('5pm-6pm')}
                    >
                      5pm-6pm
                    </button>
                    <button
                      type="button"
                      className={`btn ${selectedTimeSlot === '7pm-8pm' ? 'btn-primary' : 'btn-outline-secondary'} ms-2`}
                      onClick={() => setSelectedTimeSlot('7pm-8pm')}
                    >
                      7pm-8pm
                    </button>
                  </div>
                </div>
              </form>
              {selectedTeacher && selectedSubject && selectedTimeSlot && (
                <div>
                  <p>Selected Teacher: {selectedTeacher}</p>
                  <p>Selected Subject: {selectedSubject}</p>
                  <p>Selected Time Slot: {selectedTimeSlot}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  if (selectedTimeSlot) {
                    handleBooked();
                    setIsModalOpen(false);
                  }
                }}
                disabled={!selectedTimeSlot}  // Disable the button if no time slot selected
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* message modal */}
      <div className="modal fade" id="messageModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Message Modal</h5>

            </div>
            <div className="modal-body">
              <p>Modal body text goes here for Message.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* header */}
      <div className="header-container shadow p-3 mb-5 bg-primary text-white">
        <div className="container d-flex justify-content-center">
          <p className='fs-1'>Student Dashboard</p>
        </div>
      </div>

      {/* info table */}
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
              <th scope="col">Date</th>
              <th scope="col">Time Slot</th>
              <th scope="col">Booking Time</th>
            </tr>
          </thead>
          <tbody>
            {lectureDetails.map((detail, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{detail.teacher}</td>
                <td>{detail.subject}</td>
                <td>{detail.date}</td>
                <td>{detail.timeSlot}</td>
                <td>{detail.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* card container */}
      <div className="container py-4">
        <div className="pagecontent">
          <h2>All teachers</h2>
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
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() =>
                        handleTeacherClick(teacher.name, teacher.subject)
                      }
                    >
                      Book Lectures
                    </button>
                    <button
                      className="bg-primary text-white rounded p-2 border-0"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#messageModal"
                    >
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

