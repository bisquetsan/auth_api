// AuthContext.js
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  Dispatch,
} from "react";
import { AuthActions, AuthState } from "../types/types";

const initialState: AuthState = {
  user: { username: "", email: "", id: undefined },
  token: "",
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthActions>;
}>({ state: initialState, dispatch: () => null });

const authReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return { user: { username: "", email: "", id: undefined }, token: "" };
    default:
      return state;
  }
};

type AuthProp = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProp) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

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
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
