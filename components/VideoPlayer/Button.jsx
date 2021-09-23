import { forwardRef } from 'react';

const Button = forwardRef((props, ref) => {
  const { icon, onClick, ...otherProps } = props;
  return (
    <div {...otherProps} ref={ref} className="h-[52px] w-[52px] relative">
      <button onClick={onClick} className="bg-transparent border-none text-white m-0 p-0 relative ">
        {icon}
      </button>
      <style jsx>{`
        button {
          transition: transform 150ms ease 0s;
          border-radius: 2px;
        }

        button:hover {
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
});

Button.displayName = 'VideoControlsButton';

export default Button;
