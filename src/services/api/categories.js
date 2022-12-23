import {axiosApi} from '../api';
import {variables} from '../../config/variables';
import {axiosMlApi} from '../apiMl';
import axios from 'axios';

/////////////////
//   LAB API   //
/////////////////
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

export const getCategory = async catId => {
	try {
		const response = await axiosApi.get(`/categories/${catId}`);
		return response;
	} catch (error) {
		let message = '';
		message = error.response.data
			? `${error.response.data.statusCode}: ${error.response.data.message}`
			: 'Error Obteniendo categoría 😞';
		throw message;
	}
};

export const createCategories = async newCategories => {
	console.log('newCategories', newCategories);
	try {
		const results = await Promise.all(
			newCategories.map(async cat => {
				delete cat.children_categories;
				return await axiosApi.post('/categories', cat);
			})
		);
		console.log('results', results);
		return results;
	} catch (error) {
		let message = '';
		message = error.response.data
			? `${error.response.data.statusCode}: ${error.response.data.message}`
			: 'Error Creando categoría 😞';
		throw message;
	}
};

export const putCategory = async (id, category) => {
	try {
		const updCategory = await axiosApi.put(`/categories/${id}`, category);
		return updCategory.data;
	} catch (error) {
		let message = '';
		message = error.response.data
			? `${error.response.data.statusCode}: ${error.response.data.message}`
			: 'Error Creando categoría 😞';
		throw message;
	}
};

export const deleteCategory = async category_id => {
	try {
		const res = await axiosApi.delete(`/categories/${category_id}`);
		return res;
	} catch (error) {
		console.log('Error', error);
		let message = '';
		message = error.response.data
			? `${error.response.data.statusCode}: ${error.response.data.message}`
			: 'Error eliminando la categoría 😞';
		throw message;
	}
};

////////////////
//   ML API   //
////////////////
export const getApiAllCategoriesMl = async () => {
	try {
		const categories = await axios(
			`${variables.basePathMl}/sites/MLA/categories`
		);
		return categories.data;
	} catch (err) {
		console.log(err);
	}
};

export const getApiCategoriesMl = async mlCategoriesIds => {
	try {
		return await Promise.all(
			mlCategoriesIds.map(async cat => {
				let mlCategory = await axiosMlApi(`/categories/${cat}`);
				let atribs = await getAtribsCat(cat);

				let full_name = '';
				mlCategory.data.path_from_root.forEach((parent, index) => {
					full_name += index === 0 ? parent.name : ` / ${parent.name}`;
				});

				const newCategory = {
					id: mlCategory.data.id,
					name: mlCategory.data.name,
					full_name: full_name,
					path_from_root: mlCategory.data.path_from_root,
					children_categories: mlCategory.data.children_categories,
					settings: mlCategory.data.settings,
					picture: mlCategory.data.picture,
					attributes: atribs[0],
					attributes_oblg: atribs[1],
				};
				return newCategory;
			})
		);
	} catch (error) {
		console.log(error);
	}
};

export const searchPredictor = async value => {
	try {
		const res = await axios(
			`${variables.basePathMl}/sites/MLA/domain_discovery/search?q=${value}`
		);
		const response = res.data;
		let categoriesMl = [];
		response.forEach(cat => categoriesMl.push(cat.category_id));

		if (response.length === 0) throw 'Intenta con otra palabra';

		const results = await getApiCategoriesMl(categoriesMl);

		return results;
	} catch (error) {
		console.log('error predictor', error);
		throw error;
	}
};

export const getAtribsCat = async catId => {
	const urls = [
		`${variables.basePathMl}/categories/${catId}/attributes`,
		`${variables.basePathMl}/categories/${catId}/technical_specs/input`,
	];
	try {
		const atribs = await Promise.all(
			urls.map(url => fetch(url).then(res => res.json()))
		);
		return atribs;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
