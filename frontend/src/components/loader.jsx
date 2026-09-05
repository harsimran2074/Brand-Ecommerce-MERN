
import React from "react";

const Loader = ({
  size = "medium",
  text = "Loading...",
  fullScreen = false,
}) => {
  const sizeStyles = {
    small: "h-5 w-5 border-2",
    medium: "h-8 w-8 border-[3px]",
    large: "h-12 w-12 border-4",
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* Spinner */}
      <div
        className={`
                    ${sizeStyles[size]}
                    rounded-full
                    border-gray-200
                    border-t-black
                    animate-spin
                `}
      />

      {/* Loading text */}
      {text && (
        <p className="text-sm font-medium text-gray-500">
          {text}
        </p>
      )}
    </div>
  );

  // Full-screen loader
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  // Normal loader
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      {content}
    </div>
  );
};

export default Loader;
