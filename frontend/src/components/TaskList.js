import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onEdit, onDelete }) => (
  <div>
    {tasks.map((t) => (
      <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </div>
);

export default TaskList;
