import {useState} from 'react';
import Spinner from '@/commons/spinner/spinner';
import {FaEyeSlash, FaEye} from 'react-icons/fa';
import styles from '../auth.module.css';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {useLocation, useNavigate} from 'react-router-dom';

const RecoveryPassword = () => {
	const [loading, setLoading] = useState(false);
	const [newPassShown, setNewPassShown] = useState(false);
	const [newPass, setNewPass] = useState('');
	const [newPassError, setNewPassError] = useState(null);
	const [confPassShown, setConfPassShown] = useState(false);
	const [confPass, setConfPass] = useState('');
	const [confPassError, setConfPassError] = useState(null);
	const dispatchNotif = useNotification();
	let navigate = useNavigate();

	const URL = `${import.meta.env.VITE_BACKEND_API}/auth/change-password`;
	let {search} = useLocation();
	const params = new URLSearchParams(search);

	const token = params.get('token');

	console.log('token', token);

	function handleChange(name, value) {
		if (name === 'newPass') {
			setNewPass(value);
			if (value.length < 8) {
				setNewPassError('Mínimo 8 caracteres');
				return;
			}
			setNewPassError(null);
		}
		if (name === 'confPass') {
			setConfPass(value);
			if (value !== newPass) {
				setConfPassError('La contraseña no coincide');
				return;
			}
			setConfPassError(null);
		}
	}

	const handleSubmit = async e => {
		e.preventDefault();

		setLoading(true);
		try {
			const options = {
				method: 'POST',
				body: JSON.stringify({token, newPassword: confPass}),
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const response = await fetch(URL, options);
			const resRecovery = await response.json();
			console.log('recovery', resRecovery);
			if (resRecovery.statusCode) throw resRecovery;
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Contraseña modificada',
			});
			navigate('/');
		} catch (error) {
			dispatchNotif({
				type: 'ERROR',
				message: 'Error modificando la contraseña',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className={styles.container}>
			{loading && <Spinner />}
			<form
				className={styles.login__container}
				onSubmit={handleSubmit}
				noValidate>
				<label className={styles.title__container}>Cambio de contraseña</label>
				{/* <p className={styles.formMsg__forgot}>
					<p
						className={`${styles.form__msg} ${
							messageOk && styles.form__success
						} ${messageErr && styles.form__error}`}>
						{messageErr}
						{messageOk}
					</p>
				</p> */}

				<div className={styles.form__group}>
					<label className={styles.label}>Nueva contraseña</label>
					<i
						className={styles.input__icons}
						onClick={() => setNewPassShown(!newPassShown)}>
						{newPassShown ? <FaEyeSlash /> : <FaEye />}
					</i>
					<input
						onChange={e => handleChange(e.target.name, e.target.value)}
						className={
							!newPassError
								? styles.input
								: `${styles.input} ${styles.input__error}`
						}
						type={newPassShown ? 'text' : 'password'}
						id='new-pass'
						name='newPass'
						placeholder='Ingrese la nueva contraseña'
					/>

					<p className={`${styles.msg} ${newPassError && styles.msg__error}`}>
						{newPassError}
					</p>
				</div>

				<div className={styles.form__group}>
					<label className={styles.label}>Confirmación contraseña</label>
					<i
						className={styles.input__icons}
						onClick={() => setConfPassShown(!confPassShown)}>
						{confPassShown ? <FaEyeSlash /> : <FaEye />}
					</i>
					<input
						onChange={e => handleChange(e.target.name, e.target.value)}
						className={
							!confPassError
								? styles.input
								: `${styles.input} ${styles.input__error}`
						}
						type={confPassShown ? 'text' : 'password'}
						id='conf-pass'
						name='confPass'
						placeholder='Confirmación de contraseña'
					/>
					<p className={`${styles.msg} ${confPassError && styles.msg__error}`}>
						{confPassError}
					</p>
				</div>

				<button className={styles.form__button} type='submit'>
					Cambiar password
				</button>
			</form>
		</main>
	);
};

export default RecoveryPassword;
