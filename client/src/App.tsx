// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import { TasksProvider } from "./context/TasksContext";
import PrivateRoutes from "./pages/PrivateRoutes";
import PublicRoutes from "./pages/PublicRoutes";

function App() {
  return (
    //Router
    <Router>
      <AuthProvider>
        <TasksProvider>
          <div className="bg-gray-900 h-full min-h-dvh text-white text-center">
            <Navbar />
            <Routes>
              <Route element={<PublicRoutes />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/" element={<Home />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/task_details/:id" element={<TaskDetails />} />
                <Route path="/task_details" element={<TaskDetails />} />
              </Route>
            </Routes>
          </div>
        </TasksProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
