import axios from 'axios';
import {variables} from '@/config/variables';
import {useSelector} from 'react-redux';

export const useApi = () => {
	let user = useSelector(state => state.user.user);

	const axiosAPI = axios.create({
		baseURL: variables.basePath,
	});

	const apiRequest = (method, url, request) => {
		const headers = {
			Authorization: `Bearer ${user.token}`,
		};

		return axiosAPI({
			method,
			url,
			data: request,
			headers,
		})
			.then(res => {
				return Promise.resolve(res.data);
			})
			.catch(err => {
				return Promise.reject(err);
			});
	};

	const get = (url, request) => apiRequest('get', url, request);
	const deleteRequest = (url, request) => apiRequest('delete', url, request);
	const post = (url, request) => apiRequest('post', url, request);
	const put = (url, request) => apiRequest('put', url, request);
	const patch = (url, request) => apiRequest('patch', url, request);
	// const setAuth = (token) => {
	//   axiosAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	// };

	// expose your method to other services or actions
	return {
		get,
		delete: deleteRequest,
		post,
		put,
		patch,
		// setAuth,
	};
};
// export default API;
