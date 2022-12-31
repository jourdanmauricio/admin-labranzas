import Layout from '@/commons/Layout/layout';
import Message from '@/commons/Message/Message';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import {paginationComponentOptions} from '@/config/constants';
import DataTable from 'react-data-table-component';
import useProducts from './useProducts';
import ProductSystems from './components/ProductSystems/ProductSystems';
import ProductDetail from './components/ProductDetail';
import {Modal} from '../../commons/Modal/Modal';
import ProductDeleteConfirm from './components/ProductDeleteConfirm';
import EditLocal from './components/EditLocal/EditLocal';
import {useSelector} from 'react-redux';

const Products = () => {
	const product = useSelector(state => state.product.product);
	const status = useSelector(state => state.product.status);
	const action = useSelector(state => state.product.action);
	const error = useSelector(state => state.product.error);
	const {
		loading,
		PRODUCTS_COLUMNS,
		filteredItems,
		resetPaginationToggle,
		isOpenModal,
		closeModal,
		subHeaderComponentMemo,
		closeMessage,
		handleConfirm,
		handleCancel,
		expandRow,
	} = useProducts();

	return (
		<Layout>
			{(loading || status === 'loading') && <Loader />}
			{status === 'falied' && (
				<Message msg={error} closeMessage={closeMessage} />
			)}
			<br />
			{action === 'VIEW' && (
				<ProductDetail id={product.id} handleCancel={handleCancel} />
			)}
			{action === 'EDIT-LOCAL' && <EditLocal handleCancel={handleCancel} />}
			{(!action || action === 'EXPANDED') && (
				<DataTable
					title='Productos'
					columns={PRODUCTS_COLUMNS}
					data={filteredItems}
					dense
					responsive
					selectableRows
					expandableRows
					expandableRowExpanded={row => row === product}
					onRowExpandToggled={(bool, row) => expandRow(bool, row)}
					expandableRowsComponent={ProductSystems}
					actions={subHeaderComponentMemo}
					pagination
					paginationComponentOptions={paginationComponentOptions}
					paginationResetDefaultPage={resetPaginationToggle}
				/>
			)}
			<Modal isOpenModal={isOpenModal} closeModal={closeModal}>
				<ProductDeleteConfirm
					handleConfirm={handleConfirm}
					handleCancel={handleCancel}
				/>
			</Modal>
		</Layout>
	);
};

export default Products;
