import { ActionType } from "../actions/actionTypes";
import { PostActions } from "../actions";
interface PostsSchema {
	title: string;
	message: string;
	creator: string;
	tags: [string];
	selectedFile: string;
	likeCount: {
		type: number;
		default: 0;
	};
	createdAt: {
		type: Date;
		default: Date;
	};
	_id: string;
}

type PostsArray = Array<PostsSchema>;
let initialState: PostsArray = [];

const reducer = (posts: PostsArray = initialState, action: PostActions) => {
	switch (action.type) {
		case ActionType.FETCH_ALL:
			return action.payload;
		case ActionType.LIKE_POST:
			return posts.map((post) =>
				post._id === action.payload ? action.payload : post
			);
		case ActionType.CREATE_POST:
			return [...posts, action.payload];
		case ActionType.UPDATE_POST:
			return posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			);
		case ActionType.DELETE_POST:
			return posts.filter((post) => post._id !== action.payload);
		default:
			return posts;
	}
};

export default reducer;
