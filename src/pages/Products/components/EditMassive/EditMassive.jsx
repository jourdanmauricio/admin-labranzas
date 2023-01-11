const EditMassive = ({selectedRows}) => {
	const handleMassive = action => {
		if (action === 'MIGRATE-WEB')
			console.log('Massive action', action, selectedRows);
	};

	return (
		<select
			className='form__input'
			defaultValue='Acciones masivas'
			onChange={e => handleMassive(e.target.value)}>
			<option value=''>Acciones masivas</option>
			<option value='MIGRATE-WEB'>Crear en Web</option>
		</select>
	);
};

export default EditMassive;
