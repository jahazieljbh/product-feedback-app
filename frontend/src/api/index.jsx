import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:3000/api/v1/' });

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}
	return req;
});

// feedbacks endpoints
export const fetchFeedbacks = () => API.get("/feedbacks");
export const filterFeedbacks = (query) =>
	API.get(`/feedbacks?category=${query}`);
export const fetchFeedbacksBySearch = (query) =>
	API.get(`/feedbacks/search?query=${query}`);
export const createFeedback = (newFeedback) =>
	API.post("/feedbacks", newFeedback);
export const updateFeedback = (id, updatedFeedback) =>
	API.patch(`/feedbacks/${id}`, updatedFeedback);
export const deleteFeedback = (id) => 
	API.delete(`/feedbacks/${id}`);
export const comment = (comment, id) =>
	API.patch(`/feedbacks/${id}/comment`, { comment });
export const upvoteFeedback = (id) => 
	API.patch(`/feedbacks/${id}/upvote`);

// auth endpoints
export const signIn = (formData) => 
	API.post("/users/signin", formData);
export const signUp = (formData) => 
	API.post("/users/signup", formData);