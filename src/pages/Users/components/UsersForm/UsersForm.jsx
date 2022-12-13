import {useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useSelector} from 'react-redux';

const initialValues = {
	id: '',
	email: '',
	role: 'admin',
	password: '',
	confirmPassword: '',
};

const UsersForm = ({createData, updateData, dataToEdit, setDataToEdit}) => {
	let user = useSelector(state => state.user.user);
	return (
		<>
			<div>
				<h3>
					{user.role === 'admin'
						? 'Editar Perfil'
						: dataToEdit?.id !== ''
						? 'Modificar Usuario'
						: 'Agregar Usuario'}
				</h3>
				<Formik
					initialValues={initialValues}
					validate={values => {
						const errors = {};
						if (!values.email) {
							errors.email = 'Requerido';
						}

						if (!values.password) {
							errors.password = 'Requerido';
						} else if (values.password.length < 8) {
							errors.password = 'Mínimo 8 caracteres';
						}
						if (!values.confirmPassword) {
							errors.confirmPassword = 'Requerido';
						} else if (values.password !== values.confirmPassword) {
							errors.confirmPassword = 'El password no coincide';
						}

						return errors;
					}}
					onSubmit={(values, {setSubmitting, resetForm}) => {
						const obj = Object.assign({}, values);
						if (obj.id === '') {
							createData(obj);
						} else {
							updateData(obj);
						}
						resetForm();
						setSubmitting(false);
					}}>
					{({isSubmitting, setFieldValue, values}) => {
						useEffect(() => {
							if (dataToEdit.id !== '') {
								setFieldValue('id', dataToEdit.id);
							}
							setFieldValue('email', dataToEdit.email);
							setFieldValue('role', dataToEdit.role);
							setFieldValue('password', '');
							setFieldValue('confirmPassword', '');
						}, [dataToEdit]);
						return (
							<>
								<Form className='form__container' noValidate>
									<div className='formulario'>
										<div>
											<label htmlFor='email'>Email</label>
											<Field
												className='form__input'
												type='email'
												name='email'
												placeholder='user@domain.com'
												disabled={values.id}
											/>
											<ErrorMessage
												name='email'
												render={msg => <div className='error'>{msg}</div>}
											/>
										</div>
										<div>
											<label htmlFor='role'>Role</label>
											<Field
												className='form__input'
												type='text'
												name='role'
												value='admin'
												placeholder='admin'
												disabled
											/>
											<ErrorMessage
												name='role'
												render={msg => <div className='error'>{msg}</div>}
											/>
										</div>
										<div>
											<label htmlFor='role'>Password</label>
											<Field
												className='form__input'
												type='password'
												name='password'
											/>
											<ErrorMessage
												name='password'
												render={msg => <div className='error'>{msg}</div>}
											/>
										</div>
										<div>
											<label htmlFor='confirmPassword'>
												Confirmación Password
											</label>
											<Field
												className='form__input'
												type='password'
												name='confirmPassword'
											/>
											<ErrorMessage
												name='confirmPassword'
												render={msg => <div className='error'>{msg}</div>}
											/>
										</div>

										<div className='wide actions'>
											<button
												onClick={() => setDataToEdit(initialValues)}
												className='btn'
												type='button'
												disabled={isSubmitting}>
												Limpiar
											</button>

											<button
												className='btn btn__primary'
												type='submit'
												disabled={isSubmitting}>
												Enviar
											</button>
										</div>
									</div>
								</Form>
							</>
						);
					}}
				</Formik>
			</div>
		</>
	);
};

export default UsersForm;
