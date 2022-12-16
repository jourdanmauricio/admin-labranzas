import {useEffect} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {putSettings} from '../../../../store/settings';
import Loader from '@/commons/Loader-overlay/Loader-overlay';

const Fonts = ({updated}) => {
	let {status} = useSelector(state => state.settings);
	let settings = useSelector(state => state.settings.settings?.fonts);
	const dispatch = useDispatch();

	return (
		<Formik
			initialValues={{
				title_font_size: '30px',
				paragraph_font_size: '16px',
				title_font_weight: 400,
				paragraph_font_weight: 400,
				h1_font_size: '40px',
				h1_font_weight: 400,
				paragraph_header_size: '16px',
				paragraph_header_weight: 400,
			}}
			validate={values => {
				const errors = {};
				if (
					values.paragraph_font_size.length > 0 &&
					!/^([0-9]){1,2}px$/.test(values.paragraph_font_size)
				) {
					errors.paragraph_font_size = 'Formato en pixeles. Ej 16px';
				}
				if (
					values.title_font_size.length > 0 &&
					!/^([0-9]){1,2}px$/.test(values.title_font_size)
				) {
					errors.title_font_size = 'Formato en pixeles. Ej 30px';
				}
				if (
					values.h1_font_size.length > 0 &&
					!/^([0-9]){1,2}px$/.test(values.h1_font_size)
				) {
					errors.h1_font_size = 'Formato en pixeles. Ej 30px';
				}
				if (
					values.paragraph_header_size.length > 0 &&
					!/^([0-9]){1,2}px$/.test(values.paragraph_header_size)
				) {
					errors.paragraph_header_size = 'Formato en pixeles. Ej 30px';
				}

				return errors;
			}}
			onSubmit={async (values, {setSubmitting}) => {
				dispatch(putSettings({fonts: {...values}}));
				updated();
				setSubmitting(false);
			}}>
			{({isSubmitting, setFieldValue}) => {
				useEffect(() => {
					if (settings) {
						setFieldValue(
							'title_font_size',
							settings.title_font_size || '30px'
						);
						setFieldValue(
							'title_font_weight',
							settings.title_font_weight || 400
						);

						setFieldValue(
							'paragraph_font_size',
							settings.paragraph_font_size || '16px'
						);

						setFieldValue(
							'paragraph_font_weight',
							settings.paragraph_font_weight || 400
						);
						setFieldValue('h1_font_size', settings.h1_font_size || '16px');
						setFieldValue('h1_font_weight', settings.h1_font_weight || 400);
						setFieldValue(
							'paragraph_header_size',
							settings.paragraph_header_size || '16px'
						);
						setFieldValue(
							'paragraph_header_weight',
							settings.paragraph_header_weight || 400
						);
					}
				}, [settings]);

				return (
					<Form>
						{status === 'loading' && <Loader />}
						<div className='formulario'>
							<div>
								<label htmlFor='title_font_size'>Tamaño para títulos</label>
								<Field
									className='form__input'
									type='text'
									name='title_font_size'
									placeholder='30px'
								/>
								<ErrorMessage
									name='title_font_size'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>
							<div>
								<label htmlFor='title_font_weight'>Peso para títulos</label>
								<Field
									className='form__input'
									as='select'
									type='text'
									name='title_font_weight'
									// onChange={(e) => handleChange(e.target.value)}
								>
									<option value={400}>400</option>
									<option value={500}>500</option>
									<option value={600}>600</option>
									<option value={700}>700</option>
								</Field>
							</div>
							<div>
								<label htmlFor='paragraph_font_size'>
									Tamaño para párrafos
								</label>
								<Field
									className='form__input'
									type='text'
									name='paragraph_font_size'
									placeholder='16px'
								/>
								<ErrorMessage
									name='paragraph_font_size'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>

							<div>
								<label htmlFor='paragraph_font_weight'>
									Peso para párrafos
								</label>
								<Field
									className='form__input'
									as='select'
									type='text'
									name='paragraph_font_weight'
									// onChange={(e) => handleChange(e.target.value)}
								>
									<option value={400}>400</option>
									<option value={500}>500</option>
									<option value={600}>600</option>
									<option value={700}>700</option>
								</Field>
							</div>
							<div>
								<label htmlFor='h1_font_size'>Tamaño para H1</label>
								<Field
									className='form__input'
									type='text'
									name='h1_font_size'
									placeholder='30px'
								/>
								<ErrorMessage
									name='h1_font_size'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>
							<div>
								<label htmlFor='h1_font_weight'>Peso para H1</label>
								<Field
									className='form__input'
									as='select'
									type='text'
									name='h1_font_weight'
									// onChange={(e) => handleChange(e.target.value)}
								>
									<option value={400}>400</option>
									<option value={500}>500</option>
									<option value={600}>600</option>
									<option value={700}>700</option>
								</Field>
							</div>

							<div>
								<label htmlFor='paragraph_header_size'>
									Tamaño para párrafo en header
								</label>
								<Field
									className='form__input'
									type='text'
									name='paragraph_header_size'
									placeholder='16px'
								/>
								<ErrorMessage
									name='paragraph_header_size'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>
							<div>
								<label htmlFor='paragraph_header_weight'>
									Peso para párrafo en header
								</label>
								<Field
									className='form__input'
									as='select'
									type='text'
									name='paragraph_header_weight'
									// onChange={(e) => handleChange(e.target.value)}
								>
									<option value={400}>400</option>
									<option value={500}>500</option>
									<option value={600}>600</option>
									<option value={700}>700</option>
								</Field>
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

export default Fonts;
