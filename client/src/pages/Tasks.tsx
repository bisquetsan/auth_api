import { useState, useEffect, ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { useTask } from "../context/TasksContext";
import { NavLink } from "react-router-dom";

type tasks = {
  title: string;
  id?: number;
  description?: ReactNode;
  datecompleted?: Date;
  important?: boolean;
};

function Tasks() {
  const { token } = useAuth();
  const { getTasks, createTask, deleteTask } = useTask();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);

  useEffect(() => {
    if (token) {
      tasksList();
    }
  }, []);

  const tasksList = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const addTask = async (e) => {
    e.preventDefault();
    const taskData = {
      title: title,
      description: description,
      important: important,
    };

    try {
      const newTask = await createTask(taskData);
      // Limpiar el formulario después de crear
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const eliminateTask = async (pk) => {
    try {
      await deleteTask(pk);
      setTasks((prev) => prev.filter((task) => task.id !== pk));
    } catch (error) {
      console.error("Fallo al eliminar:", error);
    }
  };

  return (
    <>
      <h1 className="font-bold text-2xl mt-4">Tasks</h1>
      <div className=" mt-4">
        <div className="flex flex-col w-[400px] m-auto">
          <input
            type="text"
            placeholder="Title..."
            name="title"
            className="bg-white pl-1 text-black mb-3 rounded-sm"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
          <textarea
            placeholder="Description..."
            name="description"
            className="bg-white pl-1 text-black mb-3 rounded-sm"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <div className="flex">
            <input
              type="checkbox"
              name="important"
              onChange={(e) => {
                setImportant(e.target.checked);
              }}
            />
            <p className="ml-3">Check if important</p>

            <button
              className="ml-auto cursor-pointer pr-4 pl-4 rounded-md bg-gray-600 hover:bg-gray-500"
              onClick={addTask}
            >
              Submit
            </button>
          </div>
        </div>
        {tasks.map((task: tasks) => (
          <>
            <NavLink
              to={`/task_details/${task.id}`}
              key={task.id}
              className="place-items-center flex flex-col justify-center mt-4 rounded-md"
            >
              <p className="text-center font-bold p-2">Title: {task.title}</p>
              <p className="text-center font-bold p-2">
                Description: {task.description}
              </p>
              {task.important ? (
                <span className="text-green-500">Important</span>
              ) : (
                <span className="text-red-500">Not Important</span>
              )}
            </NavLink>
            <button
              className="ml-auto cursor-pointer pr-4 pl-4 rounded-md bg-red-600 hover:bg-red-500"
              onClick={async () => {
                eliminateTask(task.id);
              }}
            >
              Delete
            </button>
          </>
        ))}
      </div>
    </>
  );
}

export default Tasks;
