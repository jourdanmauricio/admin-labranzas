import {useEffect, useState} from 'react';

const CategoryEditFrom = ({dataToEdit, handleEdit, handleCancelDelete}) => {
	const [form, setForm] = useState({description_web: ''});

	useEffect(() => {
		if (dataToEdit) {
			dataToEdit.description_web = dataToEdit.description_web || '';
			setForm(dataToEdit);
		} else {
			setForm({description_web: ''});
		}
	}, [dataToEdit]);

	const handleSubmit = e => {
		e.preventDefault();
		handleEdit(form);
	};

	const handleChange = value => {
		setForm({...form, description_web: value});
	};

	return (
		<form className='form__container' onSubmit={handleSubmit}>
			<h2 className='title'>Modificar Categoría</h2>
			<p className='delete__paragraph'>{dataToEdit?.full_name}</p>
			<div className='formulario'>
				<div className='wide'>
					<label htmlFor='cat-web'>Categoría Web</label>
					<input
						className='form__input'
						type='text'
						name='cat-web'
						placeholder='Centros de mesa'
						value={form.description_web}
						onChange={e => handleChange(e.target.value)}
					/>
				</div>
			</div>

			<div className='delete__actions'>
				<button
					className='btn'
					onClick={handleCancelDelete}
					id='cancel'
					type='button'>
					Cancelar
				</button>

				<button className='btn btn__primary' id='delete' type='submit'>
					Modificar
				</button>
			</div>
		</form>
	);
};

export default CategoryEditFrom;
