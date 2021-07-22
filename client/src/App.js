import "./App.css";
import Form from "./components/Form.js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./store/actions/index.js";

function App() {
	const dispatch = useDispatch();
	const post = useSelector((state) => state.posts);

	const handleSubmit = async (e) => {
		e.preventDefault();
	};
	useEffect(() => {
		console.log(post);
	}, [post]);
	useEffect(() => {
		dispatch(action.getPosts());
	}, [dispatch]);

	return (
		<div className="App">
			<Form />
		</div>
	);
}

export default App;
