import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Task from "./Task";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "low",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:9000/tasklist");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/tasklist",
        newTask
      );

      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTask({
        title: "",
        description: "",
        deadline: "",
        priority: "low",
      });

      // Introduce a small delay
      setTimeout(() => {
        // Show a success pop-up
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Task added successfully",
        });
      }, 100); // Adjust the delay as needed
    } catch (error) {
      console.error("Error adding task:", error);

      // Show an error pop-up
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error adding task",
      });
    }
  };

  return (
    <>
      <div>
        {user && (
          <div className="flex">
            <div>
              <h1 className="text-center my-6 font-medium text-2xl">
                Welcome, {user.displayName}
              </h1>
              <img className="rounded-full" src={user.photoURL} alt="Profile" />
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="hero bg-base-200">
          <div className="hero-content flex-col">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Task Management</h1>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    className="input input-bordered"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Deadline</span>
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={newTask.deadline}
                    onChange={handleInputChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Priority</span>
                  </label>
                  <select
                    className="input input-bordered"
                    name="priority"
                    value={newTask.priority}
                    onChange={handleInputChange}
                  >
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="form-control mt-6">
                  <button
                    onClick={handleAddTask}
                    className="btn btn-primary text-white"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h2>TODO LIST</h2>
            <div className="grid gap-3">
              {tasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </div>
          </div>
          <div>
            <h2>Pending</h2>
            {/* Content for Pending */}
          </div>
          <div>
            <h2>Completed</h2>
            {/* Content for Completed */}
          </div>
        </div>
      </div>
    </>
  );
};
