import * as React from "react";
import Lottie from "lottie-react";
import { cn } from "../lib/utils";

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

export interface SuccessConfettiAnimationProps {
  className?: string;
  onComplete?: () => void;
}

export const SuccessConfettiAnimation = React.forwardRef<
  HTMLDivElement,
  SuccessConfettiAnimationProps
>(({ className, onComplete, ...props }, ref) => {
  const [confettiData, setConfettiData] =
    React.useState<LottieAnimationData | null>(null);

  React.useEffect(() => {
    fetch("/animations/success confetti.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.v || data.layers)) {
          setConfettiData(data);
        }
      })
      .catch(() => {});
  }, []);

  if (!confettiData) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full h-full flex items-center justify-center min-h-screen",
        className
      )}
      {...props}
    >
      <Lottie
        key="success-confetti-once"
        animationData={confettiData}
        loop={false}
        autoplay={true}
        onComplete={onComplete}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "1920px",
          maxHeight: "1920px",
        }}
      />
    </div>
  );
});
SuccessConfettiAnimation.displayName = "SuccessConfettiAnimation";
