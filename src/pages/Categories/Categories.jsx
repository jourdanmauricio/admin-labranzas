import {Modal} from '@/commons/Modal/Modal';
import {paginationComponentOptions} from '@/config/constants';
import Layout from '@/commons/Layout/layout';
import DataTable from 'react-data-table-component';
import CategoryDeleteForm from './components/CategoryDeleteForm';
import LoaderTable from '@/commons/Table/LoaderTable';
import Message from '@/commons/Message/Message';
import CategoryEditFrom from './components/CategoryEditFrom';
import SearchCategory from '../../commons/SearchCategory/SearchCategory';
import useCategories from './useCategories';

const Categories = () => {
	const {
		action,
		loading,
		error,
		subHeaderComponentMemo,
		isOpenModal,
		isOpenModalEdit,
		dataToEdit,
		dataToDelete,
		filteredItems,
		resetPaginationToggle,
		closeModal,
		closeModalEdit,
		CATEGORIES_COLUMNS,
		handleAddCategory,
		handleEdit,
		handleDelete,
		handleCancel,
		closeMessage,
	} = useCategories();

	return (
		<Layout>
			{error && (
				<>
					<Message msg={error} closeMessage={closeMessage} />
					<br />
				</>
			)}

			{action === 'SEARCH' && (
				<SearchCategory
					handleAddCategory={handleAddCategory}
					handleCancel={handleCancel}
				/>
			)}

			{action !== 'SEARCH' && (
				<>
					<DataTable
						title='Categorías'
						columns={CATEGORIES_COLUMNS}
						data={filteredItems}
						dense
						responsive
						// selectableRows
						pagination
						paginationComponentOptions={paginationComponentOptions}
						paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
						progressPending={loading}
						progressComponent={<LoaderTable />}
						actions={subHeaderComponentMemo}
						// subHeader
						// subHeaderComponent={subHeaderComponentMemo}
						// fixedHeader
						// fixedHeaderScrollHeight='393px'
					/>
					<Modal isOpenModal={isOpenModal} closeModal={closeModal}>
						<CategoryDeleteForm
							dataToDelete={dataToDelete}
							handleDelete={handleDelete}
							handleCancelDelete={handleCancel}
						/>
					</Modal>
					<Modal isOpenModal={isOpenModalEdit} closeModal={closeModalEdit}>
						<CategoryEditFrom
							dataToEdit={dataToEdit}
							handleEdit={handleEdit}
							handleCancelDelete={handleCancel}
						/>
					</Modal>
				</>
			)}
		</Layout>
	);
};

export default Categories;
