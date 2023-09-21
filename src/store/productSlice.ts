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

export type checkedDataType = {
	color: ['Red' | 'Blue' | 'Green'] | [];
	gender: ['Men' | 'Women'] | [];
	price: ['250' | '251' | '450'] | [];
	type: ['Polo' | 'Hoodie' | 'Basic'] | [];
};

interface initialDataInterface {
	fetchedData: productDataInterface[];
	filterData: productDataInterface[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | undefined;
	checkBoxData: checkedDataType;
	isSearching: boolean;
	searchQuery: string;
}

const initialData: initialDataInterface = {
	fetchedData: [],
	filterData: [],
	status: 'idle',
	error: '',
	checkBoxData: { color: [], gender: [], price: [], type: [] },
	isSearching: false,
	searchQuery: '',
};

// Asynchronous function to fetch products
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
			// ------- Logic to set the checkBoxData ------------------
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
				checkedDataState[type] = [value, ...checkedDataState[type]]; //Adding the value to checkBoxData.type
			}
			// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

			// -----------------Updating filterData-----------------
			let filteredData = state.fetchedData.filter((e) => {
				if (checkedDataState['color'].includes(e.color)) {
					return e;
				} else if (checkedDataState['gender'].includes(e.gender)) {
					return e;
				} else if (checkedDataState['type'].includes(e.type)) {
					return e;
				} else if (checkedDataState['price'].includes('250')) {
					return e.price <= 250;
				} else if (checkedDataState['price'].includes('251')) {
					return e.price >= 251 && e.price <= 450;
				} else if (checkedDataState['price'].includes('450')) {
					return e.price >= 450;
				}
			});

			// Set the filteredData state
			state.filterData = filteredData;
			state.isSearching = false;
			state.searchQuery = '';
			// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

			// Debug logs
			// console.log(current(checkedDataState)); //current gives us the current state, helpful while consoling the state in reducers. If not used, will get a proxy array which is an immediate return value not committed yer.
			// console.log(current(state.fetchedData));
			// try {
			// 	console.log('current-filterData', current(state.filterData));
			// } catch {
			// 	console.log('filterData', state.filterData);
			// }
			//
		},
		setSearchFilter: (state, action) => {
			// state.filterData = [...action.payload];
			return {
				...state,
				isSearching: true,
				searchQuery: action.payload.searchQuery,
				checkBoxData: { color: [], gender: [], price: [], type: [] },
				filterData: [...action.payload.items],
			};
			// try {
			// 	console.log('current-filterData', current(state.filterData));
			// } catch {
			// 	console.log('filterData', state.filterData);
			// }
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
				state.filterData = state.fetchedData.concat(action.payload);
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { filter, setSearchFilter } = productSlice.actions;
