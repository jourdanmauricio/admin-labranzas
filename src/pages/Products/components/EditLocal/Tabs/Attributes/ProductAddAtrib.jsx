import {useState} from 'react';

const ProductAddAtrib = ({handleCancel, handleAddAtrib}) => {
	const [newValueAttrib, setNewValueAttrib] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		handleAddAtrib(newValueAttrib);
	};

	return (
		<form className='confirm__delete' onSubmit={e => handleSubmit(e)}>
			<h2 className='title'>Agregar valor personalizado</h2>
			<br />

			<div className='formulario fw'>
				<div className='wide'>
					<label htmlFor='newAttrib'>Nuevo valor para el atributo</label>
					<input
						onChange={e => setNewValueAttrib(e.target.value)}
						type='text'
						name='newAttrib'
						className='form__input'
					/>
				</div>
			</div>
			<div className='delete__actions'>
				<button
					className='btn'
					onClick={handleCancel}
					id='cancel'
					type='button'>
					Cancelar
				</button>

				<button className='btn btn__primary' id='delete' type='submit'>
					Crear
				</button>
			</div>
		</form>
	);
};

export default ProductAddAtrib;
