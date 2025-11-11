"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import Lottie from "lottie-react";

export interface Sponsor {
  name: string;
  reward: string;
  logo: string;
}

export interface YouWonProps {
  winner: Sponsor;
  onClaim?: () => void;
  onSpinAgain?: () => void;
  brandLink?: string;
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
  ({ winner, onClaim, onSpinAgain, brandLink, className, ...props }, ref) => {
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
        {/* Brand Link at top */}
        {brandLink && (
          <a
            href={brandLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 text-[81px] font-normal text-[#00820B] text-center"
            style={{ fontFamily: 'Bakbak One, Arial, sans-serif' }}
          >
            Animation icon here (open link)
          </a>
        )}

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

        {/* Main Container */}
        <div 
          className="relative z-10 w-full rounded-[29px] p-6 md:p-8 mb-8"
          style={{
            background: 'linear-gradient(134deg, rgba(11, 141, 217, 1) 15%, rgba(45, 195, 248, 1) 100%)',
            boxShadow: '0px 4.24px 35.10px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* YOU WON! Title */}
          <h1 
            className="text-4xl md:text-6xl lg:text-[101px] font-normal text-[#163446] leading-[1.14] text-center mb-8" 
            style={{ fontFamily: 'Bakbak One, Arial, sans-serif' }}
          >
            YOU WON!
          </h1>

          {/* Prize Cards */}
          <div className="flex gap-4 justify-center items-start mb-8 flex-wrap">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="relative w-full max-w-[283.33px] h-[403px] rounded-[22.88px] overflow-hidden"
                style={{
                  background: index === 1 
                    ? 'linear-gradient(180deg, rgba(63, 210, 161, 1) 0%, rgba(68, 209, 248, 1) 100%)'
                    : '#F9FAFC',
                  border: index === 1 ? '3.52px solid #111D21' : '3.52px solid #111D21',
                }}
              >
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  <div className="text-[30.42px] font-bold text-[#163446] uppercase mb-4 text-center font-[var(--font-open-sans)]">
                    Gift Card
                  </div>
                  <div className="relative w-[214.52px] h-[67.22px] mb-4">
                    <img
                      src={winner.logo}
                      alt={winner.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {index === 1 && (
                    <div className="relative w-[110px] h-[110px] mb-4">
                      {/* Prize icon - можно заменить на SVG */}
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                        <span className="text-4xl">🎁</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Congratulations Text */}
          <p className="text-xl md:text-2xl lg:text-[57.44px] font-semibold text-black text-center leading-[1.362] mb-8 font-[var(--font-open-sans)]">
            Congratulations - You&apos;ve won {winner.name} {winner.reward}
          </p>
        </div>

        {/* Buttons */}
        <div className="relative z-10 w-full max-w-[720px] flex flex-col gap-6">
          {/* CLAIM MY PRIZE Button */}
          <button
            onClick={onClaim}
            className="w-full h-[200px] rounded-[110px] text-white text-2xl md:text-4xl lg:text-[69px] font-normal leading-[1.4] hover:opacity-90"
            style={{
              fontFamily: 'Bakbak One, Arial, sans-serif',
              background: 'linear-gradient(134deg, rgba(9, 148, 227, 1) 0%, rgba(54, 204, 252, 1) 100%)',
            }}
          >
            CLAIM MY PRIZE
          </button>

          {/* SPIN AGAIN Button */}
          {onSpinAgain && (
            <button
              onClick={onSpinAgain}
              className="w-full h-[200px] rounded-[110px] text-[#FF9442] text-2xl md:text-4xl lg:text-[69px] font-normal leading-[1.4] hover:opacity-90 bg-white"
              style={{
                fontFamily: 'Bakbak One, Arial, sans-serif',
                border: '7px solid #FF9442',
              }}
            >
              SPIN AGAIN
            </button>
          )}
        </div>
      </div>
    );
  }
);
YouWon.displayName = "YouWon";

export { YouWon };

