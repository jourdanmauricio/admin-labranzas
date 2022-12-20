import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {login} from '../services/api/auth.api';

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

export const signIn = createAsyncThunk(
	'user/signIn',
	async (data, {rejectWithValue}) => {
		try {
			const user = await login(data);
			return user;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

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
			console.log('action.payload', action.payload);
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
