import styles from "./index.module.css";

interface SecondaryButtonProps {
  text: string;
  onClick: () => void;
}

export const SecondaryButton = ({ text, onClick }: SecondaryButtonProps) => {
  return (
    <button className={styles.secondaryButton} onClick={onClick}>
      {text}
    </button>
  );
};
