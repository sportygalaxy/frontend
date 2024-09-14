import { useEffect, useLayoutEffect, useRef } from "react";
import LogoMobileIcon from "@/assets/icons/pack/LogoMobile";

interface WatermarkedImageProps {
  watermark: React.ReactNode | string; // Allow Element or string as watermark
}

const WatermarkedImage: React.FC<WatermarkedImageProps> = ({ watermark }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = new window.Image();

      img.src = "/images/product/prod-1.png"; // Path to the original image

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
            watermarkImage.src = "/images/logo/sg_logo.svg"; // Update with the correct path

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
      {typeof watermark !== "string" && (
        <div className="absolute top-4 left-4 watermark">{watermark}</div>
      )}
    </div>
  );
};

export default WatermarkedImage;
