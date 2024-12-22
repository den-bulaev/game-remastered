import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthWrapper from "../../components/AuthWrapper";
import FullscreenCheckbox from "../../components/FullscreenCheckbox";

import { ERoutes, getRoute } from "../../utils/router.utils";
import { UserContext } from "../../context";
import { ELocalStorageKeys } from "../../utils/localStorageKeys";
import { getTimerValue } from "../../utils/common.utils";

const Greeting: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) || {};

  const handleClickStartGame = () => {
    navigate(getRoute(ERoutes.MAIN));
  };

  return (
    <AuthWrapper infoText={`Greetings ${user?.name || "User"}!`}>
      <div className="authorization__filler">
        {typeof user?.bestResult === "number" && (
          <>
            <p>
              {`Your time: ${getTimerValue(
                Number(localStorage.getItem(ELocalStorageKeys.TIMER)) || 0
              )}`}
            </p>
            <p>{`Your best time: ${getTimerValue(user.bestResult)}`}</p>
          </>
        )}
      </div>

      <div className="authorization__checkbox-wrapper">
        <FullscreenCheckbox id="screen-toggle" labelText="Fullscreen" />
      </div>

      <button
        className="authorization__button button"
        onClick={handleClickStartGame}
      >
        Start Game
      </button>
    </AuthWrapper>
  );
};

export default Greeting;
