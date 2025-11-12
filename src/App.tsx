import {
  Button,
  RewardCard,
  CountdownTimer,
  SlotMachine,
  YouWon,
  YouLost,
  ClaimReward,
} from "./shared";
import { useCountdown } from "./hooks/use-countdown";
import { useState, useRef } from "react";
import { QueryProvider } from "./providers/query-provider";

const sponsors = [
  {
    name: "Starbucks",
    reward: "Free Drink",
    logo: "./images/starbucks-logo-7815fe.png",
  },
  {
    name: "Domino's",
    reward: "Free Pizza",
    logo: "./images/dominos-logo.png",
  },
  {
    name: "Apple Store",
    reward: "App Store",
    logo: "./images/apple-store-logo-3afa9e.png",
  },
  {
    name: "Disney",
    reward: "Save up %25",
    logo: "./images/disney-logo.png",
  },
  {
    name: "Netflix",
    reward: "Save up %15",
    logo: "./images/netflix-logo-55fe82.png",
  },
  {
    name: "Nike",
    reward: "10% Off",
    logo: "./images/nike-logo.png",
  },
  {
    name: "AMC",
    reward: "Free Movie",
    logo: "./images/amc-logo-60dd13.png",
  },
  {
    name: "Spotify",
    reward: "Free Month",
    logo: "./images/spotify-logo.png",
  },
];

