import axios from "axios";

const url = "http://localhost:5000/products";

export const fetchCandles = () => axios.get(`${url}/candles`);

export const fetchCandle = (id: string) => axios.get(`${url}/candles/${id}`);

export const createCandle = (newCandle: Object) =>
	axios.post(`${url}/candles`, newCandle);

export const purchaseCandle = (id: string, quantity: number) =>
	axios.patch(`${url}/candles/${id}/${quantity}/purchase`);

export const updateCandle = (id: string, updatedCandle: object) =>
	axios.patch(`${url}/candles/${id}`, updatedCandle);

export const deleteCandle = (id: string) => axios.delete(`${url}/${id}`);
