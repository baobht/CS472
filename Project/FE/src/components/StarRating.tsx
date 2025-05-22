import { type FC, useState } from "react";

type StarRatingProps = {
  value: number; // average rating, e.g. 4.3
  precision?: number; // e.g. 0.5 or 0.1
  max?: number; // number of stars, default 5
  size?: number; // px size of star, default 24
  className?: string;
  onChange?: (value: number) => void; // Add this prop for interactive rating
};

export const StarRating: FC<StarRatingProps> = ({
  value = 0,
  precision = 0.5,
  max = 5,
  size = 24,
  className = "",
  onChange,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  // Clamp value between 0 and max
  const rating = Math.max(0, Math.min(value, max));
  const displayValue = hoverValue !== null ? hoverValue : rating;

  // Calculate how many stars are fully filled, partially filled, and empty
  const stars = Array.from({ length: max }).map((_, i) => {
    const starValue = i + 1;
    if (displayValue >= starValue) return "full";
    if (displayValue + precision >= starValue) return "half";
    return "empty";
  });

  // A rounder star SVG path
  const starPath =
    "M12 2.5c.3 0 .59.17.73.44l2.5 5.06 5.59.81c.3.04.54.25.63.54.09.29-.01.6-.26.78l-4.04 3.94.95 5.57c.05.3-.07.6-.31.78a.75.75 0 0 1-.8.06L12 18.77l-5 2.63a.75.75 0 0 1-.8-.06.75.75 0 0 1-.31-.78l.95-5.57-4.04-3.94a.75.75 0 0 1-.26-.78c.09-.29.33-.5.63-.54l5.59-.81 2.5-5.06A.75.75 0 0 1 12 2.5z";

  // For interactive rating, calculate the value based on mouse position
  const handleMouseMove = (e: React.MouseEvent, i: number) => {
    if (!onChange) return;
    const { left, width } = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - left;
    let percent = x / width;
    // Snap to nearest precision
    percent = Math.ceil(percent / precision) * precision;
    let newValue = i + percent;
    if (newValue > max) newValue = max;
    if (newValue < 0) newValue = 0;
    setHoverValue(newValue);
  };

  const handleMouseLeave = () => {
    if (!onChange) return;
    setHoverValue(null);
  };

  const handleClick = (val: number) => {
    if (onChange) onChange(val);
  };

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {stars.map((type, i) => {
        // For interactive, calculate the value for this star
        const starVal = i + 1;
        return (
          <span
            key={i}
            style={{
              width: size,
              height: size,
              display: "inline-block",
              cursor: onChange ? "pointer" : "default",
            }}
            onMouseMove={onChange ? (e) => handleMouseMove(e, i) : undefined}
            onMouseLeave={onChange ? handleMouseLeave : undefined}
            onClick={
              onChange
                ? () => handleClick(hoverValue !== null ? hoverValue : starVal)
                : undefined
            }
          >
            {type === "full" && (
              <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="#d1d5dc"
                stroke="#d1d5dc"
                strokeWidth="1"
                strokeLinejoin="round"
              >
                <path d={starPath} />
              </svg>
            )}
            {type === "half" && (
              <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d1d5dc"
                strokeWidth="1"
                strokeLinejoin="round"
              >
                <defs>
                  <linearGradient id={`half-grad-${i}`}>
                    <stop offset="50%" stopColor="#d1d5dc" />
                    <stop
                      offset="50%"
                      stopColor="transparent"
                      stopOpacity="1"
                    />
                  </linearGradient>
                </defs>
                <path d={starPath} fill={`url(#half-grad-${i})`} />
                <path
                  d={starPath}
                  stroke="#d1d5dc"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            )}
            {type === "empty" && (
              <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d1d5dc"
                strokeWidth="1"
                strokeLinejoin="round"
              >
                <path d={starPath} fill="none" />
              </svg>
            )}
          </span>
        );
      })}
    </div>
  );
};
