import styles from './SkeletonElement.module.css';

const SkeletonElement = ({ type, style }) => {
  switch (type) {
    case 'title':
      return <div style={style} className={`${styles.Skeleton} ${styles.title}`} />;
    case 'button':
      return <div style={style} className={`${styles.Skeleton} ${styles.button}`} />;
    case 'text':
      return <div style={style} className={`${styles.Skeleton} ${styles.text}`} />;
    case 'poster':
      return <div style={style} className={`${styles.Skeleton} ${styles.poster} `} />;
    default:
      break;
  }
};

export default SkeletonElement;
