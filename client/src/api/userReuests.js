import axios from "axios";
const token = localStorage.getItem("jwtToken");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// main url for the backend server
const mainUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/todo`;

// login
export const Login = async (id, data) =>
	await axios.post(`${mainUrl}/update/${id}`, data);

// logout
export const Logout = async (id) => await axios.get(`${mainUrl}/delete/${id}`);
