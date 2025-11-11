import * as React from "react";
import { cn } from "../lib/utils";

export interface YouLostProps {
  onTryAgain?: () => void;
  className?: string;
}

const YouLost = React.forwardRef<HTMLDivElement, YouLostProps>(
  ({ onTryAgain, className, ...props }, ref) => {

    return (
      <div
        ref={ref}
        className={cn("relative w-full flex flex-col items-center", className)}
        {...props}
      >
        {/* Animation icon placeholder */}
        <div
          className="mb-6 text-[81px] font-normal text-[#00820B] text-center"
          style={{ fontFamily: "Bakbak One, Arial, sans-serif" }}
        >
          Animation icon here
        </div>

        {/* Main Container */}
        <div
          className="relative z-10 w-full rounded-[29px] p-6 md:p-8 mb-8"
          style={{
            background:
              "linear-gradient(137deg, rgba(11, 141, 217, 1) 4%, rgba(45, 195, 248, 1) 100%)",
            boxShadow: "0px 4.24px 35.10px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Try again tomorrow! Title */}
          <h1
            className="text-3xl md:text-5xl lg:text-[101px] font-normal text-white leading-[1.14] text-center mb-8"
            style={{ fontFamily: "Bakbak One, Arial, sans-serif" }}
          >
            Try again tomorrow!
          </h1>

          {/* Better luck text */}
          <p className="text-lg md:text-2xl lg:text-[51.55px] font-semibold text-white text-center leading-[1.362] mb-8 font-[var(--font-open-sans)]">
            Better luck next time. Come back tomorrow for another spin
          </p>
        </div>

        {/* Play Again 24h Button */}
        <button
          onClick={onTryAgain}
          className="relative z-10 w-full max-w-[784px] h-[200px] rounded-[110px] text-white text-2xl md:text-4xl lg:text-[69px] font-normal leading-[1.4] hover:opacity-90"
          style={{
            fontFamily: "Bakbak One, Arial, sans-serif",
            background: "#FF9442",
          }}
        >
          Play Again 24h
        </button>
      </div>
    );
  }
);
YouLost.displayName = "YouLost";

export { YouLost };
