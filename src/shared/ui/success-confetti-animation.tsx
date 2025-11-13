import * as React from "react";
import Lottie from "lottie-react";
import { cn } from "../lib/utils";
import confettiAnimationData from "../../../public/animations/success confetti.json";

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
  const hasCompletedRef = React.useRef(false);

  // Auto complete after 3 seconds
  React.useEffect(() => {
    if (onComplete) {
      const timeout = setTimeout(() => {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete();
        }
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [onComplete]);

  const handleComplete = React.useCallback(() => {
    if (!hasCompletedRef.current && onComplete) {
      hasCompletedRef.current = true;
      onComplete();
    }
  }, [onComplete]);

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
        animationData={confettiAnimationData}
        loop={false}
        autoplay={true}
        onComplete={handleComplete}
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
