import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface productDataInterface {
	id: number;
	imageURL: string;
	name: string;
	type: string;
	price: number;
	currency: string;
	color: string;
	gender: string;
	quantity: number;
}

interface initialDataInterface {
	fetchedData: productDataInterface[];
	filterData: productDataInterface[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | undefined;
}

const initialData: initialDataInterface = {
	fetchedData: [],
	filterData: [],
	status: 'idle',
	error: '',
};

export const fetchProducts = createAsyncThunk(
	'product/fetchProducts',
	async () => {
		try {
			const response = await axios.get(
				'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
			);
			return [...response.data];
		} catch (err: any) {
			return err.message;
		}
	}
);

export const productSlice = createSlice({
	name: 'product',
	initialState: initialData,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchProducts.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.fetchedData = state.fetchedData.concat(action.payload);
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

