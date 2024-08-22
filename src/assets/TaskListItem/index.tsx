import { Task } from "../../types";
import { Link } from "react-router-dom";
import { Modal, Checkbox } from "antd";
import { PrimaryButton } from "../PrimaryButton";
import { SecondaryButton } from "../SecondaryButton";
import styles from "./index.module.css";

interface TaskListItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export const TaskListItem = ({
  task,
  onDelete,
  onToggleComplete,
}: TaskListItemProps) => {
  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this task?",
      onOk: () => onDelete(task.id),
      okText: "Yes",
      cancelText: "No",
    });
  };

  return (
    <div className={styles.taskCard}>
      <Checkbox
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      >
        <h3 className={task.completed ? styles.completedTask : ""}>
          {task.title}
        </h3>
      </Checkbox>
      <p>{task.content}</p>
      <div className={styles.buttons}>
        <Link to={`/tasks/${task.id}`}>
          <SecondaryButton text="View Details" onClick={() => {}} />
        </Link>
        <Link to={`/edit-task/${task.id}`}>
          <PrimaryButton text="Edit" onClick={() => {}} />
        </Link>
        <PrimaryButton text="Delete" onClick={handleDelete} />
      </div>
    </div>
  );
};
