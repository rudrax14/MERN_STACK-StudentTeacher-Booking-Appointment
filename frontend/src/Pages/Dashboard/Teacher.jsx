import React, { useState, useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Header from "../../components/Header";
import Spinner from "../../components/UI/Spinner";
import { MdDelete } from "react-icons/md";

function Teacher() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [highlightedTimeSlot, setHighlightedTimeSlot] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [seduleModal, setSeduleModal] = useState(false);

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
      const jwtToken = localStorage.getItem("Teacher jwtToken");
      // secure route
      if (jwtToken == null) {
        navigate("/teacher/login");
      } else {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL
          }/api/v1/teachers/getAllPendingStudents`,
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
      const jwtToken = localStorage.getItem("Teacher jwtToken");

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/teachers/schedule`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(response);
      setTableAppointments(response.data.appointments);
    } catch (error) {
      // console.log(error);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchTeacherData();
  }, []);

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const jwtToken = localStorage.getItem("Teacher jwtToken");

      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/v1/teachers/reschedule/${appointmentId}`,
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
      const jwtToken = localStorage.getItem("Teacher jwtToken");
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
      const jwtToken = localStorage.getItem("Teacher jwtToken");

      const url = `${import.meta.env.VITE_BACKEND_URL
        }/api/v1/teachers/changeApprovalStatus/${teacherAppointmentId}/${studentId}`;

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
      const jwtToken = localStorage.getItem("Teacher jwtToken");
      const url = `${import.meta.env.VITE_BACKEND_URL
        }/api/v1/teachers/changeApprovalStatus/${teacherAppointmentId}/${studentId}`;
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
    if (selectedTimeSlot === "") {
    } else {

      setSeduleModal(false)
      setHighlightedTimeSlot('')
      setSelectedTimeSlot("")
    }
    // console.log("Time Slot = ", selectedTimeSlot);

    try {
      const jwtToken = localStorage.getItem("Teacher jwtToken");
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
      if (selectedTimeSlot == "") {
        toast.error("Atleat select one time slot");
      } else {
        toast.error("Already Booked");
      }
    }
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          {/* header */}
          <Header name="Teacher Dashboard" style="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* teacher slot modal */}
          {seduleModal && (<div
            className="fixed z-10 inset-0 overflow-y-auto"
          >
            <div className="flex justify-center items-center min-h-screen text-center">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity"
              ></div>
              <div className="inline-block align-bottom bg-white  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white dark:bg-slate-800  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h1
                    className="text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Update Lectures
                  </h1>
                  <form onSubmit={handleSubmit}>
                    <div className="mt-3 text-center sm:mt-5">
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-4 dark:text-gray-400">
                          Time Slot
                        </label>
                        <div className="mt-1 flex gap-4 justify-center">
                          <button
                            type="button"
                            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${highlightedTimeSlot ===
                              `${getCurrentDate()}T14:00:00`
                              ? "text-white bg-blue-600 hover:bg-blue-700"
                              : "text-blue-700 bg-blue-100 hover:bg-blue-200"
                              }`}
                            onClick={() =>
                              handleTimeSlotSelect(
                                `${getCurrentDate()}T14:00:00`
                              )
                            }
                          >
                            2pm-4pm
                          </button>
                          <button
                            type="button"
                            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${highlightedTimeSlot ===
                              `${getCurrentDate()}T17:00:00`
                              ? "text-white bg-blue-600 hover:bg-blue-700"
                              : "text-blue-700 bg-blue-100 hover:bg-blue-200"
                              }`}
                            onClick={() =>
                              handleTimeSlotSelect(
                                `${getCurrentDate()}T17:00:00`
                              )
                            }
                          >
                            5pm-6pm
                          </button>
                          <button
                            type="button"
                            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${highlightedTimeSlot ===
                              `${getCurrentDate()}T19:00:00`
                              ? "text-white bg-blue-600 hover:bg-blue-700"
                              : "text-blue-700 bg-blue-100 hover:bg-blue-200"
                              }`}
                            onClick={() =>
                              handleTimeSlotSelect(
                                `${getCurrentDate()}T19:00:00`
                              )
                            }
                          >
                            7pm-8pm
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 flex justify-center">
                      <button
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 hover:cursor-pointer"
                        onClick={() => {
                          setSeduleModal(false)
                          setHighlightedTimeSlot('')
                          setSelectedTimeSlot("")
                        }}
                      >
                        Close

                      </button>
                      <input
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ml-4 hover:cursor-pointer"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>)}
          {/* student message modal */}
          {messageModal && (<div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex justify-center items-center min-h-screen text-center bg-gray-500 bg-opacity-90 transition-opacity">
              <div className="bg-white rounded-lg dark:bg-slate-800 shadow-xl w-full max-w-lg mx-4 sm:mx-auto">
                <div className="border-b border-gray-200 p-4">
                  <h5 className="text-lg font-medium text-gray-900 dark:text-white">Student Message</h5>
                </div>
                <div className="p-4 space-y-4">
                  {/* Render the messages in the modal */}
                  {messages.map((message) => (
                    <div key={message._id} className="border border-gray-200 p-2 rounded">
                      <p className="text-gray-700 dark:text-white">{message.messageText}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end border-t border-gray-200 p-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    onClick={() => setMessageModal(false)}
                  >
                    Close
                  </button>
                  <button type="button" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => {/* Code to send message and close the modal */ }}>
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>)}


          {/* dashbord container */}
          <div className="dark:bg-slate-900 dark:text-white">

            <section className="container p-6  " >
              <h2 className="text-2xl font-semibold mb-4">Status</h2>
              <hr className="mt-0 mb-4" />
              <div className="flex justify-center text-center">
                <div className="bg-blue-500 min-w-80 text-white rounded-lg shadow-lg flex flex-col justify-between h-40"
                  onClick={() => setSeduleModal(true)}>
                  <div className="p-4 flex flex-col gap-4">
                    <p className="text-2xl font-bold">Schedule Appointment</p>
                    <p className="text-xl">{tableAppointments.length}</p>
                  </div>
                  <div className="flex justify-center border-t items-center py-2 cursor-pointer hover:bg-blue-600 rounded-b-lg">
                    Add Schedule
                  </div>
                </div>
              </div>


              {/* table info container */}

              <div className="py-4 ">
                <h2 className="text-2xl font-semibold mb-4">Your All Upcoming Appointment Details</h2>
                <hr className="mt-0 mb-4" />
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full text-center ">
                    <thead>
                      <tr className=" ">
                        <th className="px-4 py-2">Sr.No</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Schedule Time</th>
                        <th className="px-4 py-2">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableAppointments.map((appointment, index) => {
                        const scheduleDate = new Date(appointment.scheduleAt);
                        const formattedDate = scheduleDate.toLocaleDateString();
                        const formattedTime = scheduleDate.toLocaleTimeString();

                        return (
                          <tr key={index} className="hover:bg-gray-100 dark:hover:bg-slate-950">
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{appointment.name}</td>
                            <td className="border px-4 py-2">{appointment.sendBy}</td>
                            <td className="border px-4 py-2">{formattedDate}</td>
                            <td className="border px-4 py-2">{formattedTime}</td>
                            <td className="border px-4 py-2">
                              <button
                                className="bg-red-500 text-white rounded px-4 py-2"
                                onClick={() =>
                                  handleDeleteAppointment(appointment._id)
                                }
                              >
                                <MdDelete />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="block md:hidden space-y-4">
                  {tableAppointments.map((appointment, index) => {

                    const scheduleDate = new Date(appointment.scheduleAt);
                    const formattedDate = scheduleDate.toLocaleDateString();
                    const formattedTime = scheduleDate.toLocaleTimeString();

                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-md bg-white dark:bg-slate-800 hover:dark:bg-slate-950">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-semibold text-lg">Appointment {index + 1}</p>
                          <button
                            className="bg-red-500 text-white rounded-full p-2"
                            onClick={() => handleDeleteAppointment(appointment._id)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                        <p className="mb-1"><span className="font-semibold">Name:</span> {appointment.name}</p>
                        <p className="mb-1"><span className="font-semibold">Email:</span> {appointment.sendBy}</p>
                        <p className="mb-1"><span className="font-semibold">Date:</span> {formattedDate}</p>
                        <p><span className="font-semibold">Schedule Time:</span> {formattedTime}</p>
                      </div>
                    );
                  })}
                </div>
              </div>



              {/* student card container */}

              <div className="py-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Approve/cancel Appointment
                </h2>
                <hr className="mt-0 mb-6 border-gray-300 rounded-lg" />
                <div className="flex justify-center ">
                  {cards.map((schedule) => (
                    <div
                      key={schedule.scheduleAt}
                      className="grid xl:grid-cols-4 sm:grid-cols-2 items-center justify-center gap-4 mx-12"
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
                            className="card-body border shadow-lg rounded-lg p-4 w-72"
                          >
                            <img
                              src="https://static.vecteezy.com/system/resources/previews/001/942/923/large_2x/student-boy-with-school-suitcase-back-to-school-free-vector.jpg"
                              className="w-full h-64 object-cover rounded-t-lg"
                              alt="Student"
                            />
                            <div className="p-4 bg-gray-50 rounded-b-lg dark:bg-slate-800 border ">
                              <h5 className="text-xl font-semibold mb-2">
                                {name}
                              </h5>
                              <p className="text-gray-600 mb-2 dark:text-gray-300">
                                Department: {department}
                              </p>
                              <p className="text-gray-600 mb-4 dark:text-gray-300">
                                Timing:{" "}
                                {new Date(scheduleAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                              <div className="flex justify-between">
                                <button
                                  className="bg-green-500 text-white rounded p-2 hover:bg-green-600"
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
                                  className="bg-red-500 text-white rounded p-2 hover:bg-red-600"
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
                                  className="relative bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                                  onClick={() => {
                                    setStudentEmail(email);
                                    setMessages([]); // Clear existing messages
                                    fetchMessages(email); // Assuming studentId is the student email
                                    setMessageModal(true);
                                  }}
                                >
                                  Inbox
                                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                    {messageCounts[email] || 0}
                                    <span className="sr-only">
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

            </section>
          </div>
        </>
      )
      }
    </>
  );
}

export default Teacher;
