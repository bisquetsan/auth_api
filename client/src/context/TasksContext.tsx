import { createContext, ReactNode, useContext } from "react";
import { useAuth } from "./AuthContext";
import axios, { AxiosError } from "axios";
import { tasks, TasksContextType } from "../types/types";

const TasksContext = createContext<TasksContextType | undefined>(undefined);

type TasksProviderProps = {
  children: ReactNode;
};

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const { state } = useAuth();
  const getTasks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/tasks/", {
        headers: {
          Authorization: `Token ${state?.token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error obteniendo tareas:", error);
      return [];
    }
  };

  const createTask = async (taskData: tasks) => {
    // Validación simple
    if (!taskData.title || taskData.title.length > 50) {
      throw new Error(
        "El título es requerido y debe tener máximo 50 caracteres"
      );
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/tasks/", taskData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${state?.token}`,
        },
      });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "Error creando tarea:",
        axiosError.response?.data || axiosError.message
      );
      throw error;
    }
  };

  const deleteTask = async (id?: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/tasks/${id}/`, {
        headers: {
          Authorization: `Token ${state?.token}`,
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

export const useTask = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTask debe usarse dentro de un TasksProvider");
  }
  return context;
};
