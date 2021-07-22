import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as action from "../store/actions/index.js";
import styled, { css } from "styled-components";

function ContactForm() {
	const [postData, setPostData] = useState({
		creator: "",
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});

	const dispatch = useDispatch();

	const clearPostData = () => {
		setPostData({
			creator: "",
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(action.createPost(postData));
		clearPostData();
	};

	return (
		<form autoComplete="off" onSubmit={handleSubmit}>
			<label for="title">Title:</label>

			<input
				type="text"
				value={postData.title}
				name="title"
				onChange={(e) => {
					setPostData((prevState) => {
						return { ...prevState, title: e.target.value };
					});
				}}
			/>
			<br />
			<label for="message">Message:</label>

			<input
				type="text"
				name="message"
				value={postData.message}
				onChange={(e) => {
					setPostData((prevState) => {
						return { ...prevState, message: e.target.value };
					});
				}}
			/>
			<br />
			<label for="creator">Creator:</label>

			<input
				type="text"
				name="creator"
				value={postData.creator}
				onChange={(e) => {
					setPostData((prevState) => {
						return { ...prevState, creator: e.target.value };
					});
				}}
			/>

			<br />
			<label for="selectedFile">selectedFile:</label>

			<input
				type="text"
				name="selectedFile"
				value={postData.selectedFile}
				onChange={(e) => {
					setPostData((prevState) => {
						return { ...prevState, selectedFile: e.target.value };
					});
				}}
			/>

			<br />
			<label for="tags">Tags:</label>

			<input
				type="text"
				name="tags"
				value={postData.tags}
				onChange={(e) => {
					setPostData((prevState) => {
						return { ...prevState, tags: e.target.value };
					});
				}}
			/>
			<br />

			<input type="submit" value="Submit" />
		</form>
	);
}

export default ContactForm;
