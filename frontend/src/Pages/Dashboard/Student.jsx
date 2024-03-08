import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

  const fetchTable = async () => {
    try {
      const jwtToken = localStorage.getItem("Student jwtToken");

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/student/appointment/getRegisteredAppointments`,
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
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/student/appointment/${appointmentId}`, {},
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
          <div className="modal fade" id="messageModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Message Modal</h5>
                </div>
                <form action="" onSubmit={submitHandler}>
                  <div className="modal-body">
                    <input
                      className="form-control"
                      type="text"
                      name="message"
                      value={formData.message}
                      onChange={changeHandler}
                      placeholder="Your Message Goes Here"
                    />
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
                      value="Send Message"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* header */}
          <Header name='Student Dashboard' style='primary' />
          {/* info table */}
          <div className="container py-4">
            <h2>Your Upcoming Lectures Details</h2>
            <hr className="mt-0 mb-4" />
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Sr.No</th>
                  <th scope="col">Teacher</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time Slot</th>
                  {/* <th scope="col">Booking Time</th> */}
                </tr>
              </thead>
              <tbody>
                {lectureDetails.map((detail, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{detail.name}</td>
                    <td>{detail.subject}</td>
                    <td>{formatDate(detail.scheduleAt)}</td>
                    <td>{formatTime(detail.scheduleAt)}</td>
                    {/* <td>{detail.time}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* card container */}
          <div className="container py-4">
            <div className="pagecontent">
              <h2>All teachers</h2>
              <hr className="mt-0 mb-4" />
              <div
                className="d-flex flex-wrap justify-content-center"
                style={{ gap: "1rem" }}
              >
                {teachers.map((teacher, index) => (
                  <div className="card" style={{ width: "18rem" }} key={index}>
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/002/406/452/non_2x/female-teacher-teaching-a-lesson-at-the-school-free-vector.jpg"
                      className="card-img-top"
                      alt="..."
                      style={{ height: "256px" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title mb-3">Name: {teacher.name}</h5>
                      <p className="card-text">Subject: {teacher.subject}</p>
                      <p className="card-text">Email: {teacher.email}</p>
                      {/* Display scheduleAt for each appointment */}
                      {teacher.appointments.length > 0 ? (
                        teacher.appointments.map(
                          (appointment, appointmentIndex) => (
                            <div key={appointmentIndex}>
                              <p>
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
                                  className="bg-primary text-white rounded p-2 border-0"
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
                    <button
                      className="bg-primary text-white rounded p-2 border-0"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#messageModal"
                      onClick={() => setTeacherEmail(teacher.email)}
                    >
                      Message
                    </button>
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

export default Student;
