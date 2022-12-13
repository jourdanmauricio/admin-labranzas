import {ErrorMessage, Form, Field, Formik} from 'formik';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {variables} from '@/config/variables';

const SettingsMl = () => {
	const dispatch = useNotification();
	return (
		<Formik
			initialValues={{
				nickname: '',
			}}
			validate={values => {
				const errors = {};
				if (values.nickname.length === 0) {
					errors.nickname = 'Requerido';
				}
				return errors;
			}}
			onSubmit={async (values, {setSubmitting}) => {
				try {
					const state =
						values.nickname + '-' + Math.floor(Math.random() * 1000000);
					const uri = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${variables.mlAppId}&redirect_uri=${variables.frontend}/settings/meli-callback&state=${state}`;
					window.open(uri);
				} catch (error) {
					console.log('errorrr', error);
					dispatch({
						type: 'ERROR',
						message: 'Error modificando la configuración',
					});
				} finally {
					setSubmitting(false);
				}
			}}>
			{({isSubmitting, setFieldValue, values}) => {
				return (
					<>
						<h1 className='title'>Configuración Mercado Libre</h1>
						<br />
						<Form>
							<div className='formulario'>
								<div>
									<label htmlFor='nickname'>Nickname</label>
									<Field
										className='form__input'
										type='text'
										name='nickname'
										placeholder='MLA...'
									/>
									<ErrorMessage
										name='nickname'
										render={msg => <div className='error'>{msg}</div>}
									/>
								</div>
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
					</>
				);
			}}
		</Formik>
	);
};

export default SettingsMl;
