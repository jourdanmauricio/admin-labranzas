import {useSelector} from 'react-redux';
import Layout from '../../commons/Layout/layout';

import './profile.css';

const Profile = () => {
	let user = useSelector(state => state.user.user);

	return (
		<Layout>
			<h1 className='title'>Perfil</h1>
			<div className='form__container'>
				<div className='user__detail'>
					<p>Email:</p> <span>{user.email}</span>
					<p>Role:</p> <span>{user.role}</span>
				</div>
			</div>
			<br />
		</Layout>
	);
};

export default Profile;
