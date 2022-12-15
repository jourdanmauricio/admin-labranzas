import {useEffect} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {helpHttp} from '@/services/helpHttp';
import {variables} from '@/config/variables';

const Colors = ({settings, setError, dispatch, setLoading}) => {
	const api = helpHttp();
	const url = `${variables.basePath}/settings`;
	return (
		<Formik
			initialValues={{
				title_color: '#000000',
				paragraph_color: '#000000',
				button_color: '#531253',
				effect_color: '#531253',
				error_color: '#f44336',
				divisor_color: '#170312',
				h1_color: '#ffffff',
				paragraph_header_color: '#ffffff',
				background_color: '#eaeaea',
				background_footer_color: '#9fabb2',
			}}
			validate={values => {
				const errors = {};
				if (
					values.title_color.length > 0 &&
					!/^#?([a-fA-F0-9]){6}$/.test(values.title_color)
				) {
					errors.title_color = 'Formato Hexadecimal #rrggbb';
				}

				if (
					values.paragraph_color.length > 0 &&
					!/^#?([a-fA-F0-9]){6}$/.test(values.paragraph_color)
				) {
					errors.paragraph_color = 'Formato Hexadecimal #rrggbb';
				}

				if (
					values.button_color.length > 0 &&
					!/^#?([a-fA-F0-9]){6}$/.test(values.button_color)
				) {
					errors.button_color = 'Formato Hexadecimal #rrggbb';
				}

				if (
					values.effect_color.length > 0 &&
					!/^#?([a-fA-F0-9]){6}$/.test(values.effect_color)
				) {
					errors.effect_color = 'Formato Hexadecimal #rrggbb';
				}
				if (
					values.error_color.length > 0 &&
					!/^#?([a-fA-F0-9]){6}$/.test(values.error_color)
				) {
					errors.error_color = 'Formato Hexadecimal #rrggbb';
				}
				if (
					values.divisor_color.length > 0 &&
					!/^#?([a-fA-F0-9]){6}$/.test(values.divisor_color)
				) {
					errors.divisor_color = 'Formato Hexadecimal #rrggbb';
				}
				if (
					values.h1_color.length > 0 &&
					!/^#?([a-fA-F0-9]){6}$/.test(values.h1_color)
				) {
					errors.h1_color = 'Formato Hexadecimal #rrggbb';
				}
				if (
					values.paragraph_header_color.length > 0 &&
					!/^#?([a-fA-F0-9]){6}$/.test(values.paragraph_header_color)
				) {
					errors.paragraph_header_color = 'Formato Hexadecimal #rrggbb';
				}
				if (
					values.background_color.length > 0 &&
					!/^#?([a-fA-F0-9]){6}$/.test(values.background_color)
				) {
					errors.background_color = 'Formato Hexadecimal #rrggbb';
				}
				if (
					values.background_footer_color.length > 0 &&
					!/^#?([a-fA-F0-9]){6}$/.test(values.background_footer_color)
				) {
					errors.background_footer_color = 'Formato Hexadecimal #rrggbb';
				}

				return errors;
			}}
			onSubmit={async (values, {setSubmitting}) => {
				try {
					setLoading(true);
					const data = await api.put(url, {body: {data: values}});
					if (data.statusCode) {
						throw data;
					}
					dispatch({
						type: 'SUCCESS',
						message: 'Configuración modificada!',
					});
					setError(null);
				} catch (err) {
					dispatch({
						type: 'ERROR',
						message: 'Error modificando la configuración',
					});
					setError(`${err.statusCode}: ${err.error} - ${err.message}`);
				} finally {
					setSubmitting(false);
					setLoading(false);
				}
			}}>
			{({isSubmitting, setFieldValue, values}) => {
				useEffect(() => {
					if (settings) {
						setFieldValue('title_color', settings.title_color || '#531253');
						setFieldValue(
							'paragraph_color',
							settings.paragraph_color || '#4c545d'
						);
						setFieldValue('button_color', settings.button_color || '#531253');
						setFieldValue('effect_color', settings.effect_color || '#531253');
						setFieldValue('error_color', settings.error_color || '#f44336');
						setFieldValue('divisor_color', settings.divisor_color || '#170312');
						setFieldValue('h1_color', settings.h1_color || '#ffffff');
						setFieldValue(
							'paragraph_header_color',
							settings.paragraph_header_color || '#ffffff'
						);
						setFieldValue(
							'background_color',
							settings.background_color || '#eaeaea'
						);
						setFieldValue(
							'background_footer_color',
							settings.background_footer_color || '#9fabb2'
						);
					}
				}, [settings]);

				return (
					<Form>
						<div className='formulario'>
							<div>
								<label htmlFor='title_color'>Color de títulos</label>
								<input
									className='form__input--color'
									type='color'
									value={values.title_color}
									onChange={e => setFieldValue('title_color', e.target.value)}
								/>
								<Field
									value={values.title_color}
									type='text'
									id='title_color'
									name='title_color'
									placeholder='#531253'
									className='form__input form__input--colorDesc'
								/>
								<ErrorMessage
									name='title_color'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>
							<div>
								<label htmlFor='paragraph_color'>Color de párrafos</label>
								<input
									className='form__input--color'
									type='color'
									value={values.paragraph_color}
									onChange={e =>
										setFieldValue('paragraph_color', e.target.value)
									}
								/>
								<Field
									value={values.paragraph_color}
									type='text'
									id='paragraph_color'
									name='paragraph_color'
									placeholder='#4c545d'
									className='form__input form__input--colorDesc'
								/>
								<ErrorMessage
									name='paragraph_color'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>
							<div>
								<label htmlFor='button_color'>Color de botones</label>
								<input
									className='form__input--color'
									type='color'
									value={values.button_color}
									onChange={e => setFieldValue('button_color', e.target.value)}
								/>
								<Field
									value={values.button_color}
									type='text'
									id='button_color'
									name='button_color'
									placeholder='#531253'
									className='form__input form__input--colorDesc'
								/>
								<ErrorMessage
									name='button_color'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>
							<div>
								<label htmlFor='effect_color'>Color de transiciones</label>
								<input
									className='form__input--color'
									type='color'
									value={values.effect_color}
									onChange={e => setFieldValue('effect_color', e.target.value)}
								/>
								<Field
									value={values.effect_color}
									type='text'
									id='effect_color'
									name='effect_color'
									placeholder='#531253'
									className='form__input form__input--colorDesc'
								/>
								<ErrorMessage
									name='effect_color'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>

							<div>
								<label htmlFor='error_color'>Color de errores</label>
								<input
									className='form__input--color'
									type='color'
									value={values.error_color}
									onChange={e => setFieldValue('error_color', e.target.value)}
								/>
								<Field
									value={values.error_color}
									type='text'
									id='error_color'
									name='error_color'
									placeholder='#f44336'
									className='form__input form__input--colorDesc'
								/>
								<ErrorMessage
									name='error_color'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>

							<div>
								<label htmlFor='divisor_color'>Color de divisor</label>
								<input
									className='form__input--color'
									type='color'
									value={values.divisor_color}
									onChange={e => setFieldValue('divisor_color', e.target.value)}
								/>
								<Field
									value={values.divisor_color}
									type='text'
									id='divisor_color'
									name='divisor_color'
									placeholder='#170312'
									className='form__input form__input--colorDesc'
								/>
								<ErrorMessage
									name='divisor_color'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>

							<div>
								<label htmlFor='h1_color'>Color de H1</label>
								<input
									className='form__input--color'
									type='color'
									value={values.h1_color}
									onChange={e => setFieldValue('h1_color', e.target.value)}
								/>
								<Field
									value={values.h1_color}
									type='text'
									id='h1_color'
									name='h1_color'
									placeholder='#ffffff'
									className='form__input form__input--colorDesc'
								/>
								<ErrorMessage
									name='h1_color'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>

							<div>
								<label htmlFor='paragraph_header_color'>
									Color de párrafo en header
								</label>
								<input
									className='form__input--color'
									type='color'
									value={values.paragraph_header_color}
									onChange={e =>
										setFieldValue('paragraph_header_color', e.target.value)
									}
								/>
								<Field
									value={values.paragraph_header_color}
									type='text'
									id='paragraph_header_color'
									name='paragraph_header_color'
									placeholder='#ffffff'
									className='form__input form__input--colorDesc'
								/>
								<ErrorMessage
									name='paragraph_header_color'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>

							<div>
								<label htmlFor='background_color'>Color de fondo</label>
								<input
									className='form__input--color'
									type='color'
									value={values.background_color}
									onChange={e =>
										setFieldValue('background_color', e.target.value)
									}
								/>
								<Field
									value={values.background_color}
									type='text'
									id='background_color'
									name='background_color'
									placeholder='#eaeaea'
									className='form__input form__input--colorDesc'
								/>
								<ErrorMessage
									name='background_color'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>

							<div>
								<label htmlFor='background_footer_color'>
									Color de fondo de footer
								</label>
								<input
									className='form__input--color'
									type='color'
									value={values.background_footer_color}
									onChange={e =>
										setFieldValue('background_footer_color', e.target.value)
									}
								/>
								<Field
									value={values.background_footer_color}
									type='text'
									id='background_footer_color'
									name='background_footer_color'
									placeholder='#9fabb2'
									className='form__input form__input--colorDesc'
								/>
								<ErrorMessage
									name='background_footer_color'
									render={msg => <div className='error'>{msg}</div>}
								/>
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

export default Colors;
