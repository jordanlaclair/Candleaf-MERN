import * as actionTypes from "../actions/actionTypes";

const reducer = (posts = [], action) => {
	switch (action.type) {
		case actionTypes.FETCH_ALL:
			return action.payload;
		case actionTypes.LIKE_POST:
			return posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			);
		case actionTypes.CREATE_POST:
			return [...posts, action.payload];
		case actionTypes.UPDATE_POST:
			return posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			);
		case actionTypes.DELETE_POST:
			return posts.filter((post) => post._id !== action.payload);
		default:
			return posts;
	}
};

export default reducer;
