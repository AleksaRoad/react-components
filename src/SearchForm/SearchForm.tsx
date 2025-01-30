import styles from './SearchForm.module.css';

export const SearchForm = () => {
  return (
    <>
      <input className={styles.input} type="search" />
      <button className={styles.button} type="submit">
        Search
      </button>
    </>
  );
};
