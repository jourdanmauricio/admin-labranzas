import {ErrorMessage, Form, Field, Formik} from 'formik';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {variables} from '@/config/variables';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {disconnectMl} from '../../../store/userMl';

const SettingsMl = () => {
	let userMl = useSelector(state => state.userMl.userMl);
	const dispatch = useDispatch();
	const dispatchNotif = useNotification();
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
				if (userMl) {
					dispatch(disconnectMl());
				} else {
					try {
						const state =
							values.nickname + '-' + Math.floor(Math.random() * 1000000);
						const uri = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${variables.mlAppId}&redirect_uri=${variables.frontend}/meli-callback&state=${state}`;
						window.open(uri);
					} catch (error) {
						console.log('errorrr', error);
						dispatchNotif({
							type: 'ERROR',
							message: 'Error modificando la configuración',
						});
					} finally {
						setSubmitting(false);
					}
				}
			}}>
			{({isSubmitting, setFieldValue}) => {
				useEffect(() => {
					if (userMl) {
						setFieldValue('nickname', userMl.nickname || '');
					}
				}, [userMl]);

				return (
					<>
						<h1 className='title'>Configuración Mercado Libre</h1>
						<br />
						<Form className='form__container'>
							<div className='formulario'>
								<div className='wide'>
									<label htmlFor='nickname'>Nickname</label>
									<Field
										className='form__input '
										type='text'
										name='nickname'
										placeholder='MLA...'
										disabled={userMl}
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
										{userMl ? 'Desvincular' : 'Vincular'}
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
