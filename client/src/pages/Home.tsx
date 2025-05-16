import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h1 className="font-bold text-2xl mt-4">Pagina principal</h1>
      {state?.user?.username && (
        <p className="m-2">Usuario actual: {state?.user?.username}</p>
      )}
      {state?.user?.username && (
        <div className="flex items-center justify-center flex-col border-1 rounded-md m-auto mt-4 w-[400px] pb-5 pt-5">
          <span className="font-bold mb-6">
            Bienvenido, {state?.user?.username}{" "}
          </span>
          <button
            onClick={handleLogout}
            className="text-2xl font-bold hover:text-blue-200 cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
