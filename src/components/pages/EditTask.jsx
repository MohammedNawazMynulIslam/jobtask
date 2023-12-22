// EditTaskForm.js

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditTask = () => {
  const { id } = useParams();
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "",
  });

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/tasklist/${id}`
        );
        setEditedTask(response.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9000/tasklist/${id}`,
        editedTask
      );
      if (response.status === 200) {
        alert("task updated");
      }
      console.log("Update response:", response);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h2 className="text-center mt-4">Edit Task</h2>

      {/* Your form fields here */}
      <form onSubmit={handleUpdateTask} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            defaultChecked
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
            defaultChecked
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
            defaultChecked
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
            defaultChecked
            onChange={handleInputChange}
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
        <button
          className="btn btn-primary text-white flex justify-center items-center"
          type="submit"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
