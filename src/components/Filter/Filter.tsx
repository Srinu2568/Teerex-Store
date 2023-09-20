import FilterChild from './FilterChild';

const Filter: React.FC<{ onClick?: () => void }> = (props) => {
	return (
		<div
			className='
			flex flex-col justify-center 
			items-start gap-2
			py-5 pl-8 pr-36 max-lg:pr-20 
			shadow-xl rounded-md
		'
		>
			<FilterChild onClick={props.onClick} />
		</div>
	);
};

export default Filter;
