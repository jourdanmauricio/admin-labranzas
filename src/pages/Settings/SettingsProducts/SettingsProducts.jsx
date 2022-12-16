import {useSelector} from 'react-redux';

const SettingsProducts = () => {
	let settings = useSelector(state => state.settings.settings?.pictures);
	console.log('settings', settings);
	return <h1 className='title'>Configuración Productos</h1>;
};

export default SettingsProducts;
