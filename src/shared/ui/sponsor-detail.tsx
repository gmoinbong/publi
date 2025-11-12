import * as React from "react";
import { cn } from "../lib/utils";
import type { Sponsor } from "../types";
import { WinButtons } from "./win-buttons";

export interface SponsorDetailProps {
  sponsor: Sponsor;
  onClose?: () => void;
  onClaim?: () => void;
  onSpinAgain?: () => void;
  className?: string;
}

export const SponsorDetail = React.forwardRef<HTMLDivElement, SponsorDetailProps>(
  ({ sponsor, onClose, onClaim, onSpinAgain, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full flex flex-col items-center min-h-screen py-8 px-4",
          className
        )}
        style={{
          background: "linear-gradient(133deg, rgba(246, 248, 251, 1) 0%, rgba(255, 207, 178, 1) 100%)",
        }}
        {...props}
      >
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:opacity-80 transition-opacity"
            aria-label="Close"
          >
            <span className="text-2xl sm:text-3xl">×</span>
          </button>
        )}

        {/* Main Content Container */}
        <div className="w-full max-w-[1080px] flex flex-col items-center">
          {/* Sponsor Logo - Large */}
          <div className="relative w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] h-[120px] sm:h-[150px] md:h-[180px] lg:h-[220px] mb-6 sm:mb-8 md:mb-10">
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Sponsor Name */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-body-bold text-[#163446] text-center mb-4 sm:mb-6">
            {sponsor.name}
          </h1>

          {/* Reward Text */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-body-semibold text-[#163446] text-center mb-8 sm:mb-10 md:mb-12">
            {sponsor.reward}
          </p>

          {/* Prize Card Display */}
          <div className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mb-8 sm:mb-10 md:mb-12">
            <div
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] flex flex-col items-center justify-center p-6 sm:p-8 md:p-10"
              style={{
                background: "linear-gradient(180deg, rgba(63, 210, 161, 1) 0%, rgba(68, 209, 248, 1) 100%)",
                border: "4px solid #111D21",
              }}
            >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-body-bold text-[#163446] uppercase mb-6 sm:mb-8 text-center">
                Gift Card
              </div>
              <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] h-[80px] sm:h-[100px] md:h-[120px] mb-6 sm:mb-8">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-4xl sm:text-5xl md:text-6xl">🎁</span>
                </div>
              </div>
            </div>
          </div>

          {/* Win Buttons */}
          <WinButtons onClaim={onClaim} onSpinAgain={onSpinAgain} />
        </div>
      </div>
    );
  }
);
SponsorDetail.displayName = "SponsorDetail";

