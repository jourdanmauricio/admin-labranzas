import React, {Suspense} from 'react';
import {Provider, useSelector} from 'react-redux';
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './store';
import './App.css';
import Login from './pages/auth/Login/Login';
// import Loader from '@/commons/Loader-overlay/Loader-overlay';

const ForgotPassword = React.lazy(() =>
	import('./pages/auth/ForgotPassword/ForgotPassword')
);
const RecoveryPassword = React.lazy(() =>
	import('./pages/auth/RecoveryPassword/RecoveryPassword')
);

const MeliCallback = React.lazy(() =>
	import('./pages/Settings/SettingsMl/MeliCallback')
);
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
const Error404 = React.lazy(() => import('./pages/Error404/Error404'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Settings = React.lazy(() => import('./pages/Settings/Settings'));
const SettingsWeb = React.lazy(() =>
	import('./pages/Settings/SettingsWeb/SettingsWeb')
);
const SettingsMl = React.lazy(() =>
	import('./pages/Settings/SettingsMl/SettingsMl')
);
const SettingsQuestions = React.lazy(() =>
	import('./pages/Settings/SettingsQuestions/SettingsQuestions')
);
const SettingsProducts = React.lazy(() =>
	import('./pages/Settings/SettingsProducts/SettingsProducts')
);
const Users = React.lazy(() => import('./pages/Users/Users'));
const Products = React.lazy(() => import('./pages/Products/Products'));
const Categories = React.lazy(() => import('./pages/Categories/Categories'));

const AuthRoute = props => {
	let user = useSelector(state => state.user.user);
	if (user?.role !== 'admin' && user?.role !== 'superadmin') {
		return <Navigate to='/' />;
	}
	return props.children;
};

const AuthSuperadminRoute = props => {
	let user = useSelector(state => state.user.user);
	if (user.role !== 'superadmin') {
		return <Navigate to='/' />;
	}
	return props.children;
};

function App() {
	return (
		<Router>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Suspense fallback={<div />}>
						{/* <Suspense maxDuration={400} fallback={<Loader />}> */}
						<Routes>
							<Route path='/' element={<Login />} />
							<Route path='/forgot-password' element={<ForgotPassword />} />
							<Route path='/recovery-password' element={<RecoveryPassword />} />
							<Route path='/meli-callback' element={<MeliCallback />} />
							<Route
								path='/dashboard'
								element={
									<AuthRoute>
										<Dashboard />
									</AuthRoute>
								}
							/>
							<Route
								path='/profile'
								element={
									<AuthRoute>
										<Profile />
									</AuthRoute>
								}
							/>
							<Route
								path='/users'
								element={
									<AuthSuperadminRoute>
										<Users />
									</AuthSuperadminRoute>
								}
							/>
							<Route
								path='/settings'
								element={
									<AuthSuperadminRoute>
										<Settings />
									</AuthSuperadminRoute>
								}>
								<Route
									path='settingsQuestions'
									element={
										<AuthSuperadminRoute>
											<SettingsQuestions />
										</AuthSuperadminRoute>
									}
								/>
								<Route
									path='settingsWeb'
									element={
										<AuthSuperadminRoute>
											<SettingsWeb />
										</AuthSuperadminRoute>
									}
								/>
								<Route
									path='settingsMl'
									element={
										<AuthSuperadminRoute>
											<SettingsMl />
										</AuthSuperadminRoute>
									}
								/>
								<Route
									path='settingsProducts'
									element={
										<AuthSuperadminRoute>
											<SettingsProducts />
										</AuthSuperadminRoute>
									}
								/>
							</Route>
							<Route
								path='products'
								element={
									<AuthSuperadminRoute>
										<Products />
									</AuthSuperadminRoute>
								}
							/>
							<Route
								path='categories'
								element={
									<AuthSuperadminRoute>
										<Categories />
									</AuthSuperadminRoute>
								}
							/>
							<Route path='*' element={<Error404 />} />
						</Routes>
					</Suspense>
				</PersistGate>
			</Provider>
		</Router>
	);
}

export default App;
