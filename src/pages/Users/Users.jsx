import {useEffect, useState} from 'react';
import Layout from '../../commons/Layout/layout';
import Loader from '../../commons/Loader-overlay/Loader-overlay';
import Message from '../../commons/Message/Message';
import {Modal} from '../../commons/Modal/Modal';
import {useNotification} from '../../commons/Notifications/NotificationProvider';
import {helpHttp} from '../../helpers/helpHttp';
import {useModal} from '../../hooks/useModal';
import UserDeleteForm from './components/UserDeleteForm/UserDeleteForm';
import UsersForm from './components/UsersForm/UsersForm';
import UsersTable from './components/UsersTable/UsersTable';

const initialState = {
	id: '',
	name: '',
	email: '',
	role: 'admin',
	password: '',
	newPassword: '',
};

const Users = () => {
	const dispatch = useNotification();
	const [isOpenModal, openModal, closeModal] = useModal(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [users, setUsers] = useState(null);
	const [dataToEdit, setDataToEdit] = useState(initialState);
	const [dataToDelete, setDataToDelete] = useState(null);

	let api = helpHttp();
	const url = `${import.meta.env.VITE_BACKEND_API}/users`;

	useEffect(() => {
		setLoading(true);
		api.get(url).then(res => {
			console.log('res', res);
			if (!res.err) {
				setUsers(res.results);
				setError(null);
			} else {
				setError(res);
				setUsers(null);
			}
			setLoading(false);
		});
	}, []);

	const createData = async data => {
		delete data.id;
		delete data.confirmPassword;

		try {
			setLoading(true);
			const user = await api.post(url, {body: data});
			console.log('user', user);

			if (!user.error) {
				setUsers([...users, user.newUser]);
				dispatch({
					type: 'SUCCESS',
					message: 'Usuario creado!',
				});
			} else {
				throw user;
			}
		} catch (err) {
			dispatch({
				type: 'ERROR',
				message: 'Error creando el usuario',
			});
			setError(`${err.statusCode}: ${err.error} - ${err.message}`);
		} finally {
			setLoading(false);
		}
	};

	const updateData = async data => {
		let endpoint = `${url}/change-password/${data.id}`;

		let obj = {
			id: data.id,
			newPassword: data.password,
		};

		try {
			setLoading(true);
			const user = await api.put(endpoint, {body: obj});
			if (!user.error) {
				dispatch({
					type: 'SUCCESS',
					message: 'Usuario modificado!',
				});
				let newData = users.map(el => (el.id === data.id ? data : el));
				setUsers(newData);
			} else {
				throw user;
			}
		} catch (err) {
			dispatch({
				type: 'ERROR',
				message: 'Error modificando el usuario',
			});
			setError(`${err.statusCode}: ${err.error} - ${err.message}`);
		} finally {
			setLoading(false);
		}
	};

	const deleteData = data => {
		setDataToDelete(data);
		openModal();
	};

	const handleDelete = id => {
		let endpoint = `${url}/${id}`;

		api.del(endpoint).then(res => {
			if (!res.err) {
				let newData = users.filter(el => el.id !== id);
				setUsers(newData);
				closeModal();
				setDataToDelete(null);
				dispatch({
					type: 'SUCCESS',
					message: 'Usuario eliminado!',
				});
			} else {
				setError(res);
				dispatch({
					type: 'ERROR',
					message: 'Error eliminando el usuario',
				});
			}
		});
	};

	const handleCancelDelete = () => {
		setDataToDelete(null);
		closeModal();
	};

	return (
		<Layout>
			<>
				<h1>Users</h1>
				<section className='lessons__container'>
					<UsersForm
						createData={createData}
						updateData={updateData}
						dataToEdit={dataToEdit}
						setDataToEdit={setDataToEdit}
					/>
					{loading && <Loader />}
					{error && (
						<Message
							msg={error}
							closeMessage={() => setError(null)}
							bgColor='#fa4e4e'
						/>
					)}
					{users && (
						<UsersTable
							data={users}
							setDataToEdit={setDataToEdit}
							deleteData={deleteData}
						/>
					)}
				</section>

				<Modal isOpenModal={isOpenModal} closeModal={closeModal}>
					<UserDeleteForm
						dataToDelete={dataToDelete}
						handleDelete={handleDelete}
						handleCancelDelete={handleCancelDelete}
					/>
				</Modal>
			</>
		</Layout>
	);
};

export default Users;
