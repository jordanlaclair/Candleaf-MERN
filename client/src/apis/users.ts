import axios from "axios";

const url = "https://candleaf-mern.herokuapp.com/users";

export const fetchUsers = () => axios.get(url);
export const fetchUser = (id: string) => axios.get(`${url}/${id}`);
export const createUser = (newUser: object) => axios.post(url, newUser);
export const updateUser = (id: string, updatedUser: object) =>
	axios.patch(`${url}/${id}`, updatedUser);
export const deleteUser = (id: string) => axios.delete(`${url}/${id}`);
