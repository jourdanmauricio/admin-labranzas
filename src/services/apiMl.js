import axios from 'axios';
import {store} from '../store';
import {variables} from '../config/variables';
import {getUserMl} from '../store/userMl';

export const axiosMlApi = axios.create({
	baseURL: variables.basePathMl,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosMlApi.interceptors.request.use(
	async config => {
		const state = store.getState();
		const token = state.userMl.userMl.access_token;
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

axiosMlApi.interceptors.response.use(
	function (response) {
		return response;
	},
	function async(err) {
		const originalConfig = err.config;

		if (err.response.status === 401 && !originalConfig._retry) {
			originalConfig._retry = true;
			store.dispatch(getUserMl());
			return axiosMlApi(originalConfig);
		}
		return Promise.reject(err);
	}
);
