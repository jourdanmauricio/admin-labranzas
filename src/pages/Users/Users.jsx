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
import {
	deleteUser,
	getUsers,
	postUser,
	putUser,
} from '../../services/api/users.api';

const initialState = {
	id: '',
	name: '',
	email: '',
	role: 'admin',
	password: '',
	newPassword: '',
};

const Users = () => {
	const dispatchNotif = useNotification();
	const [isOpenModal, openModal, closeModal] = useModal(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [users, setUsers] = useState(null);
	const [dataToEdit, setDataToEdit] = useState(initialState);
	const [dataToDelete, setDataToDelete] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			try {
				const users = await getUsers();
				setUsers(users);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchUsers();
	}, []);

	const createData = async data => {
		delete data.id;
		delete data.confirmPassword;

		try {
			setLoading(true);
			const newUser = await postUser(data);
			setUsers([...users, newUser]);
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Usuario creado!',
			});
		} catch (error) {
			setError(error);
			dispatchNotif({
				type: 'ERROR',
				message: 'Error creando el usuario',
			});
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
			await putUser(obj);
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Usuario modificado!',
			});
			let newData = users.map(el => (el.id === data.id ? data : el));
			setUsers(newData);
		} catch (err) {
			dispatchNotif({
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
			await deleteUser(id);
			dispatchNotif({
				type: 'SUCCESS',
				message: 'Usuario eliminado!',
			});
			let newData = users.filter(el => el.id !== id);
			setUsers(newData);
			closeModal();
			setDataToDelete(null);
		} catch (err) {
			dispatchNotif({
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
