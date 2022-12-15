import {useEffect} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {helpHttp} from '@/services/helpHttp';
import {variables} from '@/config/variables';

const Contact = ({settings, setError, dispatch, setLoading}) => {
	const api = helpHttp();
	const url = `${variables.basePath}/settings`;

	return (
		<Formik
			initialValues={{
				Facebook: '',
				Instagram: '',
				Twitter: '',
				Whatsapp: '',
				email: '',
				phone: '',
				address: '',
			}}
			validate={values => {
				const errors = {};
				if (
					values.Facebook.length > 0 &&
					!/(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i.test(
						values.Facebook
					)
				) {
					errors.Facebook = 'Ingrese un perfil válido para Facebook';
				}

				if (
					values.Twitter.length > 0 &&
					!/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(
						values.Twitter
					)
				) {
					errors.Twitter = 'Ingrese un perfil válido para Twitter';
				}

				if (
					values.Instagram.length > 0 &&
					!/(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am|twitter\.com)\/([A-Za-z0-9-_\.]+)/im.test(
						values.Instagram
					)
				) {
					errors.Instagram = 'Ingrese un perfil válido para Instagram';
				}

				if (
					values.Whatsapp.length > 0 &&
					!/(?:(?:http|https):\/\/)?(?:www\.)?(?:wa\.me)\/.*$/.test(
						values.Whatsapp
					)
				) {
					errors.Whatsapp = 'Ingrese un link válido para Whatsapp';
				}

				if (
					values.email.length > 0 &&
					!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
				) {
					errors.email = 'Email inválido';
				}

				if (values.phone.length > 0 && !/^[0-9*\s()+?-]*$/.test(values.phone)) {
					errors.phone = 'El teléfono solo admite números, -, +, y ()';
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
			{({isSubmitting, setFieldValue}) => {
				useEffect(() => {
					if (settings) {
						setFieldValue('Twitter', settings.Twitter || '');
						setFieldValue('Facebook', settings.Facebook || '');
						setFieldValue('Instagram', settings.Instagram || '');
						setFieldValue('Whatsapp', settings.Whatsapp || '');
						setFieldValue('email', settings.email || '');
						setFieldValue('phone', settings.phone || '');
						setFieldValue('address', settings.address || '');
					}
				}, [settings]);

				return (
					<Form>
						<div className='formulario'>
							<div>
								<label htmlFor='Twitter'>Twitter</label>
								<Field
									className='form__input'
									type='text'
									name='Twitter'
									placeholder='https://twitter.com/jourdanmau'
								/>
								<ErrorMessage
									name='Twitter'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>
							<div>
								<label htmlFor='Facebook'>Fecebook</label>
								<Field
									className='form__input'
									type='text'
									name='Facebook'
									placeholder='https://www.facebook.com/mauricio.jourdan.33'
								/>
								<ErrorMessage
									name='Facebook'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>
							<div>
								<label htmlFor='Instagram'>Instagram</label>
								<Field
									className='form__input'
									type='text'
									name='Instagram'
									placeholder='https://www.instagram.com/mauricio.jourdan.33/'
								/>
								<ErrorMessage
									name='Instagram'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>
							<div>
								<label htmlFor='Whatsapp'>Whatsapp</label>
								<Field
									className='form__input'
									type='text'
									name='Whatsapp'
									placeholder='https://wa.me/5491158046525?text=Hola, quiero rebir información'
								/>
								<ErrorMessage
									name='Whatsapp'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>
							<div>
								<label htmlFor='phone'>Teléfono</label>
								<Field
									className='form__input'
									type='text'
									name='phone'
									placeholder='(cod) xxxx-xxxx'
								/>
								<ErrorMessage
									name='phone'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>
							<div>
								<label htmlFor='email'>Email</label>
								<Field
									className='form__input'
									type='email'
									name='email'
									placeholder='email@dominio.com'
								/>
								<ErrorMessage
									name='email'
									render={msg => <div className='error'>{msg}</div>}
								/>
							</div>
							<div>
								<label htmlFor='address'>Dirección</label>
								<Field
									className='form__input'
									type='text'
									name='address'
									placeholder='Ingresa el domicilio'
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

export default Contact;
