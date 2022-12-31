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
		return response.data;
	} catch (error) {
		let message = '';
		message = error.response.data
			? `${error.response.data.statusCode}: ${error.response.data.message}`
			: 'Error Obteniendo categoría 😞';
		throw message;
	}
};

export const createCategories = async newCategories => {
	try {
		const results = await Promise.all(
			newCategories.map(async cat => {
				delete cat.children_categories;
				if (!cat.description_web) cat.description_web = cat.name;
				return await axiosApi.post('/categories', cat);
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
				const mlCategory = await axiosMlApi(`/categories/${cat}`);
				const category = mlCategory.data;

				// Category Settings
				const settings = [
					{
						category: {
							catalog_domain: category.settings.catalog_domain,
							coverage_areas: category.settings.coverage_areas,
							currencies: category.settings.currencies,
							fragile: category.settings.fragile,
							item_conditions: category.settings.item_conditions,
							items_reviews_allowed: category.settings.items_reviews_allowed,
							listing_allowed: category.settings.listing_allowed,
							max_description_length: category.settings.max_description_length,
							max_pictures_per_item: category.settings.max_pictures_per_item,
							max_pictures_per_item_var:
								category.settings.max_pictures_per_item_var,
							max_title_length: category.settings.max_title_length,
							max_variations_allowed: category.settings.max_variations_allowed,
							maximum_price: category.settings.maximum_price,
							minimum_price: category.settings.minimum_price,
							price: category.settings.price,
							reservation_allowed: category.settings.reservation_allowed,
							restrictions: category.settings.restrictions,
							stock: category.settings.stock,
							tags: category.settings.tags,
							status: category.settings.status,
						},
						shipping: {
							seller_contact: category.settings.seller_contact,
							show_contact_information:
								category.settings.show_contact_information,
							shipping_options: category.settings.shipping_options,
							shipping_profile: category.settings.shipping_profile,
							simple_shipping: category.settings.simple_shipping,
						},
					},
				];

				const attribs = await getAtribsCat(cat);

				// Attributes Details
				let attributes_details = [];
				attribs[1].groups.forEach(group => {
					group.components.forEach(component => {
						component.attributes.forEach(attrib => {
							const newAttrib = {
								group_id: group.id,
								group_label: group.label,
								ui_config: component.ui_config,
								id: attrib.id,
								name: attrib.name,
								value_type: attrib.value_type,
								value_max_length: attrib.value_max_length,
								tags: attrib.tags,
							};
							attributes_details.push(newAttrib);
						});
					});
				});

				// Catgory full name
				let full_name = '';
				category.path_from_root.forEach((parent, index) => {
					full_name += index === 0 ? parent.name : ` / ${parent.name}`;
				});

				const newCategory = {
					id: category.id,
					name: category.name,
					full_name: full_name,
					path_from_root: category.path_from_root,
					children_categories: category.children_categories,
					settings: settings,
					picture: category.picture,
					attributes: attribs[0],
					attributes_details: attributes_details,
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
