import axios from "axios";
const token = localStorage.getItem("jwtToken");
axios.defaults.headers.common["Authorization"] = token;

// main url for the backend server
const mainUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/user`;

// login
export const Login = async (data) => await axios.post(`${mainUrl}/login`, data);

// register
export const Register = async (data) =>
	await axios.post(`${mainUrl}/register`, data);

// logout
export const Logout = async () => await axios.get(`${mainUrl}/logout`);

// load user
export const LoadUser = async () => await axios.get(`${mainUrl}/load`);
