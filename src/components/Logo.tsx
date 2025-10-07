import * as React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({
  className = "",
  showText = true,
}: LogoProps): React.ReactElement {
  return (
    <a href="/" className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Image */}
      <div className="flex-shrink-0">
        <img
          src={
            "https://tremendous-angel-a503dd5e8e.media.strapiapp.com/Main_Logo_5e6fa49f88.png"
          }
          alt="Kaluzny I.T."
          className="w-10 h-10"
        />
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="text-2xl font-bold text-gray-900 tracking-wide">
          KALUZNY <span className="text-blue-600">I.T.</span>
        </div>
      )}
    </a>
  );
}
