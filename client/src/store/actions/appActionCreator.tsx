import { ActionType } from "./actionTypes";
import { Dispatch } from "redux";
import { ToggleTheme } from "./index";

export const toggleTheme = () => (dispatch: Dispatch<ToggleTheme>) => {
	dispatch({ type: ActionType.TOGGLE_THEME });
};
