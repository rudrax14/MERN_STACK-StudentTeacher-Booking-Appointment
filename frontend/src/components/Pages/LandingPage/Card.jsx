import React from 'react';

function Card() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-10 col-md-6 col-lg-4 my-3">
                    <div className="card">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/001/925/922/non_2x/investment-in-education-concept-free-vector.jpg"
                            className="card-img-top"
                            alt="Student"
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
                            src="https://static.vecteezy.com/system/resources/previews/011/277/699/non_2x/female-young-school-teacher-teaching-lesson-in-classroom-smiling-woman-standing-beside-blackboard-explaining-material-school-banner-education-knowledge-study-concept-cartoon-illustration-free-vector.jpg"
                            className="card-img-top"
                            alt="Teacher"
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
                            src="https://static.vecteezy.com/system/resources/previews/020/391/409/non_2x/team-management-icon-vector.jpg"
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
