import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "../Task";

const TASK_STATUS = {
  TODO: "todo",
  ONGOING: "ongoing",
  COMPLETED: "completed",
};

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

      // Show a success pop-up
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Task added successfully",
      });
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

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceStatus = result.source.droppableId;
    const destinationStatus = result.destination.droppableId;

    if (sourceStatus === destinationStatus) return;

    const taskId = result.draggableId;

    try {
      // Update the task status in the backend
      await axios.put(`http://localhost:9000/tasklist/${taskId}`, {
        status: destinationStatus,
      });

      // Update the task status in the frontend
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: destinationStatus } : task
        )
      );

      // Show a success pop-up
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Task moved to ${destinationStatus}`,
      });
    } catch (error) {
      console.error("Error moving task:", error);

      // Show an error pop-up
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error moving task",
      });
    }
  };

  return (
    <>
      <div className="">
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
        <h2 className="text-xl font-medium mt-4">Task Management</h2>
        <form>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <label>
            Deadline:
            <input
              type="date"
              name="deadline"
              value={newTask.deadline}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Priority:
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </label>
          <button type="button" onClick={handleAddTask}>
            Add Task
          </button>
        </form>

        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Droppable droppableId={TASK_STATUS.TODO}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-list"
                >
                  <h3 className="text-lg font-medium mt-4">Todo list</h3>
                  {tasks
                    .filter((task) => task.status === TASK_STATUS.TODO)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Task task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId={TASK_STATUS.ONGOING}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-list"
                >
                  <h3 className="text-lg font-medium mt-4">Ongoing</h3>
                  {tasks
                    .filter((task) => task.status === TASK_STATUS.ONGOING)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Task task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId={TASK_STATUS.COMPLETED}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-list"
                >
                  <h3 className="text-lg font-medium mt-4">Completed</h3>
                  {tasks
                    .filter((task) => task.status === TASK_STATUS.COMPLETED)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Task task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </>
  );
};
