import Search from '../components/Search';
import { useAppSelector, useAppDispatch } from '../redux-types/hooks';
import { fetchProducts } from '../store/productSlice';
import { useEffect } from 'react';

const Products: React.FC = () => {
	const dispatch = useAppDispatch();
	const { fetchedData, status } = useAppSelector((state) => state.product);
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchProducts());
		}
	}, [dispatch, status]);
	return (
		<section className='padding'>
			<div>
				<Search />
			</div>
		</section>
	);
};

export default Products;
