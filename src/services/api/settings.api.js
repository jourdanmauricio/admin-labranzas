// import {useApi} from '../Api';

// export const fetchSettings = () => {
// let Api = useApi();

// const getSettings = async () => {
// 	console.log('GET SETTINGS');
// 	try {
// 		const response = await Api.get(`/settings`);
// 		return response;
// 	} catch (error) {
// 		let message = '';
// 		message = error.response.data
// 			? `${error.response.data.statusCode}: ${error.response.data.message}`
// 			: 'Error Obteniendo configuración 😞';
// 		throw message;
// 	}
// };

// const putSetting = async setting => {
// 	try {
// 		const user = get(credentials);
// 		const data = {
// 			user_id: user.id,
// 			setting: setting,
// 		};
// 		console.log('data', data);
// 		const settings = await Api.put(`/settings/${user.id}`, data);

// 		return settings;
// 	} catch (error) {
// 		let message = '';
// 		message = error.response.data
// 			? `${error.response.data.statusCode}: ${error.response.data.message}`
// 			: 'Error modificando configuración 😞';
// 		throw message;
// 	}
// };

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
