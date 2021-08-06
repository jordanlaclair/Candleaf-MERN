import axios from "axios";

const url = "http://localhost:5000/users";

export const fetchUsers = () => axios.get(url);
export const fetchUser = (id: string) => axios.get(`${url}/${id}`);
export const createUser = (newUser: object) => axios.post(url, newUser);
export const updateUser = (id: string, updatedUser: object) =>
	axios.patch(`${url}/${id}`, updatedUser);
export const deleteUser = (id: string) => axios.delete(`${url}/${id}`);
