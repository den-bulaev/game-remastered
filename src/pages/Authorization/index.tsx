import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthWrapper from "../../components/AuthWrapper";

import { ERoutes, getRoute } from "../../utils/router.utils";
import { UserContext } from "../../context";

const Authorization: React.FC = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext) || {};

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (userName) {
      if (setUser) {
        setUser((prev) => ({ ...prev, name: userName }));
      }
      navigate(getRoute(ERoutes.GREETING));
    }
  };

  return (
    <AuthWrapper infoText="Enter your name">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="authorization__login-field"
          value={userName}
          onChange={handleChangeUserName}
          maxLength={20}
        />

        <div className="authorization__filler"></div>

        <button type="submit" className="authorization__button button">
          Submit
        </button>
      </form>
    </AuthWrapper>
  );
};

export default Authorization;
