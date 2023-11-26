import React from 'react';
import student from '../../../assets/students.jpg'
import teacher from '../../../assets/teachers.jpg'
import admin from '../../../assets/admin.jpg'
function Card() {
    return (
        <div className="container"
        style={{ marginTop: "17%" }}>
            <div className="row">
                <div className="col-sm-10 col-md-6 col-lg-4 my-3">
                    <div className="card">
                        <img
                            src={student}
                            className="card-img-top"
                            alt="Student"
                            // style={{ width: '406px', height: '271px' }}
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title">Student</h5>
                            <a href="/student/login" className="btn btn-primary">
                                Let's Go
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-sm-10 col-md-6 col-lg-4 my-3">
                    <div className="card">
                        <img
                            src={teacher}
                            className="card-img-top"
                            alt="Teacher"
                            // style={{ width: '406px', height: '271px' }}
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title">Teacher</h5>
                            <a href="/teacher/login" className="btn btn-primary">
                                Let's Go
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-sm-10 col-md-6 col-lg-4 my-3">
                    <div className="card">
                        <img
                            src={admin}
                            className="card-img-top mt-5"
                            alt="Admin"
                            
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title">Admin</h5>
                            <a href="/admin/login" className="btn btn-primary">
                                Let's Go
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
