import {axiosMlApi} from '../apiMl';
import {axiosApi} from '../api';

import {createCategories, getAllCategories} from './categories.api';
import {getApiCategoriesMl} from './categories.api';

// /*****************/
// /***   Local   ***/
// /*****************/

export const getLocalProduct = async id => {
	try {
		const products = await axiosApi.get(`/products/${id}`);
		return products.data;
	} catch (error) {
		let message = '';
		message = error.response.data
			? `${error.response.data.statusCode}: ${error.response.data.message}`
			: 'Error Creando categoría 😞';
		throw message;
	}
};

// export const getLocalProducts = async (limit, offset, search) => {
export const getLocalProducts = async () => {
	try {
		// let paramSearch = !search ? '' : `&q=${search}`;
		// const products = await axiosApi.get(
		// 	`/products?limit=${limit}&offset=${offset}${paramSearch}`
		// );
		const products = await axiosApi.get('/products');
		return products.data;
	} catch (error) {
		let message = '';
		message = error.response.data
			? `${error.response.data.statusCode}: ${error.response.data.message}`
			: 'Error Creando categoría 😞';
		throw message;
	}
};

// export const getLocalSkus = async () => {
//   try {
//     const res = await Api.get(`products/getSkus`);
//     return res;
//   } catch (error) {
//     throw error;
//   }
// };

export const postLocalProducts = async newProducts => {
	try {
		const results = await Promise.all(
			newProducts.map(async prod => {
				const newProd = {
					// ml_id: prod.id,
					attributes: prod.attributes,
					title: prod.title,
					seller_custom_field: prod.seller_custom_field,
					price: prod.price,
					available_quantity: prod.available_quantity,
					// sold_quantity: prod.sold_quantity,
					status: prod.status,
					description: '',
					pictures: prod.pictures,
					listing_type_id: prod.listing_type_id,
					condition: prod.condition,
					thumbnail: prod.thumbnail,
					category_id: prod.category_id,
					start_time: prod.start_time,
					sale_terms: prod.sale_terms,
					variations: prod.variations,
				};
				let prod2 = await axiosApi.post('/products', newProd);
				prod2.data.ml_id = prod.id;
				// console.log("PRODID", prod2);
				return prod2.data;
			})
		);
		return results;
	} catch (error) {
		console.log('ERRORRRR', error);
		let message = '';
		message = error.response.data
			? `${error.response.data.statusCode}: ${error.response.data.message}`
			: 'Error Creando categoría 😞';
		throw message;
	}
};

export const putLocalDescProducts = async mlItems => {
	try {
		const results = await Promise.all(
			mlItems.map(async prod => {
				const newProd = {
					// ml_id: prod.id,
					description:
						prod.description.length > 5000
							? prod.description.substring(0, 5000)
							: prod.description,
				};
				return await axiosApi.put(`/products/${prod.prod_id}`, newProd);
			})
		);
		return results;
	} catch (error) {
		console.log('ERRORRRR', error);
		let message = '';
		message = error.response.data
			? `${error.response.data.statusCode}: ${error.response.data.message}`
			: 'Error Creando categoría 😞';
		throw message;
	}
};

// export const patchLocalProduct = async prod => {
// 	try {
// 		const newProd = {
// 			id: prod.id,
// 			ml_id: prod.mlId,
// 			attributes: prod.attributes,
// 			description: prod.description,
// 			title: prod.title,
// 			seller_custom_field: prod.seller_custom_field,
// 			price: prod.price,
// 			available_quantity: prod.available_quantity,
// 			sold_quantity: prod.sold_quantity,
// 			status: prod.status,
// 			pictures: prod.pictures,
// 			listing_type_id: prod.listing_type_id,
// 			condition: prod.condition,
// 			thumbnail: prod.thumbnail,
// 			category_id: prod.category_id,
// 			start_time: prod.start_time,
// 			sale_terms: prod.sale_terms,
// 			variations: prod.variations,
// 		};
//
// 		const res = await axiosApi.patch(`/products/${newProd.id}`, newProd);
// 		return res;
// 	} catch (error) {
// 		console.log('ERRORRRR', error);
// 		let message = '';
// 		message = error.response.data
// 			? `${error.response.data.statusCode}: ${error.response.data.message}`
// 			: 'Error Creando categoría 😞';
// 		throw message;
// 	}
// };

