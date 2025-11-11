"use client";

import * as React from "react";
import { cn } from "../lib/utils";

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
    const [isWin, setIsWin] = React.useState(false);
    
    const spinRefs = [
      React.useRef<HTMLDivElement>(null),
      React.useRef<HTMLDivElement>(null),
      React.useRef<HTMLDivElement>(null),
    ];

    const startSpin = React.useCallback(() => {
      if (isSpinning) return;
      
      setIsSpinning(true);
      setIsComplete(false);
      setIsWin(false);
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
      setIsWin(winResult);
      
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
          const cardHeight = 403; // Height from Figma
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
          <h2 
            className="text-3xl md:text-5xl lg:text-[101px] font-normal text-[#163446] text-center mb-6" 
            style={{ 
              fontFamily: 'Bakbak One, Arial, sans-serif',
              lineHeight: '1.14em',
            }}
          >
            Spinning for {currentBrand}
          </h2>
        )}

        {/* Slot Machine Container */}
        <div 
          className="relative w-full rounded-[29px] p-6 md:p-8"
          style={{
            background: 'linear-gradient(137deg, rgba(11, 141, 217, 1) 4%, rgba(45, 195, 248, 1) 100%)',
            boxShadow: '0px 4.24px 35.10px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* Three Slot Columns */}
          <div className="flex gap-4 justify-center items-start">
            {[0, 1, 2].map((slotIndex) => (
              <div
                key={slotIndex}
                className="relative w-[283.33px] h-[403px] overflow-hidden rounded-[22.88px]"
                style={{
                  background: isComplete && isWin && slotIndex === 1
                    ? 'linear-gradient(180deg, rgba(63, 210, 161, 1) 0%, rgba(68, 209, 248, 1) 100%)'
                    : '#F9FAFC',
                  border: '3.52px solid #111D21',
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
                      className="w-full h-[403px] flex flex-col items-center justify-center p-4"
                    >
                      <div className="text-[30.42px] font-bold text-[#163446] uppercase mb-4 text-center" style={{ fontFamily: 'var(--font-open-sans)' }}>
                        Gift Card
                      </div>
                      <div className="relative w-[214.52px] h-[67.22px] mb-4">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="w-full h-full object-contain"
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
              <div className="relative w-[303px] h-[303px]">
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: '#FFFFFF',
                    border: '13.39px solid #0C97E4',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="text-[93.17px] font-normal text-black"
                    style={{ fontFamily: 'Bakbak One, Arial, sans-serif' }}
                  >
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Complete Text */}
          {isComplete && !isSpinning && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <span 
                className="text-[49.44px] font-semibold text-black"
                style={{ fontFamily: 'var(--font-open-sans)' }}
              >
                Complete
              </span>
            </div>
          )}

          {/* Didn't Win Text */}
          {isComplete && !isSpinning && !isWin && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <span 
                className="text-[90.53px] font-semibold text-black"
                style={{ fontFamily: 'var(--font-open-sans)' }}
              >
                Didn&apos;t Win
              </span>
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

