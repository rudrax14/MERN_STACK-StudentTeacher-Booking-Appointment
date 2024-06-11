import React from "react";
import student from "../../public/assets/students.jpg";
import teacher from "../../public/assets/teachers.jpg";
import admin from "../../public/assets/admin.jpg";
import HomeCard from "../components/Cards/HomeCard";

function Home() {
  return (
    <>
      <div className="flex items-center min-h-screen justify-center">
        <div className="flex">
          <HomeCard img={student} name="student" />
          <HomeCard img={teacher} name="teacher" />
          <HomeCard img={admin} name="admin" />
        </div>
      </div>
    </>
  );
}

export default Home;
