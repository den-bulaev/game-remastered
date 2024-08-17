import { useEffect, useState } from "react";

import classNames from "classnames";

import { playSound } from "./utils";
import { IGameUnitProps } from "./interfaces";
import { ISquare } from "../interfaces";

import sound1 from "../../assets/sound1.wav";
import sound2 from "../../assets/sound2.wav";

const GameUnit: React.FC<IGameUnitProps> = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const {
    square: { id, color },
    checkedFieldsTotal,
    checkedFieldsPerTurn,
    isError,
    isRestarted,
    addCheckedFieldPerTurn,
  } = props;

  useEffect(() => {
    if (isChecked && (isError || isRestarted)) {
      setIsChecked(false);
    }
  }, [isError, isRestarted]);

  const handleClickChoose = (gameUnit: ISquare) => {
    if (isChecked) {
      playSound(sound2);
    } else {
      playSound(sound1);
    }

    addCheckedFieldPerTurn(isChecked, gameUnit);
    setIsChecked((prev) => !prev);
  };

  return (
    <button
      type="button"
      className={classNames(
        color,
        {
          "Field--checked": checkedFieldsPerTurn.some(
            (field) => field.id === id
          ),
        },
        {
          "Field--hidden": checkedFieldsTotal.some((field) => field.id === id),
        },
        "Field"
      )}
      value={color}
      onClick={() => handleClickChoose({ id, color })}
    />
  );
};

export default GameUnit;
