import search from '../assets/search.png';
import filter from '../assets/filter.png';
import { useAppDispatch, useAppSelector } from '../redux-types/hooks';
import { setSearchFilter } from '../store/productSlice';

const Search: React.FC<{ onClick: () => void }> = (props) => {
	const dispatch = useAppDispatch();
	const filterItems = useAppSelector((state) => state.product.fetchedData);

	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newSearchFilteredItems = filterItems.filter((item) => {
			if (
				item.name
					.toLocaleLowerCase()
					.trim()
					.includes(e.target.value.toLowerCase().trim())
			) {
				return true;
			}
		});
		if (e.target.value.trim().length > 0) {
			dispatch(setSearchFilter(newSearchFilteredItems));
		} else {
			dispatch(setSearchFilter(newSearchFilteredItems));
		}
	};

	return (
		<div
			className='flex justify-center
      items-center max-container 
      max-sm:justify-between
      pt-12 gap-2 sm:gap-4'
		>
			<input
				onChange={handleInputOnChange}
				id='search'
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
			<button className='max-sm:mt-7 mb-1 sm:hidden ' onClick={props.onClick}>
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
