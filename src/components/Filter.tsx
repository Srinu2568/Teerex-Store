import { ChangeEvent } from 'react';
import CheckBox from './CheckBox';

const filterHandler = (e: ChangeEvent<HTMLInputElement>) => {
	console.log(e.target.id, e.target.value);
};

const Filter: React.FC = () => {
	return (
		<div className='
			flex flex-col justify-center 
			items-start gap-2
			py-5 pl-8 pr-36 max-lg:pr-20 
			shadow-xl rounded-md
		'>
			<div>
				<h4 className='text-lg font-bold my-2'>Colour</h4>
				<CheckBox id='Red' label='Red' value='color' onChange={filterHandler} />
				<CheckBox
					id='Blue'
					label='Blue'
					value='color'
					onChange={filterHandler}
				/>
				<CheckBox
					id='Green'
					label='Green'
					value='color'
					onChange={filterHandler}
				/>
			</div>
			<div>
				<h4 className='text-lg font-bold my-2'>Gender</h4>
				<CheckBox
					id='Men'
					label='Men'
					value='gender'
					onChange={filterHandler}
				/>
				<CheckBox
					id='Women'
					label='Women'
					value='gender'
					onChange={filterHandler}
				/>
			</div>
			<div className='min-w-[110px]'>
				<h4 className='text-lg font-bold my-2'>Price</h4>
				<CheckBox
					id='250'
					label='0-Rs250'
					value='price'
					onChange={filterHandler}
				/>
				<CheckBox
					id='251'
					label='Rs251-450'
					value='price'
					onChange={filterHandler}
				/>
				<CheckBox
					id='450'
					label='Rs 450'
					value='price'
					onChange={filterHandler}
				/>
			</div>
			<div>
				<h4 className='text-lg font-bold my-2'>Type</h4>
				<CheckBox
					id='polo'
					label='Polo'
					value='type'
					onChange={filterHandler}
				/>
				<CheckBox
					id='hoodie'
					label='Hoodie'
					value='type'
					onChange={filterHandler}
				/>
				<CheckBox
					id='basic'
					label='Basic'
					value='type'
					onChange={filterHandler}
				/>
			</div>
		</div>
	);
};

export default Filter;
