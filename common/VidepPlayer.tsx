import { Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const VideoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showLink, setShowLink] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pauseTime = 10; // Time in seconds after which the video pauses

  // Play the video and update state
  const handlePlayVideo = (): void => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Pause video at specified time and show link
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleTimeUpdate = () => {
        if (video.currentTime >= pauseTime && isPlaying) {
          video.pause();
          setIsPlaying(false);
          setShowLink(true); // Show the link after pausing
        }
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [isPlaying, pauseTime]);

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
      {!isPlaying && !showLink && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handlePlayVideo}
        >
          <button className="bg-white p-4 rounded-full" aria-label="Play Video">
            <Play />
          </button>
        </div>
      )}

      {/* Watermark */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-50 p-2 text-xs">
        Your Brand Watermark
      </div>

      {/* Link when video pauses */}
      {showLink && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <a
            href="https://www.youtube-nocookie.com/embed/FMrtSHAAPhM"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline"
          >
            Watch the full video on YouTube
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
