import { v4 as uuid } from "uuid";
import { ISquare } from "../../components/interfaces";

function shuffle(arr: string[]) {
  let j;
  let temp;

  const arrCopy = [...arr];

  for (let i = arrCopy.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arrCopy[j];
    arrCopy[j] = arrCopy[i];
    arrCopy[i] = temp;
  }

  return arrCopy;
}

const customFill = (divider = " ", ...args: string[]) => {
  let colors: string[] = [];

  if (args.length !== 5) {
    throw new Error("Should be 5 colors!");
  }

  args.forEach((element) => {
    colors = colors.concat((element + divider).repeat(5).trim().split(divider));
  });

  return colors;
};

const getShuffledColors = () =>
  shuffle(customFill(" ", "green", "red", "blue", "pink", "orange"));

export const getSquares = (): ISquare[] => {
  const shuffledColors = getShuffledColors();
  const result = shuffledColors.map((color) => ({
    color,
    id: uuid(),
    checked: false,
  }));

  return result;
};

export const getMessage = (
  arrPerTurn: ISquare[],
  arrTotal: ISquare[],
  error: boolean
) => {
  let text;

  if (arrTotal.length > 0 && arrPerTurn.length === 0) {
    text = "Success!";
  } else {
    text = "Check";
  }

  if (error) {
    text = "Error!";
  }

  return text;
};

export const getBtnColor = (
  checkedFieldsTotalLength: number,
  checkedFieldsPerTurnLength: number,
  isError: boolean
) => {
  switch (true) {
    case isError:
      return "red";

    case (checkedFieldsTotalLength <= 1 && checkedFieldsPerTurnLength === 0) ||
      checkedFieldsPerTurnLength === 1:
      return "gray";

    case checkedFieldsTotalLength > 0 && checkedFieldsPerTurnLength === 0:
      return "green";

    case checkedFieldsTotalLength > 1:
      return "blue";

    default:
      return "blue";
  }
};

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
