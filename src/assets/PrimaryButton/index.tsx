import styles from "./index.module.css";

interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
}

export const PrimaryButton = ({ text, onClick }: PrimaryButtonProps) => {
  return (
    <button className={styles.primaryButton} onClick={onClick}>
      {text}
    </button>
  );
};
