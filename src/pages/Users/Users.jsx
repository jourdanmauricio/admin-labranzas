import {useEffect, useState} from 'react';
import Layout from '@/commons/Layout/layout';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import Message from '@/commons/Message/Message';
import {Modal} from '@/commons/Modal/Modal';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {useModal} from '@/hooks/useModal';
import UserDeleteForm from './components/UserDeleteForm/UserDeleteForm';
import UsersForm from './components/UsersForm/UsersForm';
import UsersTable from './components/UsersTable/UsersTable';
import {fetchUsers} from '../../services/api/users.api';

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

	let apiUser = fetchUsers();

	useEffect(() => {
		const getUsersApi = async () => {
			try {
				setLoading(true);
				const res = await apiUser.getUsers();
				console.log('res', res);
				setUsers(res.results);
				setError(null);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		getUsersApi();
	}, []);

	const createData = async data => {
		delete data.id;
		delete data.confirmPassword;

		try {
			setLoading(true);
			const user = await apiUser.postUser(data);
			setUsers([...users, user.newUser]);
			dispatch({
				type: 'SUCCESS',
				message: 'Usuario creado!',
			});
		} catch (err) {
			dispatch({
				type: 'ERROR',
				message: 'Error creando el usuario',
			});
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	const updateData = async data => {
		try {
			setLoading(true);
			let obj = {
				id: data.id,
				newPassword: data.password,
			};
			await apiUser.putUser(obj);
			dispatch({
				type: 'SUCCESS',
				message: 'Usuario modificado!',
			});
			let newData = users.map(el => (el.id === data.id ? data : el));
			setUsers(newData);
		} catch (err) {
			dispatch({
				type: 'ERROR',
				message: 'Error modificando el usuario',
			});
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	const deleteData = data => {
		setDataToDelete(data);
		openModal();
	};

	const handleDelete = async id => {
		try {
			setLoading(true);
			await apiUser.deleteUser(id);
			dispatch({
				type: 'SUCCESS',
				message: 'Usuario eliminado!',
			});
			let newData = users.filter(el => el.id !== id);
			setUsers(newData);
			closeModal();
			setDataToDelete(null);
		} catch (err) {
			dispatch({
				type: 'ERROR',
				message: 'Error eliminando el usuario',
			});
			setError(err);
		} finally {
			setLoading(false);
		}
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
