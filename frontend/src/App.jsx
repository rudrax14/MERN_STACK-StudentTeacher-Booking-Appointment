
// index.js or another appropriate file
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Studentsignup from "./components/Signup/Student";
import Studentlogin from "./components/Login/StudentForm";
import Teacherlogin from "./components/Login/TeacherForm";
import LandingPage from "./Pages/LandingPage";
import TeacherDashboard from "./Pages/Dashboard/Teacher";
import StudentDashboard from "./Pages/Dashboard/Student";
import AdminDashboard from "./Pages/Dashboard/Admin";
import AdminLogin from "./components/Login/AdminForm";
import Navbar from "./components/UI/Navbar";
import ApproveStudent from "./Pages/ApproveStudent";
import NotFound from "./Pages/NotFound";
import TodayDate from "./components/UI/TodayDate";
import Spinner from "./components/UI/Spinner";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <TodayDate />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student/login" element={<Studentlogin />} />
          <Route path="/student/signup" element={<Studentsignup />} />
          <Route path="/teacher/login" element={<Teacherlogin />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/notapproved" element={<ApproveStudent />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/spinner" element={<Spinner />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
