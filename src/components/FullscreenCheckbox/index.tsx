import { ChangeEvent, useEffect, useRef } from "react";
import { ELocalStorageKeys } from "../../utils/localStorageKeys";

interface IFullscreenCheckboxProps {
  id: string;
  labelText: string;
}

const FullscreenCheckbox: React.FC<IFullscreenCheckboxProps> = ({
  id,
  labelText,
}) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    document.addEventListener("fullscreenchange", changeFullscreen);

    return () => {
      document.removeEventListener("fullscreenchange", changeFullscreen);
    };
  }, []);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = !!localStorage.getItem(ELocalStorageKeys.IS_FULLSCREEN);
    }
  }, [checkboxRef.current]);

  const changeFullscreen = () => {
    if (!document.fullscreenElement && checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  const handleChangeIsFullscreen = (e: ChangeEvent<HTMLInputElement>) => {
    if (document.documentElement.requestFullscreen) {
      if (e.target.checked) {
        document.documentElement.requestFullscreen();
      } else {
        document
          .exitFullscreen()
          .catch(() => console.error("Failed to exit fullscreen"));
      }
    }
  };

  return (
    <>
      <input
        ref={checkboxRef}
        className="styled-checkbox"
        id={id}
        type="checkbox"
        onChange={handleChangeIsFullscreen}
      ></input>
      <label htmlFor={id}>{labelText}</label>
    </>
  );
};

export default FullscreenCheckbox;
