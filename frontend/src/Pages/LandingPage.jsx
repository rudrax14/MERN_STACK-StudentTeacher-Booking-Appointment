import React from "react";
import student from "../assets/students.jpg";
import teacher from "../assets/teachers.jpg";
import admin from "../assets/admin.jpg";
import HomeCard from "../components/Cards/HomeCard";

function Home() {
  return (
    <>
      <div className="container d-flex">
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
