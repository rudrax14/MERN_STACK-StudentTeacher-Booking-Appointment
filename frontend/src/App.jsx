import './App.css'
// index.js or another appropriate file
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Studentsignup from './components/Form/Signup/Student'
import Studentlogin from './components/Form/Login/Student'
import Teachersignup from './components/Form/Signup/Teacher'
import Teacherlogin from './components/Form/Login/Teacher'
import Home from './components/LandingPage';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
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
