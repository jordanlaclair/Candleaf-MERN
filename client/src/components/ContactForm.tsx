import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { bindActionCreators } from "redux";
import * as action from "../store/actions/index";
function ContactForm() {
	interface IpostData {
		creator: string;
		title: string;
		message: string;
		tags: string;
		selectedFile: string;
	}

	const [postData, setPostData] = useState<IpostData>({
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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(action.createPost(postData));
		clearPostData();
	};

	return (
		<form
			autoComplete="off"
			onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
				handleSubmit(e);
			}}
		>
			<label htmlFor="title">Title:</label>

			<input
				type="text"
				value={postData.title}
				name="title"
				onChange={(e: React.FormEvent<HTMLInputElement>) => {
					setPostData((prevState) => {
						return {
							...prevState,
							title: (e.target as HTMLInputElement).value,
						};
					});
				}}
			/>
			<br />
			<label htmlFor="message">Message:</label>

			<input
				type="text"
				name="message"
				value={postData.message}
				onChange={(e: React.FormEvent<HTMLInputElement>) => {
					setPostData((prevState) => {
						return {
							...prevState,
							message: (e.target as HTMLInputElement).value,
						};
					});
				}}
			/>
			<br />
			<label htmlFor="creator">Creator:</label>

			<input
				type="text"
				name="creator"
				value={postData.creator}
				onChange={(e: React.FormEvent<HTMLInputElement>) => {
					setPostData((prevState) => {
						return {
							...prevState,
							creator: (e.target as HTMLInputElement).value,
						};
					});
				}}
			/>

			<br />
			<label htmlFor="selectedFile">selectedFile:</label>

			<input
				type="text"
				name="selectedFile"
				value={postData.selectedFile}
				onChange={(e: React.FormEvent<HTMLInputElement>) => {
					setPostData((prevState) => {
						return {
							...prevState,
							selectedFile: (e.target as HTMLInputElement).value,
						};
					});
				}}
			/>

			<br />
			<label htmlFor="tags">Tags:</label>

			<input
				type="text"
				name="tags"
				value={postData.tags}
				onChange={(e: React.FormEvent<HTMLInputElement>) => {
					setPostData((prevState) => {
						return { ...prevState, tags: (e.target as HTMLInputElement).value };
					});
				}}
			/>
			<br />

			<input type="submit" value="Submit" />
		</form>
	);
}

export default ContactForm;
