import { createContext, ReactNode, useContext } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const TasksContext = createContext();

type TasksProviderProps = {
  children: ReactNode;
};

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const { token } = useAuth();
  const getTasks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/tasks/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Error obteniendo tareas:", error);
      return [];
    }
  };

  const createTask = async (taskData) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/tasks/", taskData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error creando tarea:", error);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/tasks/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    } catch (error) {
      console.error("Error eliminando tarea:", error);
      throw error;
    }
  };

  return (
    <TasksContext.Provider value={{ getTasks, createTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTask = () => {
  return useContext(TasksContext);
};
