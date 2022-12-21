// import Api from '../Api';
import {axiosApi} from '../api';

export const getAllCategories = async () => {
	try {
		const categories = await axiosApi.get('/categories/all');
		return categories.data;
	} catch (error) {
		console.log('error', error);
		throw error;
	}
};

// export const getCategories = async (limit, offset, search) => {
// 	try {
// 		let paramSearch = !search ? '' : `&q=${search}`;
// 		const response = await axiosApi.get(
// 			`/categories?limit=${limit}&offset=${offset}${paramSearch}`
// 		);
// 		return response;
// 	} catch (error) {
// 		console.log('error', error);
// 		let message = '';
// 		message = error.response.data
// 			? `${error.response.data.statusCode}: ${error.response.data.message}`
// 			: 'Error Obteniendo categoría 😞';
// 		throw message;
// 	}
// };

// export const getCategory = async catId => {
// 	try {
// 		const response = await Api.get(`/categories/${catId}`);
// 		return response;
// 	} catch (error) {
// 		console.log('error', error);
// 		let message = '';
// 		message = error.response.data
// 			? `${error.response.data.statusCode}: ${error.response.data.message}`
// 			: 'Error Obteniendo categoría 😞';
// 		throw message;
// 	}
// };

export const createCategories = async newCategories => {
	console.log('newCategories', newCategories);
	try {
		const results = await Promise.all(
			newCategories.map(async cat => {
				delete cat.children_categories;
				await axiosApi.post('/categories', cat);
			})
		);
		return results;
	} catch (error) {
		let message = '';
		message = error.response.data
			? `${error.response.data.statusCode}: ${error.response.data.message}`
			: 'Error Creando categoría 😞';
		throw message;
	}
};

// export const deleteCategory = async category_id => {
// 	try {
// 		const res = await Api.delete(`/categories/${category_id}`);
// 		return res;
// 	} catch (error) {
// 		console.log('Error', error);
// 		let message = '';
// 		message = error.statusText
// 			? `${error.status}: ${error.statusText}`
// 			: 'Error eliminando la categoría 😞';
// 		throw message;
// 	}
// };
