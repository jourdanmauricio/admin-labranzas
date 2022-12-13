import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import Spinner from '@/commons/spinner/spinner';
import {FaEyeSlash, FaEye} from 'react-icons/fa';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {signIn} from '@/store/user';

import styles from '../auth.module.css';

const Login = () => {
	let dispatch = useDispatch();
	// let user = useSelector(state => state.user.user);
	let statusUser = useSelector(state => state.user.status);
	let navigate = useNavigate();
	const [passwordShown, setPasswordShown] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [hasError, setHasError] = useState(false);
	const dispatchNotif = useNotification();

	useEffect(() => {
		if (statusUser === 'failed') setHasError(true);
		if (statusUser === 'success') {
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Bievenido!!! 💙',
			});

			navigate('/dashboard');
		}
	}, [statusUser]);

	function handleChange(name, value) {
		if (name === 'email') {
			const pattern =
				'^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$';
			setEmail(value);
			let regex = new RegExp(pattern);
			regex.exec(value) === null
				? setEmailError('Ingresa un email válido')
				: setEmailError(null);
		}
		if (name === 'password') {
			setPassword(value);
			if (value.length < 8) {
				setPasswordError('Mínimo 8 caracteres');
				return;
			}
			setPasswordError(null);
		}
	}

	function isMatch() {
		dispatch(
			signIn({
				email,
				password,
			})
		);
	}

	function handleSubmit(e) {
		e.preventDefault();

		let error = false;
		if (email.length === 0) {
			setEmailError('Obligatorio');
			error = true;
		}
		if (password.length === 0) {
			setPasswordError('Obligatorio');
			error = true;
		}

		if (error || emailError !== null || passwordError !== null) return;

		isMatch();
	}

	return (
		<main className={styles.container}>
			{statusUser === 'loading' && <Spinner />}
			<form
				className={styles.login__container}
				onSubmit={handleSubmit}
				noValidate>
				<label className={styles.title__container}>Bienvedido!!!</label>
				<p className={`${styles.form__msg} ${hasError && styles.form__error}`}>
					Usuario o constraseña incorrecto
				</p>
				<div className={styles.form__group}>
					<label className={styles.label}>Email</label>
					<input
						onChange={e => handleChange(e.target.name, e.target.value)}
						className={
							!emailError
								? styles.input
								: `${styles.input} ${styles.input__error}`
						}
						type='email'
						id='email'
						name='email'
						placeholder='Ingrese su email'
					/>
					<p className={`${styles.msg} ${emailError && styles.msg__error}`}>
						{emailError}
					</p>
				</div>

				<div className={styles.form__group}>
					<label className={styles.label}>Password</label>
					<i
						className={styles.input__icons}
						onClick={() => setPasswordShown(!passwordShown)}>
						{passwordShown ? <FaEyeSlash /> : <FaEye />}
					</i>
					<input
						onChange={e => handleChange(e.target.name, e.target.value)}
						className={
							!passwordError
								? styles.input
								: `${styles.input} ${styles.input__error}`
						}
						type={passwordShown ? 'text' : 'password'}
						id='password'
						name='password'
						placeholder='Ingrese su contraseña'
					/>

					<p className={`${styles.msg} ${passwordError && styles.msg__error}`}>
						{passwordError}
					</p>
				</div>

				<button className={styles.form__button} type='submit'>
					Login
				</button>

				<Link to='/forgot-password' className={styles.form__forgot}>
					Olvidó su contraseña?
				</Link>
			</form>
		</main>
	);
};

export default Login;
