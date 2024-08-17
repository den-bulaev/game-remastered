import { ISquare } from "../interfaces";

export interface IGameUnitProps {
  square: ISquare;
  checkedFieldsTotal: ISquare[];
  checkedFieldsPerTurn: ISquare[];
  isError: boolean;
  isRestarted: boolean;
  addCheckedFieldPerTurn: (isChecked: boolean, gameUnit: ISquare) => void;
}
