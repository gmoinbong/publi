"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import Image from "next/image";

export interface Sponsor {
  name: string;
  reward: string;
  logo: string;
}

export interface SlotMachineProps {
  sponsors: Sponsor[];
  onComplete?: (result: { winner: Sponsor | null; isWin: boolean }) => void;
  onReset?: () => void;
  className?: string;
}

export interface SlotMachineRef {
  startSpin: () => void;
}

const SlotMachine = React.forwardRef<SlotMachineRef, SlotMachineProps>(
  ({ sponsors, onComplete, className, ...props }, ref) => {
    const [isSpinning, setIsSpinning] = React.useState(false);
    const [currentBrand, setCurrentBrand] = React.useState<string>("");
    const [progress, setProgress] = React.useState(0);
    const [isComplete, setIsComplete] = React.useState(false);
    
    const spinRefs = [
      React.useRef<HTMLDivElement>(null),
      React.useRef<HTMLDivElement>(null),
      React.useRef<HTMLDivElement>(null),
    ];

    const startSpin = React.useCallback(() => {
      if (isSpinning) return;
      
      setIsSpinning(true);
      setIsComplete(false);
      setProgress(0);
      
      // Select random winners for each slot
      const newWinners: [number, number, number] = [
        Math.floor(Math.random() * sponsors.length),
        Math.floor(Math.random() * sponsors.length),
        Math.floor(Math.random() * sponsors.length),
      ];
      
      setCurrentBrand(sponsors[newWinners[1]].name);
      
      // Check if all three slots match (win condition)
      const winResult = newWinners[0] === newWinners[1] && newWinners[1] === newWinners[2];
      
      // Animate slots
      const duration = 3000; // 3 seconds
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progressPercent = Math.min((elapsed / duration) * 100, 100);
        setProgress(progressPercent);
        
        if (elapsed < duration) {
          requestAnimationFrame(animate);
        } else {
          setIsSpinning(false);
          setIsComplete(true);
          // Trigger onComplete callback after animation completes
          if (onComplete) {
            setTimeout(() => {
              onComplete({
                winner: winResult ? sponsors[newWinners[1]] : null,
                isWin: winResult,
              });
            }, 300);
          }
        }
      };
      
      // Animate each slot
      spinRefs.forEach((slotRef, index) => {
        if (slotRef.current) {
          const targetIndex = newWinners[index];
          const totalSpins = 20 + targetIndex; // Multiple full rotations
          const cardHeight = 377.49; // Height from Figma
          const targetPosition = -(totalSpins * cardHeight);
          
          slotRef.current.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
          slotRef.current.style.transform = `translateY(${targetPosition}px)`;
        }
      });
      
      requestAnimationFrame(animate);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSpinning, sponsors, onComplete]);

    React.useImperativeHandle(ref, () => ({
      startSpin,
    }));

    // Auto-start spin on mount
    React.useEffect(() => {
      const timer = setTimeout(() => {
        startSpin();
      }, 500);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Create extended sponsor list for seamless scrolling
    const extendedSponsors = [...sponsors, ...sponsors, ...sponsors];

    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
      <div
        ref={containerRef}
        className={cn("relative w-full", className)}
        {...props}
      >
        {/* Spinning Status */}
        {isSpinning && (
          <h2 className="text-3xl md:text-5xl lg:text-[95px] font-normal text-black text-left mb-6" style={{ fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif' }}>
            Spinning for {currentBrand}
          </h2>
        )}

        {/* Slot Machine Container */}
        <div className="relative w-full bg-white rounded-[37.25px] border-[7.27px] border-[#468DFB] p-6 md:p-8">
          {/* Three Slot Columns */}
          <div className="flex gap-4 justify-center items-start">
            {[0, 1, 2].map((slotIndex) => (
              <div
                key={slotIndex}
                className="relative w-[252.78px] h-[377.49px] overflow-hidden rounded-[26.96px]"
                style={{
                  background: 'linear-gradient(180deg, #4CAAFB 0%, #53DFF8 49%, #F78637 100%)',
                }}
              >
                {/* Scrolling Cards */}
                <div
                  ref={spinRefs[slotIndex]}
                  className="absolute top-0 left-0 w-full"
                  style={{
                    transform: 'translateY(0)',
                  }}
                >
                  {extendedSponsors.map((sponsor, index) => (
                    <div
                      key={index}
                      className="w-full h-[377.49px] flex flex-col items-center justify-center p-4"
                    >
                      <div className="text-[30.42px] font-bold text-[#006AAD] uppercase mb-4 text-center font-[var(--font-open-sans)]">
                        Gift Card
                      </div>
                      <div className="relative w-[214.52px] h-[67.22px] mb-4">
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="relative w-[50.88px] h-[63.61px]">
                        {/* Prize icon placeholder - можно заменить на SVG */}
                        <div className="w-full h-full bg-white rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          {isSpinning && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative w-[291px] h-[291px]">
                <div className="absolute inset-0 rounded-full border-8 border-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[153.16px] h-[110.74px] bg-[#FDFDFE] rounded flex items-center justify-center">
                    <span className="text-[87.26px] font-semibold text-black font-[var(--font-open-sans)]">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Auto-trigger onComplete when spinning completes */}
        {isComplete && onComplete && (
          <div className="hidden">
            {/* This will trigger the callback */}
          </div>
        )}
      </div>
    );
  }
);
SlotMachine.displayName = "SlotMachine";

export { SlotMachine };

