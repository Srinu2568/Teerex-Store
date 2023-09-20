import FilterChild from './FilterChild';

const Filter: React.FC = () => {
	return (
		<div
			className='
			flex flex-col justify-center 
			items-start gap-2
			py-5 pl-8 pr-36 max-lg:pr-20 
			shadow-xl rounded-md
		'
		>
			<FilterChild />
		</div>
	);
};

export default Filter;
