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

export interface BrandLinkAnimationProps {
  brandLink?: string;
  onClick?: () => void;
  className?: string;
}

export const BrandLinkAnimation = React.forwardRef<
  HTMLAnchorElement,
  BrandLinkAnimationProps
>(({ brandLink, onClick, className, ...props }, ref) => {
  const [giftAnimationData, setGiftAnimationData] =
    React.useState<LottieAnimationData | null>(null);
  const [shouldAnimate, setShouldAnimate] = React.useState(true);

  React.useEffect(() => {
    // Always load animation if onClick is provided (for win screen)
    if (!brandLink && !onClick) return;

    const loadAnimation = async () => {
      const giftUrls = [
        "https://lottie.host/f5PdexvrBK.json",
        "https://lottie.host/embed/f5PdexvrBK.json",
        "https://assets5.lottiefiles.com/packages/lf20_f5PdexvrBK.json",
      ];

      for (const url of giftUrls) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setGiftAnimationData(data);
            break;
          }
        } catch {
          continue;
        }
      }
    };

    loadAnimation();
    
    // Trigger animation on mount for win screen
    if (onClick) {
      setShouldAnimate(true);
      const timer = setTimeout(() => setShouldAnimate(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [brandLink, onClick]);

  if (!brandLink && !onClick) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      ref={ref}
      href={brandLink || "#"}
      onClick={handleClick}
      target={onClick ? undefined : "_blank"}
      rel={onClick ? undefined : "noopener noreferrer"}
      className={cn(
        "mb-4 sm:mb-6 relative z-10 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer",
        className
      )}
      {...props}
    >
      {giftAnimationData ? (
        <div 
          className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 transition-all duration-500 ${shouldAnimate ? 'scale-110' : ''}`}
          style={shouldAnimate ? {
            animation: 'bounce 0.6s ease-in-out 3'
          } : {}}
        >
          <Lottie
            animationData={giftAnimationData}
            loop={true}
            autoplay={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ) : (
        <div 
          className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center bg-white rounded-full transition-all duration-500 ${shouldAnimate ? 'scale-110' : ''}`}
          style={shouldAnimate ? {
            animation: 'bounce 0.6s ease-in-out 3'
          } : {}}
        >
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">🎁</span>
        </div>
      )}
    </a>
  );
});
BrandLinkAnimation.displayName = "BrandLinkAnimation";

