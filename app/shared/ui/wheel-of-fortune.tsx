import * as React from "react";
import { cn } from "../lib/utils";
import Image from "next/image";

export interface WheelOfFortuneProps {
  className?: string;
  imageUrl?: string;
}

const WheelOfFortune = React.forwardRef<HTMLDivElement, WheelOfFortuneProps>(
  ({ className, imageUrl, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-[1203px] h-auto aspect-[1203/854] -ml-5 md:-ml-20",
          className
        )}
        {...props}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Wheel of Fortune"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 1203px"
          />
        ) : (
          <div className="w-full h-full rounded-[29px] bg-gradient-to-br from-[#0B8DD9] to-[#2DC3F8] shadow-[0px_4.24px_35.1px_rgba(0,0,0,0.25)]" />
        )}
      </div>
    );
  }
);
WheelOfFortune.displayName = "WheelOfFortune";

export { WheelOfFortune };

