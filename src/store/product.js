import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getLocalProduct} from '@/services/api/products.api';

export const setFullProduct = createAsyncThunk(
	'product/setFullProduct',
	async (data, {rejectWithValue}) => {
		try {
			const product = await getLocalProduct(data.id);
			console.log('Product', product);
			return {product, action: data.action};
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

let productSlice = createSlice({
	name: 'product',
	initialState: {
		product: null,
		action: null,
		changedFields: [],
		status: '',
		error: '',
	},
	reducers: {
		unsetProduct: state => {
			state.product = null;
			state.action = null;
			state.status = '';
			state.changedFields = [];
		},
		setProduct: (state, action) => {
			state.product = action.payload.product;
			state.status = 'success';
		},
		setAction: (state, action) => {
			console.log('setAction Store', action.payload.action);
			// state.product = action.payload.product;
			state.action = action.payload.action;
			state.status = 'success';
			state.error = '';
			state.changedFields = [];
		},
		editField: (state, action) => {
			console.log('Store editField', action.payload);
			state.product = {
				...state.product,
				[action.payload.field]: action.payload.value,
			};
			const index = state.changedFields.findIndex(
				changedfield => changedfield === action.payload.field
			);
			if (index === -1)
				state.changedFields = [...state.changedFields, action.payload.field];
		},
		setProdLoading: state => {
			state.status = 'loading';
			state.error = '';
		},
		setProdError: (state, action) => {
			console.log('Store error', action.payload.error);
			state.error = action.payload.error;
			state.status = action.payload.error.length > 0 ? 'failed' : 'success';
		},
	},
	extraReducers: {
		[setFullProduct.pending]: state => {
			state.status = 'loading';
		},
		[setFullProduct.fulfilled]: (state, action) => {
			console.log('action.payload', action.payload);
			state.product = action.payload.product;
			state.action = action.payload.action;
			state.status = 'success';
		},
		[setFullProduct.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.payload;
		},
	},
});

export const {
	unsetProduct,
	setAction,
	setProduct,
	editField,
	setProdLoading,
	setProdError,
	resetFields,
} = productSlice.actions;

export default productSlice.reducer;
