import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import './App.css';
import Student from './components/student/Student.jsx';
import NavBar from "./components/common/NavBar.jsx";
import Home from "./Home.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddStudent from "./components/student/AddStudent.jsx";
import EditStudent from "./components/student/EditStudent.jsx";
import ViewStudent from "./components/student/ViewStudent.jsx";

function App() {
  return (
    <main className="App">
        <Router>
          <NavBar />
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/view-students" element={<Student/>}></Route>
                <Route path="/add-student" element={<AddStudent/>}></Route>
                <Route path="/edit-student/:id" element={<EditStudent/>}></Route>
                <Route path="/student-profile/:id" element={<ViewStudent/>}></Route>
            </Routes>
          </Router>
    </main>
  );
}

export default App;
