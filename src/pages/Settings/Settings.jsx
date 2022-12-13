import {Outlet} from 'react-router-dom';
import Layout from '../../commons/Layout/layout';

const Settings = () => {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
};

export default Settings;
