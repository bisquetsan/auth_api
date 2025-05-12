import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTask } from "../context/TasksContext";

function Tasks() {
  const { token } = useAuth();
  const { getTasks, createTask, deleteTask } = useTask();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (token) {
      tasksList();
    }
  }, []);

  const tasksList = async () => {
    const tasksss = await getTasks();
    setTasks(tasksss);
  };

  return (
    <>
      <h1 className="font-bold text-2xl mt-4">Tasks</h1>
      <div className=" mt-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="place-items-center flex flex-col justify-center mb-4 rounded-md"
          >
            <p className="text-center font-bold p-2">Title: {task.title}</p>
            <p className="text-center font-bold p-2">
              Description: {task.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Tasks;
