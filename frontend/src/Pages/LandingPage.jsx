import '../styles/landingPage.css';
import React from "react";
import student from "../../public/assets/students.jpg";
import teacher from "../../public/assets/teachers.jpg";
import admin from "../../public/assets/admin.jpg";
import HomeCard from "../components/Cards/HomeCard";


function Home() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center container landing" style={{ height: '100vh' }}>
        <div className="row">
          <HomeCard img={student} name="student" />
          <HomeCard img={teacher} name="teacher" />
          <HomeCard img={admin} name="admin" />
        </div>
      </div>
    </>
  );
}

export default Home;
