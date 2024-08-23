import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";

import GameUnit from "../../components/GameUnit";
import Timer from "../../components/Timer.tsx";

import { getBtnColor, getMessage, getSquares } from "./utils";
import { ERoutes, getRoute } from "../../utils/router.utils";
import { ISquare } from "../../components/interfaces";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { ELocalStorageKeys } from "../../utils/localStorageKeys";

import logo from "../../assets/logo.svg";

const Game: React.FC = () => {
  const [squares, setSquares] = useState<ISquare[]>([]);
  const [checkedFieldsPerTurn, setCheckedFieldsPerTurn] = useState<ISquare[]>(
    []
  );
  const [checkedFieldsTotal, setCheckedFieldsTotal] = useState<ISquare[]>([]);
  const [isError, setIsError] = useState(false);
  const [isRestarted, setIsRestarted] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useGlobalContext() || {};

  useEffect(() => {
    const squaresData = getSquares();
    setSquares(squaresData);
  }, []);

  useEffect(() => {
    const checkedFieldsTotalLength = checkedFieldsTotal.length;
    const timer = localStorage.getItem(ELocalStorageKeys.TIMER);

    if (
      checkedFieldsTotalLength &&
      checkedFieldsTotal.length === squares.length
    ) {
      if (
        setUser &&
        typeof timer === "string" &&
        (typeof user?.bestResult === "undefined" || +timer < user.bestResult)
      ) {
        setUser((prev) => ({ ...prev, bestResult: +timer }));
      }

      navigate(getRoute(ERoutes.GREETING));
    }
  }, [checkedFieldsTotal]);

  const resetGameData = () => {
    setIsError(false);
    setCheckedFieldsTotal([]);
    setCheckedFieldsPerTurn([]);
  };

  const handleClickShuffle = () => {
    const squaresForLocalStorage = getSquares();
    resetGameData();
    setSquares(squaresForLocalStorage);
    setIsRestarted(true);
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

      <Timer shouldResetTimer={isRestarted} setShouldResetTimer={setIsRestarted} />

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
