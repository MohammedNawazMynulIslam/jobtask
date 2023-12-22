import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Task = ({ task }) => {
  const { _id, title, description, deadline, priority } = task;

  // eslint-disable-next-line no-unused-vars
  const { data: tasklists = [], refetch } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:9000/tasklist", {});
      return res.data;
    },
  });

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axios.delete(`http://localhost:9000/tasklist/${_id}`);
        console.log("Delete response:", res);
        if (res.status === 200) {
          await refetch(); // Correct way to call refetch
          Swal.fire("Deleted!", "Article has been deleted.", "success");
        } else {
          Swal.fire("Error", "Failed to delete article", "error");
        }
      }
    } catch (error) {
      console.error("Error deleting task:", error);

      toast.error("Error deleting task", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>{description}.</p>
          <p>{deadline}.</p>
          <p>{priority}.</p>
          <div className="card-actions justify-end">
            <Link to={`/editTask/${_id}`} className="btn btn-primary">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-ghost">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
