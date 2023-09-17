import React from 'react';
import Navbar from '../../UI/Navbar';
import { BsChevronRight } from "react-icons/bs";

function Student() {
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
          <div className="d-flex justify-content-around">
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
      {/* container */}
      <div className="container py-4">
        <h2>Your Upcoming Lectures Details</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
        <hr className='mt-0 mb-4' />
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Name</th>
              <th scope="col">Subject</th>
              <th scope="col">Date</th>
              <th scope="col">Join Time</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* teachers */}
      <div className="container py-4 ">
        <div className="teacher">
          <h2>All Teachers</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
          <hr className='mt-0 mb-4' />
          <div className="container col-6 mb-4">
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search For Teacher/Subject" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
          <div className="row justify-content-around row-cols-4 text-center gy-5">
            <div className="card" style={{ width: '18rem' }}>
              <img src="https://static.vecteezy.com/system/resources/previews/002/406/452/non_2x/female-teacher-teaching-a-lesson-at-the-school-free-vector.jpg" className="card-img-top" alt="..." style={{ height: '256px' }} />
              <div className="card-body">
                <h5 className="card-title">Teacher Name</h5>
                <p className="card-text">Subject Description</p>
                <div className='d-flex justify-content-around'>
                  <button className='bg-primary text-white rounded p-2 border-0'>Book Lectures</button>
                  <button className='bg-primary text-white rounded p-2 border-0'>Message</button>
                </div>
              </div>
            </div>
            <div className="card" style={{ width: '18rem' }}>
              <img src="https://static.vecteezy.com/system/resources/previews/002/406/452/non_2x/female-teacher-teaching-a-lesson-at-the-school-free-vector.jpg" className="card-img-top" alt="..." style={{ height: '256px' }} />
              <div className="card-body">
                <h5 className="card-title">Teacher Name</h5>
                <p className="card-text">Subject Description</p>
                <a href="/" className="btn btn-primary">Book Session</a>
              </div>
            </div>
            <div className="card" style={{ width: '18rem' }}>
              <img src="https://static.vecteezy.com/system/resources/previews/002/406/452/non_2x/female-teacher-teaching-a-lesson-at-the-school-free-vector.jpg" className="card-img-top" alt="..." style={{ height: '256px' }} />
              <div className="card-body">
                <h5 className="card-title">Teacher Name</h5>
                <p className="card-text">Subject Description</p>
                <a href="/" className="btn btn-primary">Book Session</a>
              </div>
            </div>
            <div className="card" style={{ width: '18rem' }}>
              <img src="https://static.vecteezy.com/system/resources/previews/002/406/452/non_2x/female-teacher-teaching-a-lesson-at-the-school-free-vector.jpg" className="card-img-top" alt="..." style={{ height: '256px' }} />
              <div className="card-body">
                <h5 className="card-title">Teacher Name</h5>
                <p className="card-text">Subject Description</p>
                <a href="/" className="btn btn-primary">Book Session</a>
              </div>
            </div>
            <div className="card" style={{ width: '18rem' }}>
              <img src="https://static.vecteezy.com/system/resources/previews/002/406/452/non_2x/female-teacher-teaching-a-lesson-at-the-school-free-vector.jpg" className="card-img-top" alt="..." style={{ height: '256px' }} />
              <div className="card-body">
                <h5 className="card-title">Teacher Name</h5>
                <p className="card-text">Subject Description</p>
                <a href="/" className="btn btn-primary">Book Session</a>
              </div>
            </div>
            <div className="card" style={{ width: '18rem' }}>
              <img src="https://static.vecteezy.com/system/resources/previews/002/406/452/non_2x/female-teacher-teaching-a-lesson-at-the-school-free-vector.jpg" className="card-img-top" alt="..." style={{ height: '256px' }} />
              <div className="card-body">
                <h5 className="card-title">Teacher Name</h5>
                <p className="card-text">Subject Description</p>
                <a href="/" className="btn btn-primary">Book Session</a>
              </div>
            </div>
            <div className="card" style={{ width: '18rem' }}>
              <img src="https://static.vecteezy.com/system/resources/previews/002/406/452/non_2x/female-teacher-teaching-a-lesson-at-the-school-free-vector.jpg" className="card-img-top" alt="..." style={{ height: '256px' }} />
              <div className="card-body">
                <h5 className="card-title">Teacher Name</h5>
                <p className="card-text">Subject Description</p>
                <a href="/" className="btn btn-primary">Book Session</a>
              </div>
            </div>
            <div className="card" style={{ width: '18rem' }}>
              <img src="https://static.vecteezy.com/system/resources/previews/002/406/452/non_2x/female-teacher-teaching-a-lesson-at-the-school-free-vector.jpg" className="card-img-top" alt="..." style={{ height: '256px' }} />
              <div className="card-body">
                <h5 className="card-title">Teacher Name</h5>
                <p className="card-text">Subject Description</p>
                <a href="/" className="btn btn-primary">Book Session</a>
              </div>
            </div>
          </div >
        </div>
      </div>
    </>
  );
}

export default Student;
