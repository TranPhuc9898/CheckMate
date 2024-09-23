import { useEffect, useState, useRef, FC } from "react";
import { AppState, InteractionManager } from "react-native";
import LottieView from "lottie-react-native";

interface ILottie {
  style?: any;
  source: any;
  autoPlay?: boolean;
  loop?: boolean;
  count?: number;
  onAnimationFinish?: () => void;
}

const Lottie: FC<ILottie> = ({
  style,
  source,
  autoPlay,
  loop,
  count,
  onAnimationFinish,
}) => {
  const appState = useRef(AppState.currentState);
  const [animationCount, setAnimationCount] = useState(1);
  const animationRef = useRef(null);

  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      if (!autoPlay) {
        animationRef.current?.play();
      }
    });

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        animationRef.current?.play();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
      interaction.cancel();
    };
  }, []);

  const onAnimationEnd = () => {
    onAnimationFinish && onAnimationFinish();

    if (count && count > animationCount) {
      animationRef.current?.play();
      setAnimationCount(animationCount + 1);
    }
  };

  return (
    <LottieView
      ref={animationRef}
      style={style || {}}
      source={source}
      autoPlay={Boolean(autoPlay)}
      loop={Boolean(loop)}
      onAnimationFinish={onAnimationEnd}
    />
  );
};

export default Lottie;
