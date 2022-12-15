import {useEffect} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {helpHttp} from '@/services/helpHttp';
import {variables} from '@/config/variables';

const Images = ({settings, setError, dispatch, setLoading}) => {
	const api = helpHttp();
	const url = `${variables.basePath}/settings`;

	return (
		<Formik
			initialValues={{
				logo: '',
			}}
			validate={values => {
				const errors = {};

				return errors;
			}}
			onSubmit={async (values, {setSubmitting}) => {
				try {
					setLoading(true);
					/* upload-image */
					if (newLogo) {
						const fd = new FormData();
						fd.append('image', newLogo, values.logo);

						const response = await fetch(`${url}/upload-file`, {
							method: 'POST',
							body: fd,
							headers: {
								Authorization: `Bearer ${user.token}`,
							},
						});
						const uploadImg = await response.json();
						values.logo = uploadImg.image;

						if (uploadImg.statusCode) {
							throw uploadImg;
						}
					}

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
						setFieldValue('logo', settings.logo || '');
					}
				}, [settings]);

				return (
					<Form>
						<div className='formulario'>
							<div className='settings__logo'>
								<label htmlFor='logo'>Logo</label>
								<input
									className='input__file'
									id='logo'
									name='logo'
									// accept="image/png, image/jpg, image/jpeg, image/svg"
									type='file'
									onChange={event => {
										setNewLogo(event.currentTarget.files[0]);
										setFieldValue('logo', event.currentTarget.files[0].name);
									}}
								/>
							</div>
							<div>
								<img className='logo' src={values.logo} alt={values.logo} />
							</div>
							<hr />

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

export default Images;
