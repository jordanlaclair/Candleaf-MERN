import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";

const url = "https://candleaf-mern.herokuapp.com/users";

export const fetchUsers = () => axios.get(url);
export const fetchUser = (id: string) =>
	axios
		.get(`${url}/${id}`)
		.then((response) => {
			console.log(response.status);
			return response;
		})
		.catch((error) => {
			console.log(error.response?.status);
			return error.response;
		});
export const fetchAuthUser = (id: string) =>
	axios
		.get(`${url}/auth/${id}`)
		.then((response: AxiosResponse) => {
			return response;
		})
		.catch((error: AxiosError) => {
			return error.response;
		});

export const createUser = (newUser: object) => axios.post(url, newUser);
export const updateUser = (id: string, updatedUser: object) =>
	axios.patch(`${url}/${id}`, updatedUser);
export const updateAuthUser = (id: string, updatedUser: object) =>
	axios.patch(`${url}/auth/${id}`, updatedUser);
export const deleteUser = (id: string) => axios.delete(`${url}/${id}`);
