import { useAppSelector, useAppDispatch } from '../../redux-types/hooks';
import { fetchProducts, setCartData } from '../../store/productSlice';
import { useEffect } from 'react';
import ProductItem from './ProductItem';

const ProductItems = () => {
	// State and action imports
	const dispatch = useAppDispatch();
	const { checkBoxData, filterData, status, fetchedData, isSearching } =
		useAppSelector((state) => state.product);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchProducts());
			dispatch(setCartData({}));
		}
	}, [dispatch, status]);

	let isSearch: boolean = isSearching;
	let isChecked: boolean =
		checkBoxData.color.length > 0 ||
		checkBoxData.gender.length > 0 ||
		checkBoxData.price.length > 0 ||
		checkBoxData.type.length > 0;
	let products;

	if (isChecked || isSearch) {
		products = filterData.map((item, idx) => (
			<ProductItem key={idx} item={item} />
		));
	} else {
		products = fetchedData.map((item, idx) => (
			<ProductItem key={idx} item={item} />
		));
	}

	return (
		<div
			className='
      grid max-sm:grid-cols-1
      xl:grid-cols-3
      md:grid-cols-2
      sm:gap-32 sm:gap-y-14
			lg:gap-14 lg:gap-x-18
      max-sm:gap-8
      place-items-center
    '
		>
			{products}
		</div>
	);
};

export default ProductItems;
