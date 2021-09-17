import styles from './SkeletonElement.module.css';

const SkeletonElement = ({ type }) => {
  switch (type) {
    case 'title':
      return <div className={`${styles.Skeleton} ${styles.title}`} />;
    case 'button':
      return <div className={`${styles.Skeleton} ${styles.button}`} />;
    case 'text':
      return <div className={`${styles.Skeleton} ${styles.text}`} />;
    case 'poster':
      return <div className={`${styles.Skeleton} ${styles.poster}`} />;
    default:
      return;
  }
};

export default SkeletonElement;
