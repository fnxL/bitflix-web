function VideoPlayer() {
  return (
    <div className="video_container absolute h-full w-full left-0 overflow-hidden p-0 m-0 top-0">
      <div className="video relative w-full h-full overflow-hidden">
        <video src="/video.mp4" />
      </div>
    </div>
  );
}

export default VideoPlayer;
