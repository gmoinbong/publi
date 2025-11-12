import * as React from "react";
import { cn } from "../lib/utils";
import type { Sponsor } from "../types";

export interface PrizeCardProps {
  sponsor: Sponsor;
  isHighlighted?: boolean;
  showGiftIcon?: boolean;
  className?: string;
}

export const PrizeCard = React.forwardRef<HTMLDivElement, PrizeCardProps>(
  ({ sponsor, isHighlighted = false, showGiftIcon = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full h-[140px] sm:h-[180px] md:h-[220px] lg:h-[280px] xl:h-[340px] 2xl:h-[403px] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[22.88px] overflow-hidden shadow-lg",
          className
        )}
        style={{
          background: isHighlighted
            ? "linear-gradient(180deg, rgba(63, 210, 161, 1) 0%, rgba(68, 209, 248, 1) 100%)"
            : "#F9FAFC",
          border: "2px solid #111D21",
        }}
        {...props}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-1.5 sm:p-2.5 md:p-3 lg:p-4">

          <div className="relative w-[80px] h-[30px] sm:w-[110px] sm:h-[40px] md:w-[140px] md:h-[50px] lg:w-[180px] lg:h-[65px] xl:w-[220px] xl:h-[80px] 2xl:w-[280px] 2xl:h-[100px] mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 xl:mb-5">
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="w-full h-full object-contain"
            />
          </div>
          {showGiftIcon && (
            <div className="relative w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[55px] md:h-[55px] lg:w-[70px] lg:h-[70px] xl:w-[90px] xl:h-[90px] 2xl:w-[110px] 2xl:h-[110px]">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <span className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-4xl">🎁</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);
PrizeCard.displayName = "PrizeCard";

