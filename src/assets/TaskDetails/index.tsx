import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Task, Comment } from "../../types";
import { CommentSection } from "../CommentSection";
import { CommentForm } from "../CommentForm";
import { PrimaryButton } from "../PrimaryButton";
import { v4 as uuidv4 } from "uuid";
import styles from "./index.module.css";

interface TaskDetailsProps {
  tasks: Task[];
  onSave: (task: Task) => void;
}

export const TaskDetails = ({ tasks, onSave }: TaskDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const [currentTask, setCurrentTask] = useState<Task | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const task = tasks.find((task) => task.id === id);
    setCurrentTask(task);
  }, [id, tasks]);

  if (!currentTask) {
    return (
      <div className={styles.taskDetailsContainer}>
        <h2>Task not found</h2>
        <Link to="/">Go back to Task List</Link>
      </div>
    );
  }

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: uuidv4(),
      text,
    };

    const updatedTask: Task = {
      ...currentTask,
      comments: [...currentTask.comments, newComment],
    };

    setCurrentTask(updatedTask);
    onSave(updatedTask);
  };

  const handleEditComment = (commentId: string, newText: string) => {
    const updatedComments = currentTask!.comments.map((comment) =>
      comment.id === commentId ? { ...comment, text: newText } : comment
    );

    const updatedTask: Task = {
      ...currentTask!,
      comments: updatedComments,
    };

    setCurrentTask(updatedTask);
    onSave(updatedTask);
  };

  const handleDeleteComment = (commentId: string) => {
    const updatedComments = currentTask!.comments.filter(
      (comment) => comment.id !== commentId
    );

    const updatedTask: Task = {
      ...currentTask!,
      comments: updatedComments,
    };

    setCurrentTask(updatedTask);
    onSave(updatedTask);
  };

  return (
    <div className={styles.taskDetailsContainer}>
      <PrimaryButton text="Back to Task List" onClick={() => navigate("/")} />
      <h2>{currentTask.title}</h2>
      <p>{currentTask.content}</p>
      <CommentSection
        comments={currentTask.comments}
        onEdit={handleEditComment}
        onDelete={handleDeleteComment}
      />
      <CommentForm onSave={handleAddComment} />
    </div>
  );
};
