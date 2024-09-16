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

  // Function to download the watermarked image
  const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.href = canvasRef.current.toDataURL("image/png");
      link.download = FILE_DOWNLOAD_NAME; // The file name for the download
      link.click();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = new window.Image();

      img.src = src; // Path to the original image

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }

        // Add watermark
        if (ctx) {
          if (typeof watermark === "string") {
            // Render string watermark
            ctx.font = "30px Arial";
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.fillText(watermark, 20, img.height - 30); // Position the text watermark
          } else if (canvas && watermark) {
            // Convert React element (like an icon or image) to an image and draw it on the canvas
            const watermarkImage = new window.Image();
            watermarkImage.src = watermarkImageSrc; // Update with the correct path

            watermarkImage.onload = () => {
              const watermarkWidth = 150; // Desired width for the watermark
              const watermarkHeight = 150; // Desired height for the watermark

              // Apply blur effect, increase size, and add opacity
              ctx.filter = "blur(0.5px)"; // Apply 3px blur to the watermark
              ctx.globalAlpha = 0.1; // Set opacity to 50%
              ctx.drawImage(
                watermarkImage,
                img.width - watermarkWidth - 20, // Position on the canvas
                img.height - watermarkHeight - 20,
                watermarkWidth,
                watermarkHeight
              );

              // Reset the filter and opacity for any further drawings
              ctx.filter = "none";
              ctx.globalAlpha = 1.0;
            };
          }
        }
      };
    }
  }, [watermark]);

  return (
    <div className="relative bg-[#E8EAEC]">
      <canvas ref={canvasRef} className="w-full h-auto"></canvas>
      {/* Top water marker */}
      {typeof watermark !== "string" && (
        <div className="absolute top-4 left-4 watermark">{watermark}</div>
      )}

      {/* Download Button */}
      <Button
        onClick={downloadImage}
        variant="default"
        className="absolute left-0 bottom-0 rounded-none bg-secondary hover:bg-black"
      >
        <DownloadIcon size="18px" />
      </Button>
    </div>
  );
};

export default WatermarkedImage;
