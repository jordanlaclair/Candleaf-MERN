import axios from "axios";

const url = "http://localhost:5000/reviews";

export const fetchReviews = () => axios.get(url);

export const createReview = (newReview: Object) => axios.post(url, newReview);

export const deleteReview = (id: string) => axios.delete(`${url}/${id}`);
