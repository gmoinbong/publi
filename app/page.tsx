"use client";

import {
  Button,
  RewardCard,
  CountdownTimer,
  SlotMachine,
  YouWon,
  YouLost,
} from "./shared";
import { useCountdown } from "./hooks/use-countdown";
import { useState, useRef } from "react";
import * as React from "react";

const sponsors = [
  {
    name: "Starbucks",
    reward: "Free Drink",
    logo: "/images/starbucks-logo-7815fe.png",
  },
  {
    name: "Domino's",
    reward: "Free Pizza",
    logo: "/images/dominos-logo.png",
  },
  {
    name: "Apple Store",
    reward: "App Store",
    logo: "/images/apple-store-logo-3afa9e.png",
  },
  {
    name: "Disney",
    reward: "Save up %25",
    logo: "/images/disney-logo.png",
  },
  {
    name: "Netflix",
    reward: "Save up %15",
    logo: "/images/netflix-logo-55fe82.png",
  },
  {
    name: "Nike",
    reward: "10% Off",
    logo: "/images/nike-logo.png",
  },
  {
    name: "AMC",
    reward: "Free Movie",
    logo: "/images/amc-logo-60dd13.png",
  },
  {
    name: "Spotify",
    reward: "Free Month",
    logo: "/images/spotify-logo.png",
  },
];

export default function HomePage() {
  const { seconds } = useCountdown(10);
  const [showSlotMachine, setShowSlotMachine] = useState(false);
  const [showYouWon, setShowYouWon] = useState(false);
  const [showYouLost, setShowYouLost] = useState(false);
  const [winner, setWinner] = useState<typeof sponsors[0] | null>(null);
  const slotMachineRef = useRef<{ startSpin: () => void }>(null);

  const handleSpin = () => {
    setShowSlotMachine(true);
    setShowYouWon(false);
    setShowYouLost(false);
  };

  const handleComplete = (result: { winner: typeof sponsors[0] | null; isWin: boolean }) => {
    if (result.isWin && result.winner) {
      setWinner(result.winner);
      // Show you won screen after a short delay
      setTimeout(() => {
        setShowSlotMachine(false);
        setShowYouWon(true);
      }, 500);
    } else {
      // Show you lost screen after a short delay
      setTimeout(() => {
        setShowSlotMachine(false);
        setShowYouLost(true);
      }, 500);
    }
  };

  const handleReset = () => {
    setShowSlotMachine(false);
    setShowYouWon(false);
    setShowYouLost(false);
    setWinner(null);
  };

  const handleClaim = () => {
    setShowYouWon(false);
    setShowYouLost(false);
    setShowSlotMachine(false);
    setWinner(null);
  };

  if (showYouWon && winner) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-[#7CE3EA] to-[#FF9344] overflow-x-hidden">
        <div className="w-full max-w-[1080px] flex flex-col items-center px-4 py-8">
          <YouWon winner={winner} onClaim={handleClaim} />
        </div>
      </main>
    );
  }

  if (showYouLost) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-[#7CE3EA] to-[#FF9344] overflow-x-hidden">
        <div className="w-full max-w-[1080px] flex flex-col items-center px-4 py-8">
          <YouLost onTryAgain={handleClaim} />
        </div>
      </main>
    );
  }

  if (showSlotMachine) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-[#7CE3EA] to-[#FF9344] overflow-x-hidden">
        <div className="w-full max-w-[1080px] flex flex-col items-center px-4 py-8">
          <SlotMachine
            sponsors={sponsors}
            onComplete={handleComplete}
            onReset={handleReset}
            ref={slotMachineRef}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-[#7CE3EA] to-[#FF9344] overflow-x-hidden">
      <div className="w-full max-w-[1080px] flex flex-col items-center px-4 py-8">
        {/* White Container */}
        <div className="relative w-full bg-white rounded-[41px] p-6 md:p-8 mb-8">
          {/* Header */}
          <h1 className="text-4xl md:text-6xl lg:text-[116.55px] font-normal text-black leading-[1.157] text-left mb-4" style={{ fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif' }}>
            Ready to Win?
          </h1>
          <p className="text-lg md:text-3xl lg:text-[60px] font-semibold text-black text-center leading-[1.362] mb-8 font-[var(--font-open-sans)]">
            Spin the wheel and win rewards from our sponsors
          </p>

          {/* Sponsor Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1000px] w-full mx-auto">
            {sponsors.map((sponsor, index) => (
              <RewardCard
                key={index}
                sponsorName={sponsor.name}
                reward={sponsor.reward}
                logoUrl={sponsor.logo}
                logoAlt={`${sponsor.name} logo`}
                className="w-full max-w-[236.67px] mx-auto"
              />
            ))}
          </div>
        </div>

        {/* Countdown Section */}
        <div className="flex flex-col items-center mb-8">
          <p className="text-xl md:text-2xl lg:text-[38px] font-semibold text-black text-center leading-[1.362] mb-6 font-[var(--font-open-sans)]">
            Or wait for the countdown
          </p>
          <CountdownTimer seconds={seconds} />
        </div>

        {/* Swipe to Spin Button */}
        <Button
          onClick={handleSpin}
          className="w-full max-w-[656px] h-auto min-h-[200px] rounded-[110px] border-[3px] border-white text-white text-2xl md:text-4xl lg:text-[62px] font-normal leading-[1.157] hover:opacity-90 px-8 py-4"
          style={{ 
            fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif',
            background: 'linear-gradient(127deg, #3D79F8 0%, #EF6632 100%)'
          }}
          size="lg"
        >
          SWIPE TO SPIN
        </Button>
      </div>
    </main>
  );
}
