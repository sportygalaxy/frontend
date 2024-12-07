import { cn } from "@/lib/utils";
import { Link2 } from "iconsax-react";
import { Play } from "lucide-react";
import React from "react";
import { useState, useRef, useEffect } from "react";

interface VideoPlayerProps {
  pauseTime: number;
  src: string;
  poster: string;
  watermark: string | JSX.Element;
  link: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  pauseTime,
  src,
  poster,
  watermark,
  link,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showLink, setShowLink] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Function to check if the src is a YouTube link
  const isYouTubeLink = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

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
    <>
      {/* Video Player */}
      {/* Conditionally render based on whether it's a YouTube link */}
      {isYouTubeLink(src) ? (
        <iframe
          className="w-full h-auto"
          src={src.replace("watch?v=", "embed/")} // Format the URL to be embeddable
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      ) : (
        <video
          ref={videoRef}
          className={cn("w-full h-fill-available", className)}
          src={src}
          poster={poster}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          controls={isPlaying} // Show controls when the video is playing
          // autoPlay
          // muted
          // loop
        />
      )}

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
        {typeof watermark === "string" ? watermark : watermark}
      </div>

      {/* Link when video pauses */}
      {showLink && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline text-pretty text-base bg-[#FFFFFF66] w-full flex items-center justify-center gap-2 p-6"
          >
            Watch the full video on YouTube <Link2 size={16} />
          </a>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
