import {useEffect, useState} from 'react';
import {descriptionVariation} from '@/helpers/helpFunctions';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import styles from '../products.module.css';

const ProductVariations = ({data}) => {
	const [variations, setVariations] = useState(null);

	useEffect(() => {
		const vars = [];
		data.variations.forEach(vari => {
			const quantityLocal = vari.available_quantity;
			let quantityMl;
			let quantityWeb;
			let pictures = [];
			const descVar = descriptionVariation(vari)[1];
			vari.picture_ids.forEach(varPic => {
				const found = data.pictures.find(pic => pic.id === varPic);
				if (found) pictures.push(found.secure_url);
			});
			const found = data.prodMl?.variations.find(varMl => varMl.id === vari.id);
			if (found) quantityMl = found.available_quantity;

			const found2 = data.prodWeb?.variations.find(
				varWeb => varWeb.id === vari.id
			);

			if (found2) quantityWeb = found2.available_quantity;

			const obj = {
				id: vari.id,
				descVar,
				quantityLocal,
				quantityMl,
				quantityWeb,
				pictures,
				currentPicture: 0,
			};
			vars.push(obj);
		});
		setVariations(vars);
	}, []);

	const handleChangeImg = (e, vari, direction) => {
		e.stopPropagation();
		e.preventDefault();

		const maxPictures = vari.pictures.length - 1;
		if (direction === 'LEFT' && vari.currentPicture === 0) {
			vari.currentPicture = maxPictures;
		} else if (direction === 'RIGTH' && vari.currentPicture === maxPictures) {
			vari.currentPicture = 0;
		} else {
			direction === 'LEFT' ? vari.currentPicture-- : vari.currentPicture++;
		}

		let newData = variations.map(el => (el.id === vari.id ? vari : el));
		setVariations(newData);
	};

	return (
		<>
			{variations?.length > 0 ? (
				<div className={`table__container ${styles.product_systems}`}>
					<table className='table'>
						<caption>Variaciones</caption>
						<thead>
							<tr>
								<th>{descriptionVariation(data.variations[0])[0]}</th>
								<th>Cantidad Local</th>
								<th>Cantidad ML</th>
								<th>Cantidad Web</th>
								<th>Imágenes</th>
							</tr>
						</thead>
						<tbody>
							{variations.map(vari => (
								<tr key={vari.id}>
									<td data-titulo='Variación'>{vari.descVar}</td>
									<td data-titulo='Cantidad Local'>{vari.quantityLocal}</td>
									<td data-titulo='Cantidad ML'>{vari.quantityMl}</td>
									<td data-titulo='Cantidad Web'>{vari.quantityWeb}</td>
									<td className={styles.table__images} data-titulo='Imágenes'>
										<FaChevronLeft
											className={styles.images__icon}
											onClick={e => handleChangeImg(e, vari, 'LEFT')}
										/>
										<img
											className={styles.image__var}
											src={vari.pictures[vari.currentPicture]}
											alt=''
										/>
										<FaChevronRight
											className={styles.images__icon}
											onClick={e => handleChangeImg(e, vari, 'RIGTH')}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p>No posee variaciones</p>
			)}
		</>
	);
};

export default ProductVariations;
