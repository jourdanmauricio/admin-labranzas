import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {variables} from '../config/variables';

// export const signUp = createAsyncThunk(
//   "user/signUp",
//   async ({ credentials }) => {
//     // async operation
//     const response = await Axios.post(`${apiConfig.domain}/users`, {
//       user: credentials,
//     });
//     return response.data.user;
//   }
// );

export const signIn = createAsyncThunk('user/signIn', async data => {
	const API_AUTH = `${variables.basePath}/auth/login`;
	const API_USER = `${variables.basePath}/users/profile`;

	const userOptions = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const responseAuth = await fetch(API_AUTH, userOptions);
	const resAuth = await responseAuth.json();

	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${resAuth.access_token}`,
		},
	};
	const response = await fetch(API_USER, options);
	const resUser = await response.json();

	resUser.token = resAuth.access_token;

	return resUser;
});

let userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		status: '',
	},
	reducers: {
		logOut: state => {
			state.user = null;
			state.status = '';
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

		[signIn.pending]: state => {
			state.status = 'loading';
		},
		[signIn.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.status = 'success';
		},
		[signIn.rejected]: state => {
			state.status = 'failed';
		},
	},
});

export const {logOut} = userSlice.actions;

export default userSlice.reducer;
