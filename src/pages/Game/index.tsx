import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";

import GameUnit from "../../components/GameUnit";

import { getBtnColor, getMessage, getSquares } from "./utils";
import { ERoutes, getRoute } from "../../utils/router.utils";
import { getTimerValue } from "../../utils/common.utils";
import { ISquare } from "../../components/interfaces";

import logo from "../../assets/logo.svg";
import { ELocalStorageKeys } from "../../utils/localStorageKeys";

const Game: React.FC = () => {
  const [squares, setSquares] = useState<ISquare[]>([]);
  const [checkedFieldsPerTurn, setCheckedFieldsPerTurn] = useState<ISquare[]>(
    []
  );
  const [checkedFieldsTotal, setCheckedFieldsTotal] = useState<ISquare[]>([]);
  const [isError, setIsError] = useState(false);
  const [isRestarted, setIsRestarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalID, setIntervalID] = useState<number | null>(null);

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext) || {};

  useEffect(() => {
    const squaresData = getSquares();
    setSquares(squaresData);

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
    const checkedFieldsTotalLength = checkedFieldsTotal.length;

    if (
      checkedFieldsTotalLength &&
      checkedFieldsTotal.length === squares.length
    ) {
      if (
        setUser &&
        (typeof user?.bestResult === "undefined" || timer < user.bestResult)
      ) {
        setUser((prev) => ({ ...prev, bestResult: timer }));
      }

      navigate(getRoute(ERoutes.GREETING));
    }
  }, [checkedFieldsTotal]);

  if (timer === 3599 && intervalID) {
    clearInterval(intervalID);
  }

  const resetGameData = () => {
    setIsError(false);
    setCheckedFieldsTotal([]);
    setCheckedFieldsPerTurn([]);
    setTimer(0);
  };

  const handleClickShuffle = () => {
    const squaresForLocalStorage = getSquares();
    resetGameData();
    setSquares(squaresForLocalStorage);
    setIsRestarted(false);
  };

  const handleClickCheck = () => {
    const color = checkedFieldsPerTurn[0].color;
    const isFieldsValid = checkedFieldsPerTurn.every(
      (item) => item.color === color
    );

    if (isFieldsValid) {
      setCheckedFieldsTotal((prev) => [...prev, ...checkedFieldsPerTurn]);
    } else {
      setIsError(true);
    }

    setCheckedFieldsPerTurn([]);
  };

  const addCheckedFieldPerTurn = (isChecked: boolean, gameUnit: ISquare) => {
    const { color, id } = gameUnit;

    setIsError(false);
    setIsRestarted(false);

    setCheckedFieldsPerTurn((prev) => {
      if (isChecked) {
        return prev.filter((element) => element.id !== gameUnit.id);
      }

      return [...prev, { color, id, checked: !isChecked }];
    });
  };

  const handleClickRestart = () => {
    setIsRestarted(true);
    resetGameData();
  };

  return (
    <section className="Game">
      <img src={logo} alt="" className="Game__logo" />

      <button
        className="button button--shuffle"
        type="button"
        onClick={handleClickShuffle}
      >
        Shuffle
      </button>

      <div className="Game__timer">{getTimerValue(timer)}</div>

      <div className="Board">
        {squares.map((square) => (
          <GameUnit
            square={square}
            checkedFieldsTotal={checkedFieldsTotal}
            checkedFieldsPerTurn={checkedFieldsPerTurn}
            addCheckedFieldPerTurn={addCheckedFieldPerTurn}
            isError={isError}
            isRestarted={isRestarted}
            key={square.id}
          />
        ))}
      </div>

      <button
        type="button"
        className={classNames(
          "button",
          "Game__button-check",
          getBtnColor(
            checkedFieldsTotal.length,
            checkedFieldsPerTurn.length,
            isError
          )
        )}
        disabled={checkedFieldsPerTurn.length < 2}
        onClick={handleClickCheck}
      >
        {getMessage(checkedFieldsPerTurn, checkedFieldsTotal, isError)}
      </button>

      <button
        type="button"
        className="button Game__button-complete"
        onClick={handleClickRestart}
      >
        Restart
      </button>
    </section>
  );
};

export default Game;
