import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useNavigate} from 'react-router-dom';
import {FaPowerOff, FaBars} from 'react-icons/fa';
import logo from '@/assets/logos/logo2.svg';
import {
	FaUserCog,
	FaCog,
	FaRegCalendarAlt,
	FaUsers,
	FaTh,
} from 'react-icons/fa';

import {logOut} from '@/store/user';

import './nav.css';

const Nav = () => {
	const [mobileMenu, setMobileMenu] = useState(true);
	let user = useSelector(state => state.user.user);
	let dispatch = useDispatch();
	let navigate = useNavigate();

	const handleMobileMenu = () => {
		setMobileMenu(!mobileMenu);
	};

	const handleLogout = () => {
		dispatch(logOut());
		navigate('/');
	};

	return (
		<nav>
			<div className='menu'>
				<FaBars onClick={handleMobileMenu} />
			</div>
			<div className='navbar'>
				<img src={logo} alt='logo' className='logo' />
				<ul>
					<li>
						{user && (
							<button className='navbar__logout' onClick={handleLogout}>
								<FaPowerOff />
							</button>
						)}
					</li>
				</ul>
			</div>
			<div
				className={`mobile-menu ${mobileMenu && 'inactive'}`}
				// className="mobile-menu inactive"
			>
				<ul>
					<li>
						<NavLink
							to='/home'
							className={({isActive}) =>
								isActive ? 'item__detail item__active' : 'item__detail'
							}>
							<FaUserCog className='material__icon' />
							<span className='icon-text'>Perfil</span>
						</NavLink>
					</li>

					<li>
						<NavLink
							to='/home'
							className={({isActive}) =>
								isActive ? 'item__detail item__active' : 'item__detail'
							}>
							<FaTh className='material__icon' />
							<span className='icon-text'>Dashboard</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/settings'
							className={({isActive}) =>
								isActive ? 'item__detail item__active' : 'item__detail'
							}>
							<FaCog className='material__icon' />
							<span className='icon-text'>Configuración</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({isActive}) =>
								isActive ? 'item__detail item__active' : 'item__detail'
							}
							to='/lessons'>
							<FaRegCalendarAlt className='material__icon' />
							<span className='icon-text'>Clases</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/students'
							className={({isActive}) =>
								isActive ? 'item__detail item__active' : 'item__detail'
							}>
							<FaUsers className='material__icon' />
							<span className='icon-text'>Alumnos</span>
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
