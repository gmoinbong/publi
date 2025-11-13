import * as React from "react";
import { cn } from "../lib/utils";

export interface WinButtonsProps {
  onClaim?: () => void;
  onSpinAgain?: () => void;
  className?: string;
}

export const WinButtons = React.forwardRef<HTMLDivElement, WinButtonsProps>(
  ({ onClaim, onSpinAgain, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative z-10 w-full max-w-[720px] flex flex-col gap-4 sm:gap-5 md:gap-6",
          className
        )}
        {...props}
      >
        {/* CLAIM MY PRIZE Button - shorter */}
        {onClaim && (
          <button
            onClick={onClaim}
            className="w-full h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 rounded-full sm:rounded-[60px] md:rounded-[80px] lg:rounded-[110px] text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-heading leading-[1.4] hover:opacity-90 mb-4 sm:mb-5 px-4"
            style={{
              background:
                "linear-gradient(134deg, rgba(9, 148, 227, 1) 0%, rgba(54, 204, 252, 1) 100%)",
            }}
          >
            CLAIM MY PRIZE
          </button>
        )}

        {/* SPIN AGAIN Button - shorter */}
        {onSpinAgain && (
          <button
            onClick={onSpinAgain}
            className="w-full h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 rounded-full sm:rounded-[60px] md:rounded-[80px] lg:rounded-[110px] text-[#FF9442] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-heading leading-[1.4] hover:opacity-90 bg-white px-4"
            style={{
              border: "4px solid #FF9442",
            }}
          >
            SPIN AGAIN
          </button>
        )}
      </div>
    );
  }
);
WinButtons.displayName = "WinButtons";
