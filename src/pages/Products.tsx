import { useState } from 'react';

import Filter from '../components/Filter/Filter';
import FilterModal from '../components/Modal/FilterModal';
import ProductItems from '../components/product/ProductItems';
import Search from '../components/Search';

const Products: React.FC = () => {
	const [toggleModal, setToggleModal] = useState(false);

	const handleFilterToggle = () => {
		setToggleModal((state) => !state);
	};

	return (
		<>
			{toggleModal && <FilterModal onClick={handleFilterToggle} />}
			<section className='padding-x padding-t pb-10'>
				<Search onClick={handleFilterToggle} />
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
