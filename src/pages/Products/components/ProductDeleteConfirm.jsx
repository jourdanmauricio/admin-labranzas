import {useSelector} from 'react-redux';

const ProductDeleteConfirm = ({handleConfirm, handleCancel}) => {
	const handleSubmit = e => {
		e.preventDefault();
		handleConfirm();
	};

	const action = useSelector(state => state.product.action);
	const currentProd = useSelector(state => state.product.product);

	return (
		<form className='confirm__delete' onSubmit={handleSubmit}>
			<h2 className='title'>
				Eliminar producto del canal
				{action === 'DELETE-WEB' && ' Web'}
				{action === 'DELETE-ML' && ' ML'}
				{action === 'DELETE-LOCAL' && ' Local'}?
			</h2>
			<p className='delete__paragraph'>
				Esta seguro de eliminar el producto
				{action === 'DELETE-WEB' && ` ${currentProd.prodWeb.id}`}
				{action === 'DELETE-ML' && ` ${currentProd.prodMl.id}`}
				{action === 'DELETE-LOCAL' && ` ${currentProd.id}`}?
			</p>
			<p>{currentProd?.title}</p>
			<br />
			<div className='delete__actions'>
				<button
					className='btn'
					onClick={handleCancel}
					id='cancel'
					type='button'>
					Cancelar
				</button>

				<button className='btn btn__primary' id='delete' type='submit'>
					Eliminar
				</button>
			</div>
		</form>
	);
};

export default ProductDeleteConfirm;
