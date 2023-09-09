import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Studentsignup from './components/Signup/Student'
import Studentlogin from './components/Login/Student'
import Teachersignup from './components/Signup/Teacher'
import Teacherlogin from './components/Login/Teacher'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
          <Route path="/student/login" element={<Studentlogin />} />
          <Route path="/student/signup" element={<Studentsignup />} />
          <Route path="/teacher/login" element={<Teacherlogin />} />
          <Route path="/teacher/signup" element={<Teachersignup />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
