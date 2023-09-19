import Filter from '../components/Filter';
import ProductItems from '../components/product/ProductItems';
import Search from '../components/Search';

const Products: React.FC = () => {
	return (
		<>
			<section className='padding-x padding-t pb-10'>
				<Search />
			</section>
			<section
				className='
				flex justify-normal 
				items-start padding-x 
				max-container gap-32
				'
			>
				<section className='max-sm:hidden'>
					<Filter />
				</section>
				<section>
					<ProductItems />
				</section>
			</section>
		</>
	);
};

export default Products;
