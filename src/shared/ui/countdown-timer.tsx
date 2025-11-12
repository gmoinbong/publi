import * as React from "react";
import { cn } from "../lib/utils";

export interface CountdownTimerProps {
  seconds: number;
  className?: string;
}

const CountdownTimer = React.forwardRef<HTMLDivElement, CountdownTimerProps>(
  ({ seconds, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative flex items-center justify-center", className)}
        {...props}
      >
        <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[197px] lg:h-[197px] rounded-full bg-white border-[6px] md:border-[8px] lg:border-[11px] border-[#0C97E4] flex items-center justify-center">
          <span className="text-2xl md:text-4xl lg:text-[76.57px] font-heading text-black leading-[1.4]">
            {seconds}s
          </span>
        </div>
      </div>
    );
  }
);
CountdownTimer.displayName = "CountdownTimer";

export { CountdownTimer };

