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
  const handleBookAppointment = async (appointmentId) => {
    // console.log(appointmentId);
    try {
      setSpinner(true);
      const jwtToken = localStorage.getItem("Student jwtToken");
      // console.log(jwtToken);
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/v1/student/appointment/${appointmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setSpinner(false);
      toast.success("Appointment booked successfully");
      fetchTable();
      // console.log("Appointment booked successfully:", response.data);
    } catch (error) {
      setSpinner(false);
      console.error("Error booking appointment:", error);
      toast.error("Already booked appointment");
    }
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
          {/* <div className="fixed z-10 inset-0 overflow-y-auto" id="messageModal">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h5 className="text-lg leading-6 font-medium text-gray-900">Message Modal</h5>
                  <form action="" onSubmit={submitHandler}>
                    <div className="mt-2">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="message"
                        value={formData.message}
                        onChange={changeHandler}
                        placeholder="Your Message Goes Here"
                      />
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <input
                        type="submit"
                        value="Send Message"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        data-bs-dismiss="modal"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div> */}


          {/* header */}
          <Header name="Student Dashboard" style='bg-blue-500' />
          <div className="px-4">
            {/* info table */}
            <div className="container mx-auto py-4">
              <h2 className="text-2xl font-bold mb-2">
                Your Upcoming Lectures Details
              </h2>
              <hr className="mt-0 mb-4" />
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Sr.No</th>
                    <th className="px-4 py-2">Teacher</th>
                    <th className="px-4 py-2">Subject</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Time Slot</th>
                  </tr>
                </thead>
                <tbody>
                  {lectureDetails.map((detail, index) => (
                    <tr key={index} className="bg-gray-100 text-center">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{detail.name}</td>
                      <td className="border px-4 py-2">{detail.subject}</td>
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
            </div>
            {/* card container */}
            <div className="container mx-auto py-4">
              <div className="pagecontent">
                <h2 className="text-2xl font-bold mb-2">All teachers</h2>
                <hr className="mt-0 mb-4" />
                <div className="flex flex-wrap justify-center gap-4">
                  {teachers.map((teacher, index) => (
                    <div
                      className="rounded max-w-80 border shadow-lg p-4 flex flex-col gap-6 justify-between"
                      key={index}
                    >
                      <div>

                        <img
                          src="https://static.vecteezy.com/system/resources/previews/002/406/452/non_2x/female-teacher-teaching-a-lesson-at-the-school-free-vector.jpg"
                          className="w-full"
                          alt="..."
                        />
                        <div className="px-6 py-4 flex flex-col gap-4">
                          <h5 className="font-bold text-xl mb-2">
                            Name: {teacher.name}
                          </h5>
                          <p className="text-gray-700 text-base">
                            Subject: {teacher.subject}
                          </p>
                          <p className="text-gray-700 text-base">
                            Email: {teacher.email}
                          </p>
                          {/* Display scheduleAt for each appointment */}
                          {teacher.appointments.length > 0 ? (
                            teacher.appointments.map(
                              (appointment, appointmentIndex) => (
                                <div key={appointmentIndex} className="flex flex-col gap-4">
                                  <p className="text-gray-700 text-base">
                                    Timing:{" "}
                                    {new Date(
                                      appointment.scheduleAt
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </p>
                                  <div className="" >
                                    <button
                                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                      onClick={() =>
                                        handleBookAppointment(appointment._id)
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
                          onClick={() => setTeacherEmail(teacher.email)}
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
