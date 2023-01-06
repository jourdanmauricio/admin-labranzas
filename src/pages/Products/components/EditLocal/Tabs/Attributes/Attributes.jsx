import {FaPlus} from 'react-icons/fa';
import styles from '../../../../products.module.css';
import useAttributes from './useAttributes';
import {Modal} from '@/commons/Modal/Modal';
import ProductAddAtrib from './ProductAddAtrib';

const Attributes = () => {
	const {
		attributes,
		isOpenModal,
		closeModal,
		addOption,
		handleAddAtrib,
		handleCancel,
		isNotApply,
		isMultivalue,
		haveOptions,
		haveNumberUnit,
		handleChange,
		isAllowedUnits,
		isEnableNotApply,
		isString,
		isBoolean,
		isNumber,
	} = useAttributes();

	return (
		<>
			<table className='table mt'>
				<thead>
					<tr>
						<th style={{width: '25%'}}>Atributo</th>
						<th style={{width: '35%'}}>Valor</th>
						<th style={{width: '10%'}}>Unidad</th>
						<th style={{width: '30%'}}>Tags</th>
					</tr>
				</thead>
				<tbody>
					{attributes &&
						attributes.map(attribute => (
							<tr key={attribute.id}>
								<td>{attribute.name} </td>
								<td>
									<div className={styles.flex}>
										{isNotApply(attribute) ? (
											<button
												className='btn'
												onClick={e =>
													handleChange(attribute, e, 'DELETE-ATRIB')
												}
												name='N/A'>
												N/A
											</button>
										) : (
											haveOptions(attribute) &&
											(isMultivalue(attribute) ? (
												<div className={`fw ${styles.form__relative}`}>
													<select
														onChange={e =>
															handleChange(attribute, e, attribute.value_type)
														}
														// class="input-oval"
														className='form__input'
														name={attribute.id}
														id={attribute.id}
														multiple={attribute.tags && isMultivalue(attribute)}
														value={attribute.value_name.split(',')}>
														{attribute.values.map(value => (
															<option
																key={value.id}
																value={value.name}
																// selected={
																// 	attribute.value_name &&
																// 	attribute.value_name.includes(value.name)
																// 		? true
																// 		: false
																// }
															>
																{value.name}
															</option>
														))}
													</select>
													<i
														onClick={() => addOption(attribute)}
														className={styles.input__icons}>
														<FaPlus />
													</i>
												</div>
											) : (
												<div className={`fw ${styles.form__relative}`}>
													<select
														onChange={e =>
															handleChange(attribute, e, attribute.value_type)
														}
														className='form__input'
														name={attribute.id}
														id={attribute.id}
														selected={attribute.name}
														value={attribute.value_name || ' '}
														multiple={
															attribute.tags && isMultivalue(attribute)
														}>
														<option value=' ' />
														{attribute.values.map(value => (
															<option
																key={value.id}
																value={value.name}
																// selected={
																// 	attribute.value_name &&
																// 	attribute.value_name.includes(value.name)
																// 		? true
																// 		: false
																// }
															>
																{value.name}
															</option>
														))}
													</select>
													<i
														onClick={() => addOption(attribute)}
														className={styles.input__icons}>
														<FaPlus />
													</i>
												</div>
											))
										)}
										{isBoolean(attribute) && !isNotApply(attribute) && (
											<select
												onChange={e =>
													handleChange(attribute, e, attribute.value_type)
												}
												name={attribute.id}
												className='form__input'
												id={attribute.id}
												value={attribute.value_id || ''}>
												<option value=' '></option>
												{attribute.values.map(value => (
													<option key={value.id} value={value.id}>
														{value.name}
													</option>
												))}
											</select>
										)}
										{isString(attribute) && !isNotApply(attribute) && (
											<input
												onChange={e =>
													handleChange(attribute, e, attribute.value_type)
												}
												// class='input-oval'
												className='form__input'
												type='text'
												id={attribute.id}
												name={attribute.id}
												value={attribute.value_name || ''}
											/>
										)}
										{haveNumberUnit(attribute) && !isNotApply(attribute) && (
											<input
												onChange={e =>
													handleChange(attribute, e, attribute.value_type)
												}
												id={attribute.id}
												// class='input-oval'
												className='form__input'
												type='number'
												name={attribute.id}
												value={
													attribute.value_struct
														? attribute.value_struct.number
														: ''
												}
											/>
										)}
										{isNumber(attribute) && !isNotApply(attribute) && (
											<input
												onChange={e =>
													handleChange(attribute, e, attribute.value_type)
												}
												id={attribute.id}
												// class='input-oval'
												className='form__input'
												type='number'
												name={attribute.id}
												value={attribute.value_name}
											/>
										)}
										{isEnableNotApply(attribute) && !isNotApply(attribute) && (
											<button
												onClick={e => handleChange(attribute, e, 'N/A')}
												className={styles.attrib__NA}
												name='N/A'>
												N/A
											</button>
										)}
									</div>
								</td>
								<td>
									{isAllowedUnits(attribute) && (
										<select
											onChange={e => handleChange(attribute, e, 'units')}
											className='form__input'
											name={attribute.id}
											id={attribute.id}
											value={
												attribute.value_struct
													? attribute.value_struct.unit
													: ''
											}>
											{attribute.allowed_units.map(allowed_unit => (
												<option key={allowed_unit.id} value={allowed_unit.id}>
													{allowed_unit.name}
												</option>
											))}
										</select>
									)}
								</td>
								<td>
									{attribute.tags &&
										Object.entries(attribute.tags).map(([key]) => (
											<p key={key}>{key}</p>
										))}
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<Modal isOpenModal={isOpenModal} closeModal={closeModal}>
				<ProductAddAtrib
					handleAddAtrib={handleAddAtrib}
					handleCancel={handleCancel}
				/>
			</Modal>
		</>
	);
};

export default Attributes;
