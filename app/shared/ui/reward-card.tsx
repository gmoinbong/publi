import * as React from "react";
import { cn } from "../lib/utils";
import Image from "next/image";

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
          "relative rounded-[14.68px] bg-white w-full max-w-[236.67px] h-auto min-h-[295.4px] flex flex-col items-center justify-start pt-[17.27px]",
          className
        )}
        {...props}
      >
        {logoUrl && (
          <div className="relative w-[135.83px] h-[138.84px] mb-4 flex-shrink-0">
            <Image
              src={logoUrl}
              alt={logoAlt || sponsorName}
              fill
              className="object-contain"
              sizes="135.83px"
            />
          </div>
        )}
        <h3 className="text-xl md:text-2xl lg:text-[35.41px] font-bold text-[#163446] text-center leading-[1.36] mt-auto mb-2 px-2">
          {sponsorName}
        </h3>
        <p className="text-lg md:text-xl lg:text-[31.09px] font-semibold text-[#163446] text-center leading-[1.36] mb-4 px-2">
          {reward}
        </p>
      </div>
    );
  }
);
RewardCard.displayName = "RewardCard";

export { RewardCard };

