import React, { useState } from 'react';
import Navbar from '../../UI/Navbar';
import { BsChevronRight } from 'react-icons/bs';
import Alert from '../../Alert';

function Teacher() {
  const [cards, setCards] = useState([
    { id: 1, name: 'Student Name', subject: 'Subject Description', time: '2pm-5pm' },
    { id: 2, name: 'Another Student', subject: 'Another Subject', time: '7pm-8pm' },
  ]);

  const [appointments, setAppointments] = useState([]);

  const handleReject = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const handleApprove = (card) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    setAppointments(prevAppointments => [
      ...prevAppointments,
      // {
      //   id: card.id,
      //   name: card.name,
      //   subject: card.subject,
      //   date: 'Date',
      //   time: 'Time'
      // }
      {
        id: card.id,
        name: card.name,
        subject: card.subject,
        date: currentDate,
        time: currentTime
      }
    ]);

    // Remove the approved card
    setCards(cards.filter(c => c.id !== card.id));
  };

  return (
    <>
      <Navbar />
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
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="subjectName" className="form-label">Subject Name</label>
                  <input type="text" className="form-control" id="subjectName" />
                </div>
                <div className="mb-3 row">
                  <label>Time Slot</label>
                  <div className='mt-1'>
                    <button type="button" className="btn btn-outline-secondary ">2pm-4pm</button>
                    <button type="button" className="btn btn-outline-secondary ms-2">5pm-6pm</button>
                    <button type="button" className="btn btn-outline-secondary ms-2">7pm-8pm</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>
      {/* student message modal */}
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
              <div className="card m-3" key={card.id} style={{ width: '18rem' }}>
                <img src="https://static.vecteezy.com/system/resources/previews/001/942/923/large_2x/student-boy-with-school-suitcase-back-to-school-free-vector.jpg" className="card-img-top" alt="..." style={{ height: '256px' }} />
                <div className="card-body">
                  <h5 className="card-title">{card.name}</h5>
                  <p className="card-text">{card.subject}</p>
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
                    <button type="button" className="btn btn-primary position-relative" data-bs-toggle="modal"
                      data-bs-target="#messageModal">
                      Inbox
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        99+
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