export const deleteLocalProduct = async id => {
	try {
		return await axiosApi.delete(`/products/${id}`);
	} catch (error) {
		console.log('Error', error);
		let message = '';
		message = error.statusText
			? `${error.status}: ${error.statusText}`
			: 'Error eliminando el producto 😞';
		throw message;
	}
};

// export const deleteLocalProducts = async (items) => {
//   try {
//     const results = await Promise.all(
//       items.map(async (prod) => {
//         const res = await Api.delete(`/products/${prod.id}`);
//         return res;
//       })
//     );
//     return results;
//   } catch (error) {
//     console.log("Error", error);
//     let message = "";
//     message = res.statusText
//       ? `${res.status}: ${res.statusText}`
//       : "Error eliminando el producto 😞";
//     throw message;
//   }
// };

// /*******************/
// /***   LocalMl   ***/
// /*******************/

export const getLocalMlProducts = async () => {
	try {
		const productsMl = await axiosApi.get('productsml');
		return productsMl;
	} catch (error) {
		return error;
	}
};

export const postLocalMlProducts = async newProducts => {
	try {
		const results = await Promise.all(
			newProducts.map(async prod => {
				const newProd = {
					id: prod.id,
					prod_id: prod.prod_id,
					seller_custom_field: prod.seller_custom_field,
					price: +prod.price.toFixed(2),
					available_quantity: prod.available_quantity,
					sold_quantity: prod.sold_quantity,
					status: prod.status,
					listing_type_id: prod.listing_type_id,
					permalink: prod.permalink,
					start_time: prod.start_time,
					variations: prod.variations,
				};
				await axiosApi.post('/productsMl', newProd);
			})
		);
		return results;
	} catch (error) {
		console.log('ERRORRRR', error);
		let message = '';
		message = error.response.data
			? `${error.response.data.statusCode}: ${error.response.data.message}`
			: 'Error Creando categoría 😞';
		throw message;
	}
};

// export const patchLocalMlProduct = async (prod) => {
//   try {
//     const newProd = {
//       id: prod.id,
//       prod_id: prod.prod_id,
//       seller_custom_field: prod.seller_custom_field,
//       price: prod.price,
//       available_quantity: prod.available_quantity,
//       status: prod.status,
//       permalink: prod.permalink,
//       start_time: prod.start_time,
//       variations: prod.variations,
//     };
//     return await Api.patch(`/productsMl/${newProd.id}`, newProd);
//   } catch (error) {
//     console.log("ERRORRRR", error);
//     let message = "";
//     message = error.response.data
//       ? `${error.response.data.statusCode}: ${error.response.data.message}`
//       : "Error modificando producto ML 😞";
//     throw message;
//   }
// };

export const putLocalMlProducts = async mlItems => {
	try {
		const results = await Promise.all(
			mlItems.map(async prod => {
				const newProd = {
					id: prod.id,
					prod_id: prod.prod_id,
					seller_custom_field: prod.seller_custom_field,
					// price: +parseFloat(prod.price.toFixed(2)),
					price: prod.price,
					available_quantity: prod.available_quantity,
					status: prod.status,
					permalink: prod.permalink,
					start_time: prod.start_time,
					variations: prod.variations,
				};
				return await axiosApi.put(`/productsMl/${newProd.id}`, newProd);
			})
		);
		return results;
	} catch (error) {
		console.log('ERRORRRR', error);
		let message = '';
		message = error.response.data
			? `${error.response.data.statusCode}: ${error.response.data.message}`
			: 'Error Creando categoría 😞';
		throw message;
	}
};

// export const delLocalMlProduct = async (id) => {
//   try {
//     return await Api.delete(`/productsMl/${id}`);
//   } catch (error) {
//     console.log("ERRORRRR", error);
//     let message = "";
//     message = error.response.data
//       ? `${error.response.data.statusCode}: ${error.response.data.message}`
//       : "Error modificando producto ML 😞";
//     throw message;
//   }
// };

// /**************/
// /***   Ml   ***/
// /**************/

