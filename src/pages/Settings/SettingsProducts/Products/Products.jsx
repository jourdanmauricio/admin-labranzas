import {useEffect} from 'react';
// import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Field, Form, Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {putSettings} from '../../../../store/settings';
import Loader from '@/commons/Loader-overlay/Loader-overlay';

const Products = ({updated}) => {
	let {status} = useSelector(state => state.settings);
	let settings = useSelector(state => state.settings.settings?.products);
	const dispatch = useDispatch();

	return (
		<Formik
			initialValues={{
				status: '',
				listing_type_id: '',
				condition: '',
				hintSku: false,
				price_percent_ml: '',
				price_percent_web: '',
			}}
			// validate={values => {
			// const errors = {};
			// if (
			// 	values.paragraph_font_size.length > 0 &&
			// 	!/^([0-9]){1,2}px$/.test(values.paragraph_font_size)
			// ) {
			// 	errors.paragraph_font_size = 'Formato en pixeles. Ej 16px';
			// }
			// return errors;
			// }}
			onSubmit={async (values, {setSubmitting}) => {
				dispatch(putSettings({products: {...values}}));
				updated();
				setSubmitting(false);
			}}>
			{({isSubmitting, setFieldValue}) => {
				useEffect(() => {
					if (settings) {
						setFieldValue('status', settings.status || 'active');
						setFieldValue(
							'listing_type_id',
							settings.listing_type_id || 'gold_special'
						);
						setFieldValue('condition', settings.condition || 'new');
						setFieldValue('hintSku', settings.hintSku || false);
						setFieldValue('price_percent_ml', settings.price_percent_ml || 0);
						setFieldValue('price_percent_web', settings.price_percent_web || 0);
					}
				}, [settings]);

				return (
					<Form>
						{status === 'loading' && <Loader />}
						<div className='formulario pt'>
							<div>
								<label htmlFor='status'>Estado</label>
								<Field as='select' className='form__input' name='status'>
									<option value='active'>Activo</option>
									<option value='paused'>Pausado</option>
								</Field>
							</div>
							<div>
								<label htmlFor='listing_type_id'>Tipo de publicación</label>
								<Field
									className='form__input'
									as='select'
									name='listing_type_id'>
									<option value='gold_special'>Clásica</option>
									<option value='gold_pro'>Premium</option>
								</Field>
							</div>
							<div>
								<label htmlFor='price_percent_ml'>% precio ML</label>
								<Field
									className='form__input'
									type='number'
									name='price_percent_ml'
									placeholder='0'
								/>
								{/* <ErrorMessage
									name='paragraph_font_size'
									render={msg => <div className='error'>{msg}</div>}
								/> */}
							</div>
							<div>
								<label htmlFor='price_percent_web'>% precio WEB</label>
								<Field
									className='form__input'
									type='number'
									name='price_percent_web'
									placeholder='0'
								/>
								{/* <ErrorMessage
									name='paragraph_font_size'
									render={msg => <div className='error'>{msg}</div>}
								/> */}
							</div>
							<div>
								<label htmlFor='condition'>Condición del item</label>
								<Field className='form__input' as='select' name='condition'>
									<option value='new'>Nuevo</option>
									<option value='useed'>Usado</option>
								</Field>
							</div>
							<div className='check__container'>
								<label>
									<Field className='checkbox' type='checkbox' name='hintSku' />
									<span>Sugerir SKU</span>
								</label>
							</div>

							{/* ACTIONS */}
							<div className='wide action'>
								<button
									className='btn btn__primary'
									type='submit'
									disabled={isSubmitting}>
									Modificar
								</button>
							</div>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default Products;
