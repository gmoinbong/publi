"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface Sponsor {
  name: string;
  reward: string;
  logo: string;
}

export interface ClaimRewardProps {
  winner: Sponsor;
  onSubmit?: (data: { fullName: string; phone: string; email: string }) => void;
  onBack?: () => void;
  className?: string;
}

const ClaimReward = React.forwardRef<HTMLDivElement, ClaimRewardProps>(
  ({ winner, onSubmit, className, ...props }, ref) => {
    const [fullName, setFullName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (onSubmit && fullName && phone && email) {
        onSubmit({ fullName, phone, email });
      }
    };

    return (
      <div
        ref={ref}
        className={cn("relative w-full flex flex-col items-center", className)}
        {...props}
      >
        {/* Title */}
        <h1
          className="text-4xl md:text-6xl lg:text-[106.87px] font-normal text-[#163446] leading-[1.16] text-center mb-6"
          style={{ fontFamily: "Bakbak One, Arial, sans-serif" }}
        >
          Claim your Reward
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl lg:text-[43px] font-semibold text-black text-center leading-[1.362] mb-8 font-[var(--font-open-sans)]">
          Fill in your details to receive your voucher
        </p>

        {/* Reward Info Card */}
        <div className="w-full max-w-[351px] mb-8">
          <div
            className="w-full h-[85px] rounded-[14px] flex items-center justify-between px-4"
            style={{ background: "#C3ECFF" }}
          >
            <span
              className="text-[51.55px] font-normal text-[#124258]"
              style={{ fontFamily: "Bakbak One, Arial, sans-serif" }}
            >
              Your Reward
            </span>
            <div className="flex items-center gap-2">
              <div className="relative w-[64px] h-[64px]">
                <img
                  src={winner.logo}
                  alt={winner.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span
                className="text-[51.55px] font-normal text-[#0E3347]"
                style={{ fontFamily: "Bakbak One, Arial, sans-serif" }}
              >
                {winner.name}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[923px] flex flex-col gap-6 mb-8"
        >
          {/* Full Name Input */}
          <div className="w-full">
            <div
              className="w-full h-[166px] rounded-[21px] flex items-center px-4"
              style={{
                background: "#E7FFEF",
                border: "4px solid #16DC58",
              }}
            >
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                className="w-full bg-transparent border-none outline-none text-[51.55px] font-semibold text-[#154F6A] placeholder:text-[#154F6A]"
                style={{ fontFamily: "var(--font-open-sans)" }}
                required
              />
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="w-full">
            <div
              className="w-full h-[166px] rounded-[21px] flex items-center px-4"
              style={{
                background: "#E9F9FF",
                border: "4px solid #38BEF4",
              }}
            >
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full bg-transparent border-none outline-none text-[51.55px] font-semibold text-[#154F6A] placeholder:text-[#154F6A]"
                style={{ fontFamily: "var(--font-open-sans)" }}
                required
              />
            </div>
          </div>

          {/* Email Address Input */}
          <div className="w-full">
            <div
              className="w-full h-[166px] rounded-[21px] flex items-center px-4"
              style={{
                background: "#E9F9FF",
                border: "4px solid #38BEF4",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-transparent border-none outline-none text-[51.55px] font-semibold text-[#154F6A] placeholder:text-[#154F6A]"
                style={{ fontFamily: "var(--font-open-sans)" }}
                required
              />
            </div>
          </div>

          {/* Get My Voucher Button */}
          <button
            type="submit"
            className="w-full h-[200px] rounded-[110px] text-white text-2xl md:text-4xl lg:text-[77.86px] font-normal leading-[1.4] hover:opacity-90"
            style={{
              fontFamily: "Bakbak One, Arial, sans-serif",
              background: "#FF9442",
            }}
          >
            Get My Voucher
          </button>
        </form>
      </div>
    );
  }
);
ClaimReward.displayName = "ClaimReward";

export { ClaimReward };
