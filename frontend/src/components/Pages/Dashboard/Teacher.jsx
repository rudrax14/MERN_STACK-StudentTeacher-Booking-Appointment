import React, { useState, useEffect } from "react";
// import Navbar from '../../UI/Navbar';
import { BsChevronRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
// import Alert from "../../Alert";
import { toast } from "react-toastify";
import axios from "axios";
// import StudentData from '../../../../data.json';
function Teacher() {
  const navigate = useNavigate();
  // const [cards, setCards] = useState(StudentData.studentBookings)
  const [cards, setCards] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [highlightedTimeSlot, setHighlightedTimeSlot] = useState("");
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [studentEmail, setStudentEmail] = useState("");
  // const handleReject = (cardId) => {
  //   setCards(cards.filter(card => card.id !== cardId));
  // };

  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messageCounts, setMessageCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("Teachers jwtToken");
        // secure route
        if (jwtToken == null) {
          navigate("/teacher/login");
        } else {
          const response = await axios.get(
            "http://localhost:5000/api/v1/teachers/getAllPendingStudents",
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          // console.log(response.data.students);
          setCards(response.data.students);

          // Fetch message counts for all cards
          const counts = {};
          for (const card of response.data.students) {
            for (const studentInfo of card.students) {
              const emailToFilter =
                studentInfo.studentId && studentInfo.studentId.email
                  ? studentInfo.studentId.email
                  : null;

              if (emailToFilter) {
                const messageResponse = await axios.get(
                  "http://localhost:5000/api/v1/messages",
                  {
                    headers: {
                      Authorization: `Bearer ${jwtToken}`,
                    },
                    params: {
                      email: emailToFilter,
                    },
                  }
                );

                if (messageResponse.status === 200) {
                  const data = messageResponse.data;
                  counts[emailToFilter] = data.messages.length;
                }
              }
            }
          }

          // console.log(counts);
          setMessageCounts(counts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchMessages = async (email) => {
    try {
      const jwtToken = localStorage.getItem("Teachers jwtToken");
      const emailToFilter = email;

      const response = await axios.get(
        "http://localhost:5000/api/v1/messages",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            email: emailToFilter,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data;
        setMessages(data.messages);
        // Update the message count for the specific card
        setMessageCounts((prevCounts) => ({
          ...prevCounts,
          [email]: data.messages.length,
        }));
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleStudentApprove = async (studentId, teacherAppointmentId) => {
    try {
      const jwtToken = localStorage.getItem("Teachers jwtToken");

      const url = `http://localhost:5000/api/v1/teachers/changeApprovalStatus/${teacherAppointmentId}/${studentId}`;

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.patch(url, null, { headers });

      console.log("Approval status changed successfully:", response.data);

      setCards((prevCards) => {
        const updatedCards = prevCards.map((schedule) => {
          return {
            ...schedule,
            students: schedule.students.filter(
              (student) => student.studentId._id !== studentId
            ),
          };
        });

        return updatedCards;
      });
    } catch (error) {
      console.error("Error changing approval status:", error.message);
    }
  };
  const handleStudentReject = async (studentId, teacherAppointmentId) => {
    try {
      const jwtToken = localStorage.getItem("Teachers jwtToken");
      const url = `http://localhost:5000/api/v1/teachers/changeApprovalStatus/${teacherAppointmentId}/${studentId}`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.delete(url, { headers });

      console.log("Student rejected:", response.data);
      setCards((prevCards) => {
        const updatedCards = prevCards.map((schedule) => {
          return {
            ...schedule,
            students: schedule.students.filter(
              (student) => student.studentId._id !== studentId
            ),
          };
        });
        return updatedCards;
      });
    } catch (error) {
      console.error("Error changing approval status:", error.message);
    }
  };

  // const handleReject = (cardId) => {
  //   setCards(cards.filter((card) => card._id !== cardId));
  // };

  const handleApprove = (card) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    setAppointments((prevAppointments) => [
      ...prevAppointments,
      {
        _id: card._id,
        name: card.name,
        subject: card.subject,
        date: currentDate,
        time: currentTime,
      },
    ]);

    // Remove the approved card
    setCards(cards.filter((c) => c._id !== card._id));
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setHighlightedTimeSlot(timeSlot); // Highlight the selected time slot
  };

  //appoinment assign
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Time Slot = ", selectedTimeSlot);

    try {
      const jwtToken = localStorage.getItem("Teachers jwtToken");
      const response = await axios.post(
        "http://localhost:5000/api/v1/teachers/schedule",
        {
          scheduleAt: selectedTimeSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      toast.success("Appointment scheduled successfully:");
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      toast.error("Already Booked");
    }
  };

  return (
    <>
      {/* header */}
      <div className="header-container shadow p-3 mb-5 bg-success text-white ">
        <div className="container d-flex justify-content-center">
          <p className="fs-1">Teacher Dashboard</p>
        </div>
      </div>

      {/* teacher slot modal */}
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
                Update Lectures
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3 row">
                  <label>Time Slot</label>
                  <div className="mt-1">
                    <button
                      type="button"
                      className={`btn  ${
                        highlightedTimeSlot === `${getCurrentDate()}T22:30:00`
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() =>
                        handleTimeSlotSelect(`${getCurrentDate()}T22:30:00`)
                      }
                    >
                      2pm-4pm
                    </button>
                    <button
                      type="button"
                      className={`btn  ${
                        highlightedTimeSlot === `${getCurrentDate()}T20:30:00`
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() =>
                        handleTimeSlotSelect(`${getCurrentDate()}T20:30:00`)
                      }
                    >
                      5pm-6pm
                    </button>
                    <button
                      type="button"
                      className={`btn  ${
                        highlightedTimeSlot === `${getCurrentDate()}T12:30:00`
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() =>
                        handleTimeSlotSelect(`${getCurrentDate()}T12:30:00`)
                      }
                    >
                      7pm-8pm
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <input
                  type="submit"
                  value="Add"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* student message modal */}
      <div className="modal fade" id="messageModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Student Message</h5>
            </div>
            <div className="modal-body">
              {/* Render the messages in the modal */}
              {messages.map((message) => (
                <div key={message._id}>
                  <p className="border border-light-subtle">
                    {message.messageText}
                  </p>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Send Message
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {/* dashbord container */}
      <div className="container py-4">
        <div className="pagecontent">
          <h2>Status</h2>
          {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p> */}
          <hr className="mt-0 mb-4" />
          <div className="row justify-content-around row-cols-4 text-center gy-5">
            <div
              className="card bg-primary text-white h-100"
              style={{ width: "18rem" }}
            >
              <div className="card-body ">
                <p className="fw-semibold fs-5">Schedule Appointment</p>
                <p className="fw-normal fs-6">3</p>
              </div>
              <div
                className="card-footer d-flex"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Appoinment
                <span className="ms-auto ">
                  <BsChevronRight />
                </span>
              </div>
            </div>
            <div
              className="card bg-warning text-black h-100"
              style={{ width: "18rem" }}
            >
              <div className="card-body ">
                <p className="fw-semibold fs-5">Upcoming Lectures</p>
                <p className="fw-normal fs-6">3</p>
              </div>
              <div className="card-footer d-flex">
                View Details
                <span className="ms-auto">
                  <BsChevronRight />
                </span>
              </div>
            </div>
            <div
              className="card bg-success text-white h-100"
              style={{ width: "18rem" }}
            >
              <div className="card-body ">
                <p className="fw-semibold fs-5">All Messages</p>
                <p className="fw-normal fs-6">3</p>
              </div>
              <div className="card-footer d-flex">
                View Details
                <span className="ms-auto">
                  <BsChevronRight />
                </span>
              </div>
            </div>
            <div
              className="card bg-danger text-white h-100"
              style={{ width: "18rem" }}
            >
              <div className="card-body ">
                <p className="fw-semibold fs-5">Lectures Missed</p>
                <p className="fw-normal fs-6">3</p>
              </div>
              <div className="card-footer d-flex">
                View Details
                <span className="ms-auto">
                  <BsChevronRight />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* table info container */}

      <div className="container py-4">
        <h2>Your All Upcoming Appointment Details</h2>
        {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p> */}
        <hr className="mt-0 mb-4" />
        <table className="table table-hover me-5">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Name</th>
              <th scope="col">Subject</th>
              <th scope="col">Date</th>
              <th scope="col">Join Time</th>
              {/* <th scope="col">Details</th> */}
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{appointment.name}</td>
                <td>{appointment.subject}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                {/* <td>
                  <button className='bg-success text-white rounded p-2 border-0 me-2'><i className="fa-solid fa-pen-to-square"></i></button>
                  <button className='bg-danger text-white rounded p-2 border-0'><i className="fa-solid fa-trash"></i></button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* student card container */}
      <div className="container py-4">
        <div className="pagecontent">
          <h2>Approve/cancel Appointment</h2>
          {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p> */}
          <hr className="mt-0 mb-4" />
          <div
            className="d-flex flex-wrap justify-content-center"
            style={{ gap: "1rem" }}
          >
            {cards.map((schedule) => (
              <div
                key={schedule.scheduleAt}
                className="schedule-container d-flex flex-wrap justify-content-center"
              >
                {schedule.students.map((studentInfo) => {
                  const {
                    _id: teacherAppointmentId,
                    name: teacherName,
                    scheduleAt,
                  } = schedule;
                  const {
                    _id: studentId,
                    name,
                    department,
                    email,
                  } = studentInfo.studentId;

                  return (
                    <div
                      key={studentId}
                      className="card m-3"
                      style={{ width: "18rem" }}
                    >
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/001/942/923/large_2x/student-boy-with-school-suitcase-back-to-school-free-vector.jpg"
                        className="card-img-top"
                        alt="..."
                        style={{ height: "256px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">Department: {department}</p>
                        <p>
                          Timing:{" "}
                          {new Date(scheduleAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        {/* <p className="card-text">ID: {studentId}</p> */}
                        {/* <p className="card-title">{teacherAppointmentId}</p> */}
                        <div className="d-flex justify-content-around">
                          <button
                            className="bg-success text-white rounded p-2 border-0"
                            onClick={() => {
                              handleStudentApprove(
                                studentId,
                                teacherAppointmentId
                              );
                              toast.success("Added");
                            }}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-danger text-white rounded p-2 border-0"
                            onClick={() => {
                              handleStudentReject(
                                studentId,
                                teacherAppointmentId
                              );
                              // toast.info("Rejected");
                            }}
                          >
                            Reject
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary position-relative"
                            data-bs-toggle="modal"
                            data-bs-target="#messageModal"
                            onClick={() => {
                              setStudentEmail(email);
                              setMessages([]); // Clear existing messages
                              fetchMessages(email); // Assuming studentId is the student email
                            }}
                          >
                            Inbox
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                              {messageCounts[email] || 0}
                              <span className="visually-hidden">
                                unread messages
                              </span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Teacher;
