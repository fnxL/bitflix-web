/* eslint-disable react/button-has-type */
import styles from './Button.module.css';

function Button({ className, onClick, type, variant = 'dark', text, children }) {
  if (type === 'circular') {
    return (
      <button
        onClick={onClick}
        className={`${styles.circular} ${className} ${variant === 'white' && styles.cwhite} `}
      >
        {children}
        {text && <span className="font-bold">{text}</span>}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`${styles.default} ${variant === 'white' && styles.white} `}
    >
      {children}
      <span className="">{text}</span>
    </button>
  );
}

export default Button;
