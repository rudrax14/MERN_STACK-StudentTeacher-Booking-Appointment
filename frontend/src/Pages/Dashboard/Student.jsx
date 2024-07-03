import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Header from "../../components/Header";
import Spinner from "../../components/UI/Spinner";
function Student() {
  const navigate = useNavigate();
  const [lectureDetails, setLectureDetails] = useState([]);
  const [email, setEmail] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchTable = async () => {
    try {
      const jwtToken = localStorage.getItem("Student jwtToken");

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/v1/student/appointment/getRegisteredAppointments`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      // console.log(response.data.appointments);
      setLectureDetails(response.data.appointments);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    }
  };

  useEffect(() => {
    ///////////////////////////////////////////////////////////////
    const emailAdd = localStorage.getItem("email");
    setEmail(emailAdd);
    // console.log(emailAdd);
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("Student jwtToken");
        if (jwtToken == null) {
          navigate("/student/login");
        } else {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          // console.log(response.data.data.users);
          setTeachers(response.data.data.users);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    fetchTable();
  }, []);

  const [formData, setFormData] = useState({
    message: "",
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
    // console.log("Message Data");
    // console.log(formData);

    const messageObject = {
      to: teacherEmail,
      messageText: formData.message,
    };
    setShowModal(false);
    // console.log(messageObject);

    try {
      const jwtToken = localStorage.getItem("Student jwtToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/messages`,
        messageObject,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Message sent successfully");
      } else {
        toast.error("Failed to send the message");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setFormData({ message: "" });
    // console.log(teacherEmail);
  }

  // book appoinments
  const handleBookAppointment = async (appointmentId, scheduleAt) => {
    setSpinner(true);
    const jwtToken = localStorage.getItem("Student jwtToken");
    await axios
      .patch(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/v1/student/appointment/${appointmentId}`,
        {
          scheduleAt: scheduleAt,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setSpinner(false);
        toast.success("Appointment booked successfully");
        fetchTable();
        console.log("Appointment booked successfully:", response.data);
      })
      .catch((error) => {
        setSpinner(false);
        console.error("Error booking appointment:", error);
        console.log(error);
        toast.error("Already booked appointment");
      });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          {/* message modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen bg-gray-500 bg-opacity-90 transition-opacity">
                <div className="bg-white dark:bg-slate-800 dark:text-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto">
                  <div className="border-b border-gray-200 p-4">
                    <h5 className="text-lg font-medium text-gray-900 dark:text-white">
                      Message Modal
                    </h5>
                  </div>
                  <form onSubmit={submitHandler}>
                    <div className="p-4">
                      <input
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-slate-700"
                        type="text"
                        name="message"
                        value={formData.message}
                        onChange={changeHandler}
                        placeholder="Your Message Goes Here"
                      />
                    </div>
                    <div className="flex justify-end border-t border-gray-200 p-4">
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <input
                        type="submit"
                        value="Send Message"
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      // onClick={() => setShowModal(false)}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* header */}
          <Header
            name="Student Dashboard"
            style="bg-gradient-to-r from-cyan-500 to-blue-500"
          />
          <div className="px-4 dark:bg-slate-900 dark:text-white">
            {/* info table */}
            <div className="container mx-auto py-4">
              <h2 className="text-2xl font-bold mb-2">
                Your Upcoming Lectures Details
              </h2>
              <hr className="mt-0 mb-4" />
              {!lectureDetails.length == 0 ? (
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Sr.No</th>
                      <th className="px-4 py-2">Teacher</th>
                      {/* <th className="px-4 py-2">Subject</th> */}
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Time Slot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lectureDetails.map((detail, index) => (
                      <tr
                        key={index}
                        className="bg-gray-100 dark:bg-slate-800 text-center hover:dark:bg-slate-950"
                      >
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{detail.name}</td>
                        {/* <td className="border px-4 py-2">{}</td> */}
                        <td className="border px-4 py-2">
                          {formatDate(detail.scheduleAt)}
                        </td>
                        <td className="border px-4 py-2">
                          {formatTime(detail.scheduleAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <h1 className="text-center text-xl">No Upcoming Lectures</h1>
              )}
            </div>
            {/* card container */}
            <div className="container mx-auto py-4">
              <div className="pagecontent">
                <h2 className="text-2xl font-bold mb-2">All teachers</h2>
                <hr className="mt-0 mb-4" />
                <div className="flex flex-wrap justify-center gap-4">
                  {teachers.map((teacher, index) => (
                    <div
                      className="rounded max-w-80 border shadow-lg p-4 flex flex-col gap-6 justify-between dark:text-white"
                      key={index}
                    >
                      <div>
                        <img
                          src="https://static.vecteezy.com/system/resources/previews/002/406/452/non_2x/female-teacher-teaching-a-lesson-at-the-school-free-vector.jpg"
                          className="w-full"
                          alt="..."
                        />
                        <div className="px-6 py-4 flex flex-col gap-4 ">
                          <h5 className="font-bold text-xl mb-2">
                            Name: {teacher.name}
                          </h5>
                          <p className="text-gray-700 text-base dark:text-gray-400">
                            Subject: {teacher.subject}
                          </p>
                          <p className="text-gray-700 text-base dark:text-gray-400">
                            Email: {teacher.email}
                          </p>
                          {/* Display scheduleAt for each appointment */}
                          {teacher.appointments.length > 0 ? (
                            teacher.appointments.map(
                              (appointment, appointmentIndex) => (
                                <div
                                  key={appointmentIndex}
                                  className="flex flex-col gap-4"
                                >
                                  <p className="text-gray-700 text-base dark:text-gray-400">
                                    Timing:{" "}
                                    {new Date(
                                      appointment.scheduleAt
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </p>
                                  <div className="">
                                    <button
                                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                      onClick={() =>
                                        handleBookAppointment(
                                          appointment._id,
                                          appointment.scheduleAt
                                        )
                                      }
                                    >
                                      Book Appointment
                                    </button>
                                  </div>
                                </div>
                              )
                            )
                          ) : (
                            <div className="d-flex">
                              <h2>No scheduled appointments</h2>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border w-full"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#messageModal"
                          onClick={() => {
                            setTeacherEmail(teacher.email);
                            setShowModal(true);
                          }}
                        >
                          Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Student;