export const getMlItems = async id => {
	try {
		const res = await axiosMlApi.get(`users/${id}/items/search`);

		const cantItems = res.data.paging.total;
		const pages = [];
		let items = [];
		for (let i = 0; i < cantItems; i = i + res.data.paging.limit) pages.push(i);
		const requests = pages.map(i => {
			return axiosMlApi
				.get(
					`users/${id}/items/search?limit=${res.data.paging.limit}&offset=${i}`
				)
				.then(res => res.data.results)
				.catch(err => err);
		});
		await Promise.all(requests).then(values => (items = values.flat()));

		return items;
	} catch (error) {
		// let message = '';
		console.log('ERROR', error);
		// message = error.response.data
		//   ? `${error.response.data.status} ${error.response.data.error}: ${error.response.data.message}`
		//   : "Error Obteniendo usuario ML 😞";
		// console.log("Error", error.response.data);
		throw error;
	}
};

export const getMlDescProducts = async mlItems => {
	let items = [];
	const req_items = [];
	const mlItems2 = JSON.parse(JSON.stringify(mlItems));
	const iteraciones = Math.ceil(mlItems2.length / 20);
	for (let i = 0; i < iteraciones; i++) {
		req_items[i] = mlItems2.splice(0, 20);
	}

	function processAsync(item) {
		return new Promise(function (resolve) {
			axiosMlApi
				.get(`items/${item.id}/description`)
				.then(resDesc => {
					item.description = resDesc.data.plain_text;
				})
				.catch(err => {
					if (err.response.status === 404) {
						item.description = '';
					}
				})
				.finally(() => {
					resolve(item);
				});
		});
	}

	return Promise.all(
		req_items.map(function (items) {
			return Promise.all(
				items.map(function (item) {
					return processAsync(item);
				})
			);
		})
	).then(function (data) {
		items = data.flat();
		return items;
	});
};

export const getMlProducts = async mlItems => {
	const detItems = [];
	const req_items = [];
	const mlItems2 = JSON.parse(JSON.stringify(mlItems));
	const iteraciones = Math.ceil(mlItems2.length / 20);
	for (let i = 0; i < iteraciones; i++) {
		req_items[i] = mlItems2.splice(0, 20);
	}

	let urls = [];

	req_items.map(items2 => {
		urls.push(
			`items?ids=${items2}&attributes=id,attributes,title,price,category_id,title,thumbnail,listing_type_id,condition,available_quantity,sold_quantity,status,permalink,pictures,sale_terms,variations,start_time,seller_custom_field`
		);
	});
	try {
		await Promise.all(urls.map(url => axiosMlApi(url))).then(results => {
			results.forEach(result => {
				result.data.forEach(async el => {
					detItems.push(el.body);
				});
			});
		});
		return detItems;
	} catch (error) {
		console.log('ERRORRRR', error);
		let message = '';
		message = error.response.data
			? `${error.response.data.statusCode}: ${error.response.data.message}`
			: 'Error Creando categoría 😞';
		throw message;
	}
};

// export const getMlProducts = async mlItems => {
// 	console.log('****************************************');
// 	const detItems = [];
// 	const req_items = [];
// 	const mlItems2 = JSON.parse(JSON.stringify(mlItems));
// 	const iteraciones = Math.ceil(mlItems2.length / 20);
// 	for (let i = 0; i < iteraciones; i++) {
// 		req_items[i] = mlItems2.splice(0, 20);
// 	}

// 	let urls = [];

// const req = req_items.map(async items2 => {
// 	console.log('items2', items2);
// 	return axiosMlApi
// 		.get(
// 			'items?ids=' +
// 				items2 +
// 				'&attributes=id,attributes,title,price,category_id,title,thumbnail,listing_type_id,condition,available_quantity,sold_quantity,status,permalink,pictures,sale_terms,variations,start_time,seller_custom_field'
// 		)
// 		.then(res => {
// 			res.data.map(
// 				async element =>
// 					await axiosMlApi
// 						.get(`items/${element.body.id}/description`)
// 						.then(resDesc => {
// 							element.body.description = resDesc.plain_text;
// 						})
// 						.catch(err => {
// 							if (err.response.status === 404) element.body.description = '';
// 						})
// 						.finally(() => {
// 							detItems.push(element.body);
// 						})
// 			);
// 		})
// 		.catch(err => console.log(err));
// });
// await Promise.all(req).then(response => console.log('description', response));
// return detItems;
// };

