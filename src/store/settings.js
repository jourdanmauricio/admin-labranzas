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

			return resSettings.setting;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const putSettings = createAsyncThunk(
	'settings/putSettings',
	async (data, {getState, rejectWithValue}) => {
		const {user} = getState();
		const API = `${variables.basePath}/settings`;

		try {
			const options = {
				method: 'PUT',
				body: JSON.stringify({setting: data}),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.user.token}`,
				},
			};
			const responseSettings = await fetch(API, options);
			const resSettings = await responseSettings.json();
			console.log('resSettings', resSettings);

			return resSettings.setting;
		} catch (err) {
			console.log('errrrrrrrrrrrrrrrrrrrrrr', err);
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
			state.status = 'initial';
			state.error = '';
		},
		[getSettings.rejected]: (state, action) => {
			state.settings = null;
			state.status = 'failed';
			state.error = action.payload;
		},
		[putSettings.pending]: state => {
			state.status = 'loading';
			state.error = '';
			// state.settings = null;
		},
		[putSettings.fulfilled]: (state, action) => {
			console.log('action.payload', action.payload);
			state.settings = action.payload;
			state.status = 'success';
			state.error = '';
		},
		[putSettings.rejected]: (state, action) => {
			console.log('action.payload', action.payload);
			state.settings = null;
			state.status = 'failed';
			state.error = action.payload;
		},
	},
});

export const {logOutSettings} = settingsSlice.actions;

export default settingsSlice.reducer;
