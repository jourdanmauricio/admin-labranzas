import {Link} from 'react-router-dom';

const Error404 = () => {
	return (
		<>
			<Link to='/videos'>Ir a inicio</Link>
			<h1>Esta página no existe. 404</h1>
		</>
	);
};
export default Error404;