// export const patchMlProducts = async (mlItems) => {
//   try {
//     const results = await Promise.all(
//       mlItems.map(async (prod) => {
//         let id = prod.id;
//         delete prod.id;
//         return await ApiMl.put(`items/${id}`, prod);
//       })
//     );
//     return results;
//   } catch (error) {
//     console.log("ERR!!!!", error);
//     let message = "";
//     if (error.response.data) {
//       message = `${error.response.status}: ${error.response.data.message}`;
//       if (error.response.data.cause.length > 0) {
//         error.response.data.cause.forEach((el) => {
//           if (el.type === "error") message += `<br> ${el.message}`;
//         });
//       }
//     }
//     if (message === "") message = "Error modificando el producto 😞";
//     throw message;
//   }
// };

// export const patchMlProduct = async (mlItem) => {
//   try {
//     let id = mlItem.id;
//     delete mlItem.id;
//     return await ApiMl.put(`items/${id}`, mlItem);
//   } catch (error) {
//     console.log("ERR!!!!", error);
//     let message = "";
//     if (error.response.data) {
//       message = `${error.response.status}: ${error.response.data.message}`;
//       if (error.response.data.cause.length > 0) {
//         error.response.data.cause.forEach((el) => {
//           if (el.type === "error") message += `<br> ${el.message}`;
//         });
//       }
//     }
//     if (message === "") message = "Error modificando el producto 😞";
//     throw message;
//   }
// };

// export const patchMlDescription = async (descriptions) => {
//   try {
//     const results = await Promise.all(
//       descriptions.map(async (description) => {
//         let id = description.id;
//         delete description.id;
//         return await ApiMl.put(
//           `items/${id}/description?api_version=2`,
//           description
//         );
//       })
//     );
//     return results;
//   } catch (error) {
//     console.log("ERR!!!!", error);
//     let message = "";
//     if (error.response.data) {
//       message = `${error.response.status}: ${error.response.data.message}`;
//       if (error.response.data.cause.length > 0) {
//         error.response.data.cause.forEach((el) => {
//           if (el.type === "error") message += `<br> ${el.message}`;
//         });
//       }
//     }
//     if (message === "") message = "Error modificando la descripción 😞";
//     throw message;
//   }
// };

// export const postMlProduct = async (mlItem) => {
//   try {
//     return await ApiMl.post(`items`, mlItem);
//   } catch (error) {
//     console.log("ERR!!!!", error);
//     let message = "";
//     if (error.response.data) {
//       message = `${error.response.status}: ${error.response.data.message}`;
//       if (error.response.data.cause.length > 0) {
//         error.response.data.cause.forEach((el) => {
//           if (el.type === "error") message += `<br> ${el.message}`;
//         });
//       }
//     }
//     if (message === "") message = "Error modificando el producto 😞";
//     throw message;
//   }
// };

// /**************/
// /***  Web  ***/
// /**************/

// export const postWebProduct = async (prod) => {
//   try {
//     return await Api.post(`productsweb`, prod);
//   } catch (error) {
//     throw error;
//   }
// };
// export const deleteWebProduct = async (id) => {
//   try {
//     return await Api.delete(`/productsweb/${id}`);
//   } catch (error) {
//     throw error;
//   }
// };

// /********************/
// /***   Service   ****/
// /********************/

