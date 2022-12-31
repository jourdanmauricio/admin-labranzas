import useProductSystem from './useProductSystem';
import SystemsTable from './SystemsTable';
import Variations from './Variations';

const ProductSystems = () => {
	const {handleAction, handleProduct, handleChange} = useProductSystem();

	return (
		<>
			<SystemsTable
				handleAction={handleAction}
				handleProduct={handleProduct}
				handleChange={handleChange}
			/>
			<Variations />
		</>
	);
};

export default ProductSystems;
