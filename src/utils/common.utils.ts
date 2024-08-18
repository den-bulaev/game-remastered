export const getTimerValue = (timer: number) => {
  const timerToString = String(timer);
  const secondsOnes = timerToString[timerToString.length - 1];
  const minutesTens = Math.floor(timer / 600);
  const minutesOnes = Math.floor((timer - minutesTens * 600) / 60);
  const secondsTens = Math.floor(
    (timer - minutesTens * 600 - minutesOnes * 60) / 10
  );

  return `${minutesTens}${minutesOnes}:${secondsTens}${secondsOnes}`;
};
