import { Play } from "lucide-react";
import { useState, useRef } from "react";

const VideoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Play the video and update state
  const handlePlayVideo = (): void => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Pause the video and update state
  const handlePauseVideo = (): void => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Video Player */}
      <video
        ref={videoRef}
        className="w-full h-auto"
        src="/videos/prod-1.mp4" // Update with your video path
        poster="/images/product/prod-1.png" // Update with your video poster path
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        controls={isPlaying} // Show controls when the video is playing
      />

      {/* Overlay (shown when the video is not playing) */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handlePlayVideo}
        >
          <button className="bg-white p-4 rounded-full" aria-label="Play Video">
            <Play />
          </button>
        </div>
      )}

      {/* Customizable Control Button */}
      {isPlaying && (
        <button
          className="absolute top-4 right-4 bg-white p-2 rounded-full"
          onClick={handlePauseVideo}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 5.25v13.5m10.5-13.5v13.5"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
