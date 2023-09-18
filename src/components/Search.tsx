import search from '../assets/search.png';
import filter from '../assets/filter.png';

const Search: React.FC = () => {
	return (
		<div
			className='flex justify-center
      items-center max-container 
      max-sm:justify-between
      pt-12 gap-2 sm:gap-4'
		>
			<input
				className='border-b-2 border-gray-500 
          pb-2 pl-1 sm:pr-64 max-sm:mt-8
          focus-visible:outline-none '
				type='text'
				placeholder='Search for products...'
			/>
			<button className='max-sm:mt-7 mb-1 sm:mb-2'>
				<div
					className='bg-black rounded-md 
          py-2 px-3 
          flex justify-center
        '
				>
					<img
						src={search}
						alt='search-icon'
						height={25}
						width={25}
						className='rounded-md'
					/>
				</div>
			</button>
			<button className='max-sm:mt-7 mb-1 sm:hidden '>
				<div className='bg-black rounded-md py-2 px-3'>
					<img
						src={filter}
						alt='filter-icon'
						height={26}
						width={26}
						className='rounded-md'
					/>
				</div>
			</button>
		</div>
	);
};

export default Search;
