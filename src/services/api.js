import axios from 'axios';
import {store} from '../store';
import {variables} from '../config/variables';

export const axiosApi = axios.create({
	baseURL: variables.basePath,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosApi.interceptors.request.use(
	async config => {
		const state = store.getState();
		const token = state.user?.user?.token;
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

axiosApi.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		return Promise.reject(error);
	}
);
