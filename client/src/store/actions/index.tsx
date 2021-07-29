import { ActionType } from "./actionTypes";

export {
	createCandle,
	deleteCandle,
	purchaseCandle,
	getCandles,
	getCandle,
} from "./postsActionCreator";

export { toggleTheme } from "./appActionCreator";

interface PostsSchema {
	title: string;
	message: string;
	creator: string;
	tags: [string];
	selectedFile: string;
	_id: string;
}

interface CreatePostAction {
	type: ActionType.CREATE_POST;
	payload: object;
}

interface DeletePostAction {
	type: ActionType.DELETE_POST;
	payload: string;
}

interface UpdatePostAction {
	type: ActionType.UPDATE_POST;
	payload: PostsSchema;
}

interface LikePostAction {
	type: ActionType.LIKE_POST;
	payload: string;
}

interface GetPosts {
	type: ActionType.FETCH_ALL;
	payload: Array<object>;
}

export interface ToggleTheme {
	type: ActionType.TOGGLE_THEME;
}

export type PostActions =
	| GetPosts
	| LikePostAction
	| UpdatePostAction
	| DeletePostAction
	| CreatePostAction;
