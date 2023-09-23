import { useAppDispatch } from '../../redux-types/hooks';
import { toggleError } from '../../store/productSlice';

const ErrorModal: React.FC<{ error: string | undefined }> = ({ error }) => {
	const dispatch = useAppDispatch();
	const closeHandler = () => {
		dispatch(toggleError({}));
	};

	return (
		<div
			className={`
        fixed top-[20%] left-[40%]
        max-sm:left-[15%]
        z-20 bg-white-400 p-12 rounded-md
        flex flex-col gap-5 border-2
        shadow-lg hover:shadow-3xl
        ${error && error.length > 0 ? '' : 'hidden'}
        backdrop-blur-lg
    `}
		>
			<button
				type='button'
				onClick={closeHandler}
				className='
					bg-[#ecd3d367] rounded-md p-2  backdrop-blur-2xl
					inline-flex items-center justify-center 
					text-[#e76d6d67] hover:text-[#e76d6d67] 
					hover:bg-[#edaeae67] focus:outline-none 
					focus:ring-1 focus:ring-inset focus:ring-[#ff6f6f67]
					absolute left-[75%] top-[15%] hover:shadow-lg
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
			<h2 className='text-center text-lg font-bold text-[#00000056]'>Error</h2>
			<p className='text-[#4b4a4a6f] font-semibold'>{error}</p>
		</div>
	);
};

export default ErrorModal;
