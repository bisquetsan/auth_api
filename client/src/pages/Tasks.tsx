import axios from "axios";
import { useState, useEffect } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [released, setReleaseYear] = useState(0);
  const [important, setImportant] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/tasks/");
      const data = await response.json();
      setTasks(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="font-bold text-2xl mt-4">Tasks</h1>
      <div className=" mt-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="place-items-center flex flex-col justify-center bg-gray-800 mb-4 rounded-md"
          >
            <p className="text-center font-bold p-2">Title: {task.title}</p>
            <p className="text-center font-bold p-2">hi</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Tasks;
