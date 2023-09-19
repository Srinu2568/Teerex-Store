import Filter from '../components/Filter';
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
		<>
			<section className='padding-x padding-t pb-10'>
				<Search />
			</section>
			<section
				className='
				flex justify-between 
				items-start padding-x 
				max-container
				'
			>
				<section className='max-sm:hidden padding-b'>
					<Filter />
				</section>
				<section>Products Section</section>
			</section>
		</>
	);
};

export default Products;
