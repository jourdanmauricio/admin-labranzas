import {axiosApi} from '../api';

export const fetchSettings = async () => {
	try {
		const response = await axiosApi.get(`/settings`);
		return response.data;
	} catch (err) {
		let message = '';
		message = err.response.data
			? `${err.response.status}: ${err.response.statusText} - ${err.response.data}`
			: 'Error Obteniendo configuración 😞';
		throw message;
	}
};

export const updateSettings = async setting => {
	try {
		const data = {
			setting: setting,
		};
		const response = await axiosApi.put('/settings', data);

		return response.data;
	} catch (error) {
		let message = '';
		message = error.response.data
			? `${error.response.data.statusCode}: ${error.response.data.message}`
			: 'Error modificando configuración 😞';
		throw message;
	}
};

// const postSetting = async data => {
// 	try {
// 		console.log('data', data);
// 		const settings = await Api.post('/settings', data);
// 		return settings;
// 	} catch (error) {
// 		let message = '';
// 		message = error.response.data
// 			? `${error.response.data.statusCode}: ${error.response.data.message}`
// 			: 'Error creando configuración 😞';
// 		throw message;
// 	}
// };
// 	return {getSettings};
// };
