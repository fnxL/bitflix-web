function Loader() {
  return (
    <>
      <span className="Loader" />
      <style jsx>{`
        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .Loader {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: inline-block;
          position: relative;
          background: linear-gradient(0deg, rgba(229, 9, 20, 0.2) 33%, #e50914);
          animation: rotation 1s linear infinite;
        }

        .Loader::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #333;
        }
      `}</style>
    </>
  );
}

export default Loader;
