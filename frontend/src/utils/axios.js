import axios from 'axios';
import hashFunction from './bcrypt';

export const client = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`,
	headers: {
		Authorization: hashFunction(import.meta.env.VITE_SECRET_CODE),
	},
});
