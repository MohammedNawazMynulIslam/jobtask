// Task.js

const Task = ({ task }) => {
  return (
    <div
      style={{ border: "1px solid #ddd", padding: "8px", marginBottom: "8px" }}
    >
      <strong>{task.title}</strong> - {task.description} - {task.deadline} -{" "}
      {task.priority}
    </div>
  );
};

export default Task;
