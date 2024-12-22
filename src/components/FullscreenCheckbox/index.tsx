import { ChangeEvent } from "react";
import { ELocalStorageKeys } from "../../utils/localStorageKeys";

interface ICustomCheckboxProps {
  id: string;
  labelText: string;
}

const FullscreenCheckbox: React.FC<ICustomCheckboxProps> = ({
  id,
  labelText,
}) => {
  const handleChangeIsFullscreen = (e: ChangeEvent<HTMLInputElement>) => {
    if (document.documentElement.requestFullscreen) {
      if (e.target.checked) {
        document.documentElement.requestFullscreen();
        localStorage.setItem(ELocalStorageKeys.IS_FULLSCREEN, "true");
      } else {
        document
          .exitFullscreen()
          .catch(() => console.error("Failed to exit fullscreen"));

        localStorage.removeItem(ELocalStorageKeys.IS_FULLSCREEN);
      }
    }
  };

  return (
    <>
      <input
        className="styled-checkbox"
        id={id}
        defaultChecked={!!localStorage.getItem(ELocalStorageKeys.IS_FULLSCREEN)}
        type="checkbox"
        onChange={handleChangeIsFullscreen}
      ></input>
      <label htmlFor={id}>{labelText}</label>
    </>
  );
};

export default FullscreenCheckbox;
