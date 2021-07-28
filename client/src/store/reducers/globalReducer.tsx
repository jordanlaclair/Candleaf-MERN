import { ActionType } from "../actions/actionTypes";
import { ToggleTheme } from "../actions";

interface GlobalState {
	theme: string;
}

const initialState = {
	theme: "light",
};

const reducer = (state: GlobalState = initialState, action: ToggleTheme) => {
	switch (action.type) {
		case ActionType.TOGGLE_THEME:
			return {
				...initialState,
				theme: state.theme === "light" ? "dark" : "light",
			};
		default:
			return state;
	}
};

export default reducer;
