// AuthContext.js
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return { user: null, token: null };
    default:
      return state;
  }
};

type AuthProp = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProp) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
  });

  // Verificar si hay datos de sesión al cargar
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      dispatch({
        type: "LOGIN",
        payload: { user: JSON.parse(user), token },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
