import {ErrorMessage, Form, Field, Formik} from 'formik';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {variables} from '@/config/variables';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {disconnectMl, logOutMl} from '../../../store/userMl';
import Message from '../../../commons/Message/Message';

const SettingsMl = () => {
	let userMl = useSelector(state => state.userMl);
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
				try {
					if (userMl.userMl) {
						dispatch(disconnectMl());
						dispatchNotif({
							type: 'SUCCESS',
							message: 'Nickname desvinculado',
						});
					} else {
						dispatch(logOutMl());
						const state =
							values.nickname + '-' + Math.floor(Math.random() * 1000000);
						const uri = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${variables.mlAppId}&redirect_uri=${variables.frontend}/meli-callback&state=${state}`;
						window.open(uri);
					}
				} catch (error) {
					dispatchNotif({
						type: 'ERROR',
						message: 'Error modificando la configuración',
					});
				} finally {
					setSubmitting(false);
				}
			}}>
			{({isSubmitting, setFieldValue}) => {
				useEffect(() => {
					setFieldValue('nickname', userMl.userMl?.nickname || '');
				}, [userMl]);

				return (
					<>
						<h1 className='title'>Configuración Mercado Libre</h1>
						<br />
						{userMl.error && <Message msg={userMl.error} />}
						<Form className='form__container'>
							<div className='formulario'>
								<div className='wide'>
									<label htmlFor='nickname'>Nickname</label>
									<Field
										className='form__input '
										type='text'
										name='nickname'
										placeholder='MLA...'
										disabled={userMl.userMl?.nickname?.length > 0}
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
										{userMl.userMl?.nickname?.length > 0
											? 'Desvincular'
											: 'Vincular'}
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
