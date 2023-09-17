import './App.css'
// index.js or another appropriate file
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Studentsignup from './components/Form/Signup/Student'
import Studentlogin from './components/Form/Login/Student'
import Teachersignup from './components/Form/Signup/Teacher'
import Teacherlogin from './components/Form/Login/Teacher'
import LandingPage from './components/Pages/LandingPage/LandingPage';
import TeacherDashboard from './components/Pages/Dashboard/Teacher';
import StudentDashboard from './components/Pages/Dashboard/StudentDashboard/Home';
import AdminDashboard from './components/Pages/Dashboard/Admin';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student/login" element={<Studentlogin />} />
          <Route path="/student/signup" element={<Studentsignup />} />
          <Route path="/teacher/login" element={<Teacherlogin />} />
          <Route path="/teacher/signup" element={<Teachersignup />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
