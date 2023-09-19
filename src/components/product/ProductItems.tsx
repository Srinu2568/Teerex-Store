import { useAppSelector, useAppDispatch } from '../../redux-types/hooks';
import { fetchProducts } from '../../store/productSlice';
import { useEffect } from 'react';
import ProductItem from './ProductItem';

const ProductItems = () => {
	const dispatch = useAppDispatch();
	const { fetchedData, status } = useAppSelector((state) => state.product);
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchProducts());
		}
	}, [dispatch, status]);

	return (
		<div className='
      grid max-sm:grid-cols-1
      xl:grid-cols-3
      md:grid-cols-2
      sm:gap-12
      max-sm:gap-8
      place-items-center
    '>
			{fetchedData.map((item) => (
				<ProductItem key={item.id} item={item} />
			))}
		</div>
	);
};

export default ProductItems;
