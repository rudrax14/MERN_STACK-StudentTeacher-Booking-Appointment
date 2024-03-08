import React, { useState, useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Header from "../../components/Header";
import Spinner from "../../components/UI/Spinner";

function Teacher() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [highlightedTimeSlot, setHighlightedTimeSlot] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [spinner, setSpinner] = useState(false);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messageCounts, setMessageCounts] = useState({});
  const [tableAppointments, setTableAppointments] = useState([]);

  const fetchData = async () => {
    try {
      const jwtToken = localStorage.getItem("Teachers jwtToken");
      // secure route
      if (jwtToken == null) {
        navigate("/teacher/login");
      } else {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/teachers/getAllPendingStudents`,
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
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/messages`,
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
  const fetchTeacherData = async () => {
    try {
      const jwtToken = localStorage.getItem("Teachers jwtToken");

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/teachers/schedule`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      // console.log(response.data.appointments);
      setTableAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchTeacherData();
  }, []);

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const jwtToken = localStorage.getItem("Teachers jwtToken");


      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/teachers/reschedule/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      toast.success("Appoinment Deleted Successfully");
      if (response.status === 200) {
        setTableAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
      }
    } catch (error) {

      console.error("Error deleting appointment:", error);
    }
  };

  const fetchMessages = async (email) => {
    try {
      const jwtToken = localStorage.getItem("Teachers jwtToken");
      const emailToFilter = email;

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/messages`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            email: emailToFilter,
          },
        }
      );
      // console.log(response.data);
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
      setSpinner(true);
      const jwtToken = localStorage.getItem("Teachers jwtToken");

      const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/teachers/changeApprovalStatus/${teacherAppointmentId}/${studentId}`;

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.patch(url, null, { headers });
      setSpinner(false);
      // console.log("Approval status changed successfully", response.data);

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
      toast.success("Student Added");
    } catch (error) {
      setSpinner(false);
      console.error("Error changing approval status:", error.message);
    }
  };
  const handleStudentReject = async (studentId, teacherAppointmentId) => {
    try {
      setSpinner(true);
      const jwtToken = localStorage.getItem("Teachers jwtToken");
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/teachers/changeApprovalStatus/${teacherAppointmentId}/${studentId}`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.delete(url, { headers });
      setSpinner(false);
      // console.log("Student rejected:", response.data);
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
      toast.info("Student Rejected");
    } catch (error) {
      setSpinner(false);
      console.error("Error changing approval status:", error.message);
    }
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setHighlightedTimeSlot(timeSlot);
  };

  //appoinment assign
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Time Slot = ", selectedTimeSlot);

    try {
      const jwtToken = localStorage.getItem("Teachers jwtToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/teachers/schedule`,
        {
          scheduleAt: selectedTimeSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      fetchTeacherData();
      toast.success("Appointment scheduled successfully:");
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      toast.error("Already Booked");
    }
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>

          {/* header */}
          < Header name='Teacher Dashboard' style='success' />

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
                          className={`btn  ${highlightedTimeSlot === `${getCurrentDate()}T14:00:00`
                            ? "btn-primary"
                            : "btn-outline-secondary"
                            }`}
                          onClick={() =>
                            handleTimeSlotSelect(`${getCurrentDate()}T14:00:00`)
                          }
                        >
                          2pm-4pm
                        </button>
                        <button
                          type="button"
                          className={`btn  ${highlightedTimeSlot === `${getCurrentDate()}T17:00:00`
                            ? "btn-primary"
                            : "btn-outline-secondary"
                            }`}
                          onClick={() =>
                            handleTimeSlotSelect(`${getCurrentDate()}T17:00:00`)
                          }
                        >
                          5pm-6pm
                        </button>
                        <button
                          type="button"
                          className={`btn  ${highlightedTimeSlot === `${getCurrentDate()}T19:00:00`
                            ? "btn-primary"
                            : "btn-outline-secondary"
                            }`}
                          onClick={() =>
                            handleTimeSlotSelect(`${getCurrentDate()}T19:00:00`)
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

              <hr className="mt-0 mb-4" />
              <div className="row justify-content-around row-cols-4 text-center gy-5">
                <div
                  className="card bg-primary text-white h-100"
                  style={{ width: "18rem" }}
                >
                  <div className="card-body ">
                    <p className="fw-semibold fs-5">Schedule Appointment</p>
                    <p className="fw-normal fs-6">{tableAppointments.length}</p>
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
              </div>
            </div>
          </div>
          {/* table info container */}

          <div className="container py-4">
            <h2>Your All Upcoming Appointment Details</h2>

            <hr className="mt-0 mb-4" />
            <table className="table table-hover me-5">
              <thead>
                <tr>
                  <th scope="col">Sr.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Date</th>
                  <th scope="col">Shedule Time</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {tableAppointments.map((appointment, index) => {
                  const scheduleDate = new Date(appointment.scheduleAt);
                  const formattedDate = scheduleDate.toLocaleDateString();
                  const formattedTime = scheduleDate.toLocaleTimeString();

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{appointment.name}</td>
                      <td>{appointment.sendBy}</td>
                      <td>{formattedDate}</td>
                      <td>{formattedTime}</td>
                      <td>
                        <button
                          className="bg-danger text-white rounded p-2 border-0"
                          onClick={() => handleDeleteAppointment(appointment._id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
      )}
    </>
  );
}

export default Teacher;
