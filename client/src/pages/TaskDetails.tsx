import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTask } from "../context/TasksContext";
import { useEffect, useState } from "react";
import { tasks } from "../types/types";
import { FaCheck } from "react-icons/fa";

function TaskDetails() {
  const { id } = useParams();
  const { state } = useAuth();
  const { getTasks, deleteTask } = useTask();
  const [tasks, setTasks] = useState<tasks[]>([]);

  if (!id) {
    return (
      <div>
        <h1 className="font-bold text-2xl mt-4">Task Detail</h1>;
        <p>Task no encontrada</p>
      </div>
    );
  }
  const taskId = parseInt(id, 10);
  const task = tasks.find((t) => t.id === taskId);

  useEffect(() => {
    if (state?.token) {
      tasksList();
    }
  }, []);

  const tasksList = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };
  console.log(id);
  return (
    <>
      <h1 className="font-bold text-2xl mt-4">Task Detail</h1>
      <div className="place-items-center flex flex-col justify-center mt-4 rounded-md">
        <p className="text-center font-bold p-2">Title: {task?.title}</p>
        <p className="text-center font-bold p-2 w-[400px]">
          Description: {task?.description}
        </p>
        {task?.important ? (
          <span className="text-green-500 text-2xl font-bold">
            <FaCheck />
          </span>
        ) : (
          <span className="text-red-500 text-2xl font-bold">
            <FaCheck />
          </span>
        )}
      </div>
    </>
  );
}

export default TaskDetails;
