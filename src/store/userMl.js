import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {variables} from '../config/variables';

export const connectMl = createAsyncThunk(
	'userMl/connectMl',
	async (data, {getState, rejectWithValue}) => {
		const {user} = getState();
		// async operation

		try {
			const API_AUTH = `${variables.basePathMl}/oauth/token`;
			const body = {
				grant_type: 'authorization_code',
				client_id: variables.mlAppId,
				client_secret: variables.mlSecret,
				code: data.code,
				redirect_uri: `${variables.frontend}/meli-callback`,
			};

			const userOptions = {
				method: 'POST',
				body: JSON.stringify(body),
			};

			const responseToken = await fetch(API_AUTH, userOptions);
			const resToken = await responseToken.json();

			if (resToken.error) throw resToken.message;

			const API_USER = `${variables.basePathMl}/users/${resToken.user_id}`;

			const options = {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${resToken.access_token}`,
				},
			};
			const responseUserMl = await fetch(API_USER, options);
			const resUserMl = await responseUserMl.json();

			console.log('resUserMl', resUserMl);

			if (data.nickname !== resUserMl.nickname) {
				throw 'No coincide el nickname ingresado con la autorización de Mercado Libre';
			}

			resToken.id = resToken.user_id;
			resToken.nickname = resUserMl.nickname;
			resToken.permalink = resUserMl.permalink;
			resToken.site_id = resUserMl.site_id;
			delete resToken.user_id;

			const userMlOptions = {
				method: 'POST',
				body: JSON.stringify(resToken),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.user.token}`,
				},
			};

			const responseBdUserMl = await fetch(
				`${variables.basePath}/usersml`,
				userMlOptions
			);
			const resBdUserMl = await responseBdUserMl.json();

			return resBdUserMl;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const disconnectMl = createAsyncThunk(
	'userMl/disconnectMl',
	async (data, {getState, rejectWithValue}) => {
		const {userMl, user} = getState();
		// const URL_ML = `${variables.basePathMl}/users/${userMl.userMl.id}/applications/${variables.mlAppId}`;
		const URL = `${variables.basePath}/usersml/${userMl.userMl.id}`;

		try {
			// TODO: Utilizar el access_token del credor de la app, no del user a desvincular

			// const optionsMl = {
			// 	headers: {
			// 		Authorization: `Bearer ${userMl.userMl.access_token}`,
			// 	},
			// 	method: 'DELETE',
			// };

			// const responseDisconnectMl = await fetch(URL_ML, optionsMl);
			// const resDisconnectMl = await responseDisconnectMl.json();

			// console.log('resDisconnectMl', resDisconnectMl);

			const options = {
				headers: {
					Authorization: `Bearer ${user.user.token}`,
				},
				method: 'DELETE',
			};
			const responseDisconnect = await fetch(URL, options);
			await responseDisconnect.json();
		} catch (error) {
			return rejectWithValue('Error desvinculando nickname');
		}
	}
);

export const getUserMl = createAsyncThunk(
	'userMl/getUserMl',
	async (_, {getState, rejectWithValue}) => {
		const {user} = getState();
		const API_AUTH = `${variables.basePath}/usersMl`;

		try {
			const options = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.user.token}`,
				},
			};
			const responseUserMl = await fetch(API_AUTH, options);
			const resUserMl = await responseUserMl.json();

			if (resUserMl.error) {
				throw resUserMl.message;
			}
			return resUserMl;
		} catch (err) {
			console.log(err);
			return rejectWithValue(err);
		}
	}
);

let userSlice = createSlice({
	name: 'userMl',
	initialState: {
		userMl: null,
		status: '',
		error: '',
	},
	reducers: {
		logOutMl: state => {
			state.userMl = null;
			state.status = 'failed';
			state.error = 'Ususario de Mercado Libre no configurado!';
		},
	},
	extraReducers: {
		// [signUp.pending]: (state, action) => {
		//   state.status = "loading";
		// },
		// [signUp.fulfilled]: (state, action) => {
		//   state.user = action.payload;
		//   state.status = "success";
		// },
		// [signUp.rejected]: (state, action) => {
		//   state.status = "failed";
		// },

		[getUserMl.pending]: state => {
			state.status = 'loading';
		},
		[getUserMl.fulfilled]: (state, action) => {
			console.log(action);
			state.userMl = action.payload;
			state.status = 'success';
		},
		[getUserMl.rejected]: (state, action) => {
			state.userMl = null;
			state.status = 'failed';
			state.error = action.payload;
		},
		[connectMl.pending]: state => {
			state.status = 'loading';
		},
		[connectMl.fulfilled]: (state, action) => {
			state.userMl = action.payload;
			state.status = 'success';
			state.error = '';
		},
		[connectMl.rejected]: (state, action) => {
			console.log(action);
			state.status = 'failed';
			state.error = action.payload;
		},
		[disconnectMl.pending]: state => {
			state.status = 'loading';
		},
		[disconnectMl.fulfilled]: state => {
			state.userMl = null;
			state.status = 'failed';
			state.error = 'Ususario de Mercado Libre no configurado!';
		},
		[disconnectMl.rejected]: (state, action) => {
			console.log(action);
			state.status = 'failed';
			state.error = action.payload;
		},
	},
});

export const {logOutMl} = userSlice.actions;

export default userSlice.reducer;
