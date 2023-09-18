import { useAppSelector, useAppDispatch } from '../redux-types/hooks';
import { fetchProducts } from '../store/productSlice';
import { useEffect } from 'react';

const Products = () => {
	const dispatch = useAppDispatch();
	const { fetchedData, status } = useAppSelector((state) => state.product);
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchProducts());
		}
	}, [dispatch, status]);
	if (status === 'succeeded') {
		console.log(fetchedData);
	}
	return (
		<section className='padding'>
			<div>
				<h1>Products</h1>
				{status == 'succeeded' && <div>{fetchedData[0].name}</div>}
			</div>
		</section>
	);
};

export default Products;
