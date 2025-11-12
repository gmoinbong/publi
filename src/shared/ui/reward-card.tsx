import * as React from "react";
import { cn } from "../lib/utils";

export interface RewardCardProps {
  sponsorName: string;
  reward: string;
  logoUrl?: string;
  logoAlt?: string;
  className?: string;
}

const RewardCard = React.forwardRef<HTMLDivElement, RewardCardProps>(
  ({ sponsorName, reward, logoUrl, logoAlt, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-lg sm:rounded-xl md:rounded-[14.68px] bg-white w-full h-auto min-h-[140px] sm:min-h-[180px] md:min-h-[240px] lg:min-h-[295.4px] flex flex-col items-center justify-start pt-2 sm:pt-3 md:pt-4 lg:pt-[17.27px] shadow-sm sm:shadow-md",
          className
        )}
        {...props}
      >
        {logoUrl && (
          <div className="relative w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] lg:w-[135.83px] lg:h-[138.84px] mb-2 sm:mb-3 md:mb-4 flex-shrink-0">
            <img
              src={logoUrl}
              alt={logoAlt || sponsorName}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <h3 className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-[35.41px] font-bold text-[#163446] text-center leading-[1.36] mt-auto mb-1 sm:mb-1.5 md:mb-2 px-1 sm:px-2">
          {sponsorName}
        </h3>
        <p className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-[31.09px] font-semibold text-[#163446] text-center leading-[1.36] mb-2 sm:mb-3 md:mb-4 px-1 sm:px-2">
          {reward}
        </p>
      </div>
    );
  }
);
RewardCard.displayName = "RewardCard";

export { RewardCard };

