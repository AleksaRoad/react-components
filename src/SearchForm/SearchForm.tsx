import styles from './SearchForm.module.css';

export const SearchForm = () => {
  return (
    <>
      <input className={styles.input} type="text" />
      <button className={styles.button} type="submit">
        Search
      </button>
    </>
  );
};
