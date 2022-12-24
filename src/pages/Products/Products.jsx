import Layout from '../../commons/Layout/layout';
import Message from '@/commons/Message/Message';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
// import {serviceImportMl} from '../../services/api/products.api';
// import {useSelector} from 'react-redux';
import DataTable from 'react-data-table-component';
import useProducts from './useProducts';
import ExpandedProduct from './ExpandedProduct';
import ProductView from './ProductView';

const Products = () => {
	const {
		loading,
		error,
		PRODUCTS_COLUMNS,
		filteredItems,
		action,
		currentProd,
		closeMessage,
		handleAction,
		// handleCancel,
		// handleDelete,
		// handleAddProduct,
		// importMlProducts,
		subHeaderComponentMemo,
	} = useProducts();

	return (
		<Layout>
			{loading && <Loader />}
			{error && <Message msg={error} closeMessage={closeMessage} />}
			<br />
			{action === 'VIEW' && (
				<ProductView id={currentProd.id} handleAction={handleAction} />
			)}
			{action === 'INITIAL' && (
				<DataTable
					title='Productos'
					columns={PRODUCTS_COLUMNS}
					data={filteredItems}
					dense
					responsive
					selectableRows
					expandableRows
					expandableRowsComponent={ExpandedProduct}
					expandableRowsComponentProps={{handleAction: handleAction}}
					actions={subHeaderComponentMemo}
				/>
			)}
		</Layout>
	);
};

export default Products;
