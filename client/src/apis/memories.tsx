import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost: Object) => axios.post(url, newPost);
export const likePost = (id: Number) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id: Number, updatedPost: Object) =>
	axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id: Number) => axios.delete(`${url}/${id}`);
