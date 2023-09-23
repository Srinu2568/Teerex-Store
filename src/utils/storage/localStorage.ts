import { productDataInterface } from '../../store/productSlice';

export function getLocalStorage(keyName: string) {
	let fetchedItem: any;
	try {
		fetchedItem = localStorage.getItem(`${keyName}`);
	} catch (err) {
		setLocalStorage(keyName, null);
		fetchedItem = false;
	}
	return JSON.parse(fetchedItem);
}

export function setLocalStorage(
	keyName: string,
	value: {
		cartData: productDataInterface[];
		totalAmount: number;
		totalQuantity: number;
	} | null
) {
	localStorage.setItem(keyName, JSON.stringify(value));
	return getLocalStorage(keyName);
}
