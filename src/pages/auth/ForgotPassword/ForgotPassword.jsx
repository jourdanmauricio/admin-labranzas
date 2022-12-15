import {useState} from 'react';
import Spinner from '@/commons/spinner/spinner';
import styles from '../auth.module.css';
import {Link} from 'react-router-dom';
import {variables} from '@/config/variables';

const ForgotPassword = () => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [messageOk, setMessageOk] = useState(null);
	const [messageErr, setMessageErr] = useState(null);

	// const dispatchNotif = useNotification();

	const URL = `${variables.basePath}/auth/recovery`;

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
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setMessageErr(null);

		let error = false;
		if (email.length === 0) {
			setEmailError('Obligatorio');
			error = true;
		}

		if (error || emailError !== null) return;

		setLoading(true);
		try {
			const options = {
				method: 'POST',
				body: JSON.stringify({email}),
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const response = await fetch(URL, options);
			const resRecovery = await response.json();
			console.log('recovery', resRecovery);
			if (resRecovery.statusCode) throw resRecovery;
			setMessageOk(
				'Email enviado!. Sigue las instrucciones para generar la contraseña.'
			);
		} catch (error) {
			setMessageErr('Verifique la dirección de email');
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className={styles.container}>
			{loading && <Spinner />}
			<form
				className={styles.login__container}
				onSubmit={handleSubmit}
				noValidate>
				<label className={styles.title__container}>Bienvedido!!!</label>
				<span className={styles.formMsg__forgot}>
					<p
						className={`${styles.form__msg} ${
							messageOk && styles.form__success
						} ${messageErr && styles.form__error}`}>
						{messageErr}
						{messageOk}
					</p>
				</span>

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

				<button
					className={styles.form__button}
					type='submit'
					disabled={messageOk}>
					Cambiar password
				</button>

				<Link to='/' className={styles.form__forgot}>
					Posee una cuenta? Login
				</Link>
			</form>
		</main>
	);
};

export default ForgotPassword;
