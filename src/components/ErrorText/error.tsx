import styles from './error.module.css';

export default function ErrorText({ phrase }: any) {
  return (
    <div className={styles.error}>
      <h3>{phrase}</h3>
    </div>
  );
}
