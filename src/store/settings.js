import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchSettings, updateSettings} from '../services/api/settings.api';

export const getSettings = createAsyncThunk(
	'settings/getSettings',
	async (_, {rejectWithValue}) => {
		try {
			const settings = await fetchSettings();
			console.log('settings', settings);
			return settings.setting;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const putSettings = createAsyncThunk(
	'settings/putSettings',
	async (data, {rejectWithValue}) => {
		try {
			const settings = await updateSettings(data);
			return settings.setting;
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
