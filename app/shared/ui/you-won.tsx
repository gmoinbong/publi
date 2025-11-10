"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import Image from "next/image";
import Lottie from "lottie-react";

export interface Sponsor {
  name: string;
  reward: string;
  logo: string;
}

export interface YouWonProps {
  winner: Sponsor;
  onClaim?: () => void;
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

const YouWon = React.forwardRef<HTMLDivElement, YouWonProps>(
  ({ winner, onClaim, className, ...props }, ref) => {
    const [confettiData, setConfettiData] = React.useState<LottieAnimationData | null>(null);

    // Load Lottie animation from LottieFiles
    React.useEffect(() => {
      // Try loading from LottieFiles CDN - using the animation ID from URL
      const loadAnimation = async () => {
        try {
          // Try different possible URLs for the animation
          const urls = [
            "https://lottie.host/embed/f5PdexvrBK.json",
            "https://assets5.lottiefiles.com/packages/lf20_f5PdexvrBK.json",
            "https://lottie.host/f5PdexvrBK.json",
          ];

          for (const url of urls) {
            try {
              const response = await fetch(url);
              if (response.ok) {
                const data = await response.json();
                setConfettiData(data);
                return;
              }
            } catch {
              continue;
            }
          }
          console.warn("Could not load confetti animation from any source");
        } catch (err) {
          console.warn("Error loading confetti animation:", err);
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
        {/* Confetti Animation Background */}
        {confettiData && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <Lottie
              animationData={confettiData}
              loop={true}
              autoplay={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}

        {/* White Container */}
        <div className="relative z-10 w-full bg-white rounded-[39.96px] border-[7.8px] border-[#468DFB] p-6 md:p-8 mb-8">
          {/* YOU WON! Title */}
          <h1 className="text-4xl md:text-6xl lg:text-[116.32px] font-normal text-[#15973C] leading-[1.157] text-center mb-8" style={{ fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif' }}>
            YOU WON!
          </h1>

          {/* Prize Cards */}
          <div className="flex gap-4 justify-center items-start mb-8 flex-wrap">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="relative w-full max-w-[257.54px] h-[384.59px] rounded-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #DEC7AE 0%, #FEF4E2 49%, #DEC7AE 100%)',
                  border: '2.78px solid #CABEAE',
                }}
              >
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  <div className="relative w-[218.55px] h-[68.48px] mb-4">
                    <Image
                      src={winner.logo}
                      alt={winner.name}
                      fill
                      className="object-contain"
                      sizes="218.55px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Congratulations Text */}
          <p className="text-xl md:text-2xl lg:text-[51.55px] font-semibold text-black text-center leading-[1.362] mb-8 font-[var(--font-open-sans)]">
            Congratulations - You&apos;ve won {winner.name} {winner.reward}
          </p>
        </div>

        {/* Claim Prize & Play Again Button */}
        <button
          onClick={onClaim}
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
YouWon.displayName = "YouWon";

export { YouWon };

