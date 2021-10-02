function FullScreen() {
  return (
    <div
      className="h-[25px] w-[25px] md:h-[35px] md:w-[35px] lg:h-[44px] lg:w-[44px] flex items-center justify-center"
      role="presentation"
    >
      <svg viewBox="0 0 24 24" data-uia="control-fullscreen-enter" className="w-full h-full">
        <g id="fullscreen-on">
          <path
            fill="currentColor"
            d="M4,6 L4,10 L2,10 L2,4 L8,4 L8,6 L4,6 Z M4,18 L8,18 L8,20 L2,20 L2,14 L4,14 L4,18 Z M6,8 L18,8 L18,16 L6,16 L6,8 Z M20,6 L16,6 L16,4 L22,4 L22,10 L20,10 L20,6 Z M20,18 L20,14 L22,14 L22,20 L16,20 L16,18 L20,18 Z"
          />
        </g>
      </svg>
    </div>
  );
}

export default FullScreen;
