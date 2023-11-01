import React, { useState, useEffect } from 'react';
// import Navbar from '../../UI/Navbar';
import { BsChevronRight } from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
import Alert from '../../Alert';
import axios from 'axios';
// import StudentData from '../../../../data.json';
function Teacher() {
  const navigate = useNavigate();
  // const [cards, setCards] = useState(StudentData.studentBookings)
  const [cards, setCards] = useState([])
  const [appointments, setAppointments] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [highlightedTimeSlot, setHighlightedTimeSlot] = useState('');
  const [studentEmail, setStudentEmail] = useState('rudra@gmail.com')
  // const handleReject = (cardId) => {
  //   setCards(cards.filter(card => card.id !== cardId));
  // };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem('Teachers jwtToken');
        if (jwtToken == null) {
          navigate("/teacher/login");
        } else {
          const response = await axios.get('http://localhost:5000/api/v1/teachers?admissionStatus=true', {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            }
          });
          setCards(response.data.students);
          // Fetch message counts for all cards
          const counts = {};
          for (const card of response.data.students) {
            const emailToFilter = card.email;
            const response = await axios.get('http://localhost:5000/api/v1/messages', {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
              params: {
                email: emailToFilter,
              },
            });
            if (response.status === 200) {
              const data = response.data;
              counts[card.email] = data.messages.length;
            }
          }
          setMessageCounts(counts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);





  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setHighlightedTimeSlot(timeSlot); // Highlight the selected time slot
  };

  const handleReject = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const handleApprove = (card) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    setAppointments(prevAppointments => [
      ...prevAppointments,
      {
        _id: card._id,
        name: card.name,
        subject: card.subject,
        date: currentDate,
        time: currentTime
      }
    ]);

    // Remove the approved card
    setCards(cards.filter(c => c._id !== card._id));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Time Slot = ', selectedTimeSlot);
    // try {
    //   const response = await axios.post('http://localhost:5000/api/v1/teachers/scheduleappointment', {
    //     teacherId: 'YOUR_TEACHER_ID',
    //     timeSlot: selectedTimeSlot
    //   });

    //   // Handle the response from the server if needed
    //   console.log('Appointment scheduled successfully:', response.data);
    // } catch (error) {
    //   // Handle any errors that occur during the request
    //   console.error('Error scheduling appointment:', error);
    // }
  };


  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messageCounts, setMessageCounts] = useState({});


  // useEffect(() => {
  //   fetchMessages();
  // }, []);

  const fetchMessages = async (email) => {
    try {
      const jwtToken = localStorage.getItem('Teachers jwtToken');
      const emailToFilter = email;

      const response = await axios.get('http://localhost:5000/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          email: emailToFilter,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setMessages(data.messages);
        // Update the message count for the specific card
        setMessageCounts((prevCounts) => ({
          ...prevCounts,
          [email]: data.messages.length,
        }));
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };













  return (
    <>
      {/* header */}
      <div className="header-container shadow p-3 mb-5 bg-success text-white ">
        <div className="container d-flex justify-content-center">
          <p className='fs-1'>Teacher Dashboard</p>
        </div>
      </div>

      {/* teacher slot modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Lectures</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3 row">
                  <label>Time Slot</label>
                  <div className='mt-1'>
                    <button type="button" className={`btn  ${highlightedTimeSlot === '2pm-4pm' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => handleTimeSlotSelect('2pm-4pm')}>2pm-4pm</button>
                    <button type="button" className={`btn ms-2 ${highlightedTimeSlot === '5pm-6pm' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => handleTimeSlotSelect('5pm-6pm')}>5pm-6pm</button>
                    <button type="button" className={`btn ms-2 ${highlightedTimeSlot === '7pm-8pm' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => handleTimeSlotSelect('7pm-8pm')}>7pm-8pm</button>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <input type="submit" value="Add" className="btn btn-primary" data-bs-dismiss="modal" />
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

                  <p className="border border-light-subtle">{message.messageText}</p>

                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
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
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
          <hr className='mt-0 mb-4' />
          <div className="row justify-content-around row-cols-4 text-center gy-5">
            <div className="card bg-primary text-white h-100" style={{ width: '18rem' }}>
              <div className="card-body ">
                <p className='fw-semibold fs-5'>Schedule Appointment</p>
                <p className='fw-normal fs-6'>3</p>
              </div>
              <div className="card-footer d-flex" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add Appoinment
                <span className='ms-auto ' >
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
                <p className='fw-semibold fs-5'>All Messages</p>
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
      {/* table info container */}

      <div className="container py-4">
        <h2>Your All Upcoming Appointment Details</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
        <hr className='mt-0 mb-4' />
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
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
          <hr className='mt-0 mb-4' />
          <div className="d-flex flex-wrap justify-content-center">
            {cards.map(card => (
              <div className="card m-3" key={card._id} style={{ width: '18rem' }}>
                <img src="https://static.vecteezy.com/system/resources/previews/001/942/923/large_2x/student-boy-with-school-suitcase-back-to-school-free-vector.jpg" className="card-img-top" alt="..." style={{ height: '256px' }} />
                <div className="card-body">
                  <h5 className="card-title">{card.name}</h5>
                  <p className="card-text">{card.subject}</p>
                  <p className="card-text">{card.email}</p>
                  <p className="card-text">Time Slot - {card.time}</p>
                  <div className='d-flex justify-content-around'>
                    <button
                      className='bg-success text-white rounded p-2 border-0'
                      onClick={() => {
                        handleApprove(card);
                        Alert('Added', 'success');
                      }}
                    >
                      Approve
                    </button>
                    <button className='bg-danger text-white rounded p-2 border-0' onClick={() => { handleReject(card.id); Alert('Removed', 'warning'); }}>Reject</button>
                    <button
                      type="button"
                      className="btn btn-primary position-relative"
                      data-bs-toggle="modal"
                      data-bs-target="#messageModal"
                      onClick={() => {
                        setStudentEmail(card.email);
                        setMessages([]); // Clear existing messages
                        fetchMessages(card.email);
                      }}
                    >
                      Inbox
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {messageCounts[card.email] || 0} {/* Display the message count for this card */}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </button>
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

export default Teacher;
