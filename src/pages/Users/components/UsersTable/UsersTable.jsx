import {useSelector} from 'react-redux';
import UsersTableRow from '../UsersTableRow/UsersTableRow';

const UsersTable = ({data, setDataToEdit, deleteData}) => {
	let user = useSelector(state => state.user.user);
	return (
		<div className='table__container'>
			<table className='table'>
				<thead>
					<tr>
						<th>Email</th>
						<th>Role</th>
						{user.role === 'superadmin' && <th>Acciones</th>}
					</tr>
				</thead>
				<tbody>
					{data.length === 0 ? (
						<tr>
							<td colSpan='3'>Sin datos</td>
						</tr>
					) : (
						data.map(el => (
							<UsersTableRow
								key={el.id}
								el={el}
								setDataToEdit={setDataToEdit}
								deleteData={deleteData}
							/>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default UsersTable;
