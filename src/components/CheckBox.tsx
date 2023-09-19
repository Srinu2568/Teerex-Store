import { ChangeEvent } from 'react';

const CheckBox: React.FC<{
	id: string;
	value: string;
	label: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
	return (
		<div
			className='flex justify-start 
			items-center gap-1 ml-1
			'
		>
			<input
				className='appearance-none bg-slate-gray 
					w-4 h-4 border-2 border-slate-gray
					rounded-sm hover:bg-gray-600 checked:bg-blue-600
					checked:hover:bg-blue-800 checked:border-blue-800
					transition ease-in-out delay-75 duration-200
					'
				type='checkbox'
				id={props.id}
				value={props.value}
				onChange={props.onChange}
			/>
			<label className='ml-3 flex font-bold font-palanquin ' htmlFor={props.id}>
				{props.label}
			</label>
		</div>
	);
};

export default CheckBox;
