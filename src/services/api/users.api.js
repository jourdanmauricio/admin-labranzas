import {variables} from '@/config/variables';
import {useApi} from '../Api';

export const fetchUsers = () => {
	let api = useApi();

	const getProfile = async () => {
		try {
			const profile = await api.get(`${variables.basePath}/users/profile`);
			return profile;
		} catch (error) {
			let message = '';
			console.log('error in users', error);
			message = error.response.status
				? `${error.response.status}: ${error.response.statusText} - ${error.response.data}`
				: 'Error Obteniendo Usuarios 😞';
			throw message;
		}
	};

	const getUsers = async () => {
		try {
			const users = await api.get(`${variables.basePath}/users`);
			return users;
		} catch (error) {
			let message = '';
			console.log('error in users', error);
			message = error.response.status
				? `${error.response.status}: ${error.response.statusText} - ${error.response.data}`
				: 'Error Obteniendo Usuarios 😞';
			throw message;
		}
	};

	const postUser = async user => {
		try {
			const newUser = await api.post(`${variables.basePath}/users`, user);
			return newUser;
		} catch (error) {
			let message = '';
			console.log('error in users', error);
			message = error.response.status
				? `${error.response.status}: ${error.response.statusText} - ${error.response.data}`
				: 'Error Obteniendo Usuarios 😞';
			throw message;
		}
	};

	const putUser = async user => {
		try {
			const newUser = await api.put(
				`${variables.basePath}/users/change-password/${user.id}`,
				user
			);
			return newUser;
		} catch (error) {
			let message = '';
			console.log('error in users', error);
			message = error.response.status
				? `${error.response.status}: ${error.response.statusText} - ${error.response.data}`
				: 'Error modifcando el usuario 😞';
			throw message;
		}
	};

	const deleteUser = async id => {
		try {
			const user = await api.delete(`${variables.basePath}/users/${id}`);
			return user;
		} catch (error) {
			let message = '';
			console.log('error in users', error);
			message = error.response.status
				? `${error.response.status}: ${error.response.statusText} - ${error.response.data}`
				: 'Error modifcando el usuario 😞';
			throw message;
		}
	};

	return {getUsers, postUser, putUser, deleteUser, getProfile};
};
