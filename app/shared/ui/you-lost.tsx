"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import Lottie from "lottie-react";

export interface YouLostProps {
  onTryAgain?: () => void;
  className?: string;
}

type LottieAnimationData = {
  v?: string;
  fr?: number;
  ip?: number;
  op?: number;
  w?: number;
  h?: number;
  nm?: string;
  ddd?: number;
  assets?: unknown[];
  layers?: unknown[];
  [key: string]: unknown;
};

const YouLost = React.forwardRef<HTMLDivElement, YouLostProps>(
  ({ onTryAgain, className, ...props }, ref) => {
    const [sadEmojiData, setSadEmojiData] = React.useState<LottieAnimationData | null>(null);

    // Load Lottie animation from LottieFiles
    React.useEffect(() => {
      const loadAnimation = async () => {
        try {
          // Try different possible URLs for the animation
          const urls = [
            "https://lottie.host/embed/sWSDs4ux5z.json",
            "https://assets5.lottiefiles.com/packages/lf20_sWSDs4ux5z.json",
            "https://lottie.host/sWSDs4ux5z.json",
          ];

          for (const url of urls) {
            try {
              const response = await fetch(url);
              if (response.ok) {
                const data = await response.json();
                setSadEmojiData(data);
                return;
              }
            } catch {
              continue;
            }
          }
          console.warn("Could not load sad emoji animation from any source");
        } catch (err) {
          console.warn("Error loading sad emoji animation:", err);
        }
      };

      loadAnimation();
    }, []);

    return (
      <div
        ref={ref}
        className={cn("relative w-full flex flex-col items-center", className)}
        {...props}
      >
        {/* White Container */}
        <div className="relative z-10 w-full bg-white rounded-[39.28px] border-[7.66px] border-[#468DFB] p-6 md:p-8 mb-8">
          {/* Sad Emoji Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative w-[409px] h-[338px] rounded-[46px] overflow-hidden">
              {sadEmojiData ? (
                <Lottie
                  animationData={sadEmojiData}
                  loop={true}
                  autoplay={true}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-[46px] flex items-center justify-center">
                  <span className="text-8xl">😢</span>
                </div>
              )}
            </div>
          </div>

          {/* Try again tomorrow! Title */}
          <h1 className="text-3xl md:text-5xl lg:text-[88.43px] font-normal text-black leading-[1.157] text-center mb-6" style={{ fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif' }}>
            Try again tomorrow!
          </h1>

          {/* Better luck text */}
          <p className="text-lg md:text-2xl lg:text-[49.23px] font-semibold text-black text-center leading-[1.362] mb-8 font-[var(--font-open-sans)]">
            Better luck next time. Come back tomorrow for another spin
          </p>
        </div>

        {/* Claim Prize & Play Again Button */}
        <button
          onClick={onTryAgain}
          className="relative z-10 w-full max-w-[877px] h-auto min-h-[200px] rounded-[110px] border-[3px] border-white text-white text-2xl md:text-4xl lg:text-[62px] font-normal leading-[1.157] hover:opacity-90 px-8 py-4"
          style={{
            fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif',
            background: 'linear-gradient(127deg, #3D79F8 0%, #EF6632 100%)',
          }}
        >
          Claim Prize & Play Again
        </button>
      </div>
    );
  }
);
YouLost.displayName = "YouLost";

export { YouLost };

