import * as React from "react";
import Lottie from "lottie-react";

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

export const ConfettiBackground = () => {
  const [confettiData, setConfettiData] = React.useState<LottieAnimationData | null>(null);

  React.useEffect(() => {
    const loadAnimation = async () => {
      const confettiUrls = [
        "https://lottie.host/f5PdexvrBK.json",
        "https://lottie.host/embed/f5PdexvrBK.json",
        "https://assets5.lottiefiles.com/packages/lf20_f5PdexvrBK.json",
      ];

      for (const url of confettiUrls) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setConfettiData(data);
            break;
          }
        } catch {
          continue;
        }
      }
    };

    loadAnimation();
  }, []);

  if (!confettiData) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Lottie
        animationData={confettiData}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

