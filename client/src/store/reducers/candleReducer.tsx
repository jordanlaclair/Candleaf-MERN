import { ActionType } from "../actions/actionTypes";
import { CandleActions } from "../actions";
interface PostsSchema {
	title: string;
	message: string;
	tags: [string];
	purchaseCount: {
		type: number;
		default: 0;
	};
	createdAt: {
		type: Date;
		default: Date;
	};
	_id: string;
	__v: {
		type: number;
		default: 0;
	};
}

type PostsArray = Array<PostsSchema>;
let initialState: PostsArray = [];

const reducer = (posts: PostsArray = initialState, action: CandleActions) => {
	switch (action.type) {
		case ActionType.FETCH_ALL_CANDLES:
			return action.payload;
		case ActionType.PURCHASE_CANDLE:
			return posts.map((post) =>
				post._id === action.payload ? action.payload : post
			);
		case ActionType.CREATE_CANDLE:
			return [...posts, action.payload];
		case ActionType.UPDATE_CANDLE:
			return posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			);
		case ActionType.DELETE_CANDLE:
			return posts.filter((post) => post._id !== action.payload);
		default:
			return posts;
	}
};

export default reducer;
