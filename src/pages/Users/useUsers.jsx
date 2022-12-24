import {useEffect, useState} from 'react';
import {useNotification} from '@/commons/Notifications/NotificationProvider';
import {useModal} from '@/hooks/useModal';
import {
	deleteUser,
	getUsers,
	postUser,
	putUser,
} from '@/services/api/users.api';
import {usersInitialState} from '@/config/constants';

const useUsers = () => {
	const dispatchNotif = useNotification();
	const [isOpenModal, openModal, closeModal] = useModal(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [users, setUsers] = useState(null);
	const [dataToEdit, setDataToEdit] = useState(usersInitialState);
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

	return {
		isOpenModal,
		loading,
		error,
		users,
		dataToEdit,
		dataToDelete,
		closeModal,
		setError,
		createData,
		updateData,
		deleteData,
		handleDelete,
		handleCancelDelete,
		setDataToEdit,
	};
};

export default useUsers;
