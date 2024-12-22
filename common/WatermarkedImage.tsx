import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { useEffect, useRef } from "react";

interface WatermarkedImageProps {
  watermark: React.ReactNode | string; // Allow Element or string as watermark
  src: string;
  watermarkImageSrc: string;
}

const FILE_DOWNLOAD_NAME = "sporty-galaxy-product-image.png";

const WatermarkedImage: React.FC<WatermarkedImageProps> = ({
  watermark,
  src,
  watermarkImageSrc,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Function to draw the image with adjustable watermark size
  const drawImage = (watermarkSize: number) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = new window.Image();

      // Set crossOrigin to allow cross-origin image loading
      img.crossOrigin = "anonymous";
      img.src = src;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the base image
        if (ctx) {
          ctx.drawImage(img, 0, 0);

          if (typeof watermark === "string") {
            // Render text watermark
            ctx.font = "30px Arial";
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.fillText(watermark, 20, img.height - 30);
          } else if (canvas && watermark) {
            const watermarkImage = new window.Image();
            watermarkImage.crossOrigin = "anonymous";
            watermarkImage.src = watermarkImageSrc;

            watermarkImage.onload = () => {
              // Apply watermark
              ctx.filter = "blur(0.5px)";
              ctx.globalAlpha = 0.1;
              ctx.drawImage(
                watermarkImage,
                img.width - watermarkSize - 20,
                img.height - watermarkSize - 20,
                watermarkSize,
                watermarkSize
              );

              // Reset filter and opacity
              ctx.filter = "none";
              ctx.globalAlpha = 1.0;
            };
          }
        }
      };

      img.onerror = () => {
        console.error(
          "Failed to load image. Check CORS headers or source URL."
        );
      };
    }
  };

  // Initial draw with default watermark size
  useEffect(() => {
    drawImage(150); // Default watermark size
  }, [src, watermark, watermarkImageSrc]);

  // Function to download the image with a larger watermark size
  const downloadImage = () => {
    drawImage(450); // Larger watermark size for download
    setTimeout(() => {
      if (canvasRef.current) {
        const link = document.createElement("a");
        link.href = canvasRef.current.toDataURL("image/png");
        link.download = FILE_DOWNLOAD_NAME;
        link.click();
        drawImage(150); // Reset to default watermark size after download
      }
    }, 100); // Small delay to ensure canvas is updated
  };

  return (
    <div className="relative bg-[#E8EAEC]">
      <canvas ref={canvasRef} className="w-[97%] md:w-full h-auto"></canvas>
      {/* Top watermark */}
      {typeof watermark !== "string" && (
        <div className="absolute top-4 left-4 watermark">{watermark}</div>
      )}

      {/* Download Button */}
      <Button
        onClick={downloadImage}
        variant="default"
        className="absolute right-0 top-0 rounded-none bg-secondary hover:bg-black"
      >
        <DownloadIcon size="18px" />
      </Button>
    </div>
  );
};

export default WatermarkedImage;
