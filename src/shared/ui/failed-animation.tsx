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

export interface FailedAnimationProps {
  className?: string;
  onComplete?: () => void;
}

export const FailedAnimation = React.forwardRef<HTMLDivElement, FailedAnimationProps>(
  ({ className, onComplete, ...props }, ref) => {
    const [failedData, setFailedData] = React.useState<LottieAnimationData | null>(null);
    const hasCompletedRef = React.useRef(false);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Load local animation file
    React.useEffect(() => {
      fetch("/animations/Failed.json")
        .then((res) => res.json())
        .then((data) => {
          if (data && (data.v || data.layers)) {
            setFailedData(data);
          }
        })
        .catch(() => {
          // If failed, complete immediately
          if (onComplete && !hasCompletedRef.current) {
            setTimeout(() => onComplete(), 500);
          }
        });
    }, [onComplete]);

    // Safety timeout - force complete after 4 seconds
    React.useEffect(() => {
      if (failedData) {
        timeoutRef.current = setTimeout(() => {
          if (!hasCompletedRef.current && onComplete) {
            hasCompletedRef.current = true;
            onComplete();
          }
        }, 4000);
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [failedData, onComplete]);

    const handleComplete = React.useCallback(() => {
      if (!hasCompletedRef.current && onComplete) {
        hasCompletedRef.current = true;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setTimeout(() => onComplete(), 500);
      }
    }, [onComplete]);

    if (!failedData) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full h-full flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px]",
          className
        )}
        {...props}
      >
        <Lottie
          key="failed-once"
          animationData={failedData}
          loop={false}
          autoplay={true}
          onComplete={handleComplete}
          style={{ width: "100%", height: "100%", maxWidth: "500px", maxHeight: "500px" }}
        />
      </div>
    );
  }
);
FailedAnimation.displayName = "FailedAnimation";

