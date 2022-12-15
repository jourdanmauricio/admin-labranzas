import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {variables} from '../config/variables';

export const getSettings = createAsyncThunk(
	'settings/getSettings',
	async (_, {getState, rejectWithValue}) => {
		const {user} = getState();
		const API = `${variables.basePath}/settings`;

		try {
			const options = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.user.token}`,
				},
			};
			const responseSettings = await fetch(API, options);
			const resSettings = await responseSettings.json();

			console.log('resSettings', resSettings);

			return resSettings;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

let settingsSlice = createSlice({
	name: 'userMl',
	initialState: {
		settings: null,
		status: '',
		error: '',
	},
	reducers: {
		logOutSettings: state => {
			state.settings = null;
			state.status = '';
			state.error = '';
		},
	},
	extraReducers: {
		[getSettings.pending]: state => {
			state.status = 'loading';
			state.error = '';
			state.settings = null;
		},
		[getSettings.fulfilled]: (state, action) => {
			console.log(action);
			state.settings = action.payload;
			state.status = 'success';
			state.error = '';
		},
		[getSettings.rejected]: (state, action) => {
			state.settings = null;
			state.status = 'failed';
			state.error = action.payload;
		},
	},
});

export const {logOutMl} = settingsSlice.actions;

export default settingsSlice.reducer;
