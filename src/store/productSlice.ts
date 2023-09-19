import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
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
	checkBoxData: checkedDataType;
}

type checkedDataType = {
	color: ['Red' | 'Blue' | 'Green'] | [];
	gender: ['Men' | 'Women'] | [];
	price: ['250' | '251' | '450'] | [];
	type: ['polo' | 'hoodie' | 'basic'] | [];
};

const initialData: initialDataInterface = {
	fetchedData: [],
	filterData: [],
	status: 'idle',
	error: '',
	checkBoxData: { color: [], gender: [], price: [], type: [] },
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
	reducers: {
		filter: (state, action) => {
			let checkedData: [string, string] = action.payload;
			let type = checkedData[0]; // type : 'color' | 'gender' ...
			let value = checkedData[1]; // value: 'Red' | 'Men' ...
			let checkedDataState = state.checkBoxData as any;
			if (checkedDataState[type].includes(value)) {
				const newCheckBoxData = checkedDataState[type].filter(
					(element: typeof value) => element !== value
				);
				checkedDataState[type] = newCheckBoxData;
			} else {
				checkedDataState[type] = [value, ...(state.checkBoxData as any)[type]];
			}
			// Debug logs
			// console.log(current(state.checkBoxData));
			// console.log(current(state.fetchedData));
		},
	},
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

export const { filter } = productSlice.actions;
