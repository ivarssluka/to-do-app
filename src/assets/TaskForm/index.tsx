import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { Task } from "../../types";
import { PrimaryButton } from "../PrimaryButton";
import { SecondaryButton } from "../SecondaryButton";
import styles from "./index.module.css";

interface TaskFormProps {
  onSave: (task: Task) => void;
  task?: Task;
}

export const TaskForm = ({ onSave, task }: TaskFormProps) => {
  const [title, setTitle] = useState(task?.title || "");
  const [content, setContent] = useState(task?.content || "");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title.trim()) {
      Modal.error({
        title: "Error",
        content: "Title is required.",
      });
      return;
    }

    if (!content.trim()) {
      Modal.error({
        title: "Error",
        content: "Content is required.",
      });
      return;
    }

    const newTask: Task = {
      id: task?.id || Date.now().toString(),
      title,
      content,
      completed: task?.completed || false,
      comments: task?.comments || [],
    };
    onSave(newTask);

    Modal.success({
      title: task ? "Task Updated Successfully" : "Task Added Successfully",
      onOk: () => {
        navigate("/");
      },
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.taskForm}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className={styles.input}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Task Content"
        className={styles.textarea}
      />
      <div className={styles.buttons}>
        <PrimaryButton text="Save Task" onClick={handleSubmit} />
        <SecondaryButton text="Cancel" onClick={handleCancel} />
      </div>
    </div>
  );
};
