import { useEffect, useState } from "react";

import { getTimerValue } from "../../utils/common.utils";
import { ELocalStorageKeys } from "../../utils/localStorageKeys";
import { ITimerProps } from "./interfaces";

const Timer: React.FC<ITimerProps> = ({ shouldResetTimer, setShouldResetTimer }) => {
  const [timer, setTimer] = useState(0);
  const [intervalID, setIntervalID] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        const timerValue = prev + 1;
        localStorage.setItem(ELocalStorageKeys.TIMER, String(timerValue));
        return timerValue;
      });
    }, 1000);

    setIntervalID(interval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (shouldResetTimer) {
      setTimer(0);
      setShouldResetTimer(false);
    }
  }, [shouldResetTimer]);

  if (timer === 3599 && intervalID) {
    clearInterval(intervalID);
  }

  return <div className="Game__timer">{getTimerValue(timer)}</div>;
};

export default Timer;
