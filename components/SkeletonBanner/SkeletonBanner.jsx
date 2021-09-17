import SkeletonElement from '../SkeletonElement/SkeletonElement';
import styles from './SkeletonBanner.module.css';

function SkeletonBanner() {
  return (
    <div className={styles.Skeleton_Banner}>
      <SkeletonElement type='title' />
      <div className={styles.Skeleton_inline}>
        <SkeletonElement type='button' />
        <SkeletonElement type='button' />
      </div>
      <SkeletonElement type='text' />
      <SkeletonElement type='text' />
      <SkeletonElement type='text' />
    </div>
  );
}

export default SkeletonBanner;
