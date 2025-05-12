// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";

function App() {
  return (
    <AuthProvider>
      <div className="bg-gray-900 h-dvh text-white text-center">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/task_details" element={<TaskDetails />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
