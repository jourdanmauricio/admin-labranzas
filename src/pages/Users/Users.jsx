import Layout from '@/commons/Layout/layout';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import Message from '@/commons/Message/Message';
import {Modal} from '@/commons/Modal/Modal';
import UserDeleteForm from './components/UserDeleteForm/UserDeleteForm';
import UsersForm from './components/UsersForm/UsersForm';
import UsersTable from './components/UsersTable/UsersTable';
import useUsers from './useUsers';

const Users = () => {
	const {
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
	} = useUsers();

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
