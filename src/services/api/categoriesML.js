import {variables} from '../../config/variables';
import {axiosMlApi} from '../apiMl';
// import {axiosApi} from '../api';

export const getApiAllCategoriesMl = async () => {
	try {
		const categories = await axiosMlApi('/sites/MLA/categories');
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

// export const searchPredictor = async value => {
// 	try {
// 		const res = await axios(
// 			`${variables.basePathMl}/sites/MLA/domain_discovery/search?q=${value}`
// 		);
// 		const response = res.data;
// 		console.log('response pedictor: ', response);

// 		let categoriesMl = [];
// 		response.forEach(cat => categoriesMl.push(cat.category_id));

// 		if (response.length === 0) throw 'Intenta con otra palabra';

// 		const results = await getApiCategoriesMl(categoriesMl);
// 		console.log('results', results);

// 		return results;
// 	} catch (error) {
// 		console.log('error predictor', error);
// 		throw error;
// 	}
// };

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

// export const getApiAllCategoriesMl = async () => {
// 	// let {response, error, loading} = useAxiosMl({
// 	// 	method: 'GET',
// 	// 	url: '/sites/MLA/categories',
// 	// 	// url: 'https://api.mercadolibre.com/sites/MLA/search?seller_id=652092206',
// 	// 	// 	headers: {
// 	// 	// 		accept: '*/*',
// 	// 	// 	},
// 	// 	// 	data: {
// 	// 	// 		userId: 7,
// 	// 	// 		id: 777,
// 	// 	// 		title: 'New Post',
// 	// 	// 		body: 'This is a new post',
// 	// 	// 	},
// 	// });
// 	// console.log('********************************');
// 	// console.log('RESPONSE', response);
// 	// console.log('LOADING', loading);
// 	// console.log('ERROR', error);
// 	// console.log('********************************');

// 	// return {response, error, loading};
// 	return useAxiosMl({
// 		method: 'GET',
// 		url: '/sites/MLA/categories',
// 	});
// };

// const CategoriesMlService = {
// 	getApiAllCategoriesMl,
// };

// export default CategoriesMlService;
