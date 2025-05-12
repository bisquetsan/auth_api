import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const linkstyle = "text-1xl font-bold hover:text-blue-200 ml-6";
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex justify-between flex-row bg-gray-600 p-4">
      <div>
        <NavLink className="" to="/">
          LOGO
        </NavLink>
      </div>
      <ul className="flex justify-around flex-row">
        <li>
          <NavLink className={linkstyle} to="/">
            Home
          </NavLink>
        </li>

        {!user && (
          <>
            <li>
              <NavLink className={linkstyle} to="/register">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink className={linkstyle} to="/login">
                Login
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <NavLink className={linkstyle} to="/tasks">
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink className={linkstyle} to="/task_details">
                Tasks Details
              </NavLink>
            </li>
            <button onClick={handleLogout} className={linkstyle}>
              Logout
            </button>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
