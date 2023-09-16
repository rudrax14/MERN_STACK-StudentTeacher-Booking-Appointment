import React from 'react';
import Navbar from '../../../UI/Navbar';

function Student() {
  return (
    <>
      <Navbar />
      <div className="header-container p-3 mb-4 bg-primary text-white ">
        <div className="container d-flex justify-content-center">
          <p className='fs-1'>Student Dashbord</p>
        </div>
      </div>
      {/* container */}
      <div className="container">
        <div className="pagecontent">
          <h2>Status</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
          <hr className='mt-0 mb-4' />
          <div className="d-flex justify-content-around">
            <div className="card bg-primary " style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title text-white">Card title</h5>
                <a href="/" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
            <div className="card bg-warning" style={{ width: '18rem', height: '10rem' }}>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <a href="/" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
            <div className="card bg-success" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <a href="/" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
            <div className="card bg-danger" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <a href="/" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div >
        </div >
      </div>
      {/* container */}
      <div className="container mt-3">
        <h2>Your Upcoming Lectures</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
        <hr className='mt-0 mb-4' />
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Student;
