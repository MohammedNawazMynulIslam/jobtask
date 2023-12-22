// Task.js

const Task = ({ task }) => {
  console.log(task);
  return (
    <div>
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{task.title}</h2>
          <p>{task.description}.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-ghost">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