function App() {
  const { seconds } = useCountdown(10);
  const [showSlotMachine, setShowSlotMachine] = useState(false);
  const [showYouWon, setShowYouWon] = useState(false);
  const [showYouLost, setShowYouLost] = useState(false);
  const [showClaimReward, setShowClaimReward] = useState(false);
  const [winner, setWinner] = useState<(typeof sponsors)[0] | null>(null);
  const slotMachineRef = useRef<{ startSpin: () => void }>(null);

  const handleSpin = () => {
    setShowSlotMachine(true);
    setShowYouWon(false);
    setShowYouLost(false);
  };

  const handleComplete = (result: {
    winner: (typeof sponsors)[0] | null;
    isWin: boolean;
  }) => {
    if (result.isWin && result.winner) {
      setWinner(result.winner);
      setTimeout(() => {
        setShowSlotMachine(false);
        setShowYouWon(true);
      }, 500);
    } else {
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
    setShowClaimReward(true);
  };

  const handleClaimSubmit = (data: {
    fullName: string;
    phone: string;
    email: string;
  }) => {
    console.log("Claim data:", data);
    setShowClaimReward(false);
    setWinner(null);
  };

  const handleSpinAgain = () => {
    setShowYouWon(false);
    setShowYouLost(false);
    setShowSlotMachine(false);
    setShowClaimReward(false);
    setWinner(null);
  };

  const handleBackFromClaim = () => {
    setShowClaimReward(false);
    if (winner) {
      setShowYouWon(true);
    }
  };

  if (showClaimReward && winner) {
    return (
      <main
        className="min-h-screen w-full flex flex-col items-center overflow-x-hidden"
        style={{
          background: "#F6F8FB",
        }}
      >
        <div className="w-full max-w-[1080px] flex flex-col items-center px-3 sm:px-4 py-4 sm:py-6 md:py-8">
          <ClaimReward
            winner={winner}
            onSubmit={handleClaimSubmit}
            onBack={handleBackFromClaim}
          />
        </div>
      </main>
    );
  }

  if (showYouWon && winner) {
    return (
      <main
        className="min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden"
        style={{
          background:
            "linear-gradient(136deg, rgba(246, 248, 251, 1) 12%, rgba(255, 207, 178, 1) 100%)",
        }}
      >
        <div className="w-full max-w-[1080px] flex flex-col items-center justify-center px-3 sm:px-4 py-4 sm:py-6 md:py-8">
          <YouWon
            winner={winner}
            onClaim={handleClaim}
            onSpinAgain={handleSpinAgain}
            brandLink="https://example.com"
          />
        </div>
      </main>
    );
  }

  if (showYouLost) {
    return (
      <main
        className="min-h-screen w-full flex flex-col items-center overflow-x-hidden"
        style={{
          background:
            "linear-gradient(136deg, rgba(246, 248, 251, 1) 19%, rgba(255, 207, 178, 1) 100%)",
        }}
      >
        <div className="w-full max-w-[1080px] flex flex-col items-center px-3 sm:px-4 py-4 sm:py-6 md:py-8">
          <YouLost onTryAgain={handleSpinAgain} />
        </div>
      </main>
    );
  }

  if (showSlotMachine) {
    return (
      <main
        className="min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden"
        style={{
          background:
            "linear-gradient(137deg, rgba(246, 248, 251, 1) 7%, rgba(255, 207, 178, 1) 100%)",
        }}
      >
        <div className="w-full max-w-[1080px] flex flex-col items-center justify-center px-3 sm:px-4 py-4 sm:py-6 md:py-8">
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
    <QueryProvider>
      <main
        className="min-h-screen w-full flex flex-col items-center overflow-x-hidden"
        style={{
          background:
            "linear-gradient(133deg, rgba(246, 248, 251, 1) 0%, rgba(255, 207, 178, 1) 100%)",
        }}
      >
        <div className="w-full max-w-[1080px] flex flex-col items-center px-3 sm:px-4 py-4 sm:py-6 md:py-8">
          {/* White Container */}
          <h1 className="text-4xl  font-heading text-[#163446] leading-[1.4] text-left mb-3 sm:mb-4">
            READY TO <span className=" text-[#44D2FD]">WIN?</span>
          </h1>
          <p className="text-xl font-body-semibold w-[80%] text-[#163446] text-center leading-[1.362] mb-4 sm:mb-6 md:mb-8 px-2">
            Spin the wheel and <span className="text-black font-bold ">win rewards</span>{" "}
            from our sponsors
          </p>
          <div
            className="relative w-full bg-white rounded-2xl sm:rounded-3xl md:rounded-[41px] p-4 sm:p-5 md:p-6 lg:p-8 mb-4 sm:mb-6 md:mb-8"
            style={{ boxShadow: "0px 4px 33.10px 0px rgba(0, 0, 0, 0.25)" }}
          >
            {/* Header */}

            {/* Sponsor Cards Grid - 4 columns in a row */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 xl:gap-4 max-w-[1000px] w-full mx-auto">
              {sponsors.map((sponsor, index) => (
                <RewardCard
                  key={index}
                  sponsorName={sponsor.name}
                  reward={sponsor.reward}
                  logoUrl={sponsor.logo}
                  logoAlt={`${sponsor.name} logo`}
                  className="w-full"
                />
              ))}
            </div>
          </div>

          {/* Countdown Section */}
          <div className="flex flex-col items-center mb-4 sm:mb-6 md:mb-8 w-full px-2">
            <CountdownTimer seconds={seconds} />
          </div>

          {/* Spin Now Button */}
          <Button
            onClick={handleSpin}
            className="w-full max-w-[779px] h-16 sm:h-20 md:h-24 lg:h-32 xl:h-[200px] rounded-full sm:rounded-[60px] md:rounded-[80px] lg:rounded-[110px] text-white text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-[77.86px] font-heading leading-[1.4] hover:opacity-90 px-4"
            style={{
              background:
                "linear-gradient(90deg, rgba(6, 144, 225, 1) 0%, rgba(56, 207, 253, 1) 100%)",
            }}
            size="lg"
          >
            SPIN NOW
          </Button>
          <p className="pt-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[38px] font-body-semibold text-black text-center leading-[1.362] mb-3 sm:mb-4 md:mb-6">
            Or wait for the countdown
          </p>
        </div>
      </main>
    </QueryProvider>
  );
}

export default App;
