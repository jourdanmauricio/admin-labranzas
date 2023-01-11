import Layout from '@/commons/Layout/layout';
import Message from '@/commons/Message/Message';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import {paginationComponentOptions} from '@/config/constants';
import DataTable from 'react-data-table-component';
import useProducts from './useProducts';
import ProductSystems from './components/ProductSystems/ProductSystems';
import ProductDetail from './components/View/ProductDetail';
import EditLocal from './components/EditLocal/EditLocal';
import EditWeb from './components/EditWeb/EditWeb';

const Products = () => {
	const {
		PRODUCTS_COLUMNS,
		filteredItems,
		resetPaginationToggle,
		subHeaderComponentMemo,
		error,
		action,
		status,
		product,
		contextActions,
		// toggleCleared,
		handleRowSelected,
		closeMessage,
		handleCancel,
		expandRow,
	} = useProducts();

	return (
		<Layout>
			{status === 'loading' && <Loader />}
			{status === 'failed' && (
				<Message msg={error} closeMessage={closeMessage} />
			)}
			<br />
			{action === 'VIEW' && (
				<ProductDetail id={product.id} handleCancel={handleCancel} />
			)}
			{action === 'EDIT-LOCAL' && <EditLocal handleCancel={handleCancel} />}
			{action === 'EDIT-WEB' && <EditWeb handleCancel={handleCancel} />}
			{action !== 'EDIT-LOCAL' &&
				action !== 'EDIT-WEB' &&
				action !== 'VIEW' && (
					<DataTable
						title='Productos'
						columns={PRODUCTS_COLUMNS}
						data={filteredItems}
						dense
						responsive
						selectableRows
						onSelectedRowsChange={handleRowSelected}
						// clearSelectedRows={toggleCleared}
						contextActions={contextActions}
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
		</Layout>
	);
};

export default Products;
