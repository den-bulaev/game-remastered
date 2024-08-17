export const playSound = (sound: string) => {
  const player = new Audio(sound);

  player.preload = "auto";
  player.play();
};
