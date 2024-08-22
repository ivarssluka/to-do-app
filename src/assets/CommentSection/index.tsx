import { useState } from "react";
import { Comment } from "../../types";
import { Modal, Input } from "antd";
import styles from "./index.module.css";

interface CommentSectionProps {
  comments: Comment[];
  onEdit: (commentId: string, newText: string) => void;
  onDelete: (commentId: string) => void;
}

export const CommentSection = ({
  comments,
  onEdit,
  onDelete,
}: CommentSectionProps) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const handleEdit = (commentId: string) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment) {
      setEditingCommentId(commentId);
      setEditingText(comment.text);
    }
  };

  const handleSaveEdit = () => {
    if (editingCommentId) {
      onEdit(editingCommentId, editingText);
      setEditingCommentId(null);
      setEditingText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const handleDelete = (commentId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this comment?",
      onOk: () => onDelete(commentId),
      okText: "Yes",
      cancelText: "No",
    });
  };

  return (
    <div className={styles.commentSection}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          {editingCommentId === comment.id ? (
            <div className={styles.editingComment}>
              <Input.TextArea
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                autoFocus
              />
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <>
              <p>{comment.text}</p>
              <div className={styles.commentActions}>
                <button onClick={() => handleEdit(comment.id)}>Edit</button>
                <button onClick={() => handleDelete(comment.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
