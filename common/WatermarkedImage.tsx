import { useEffect, useRef } from "react";
import LogoMobileIcon from "@/assets/icons/pack/LogoMobile";

const WatermarkedImage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = new window.Image(); // Correct usage of new Image()

      img.src = "/images/product/prod-1.png"; // Path to the original image

      img.onload = () => {
        // Set canvas size based on image dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        ctx?.drawImage(img, 0, 0);

        // Add the watermark (text as an example)
        if (ctx) {
          ctx.font = "30px Arial";
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.fillText("Your Watermark", 20, img.height - 30); // Position the watermark
        }
      };
    }
  }, []);

  return (
    <div className="relative bg-[#E8EAEC]">
      <canvas ref={canvasRef} className="w-full h-auto"></canvas>
    </div>
  );
};

export default WatermarkedImage;
