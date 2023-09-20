import { ChangeEvent } from 'react';
import CheckBox from '../CheckBox';
import { checkedDataType } from '../../store/productSlice';
import { useAppDispatch, useAppSelector } from '../../redux-types/hooks';
import { filter } from '../../store/productSlice';

const FilterChild: React.FC<{ onClick?: () => void }> = (props) => {
	const dispatch = useAppDispatch();
	const checkBoxData: checkedDataType = useAppSelector(
		(state) => state.product.checkBoxData
	);

	const filterHandler = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(filter([e.target.value, e.target.id]));
	};

	const isCheckedHandler = (type: string, value: string): boolean => {
		let checkData = checkBoxData as any;
		if (checkData[type].includes(value)) {
			return true;
		}
		return false;
	};

	return (
		<>
			<div>
				<button
					type='button'
					onClick={props.onClick}
					className='
					sm:hidden
					bg-gray-200 rounded-md p-2
					inline-flex items-center justify-center 
					text-black hover:text-gray-500 
					hover:bg-gray-100 focus:outline-none 
					focus:ring-2 focus:ring-inset focus:ring-gray-500
					absolute left-[70%]
				'
				>
					<span className='sr-only'>Close menu</span>
					<svg
						className='h-4 w-4'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						aria-hidden='true'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</button>
				<h4 className='text-lg font-bold my-2'>Colour</h4>
				<CheckBox
					id='Red'
					label='Red'
					value='color'
					isChecked={isCheckedHandler('color', 'Red')}
					onChange={filterHandler}
				/>
				<CheckBox
					id='Blue'
					label='Blue'
					value='color'
					isChecked={isCheckedHandler('color', 'Blue')}
					onChange={filterHandler}
				/>
				<CheckBox
					id='Green'
					label='Green'
					value='color'
					isChecked={isCheckedHandler('color', 'Green')}
					onChange={filterHandler}
				/>
			</div>
			<div>
				<h4 className='text-lg font-bold my-2'>Gender</h4>
				<CheckBox
					id='Men'
					label='Men'
					value='gender'
					isChecked={isCheckedHandler('gender', 'Men')}
					onChange={filterHandler}
				/>
				<CheckBox
					id='Women'
					label='Women'
					value='gender'
					isChecked={isCheckedHandler('gender', 'Women')}
					onChange={filterHandler}
				/>
			</div>
			<div className='min-w-[110px]'>
				<h4 className='text-lg font-bold my-2'>Price</h4>
				<CheckBox
					id='250'
					label='0-Rs250'
					value='price'
					isChecked={isCheckedHandler('price', '250')}
					onChange={filterHandler}
				/>
				<CheckBox
					id='251'
					label='Rs251-450'
					value='price'
					isChecked={isCheckedHandler('price', '251')}
					onChange={filterHandler}
				/>
				<CheckBox
					id='450'
					label='Rs 450'
					value='price'
					isChecked={isCheckedHandler('price', '450')}
					onChange={filterHandler}
				/>
			</div>
			<div>
				<h4 className='text-lg font-bold my-2'>Type</h4>
				<CheckBox
					id='Polo'
					label='Polo'
					value='type'
					isChecked={isCheckedHandler('type', 'Polo')}
					onChange={filterHandler}
				/>
				<CheckBox
					id='Hoodie'
					label='Hoodie'
					value='type'
					isChecked={isCheckedHandler('type', 'Hoodie')}
					onChange={filterHandler}
				/>
				<CheckBox
					id='Basic'
					label='Basic'
					value='type'
					isChecked={isCheckedHandler('type', 'Basic')}
					onChange={filterHandler}
				/>
			</div>
		</>
	);
};

export default FilterChild;
