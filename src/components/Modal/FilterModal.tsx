import Filter from '../Filter/Filter';

const FilterModal: React.FC = () => {
	return (
		<div
			className='
			fixed sm:hidden bg-white
			z-10 border-2 rounded-md
			my-[50vh] mx-auto
			-translate-y-[45%]
			translate-x-[40%]
		'
		>
			<Filter />
		</div>
	);
};

export default FilterModal;