export const serviceImportMl = async (id, settings) => {
	try {
		const mlApiItemsId = await getMlItems(id);
		// console.log('mlApiItemsId', mlApiItemsId);
		const mlApiProducts = await getMlProducts(mlApiItemsId);
		// console.log('mlApiProducts', mlApiProducts);
		const mlProducts = await getLocalMlProducts();
		// console.log('mlProducts', mlProducts);
		const allCategories = await getAllCategories();
		// console.log('allCategories', allCategories);

		let newCategoriesId = [];
		let newItems = [];
		let updItems = [];
		mlApiProducts.forEach(apiMlProd => {
			const found = mlProducts.data.find(mlProd => mlProd.id === apiMlProd.id);
			if (found) {
				apiMlProd.prod_id = found.prod_id;
				updItems.push(apiMlProd);
			} else {
				newItems.push(apiMlProd);
			}
			const index2 = allCategories.findIndex(
				cat => cat.id === apiMlProd.category_id
			);

			if (index2 === -1) {
				if (!newCategoriesId.includes(apiMlProd.category_id))
					newCategoriesId.push(apiMlProd.category_id);
			}
		});

		if (newCategoriesId.length > 0) {
			const newCategories = await getApiCategoriesMl(newCategoriesId);
			await createCategories(newCategories);
		}
		// Copio newItems para modificar el precio
		const newItemsPrice = JSON.parse(JSON.stringify(newItems));

		// const user = get(credentials);

		const percent = settings.price_percent_ml;
		if (Object.prototype.hasOwnProperty.call(settings, 'price_percent_ml')) {
			// if (settings.hasOwnProperty('price_percent_ml')) {
			newItemsPrice.forEach(itemPrice => {
				itemPrice.price =
					itemPrice.price - itemPrice.price * (parseInt(percent) / 100);
			});
		}

		const newProducts = await postLocalProducts(newItemsPrice);
		newItems.forEach(item => {
			let found = newProducts.find(newProd => item.id === newProd.ml_id);
			if (found) item.prod_id = found.id;
		});
		const descriptions = newItems.map(item => ({
			id: item.id,
			prod_id: item.prod_id,
		}));
		const mlApidescProducts = await getMlDescProducts(descriptions);
		await putLocalDescProducts(mlApidescProducts);

		await postLocalMlProducts(newItems);
		await putLocalMlProducts(updItems);

		return newItems.concat(updItems);
	} catch (error) {
		console.log('ERRORRRR', error);
	}
};

// export const serviceUpdProduct = async (body, apps, feature) => {
//   console.log("apps", apps);
//   console.log("feature", feature);
//   try {
//     const prod = get(product);
//     switch (apps) {
//       case "ML":
//         body.id = prod.prodMl.id;
//         const resApi = await patchMlProduct(body);
//         console.log("resApi", resApi);
//         resApi.prod_id = prod.id;
//         const resMl = await patchLocalMlProduct(resApi);
//         break;
//       case "LOCAL":
//         body.id = prod.id;
//         const res = await patchLocalProduct(body);
//         break;
//       case "ML-LOCAL":
//         if (feature === "PRODUCT") {
//           body.id = prod.prodMl.id;
//           console.log("ML");
//           const resApi = await patchMlProduct(body);
//           resApi.prod_id = prod.id;
//           console.log("ML-LOCAL");
//           const resMl = await patchLocalMlProduct(resApi);
//           console.log("resMl", resMl);
//           resApi.id = prod.id;
//           delete resApi.status;
//           delete resApi.available_quantity;
//           delete resApi.price;
//           delete resApi.sold_quantity;
//           delete resApi.start_time;
//           console.log("LOCAL");
//           console.log("resApi", resApi);
//           await patchLocalProduct(resApi);
//           return;
//         }
//         if (feature === "DESCRIPTION") {
//           body.id = prod.prodMl.id;
//           const descriptionMl = await patchMlDescription([body]);
//           const description = {
//             id: prod.id,
//             description: descriptionMl[0].plain_text,
//           };
//           await patchLocalProduct([description]);
//           return;
//         }
//         break;
//       case "WEB-LOCAL":
//         break;
//       case "ALL":
//         break;
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// export const serviceCreateProduct = async () => {
//   try {
//     let attributes = [];
//     let newProduct = Object.assign({}, get(product));
//     delete newProduct.action;
//     delete newProduct.category;
//     delete newProduct.thumbnail;
//     delete newProduct.sold_quantity;
//     delete newProduct.prodMl;
//     delete newProduct.prodWeb;
//     delete newProduct.createdAt;
//     delete newProduct.id;
//     delete newProduct.updatedAt;

//     newProduct.variations.map((vari) => {
//       delete vari.id;
//       vari.price = newProduct.price;
//       return vari;
//     });
//     newProduct.attributes.map((attribute) => {
//       if (attribute.updated) {
//         let atrib = {
//           id: attribute.id,
//           value_id: attribute.value_id,
//           value_name: attribute.value_name,
//         };
//         attributes.push(atrib);
//       }
//     });
//     newProduct.attributes = attributes;
//     newProduct.currency_id = "ARS";
//     newProduct.sold_quantity = 0;
//     newProduct.thumbnail = newProduct.pictures[0].url;

