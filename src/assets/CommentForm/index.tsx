import { useState } from "react";
import styles from "./index.module.css";

interface CommentFormProps {
  onSave: (text: string) => void;
}

export const CommentForm = ({ onSave }: CommentFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSave(text);
      setText("");
    }
  };

  return (
    <div className={styles.commentForm}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleSubmit}>Add Comment</button>
    </div>
  );
};
