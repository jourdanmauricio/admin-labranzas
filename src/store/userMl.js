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

			console.log('responseToken', responseToken);
			console.log('resToken', resToken);

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

			if (data.nickname !== resUserMl.nickname) {
				throw 'No coincide el nickname ingresado con la autorización de Mercado Libre';
			}

			resToken.nickname = resUserMl.user_id;
			resToken.nickname = resUserMl.nickname;
			resToken.permalink = resUserMl.permalink;
			resToken.site_id = resUserMl.site_id;

			const userMlOptions = {
				method: 'POST',
				body: JSON.stringify(resToken),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.user.token}`,
				},
			};

			const userMl = await fetch(
				`${variables.basePath}/usersml`,
				userMlOptions
			);

			console.log('userMl', userMl);
			//resUser.token = resAuth.access_token;

			return resUserMl;
		} catch (error) {
			return rejectWithValue(error);
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
		logOut: state => {
			state.user = null;
			state.status = '';
			state.error = '';
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

		[connectMl.pending]: state => {
			state.status = 'loading';
		},
		[connectMl.fulfilled]: (state, action) => {
			state.userMl = action.payload;
			state.status = 'success';
		},
		[connectMl.rejected]: (state, action) => {
			console.log(action);
			state.status = 'failed';
			state.error = action.payload;
		},
	},
});

export const {logOut} = userSlice.actions;

export default userSlice.reducer;
