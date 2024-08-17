import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthWrapper from "../../components/AuthWrapper";

import { ERoutes, getRoute } from "../../utils/router.utils";
import { UserContext } from "../../contexts";

const Greeting: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) || {};

  return (
    <AuthWrapper infoText={`Aloha ${user?.name || "User"}!`}>
      <div style={{ flex: "1", display: "flex" }}>
        {
          typeof user?.bestResult === "number" && (
            <p>Your best time in this session: {`${user.bestResult}`}</p>
          )
        }
      </div>

      <button
        className="authorization__button button"
        onClick={() => navigate(getRoute(ERoutes.MAIN))}
      >
        Start Game
      </button>
    </AuthWrapper>
  );
};

export default Greeting;
