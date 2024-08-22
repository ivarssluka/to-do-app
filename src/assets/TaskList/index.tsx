import { Task } from "../../types";
import { TaskListItem } from "../TaskListItem";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export const TaskList = ({
  tasks,
  onDelete,
  onToggleComplete,
}: TaskListProps) => {
  return (
    <div className={styles.taskListContainer}>
      <div className={styles.header}>
        <h2>Task List</h2>
        <Link to="/add-task" className={styles.addTaskButton}>
          Add Task
        </Link>
      </div>
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};
