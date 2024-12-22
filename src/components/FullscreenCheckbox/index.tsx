import { ChangeEvent, useEffect, useState } from "react";
import { ELocalStorageKeys } from "../../utils/localStorageKeys";

interface IFullscreenCheckboxProps {
  id: string;
  labelText: string;
}

const FullscreenCheckbox: React.FC<IFullscreenCheckboxProps> = ({
  id,
  labelText,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    document.addEventListener("fullscreenchange", changeFullscreen);
    document.addEventListener("visibilitychange", visibilityChange);

    if (!isFullscreen) {
      setIsFullscreen(!!localStorage.getItem(ELocalStorageKeys.IS_FULLSCREEN));
    }

    return () => {
      document.removeEventListener("fullscreenchange", changeFullscreen);
      document.removeEventListener("visibilitychange", visibilityChange);
    };
  }, []);

  const visibilityChange = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  };

  const changeFullscreen = () => {
    if (document.fullscreenElement) {
      setIsFullscreen(true);
      localStorage.setItem(ELocalStorageKeys.IS_FULLSCREEN, "true");
    } else {
      setIsFullscreen(false);
      localStorage.removeItem(ELocalStorageKeys.IS_FULLSCREEN);
    }
  };

  const handleChangeIsFullscreen = (e: ChangeEvent<HTMLInputElement>) => {
    if (document.documentElement.requestFullscreen) {
      if (e.target.checked) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullscreen(false);
          })
          .catch(() => console.error("Failed to exit fullscreen"));
      }
    }
  };

  return (
    <>
      <input
        className="styled-checkbox"
        id={id}
        checked={isFullscreen}
        type="checkbox"
        onChange={handleChangeIsFullscreen}
      ></input>
      <label htmlFor={id}>{labelText}</label>
    </>
  );
};

export default FullscreenCheckbox;
