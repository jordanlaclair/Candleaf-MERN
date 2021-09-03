import axios from "axios";

const url = "https://candleaf-mern.herokuapp.com/reviews";

export const fetchReviews = () => axios.get(url);

export const fetchReviewsFromCandle = (id: string) =>
	axios.get(`${url}/candle/${id}`);

export const createReview = (newReview: Object) => axios.post(url, newReview);

export const deleteReview = (id: string) => axios.delete(`${url}/${id}`);
