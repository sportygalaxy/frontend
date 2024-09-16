import { Star1 } from "iconsax-react";
import React, { useState } from "react";

interface StarRatingProps {
  totalStars?: number;
  defaultValue?: number;
  readonly?: boolean;
  onChange?: (value: number) => void; // Callback for when star value changes
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  defaultValue = 0,
  onChange,
  readonly = false,
}) => {
  const [rating, setRating] = useState<number>(defaultValue);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (!readonly) {
      setRating(index + 1);
      if (onChange) onChange(index + 1);
    } // Updates the selected star
  };

  const handleMouseEnter = (index: number) => {
    if (!readonly) {
      setHoverIndex(index);
      if (onChange) onChange(index + 1);
    } // Tracks hover index
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverIndex(null);
      if (onChange) onChange(rating);
    } // Reset hover state
  };

  return (
    <div className="flex space-x-1">
      {Array.from({ length: totalStars }, (_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          className={`cursor-pointer ${readonly ? "cursor-default" : ""}`}
        >
          {hoverIndex !== null && hoverIndex >= index ? (
            // Hover state
            <Star1 variant="Bold" color="#A8C302" />
          ) : rating > index ? (
            // Selected state
            <Star1 variant="Bold" color="#A8C302" />
          ) : (
            // Unselected state
            <Star1 color="#A8C302" />
          )}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
