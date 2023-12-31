import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { filterItems } from '../utils/cart/filterItems';
import {
	getLocalStorage,
	setLocalStorage,
} from '../utils/storage/localStorage';

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
	productQuantity: number;
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
	cartData: productDataInterface[];
	totalAmount: number;
	totalQuantity: number;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | undefined;
	checkBoxData: checkedDataType;
	isSearching: boolean;
	searchQuery: string;
}

const initialData: initialDataInterface = {
	fetchedData: [],
	filterData: [],
	cartData: [],
	totalAmount: 0,
	totalQuantity: 0,
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
			let transformedData: productDataInterface = response.data.map(
				(item: productDataInterface) => {
					return { ...item, productQuantity: 0 };
				}
			);
			return transformedData;
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
				} else {
					return false;
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
		addToCart: (state, action) => {
			let id = action.payload.id;
			let newItem = state.fetchedData.find((item) => item.id === id)!;
			let passedItem = state.cartData.find((item) => item.id === id)!;
			let isNew: boolean = passedItem === undefined;
			let newState: initialDataInterface;
			if (state.cartData.length <= 0) {
				newState = {
					...state,
					cartData: [{ ...newItem, productQuantity: 1 }],
					totalQuantity: 1,
					totalAmount: newItem.price,
				};
			} else if (isNew) {
				newState = {
					...state,
					cartData: [
						...state.cartData,
						{
							id: newItem.id,
							color: newItem.color,
							currency: newItem.currency,
							gender: newItem.gender,
							imageURL: newItem.imageURL,
							name: newItem.name,
							price: newItem.price,
							quantity: newItem.quantity,
							type: newItem.type,
							productQuantity: newItem.productQuantity + 1,
						},
					],
					totalQuantity: state.totalQuantity + 1,
					totalAmount: state.totalAmount + newItem.price,
				};
			} else if (!isNew) {
				if (passedItem.quantity > passedItem.productQuantity) {
					let newCartData: productDataInterface[] = filterItems(
						state.cartData.map((item) => {
							return { ...item }; // Make deep copies of nested objs.
						}),
						passedItem.id
					);

					newState = {
						...state,
						cartData: newCartData,
						totalQuantity: state.totalQuantity + 1,
						totalAmount: state.totalAmount + passedItem.price,
					};
				} else {
					newState = { ...state, error: 'Max quantity reached!' };
				}
			} else {
				newState = state; // No change to state
			}
			// Reflecting the changes in local storage
			setLocalStorage('cartData', {
				cartData: newState.cartData,
				totalQuantity: newState.totalQuantity,
				totalAmount: newState.totalAmount,
			});
			return newState;
		},
		removeFromCart: (state, action) => {
			let id = action.payload.id;
			let newState: initialDataInterface;
			let newCartData: productDataInterface[];
			let passedItem = state.cartData.find((item) => item.id === id)!;
			if (passedItem.productQuantity > 1) {
				newCartData = state.cartData.map((item) => {
					if (item.id === passedItem.id) {
						return {
							...passedItem,
							productQuantity: passedItem.productQuantity - 1,
						};
					} else {
						return item;
					}
				});
				newState = {
					...state,
					cartData: newCartData,
					totalQuantity: state.totalQuantity - 1,
					totalAmount: state.totalAmount - passedItem.price,
				};
			} else {
				newCartData = state.cartData.filter(
					(item) => item.id !== passedItem.id
				);
				newState = {
					...state,
					cartData: newCartData,
					totalQuantity: state.totalQuantity - 1,
					totalAmount: state.totalAmount - passedItem.price,
				};
			}
			// Reflecting the changes in local storage
			setLocalStorage('cartData', {
				cartData: newState.cartData,
				totalQuantity: newState.totalQuantity,
				totalAmount: newState.totalAmount,
			});
			console.log(current(state.cartData));
			return newState;
		},
		setCartData: (state, action) => {
			let localCartData: {
				cartData: productDataInterface[];
				totalAmount: number;
				totalQuantity: number;
			} = getLocalStorage('cartData');
			if (localCartData) {
				return {
					...state,
					cartData: localCartData.cartData,
					totalAmount: localCartData.totalAmount,
					totalQuantity: localCartData.totalQuantity,
				};
			}
		},
		toggleError: (state, action) => {
			if (action.payload.error) {
				return {
					...state,
					error: action.payload.error,
				};
			}
			return {
				...state,
				error: '',
			};
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchProducts.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				return {
					...state,
					status: 'succeeded',
					fetchedData: action.payload,
					filterData: action.payload,
				};
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const {
	filter,
	setSearchFilter,
	addToCart,
	removeFromCart,
	setCartData,
	toggleError,
} = productSlice.actions;
