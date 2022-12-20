import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {formatDateTable} from '@/helpers/helpFunctions';
import {getApiMlUser} from '../../../services/api/userMl.api';

const UserMlDetail = () => {
	const [userDetail, setUserDetail] = useState(null);
	const id = useSelector(state => state.userMl.userMl.id);

	useEffect(() => {
		const getMlUser = async () => {
			try {
				const userMlDetail = await getApiMlUser(id);

				setUserDetail(userMlDetail);
			} catch (error) {
				console.log('error', error);
			}
		};
		getMlUser();
	}, []);

	return (
		<>
			<div className='container'>
				{userDetail && (
					<div className='formulario'>
						<div>
							<label htmlFor='id'>Id</label>
							<input
								className='form__input'
								value={userDetail.id}
								type='text'
								name='id'
								disabled
							/>
						</div>
						<div>
							<label htmlFor='registration'>Alta</label>
							<input
								className='form__input'
								value={formatDateTable(userDetail.registration_date)}
								type='text'
								name='registration'
								disabled
							/>
						</div>
						<div>
							<label htmlFor='name'>Nombre</label>
							<input
								className='form__input'
								value={userDetail.first_name}
								type='text'
								name='name'
								disabled
							/>
						</div>
						<div>
							<label htmlFor='last_name'>Apellido</label>
							<input
								className='form__input'
								value={userDetail.last_name}
								type='text'
								name='last_name'
								disabled
							/>
						</div>
						<div>
							<label htmlFor='gender'>Genero</label>
							<input
								className='form__input'
								value={userDetail.gender || ''}
								type='text'
								name='gender'
								disabled
							/>
						</div>
						<div>
							<label htmlFor='country'>País</label>
							<input
								className='form__input'
								value={userDetail.country_id}
								type='text'
								name='country'
								disabled
							/>
						</div>
						<div>
							<label htmlFor='email'>Email</label>
							<input
								className='form__input'
								value={userDetail.email}
								type='text'
								name='email'
								disabled
							/>
						</div>

						<div>
							<label htmlFor='identification'>Identificación</label>
							<input
								className='form__input'
								value={
									userDetail.identification.type +
									' - ' +
									userDetail.identification.number
								}
								type='text'
								name='identification'
								disabled
							/>
						</div>
						<div>
							<label htmlFor='phone'>Teléfono</label>
							<input
								className='form__input'
								value={`${userDetail.phone.area_code} ${
									userDetail.phone.extension
								} ${userDetail.phone.number}, verificado: ${
									userDetail.phone.verified ? 'si' : 'no'
								}`}
								type='text'
								name='phone'
								disabled
							/>
						</div>

						<div>
							<label htmlFor='user_type'>Tipo de usuario</label>
							<input
								className='form__input'
								value={userDetail.user_type}
								type='text'
								name='user_type'
								disabled
							/>
						</div>

						<div>
							<label htmlFor='logo'>Logo</label>
							<input
								className='form__input'
								value={userDetail.logo || ''}
								type='text'
								name='logo'
								disabled
							/>
						</div>

						<div>
							<label htmlFor='points'>Puntos</label>
							<input
								className='form__input'
								value={userDetail.points}
								type='text'
								name='points'
								disabled
							/>
						</div>

						<div>
							<label htmlFor='site_id'>Site</label>
							<input
								className='form__input'
								value={userDetail.site_id}
								type='text'
								name='site_id'
								disabled
							/>
						</div>

						<div>
							<label htmlFor='permalink'>Permalink</label>
							<input
								className='form__input'
								value={userDetail.permalink}
								type='text'
								name='permalink'
								disabled
							/>
						</div>

						<div className='wide'>
							<label htmlFor='address'>Dirección</label>
							<input
								className='form__input'
								value={`${userDetail.address.address}, ${userDetail.address.city} ${userDetail.address.state}, CP: ${userDetail.address.zip_code}`}
								type='text'
								name='address'
								disabled
							/>
						</div>

						<div className='wide'>
							<label htmlFor='company'>Compañia</label>
							<input
								className='form__input'
								value={`company: ${userDetail.company.brand_name} city-tax-id: ${userDetail.company.city_tax_id} corporación: ${userDetail.company.corporate_name} identificación: ${userDetail.company.identification} state-tax-id: ${userDetail.company.state_tax_id}`}
								type='text'
								name='company'
								disabled
							/>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default UserMlDetail;