//     const prodMl = await postLocalProducts([newProduct]);
//     return prodMl;
//   } catch (error) {
//     console.log("ERRRROR CREATE LOCAL", error);
//   }
// };

// export const serviceCreateMlProduct = async () => {
//   try {
//     let attributes = [];
//     let price = parseFloat(newProduct.price);
//     let newProduct = Object.assign({}, get(product));
//     let prod_id = newProduct.id;
//     const user = get(credentials);
//     if (user.settings.price_percent_ml) {
//       price = price + (price * user.settings.price_percent_ml) / 100;
//     }
//     delete newProduct.action;
//     delete newProduct.category;
//     delete newProduct.thumbnail;
//     delete newProduct.sold_quantity;
//     delete newProduct.prodMl;
//     delete newProduct.prodWeb;
//     delete newProduct.createdAt;
//     delete newProduct.id;
//     delete newProduct.updatedAt;

//     newProduct.variations.map((vari) => {
//       delete vari.id;
//       vari.price = price;
//       return vari;
//     });
//     newProduct.attributes.map((attribute) => {
//       if (attribute.updated) {
//         let atrib = {
//           id: attribute.id,
//           value_id: attribute.value_id,
//           value_name: attribute.value_name,
//         };
//         attributes.push(atrib);
//       }
//     });
//     newProduct.attributes = attributes;
//     newProduct.currency_id = "ARS";
//     newProduct.price = price;

//     const prodMl = await postMlProduct(newProduct);
//     console.log("res", prodMl);
//     prodMl.prod_id = prod_id;
//     const localMlprod = await postLocalMlProducts([prodMl]);
//     console.log("localMlprod", localMlprod);
//   } catch (error) {
//     console.log("ERRRROR CREATE", error);
//   }
// };

// export const serviceCreateWebProduct = async (prod) => {
//   let variations = [];
//   let price = parseFloat(prod.price);
//   const user = get(credentials);
//   if (user.settings.price_percent_web) {
//     price = price + (price * user.settings.price_percent_web) / 100;
//     prod.variations.forEach((vari) => {
//       vari.price = price;
//       variations.push(vari);
//     });
//   }
//   try {
//     let obj = {
//       prod_id: prod.id,
//       seller_custom_field: prod.seller_custom_field,
//       price: price,
//       available_quantity: prod.available_quantity,
//       status: prod.status,
//       permalink: prod.permalink,
//       start_time: Date.now(),
//       variations: variations,
//     };

//     const res = await postWebProduct(obj);
//     return res;
//   } catch (error) {
//     console.log("ERRRROR CREATE", error);
//   }
// };

// export const serviceRepublish = async (prod) => {
//   let price = parseFloat(prod.prodMl.price);
//   let item = {
//     price: price,
//     quantity: prod.prodMl.available_quantity,
//     listing_type_id: prod.listing_type_id,
//   };
//   if (prod.variations.length > 0) {
//     let variations = [];
//     prod.variations.map((vari) => {
//       variations.push({
//         id: vari.id,
//         price: price,
//         quantity: vari.available_quantity,
//       });
//     });
//     item.variations = variations;
//     delete item.price;
//     delete item.quantity;
//   }
//   try {
//     const resMl = await ApiMl.post(`items/${prod.prodMl.id}/relist`, item);
//     console.log("res", resMl);
//     const resDelLocalMl = await delLocalMlProduct(prod.prodMl.id);
//     console.log("resDelLocalMl", resDelLocalMl);
//     console.log("prod.id", prod.id);
//     resMl.prod_id = prod.id;
//     const resPostLocalMl = await postLocalMlProducts([resMl]);
//     console.log("resPostLocalMl", resPostLocalMl);
//   } catch (error) {
//     console.log("ERR!!!!", error);
//     let message = "";
//     if (error.response.data) {
//       message = `${error.response.status}: ${error.response.data.message}`;
//       if (error.response.data.cause.length > 0) {
//         error.response.data.cause.forEach((el) => {
//           if (el.type === "error") message += `<br> ${el.message}`;
//         });
//       }
//     }
//     if (message === "") message = "Error modificando el producto 😞";
//     throw message;
//   }
// };
