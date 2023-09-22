import { productDataInterface } from '../../store/productSlice';

const CartItem: React.FC<{ productData: productDataInterface }> = ({
	productData,
}) => {
	return (
		<div
			className='
      flex justify-between 
      max-w-sm place-items-center 
      gap-x-10 font-montserrat
    '
		>
			<img
				className='
          object-contain border border-gray-600
        '
				src={productData.imageURL}
				alt={productData.name}
				height={48}
				width={48}
			/>
			<div className='flex flex-shrink-0 flex-col'>
				<h2 className='font-bold'>{productData.name}</h2>
				<p className='font-bold text-sm'>Rs {productData.price}</p>
			</div>
			<div
				className='
        flex bg-gray-300 rounded-md 
        gap-2 border border-gray-500 
        justify-center items-center px-2 py-1
        max-sm:px-3 
        '
			>
				<button>
					<div
						className='
          flex justify-center items-center
          bg-gray-200 rounded-full
            w-5 h-5 hover:bg-gray-100
            transition ease-in-out delay-100
        '
					>
						+
					</div>
				</button>
				<div className=' flex-shrink-0 '>
					Qty: {productData.productQuantity}
				</div>
				<button>
					<div
						className='
          flex justify-center items-center
          bg-gray-200 rounded-full
            w-5 h-5 hover:bg-gray-100
            transition ease-in-out delay-100
        '
					>
						-
					</div>
				</button>
			</div>
		</div>
	);
};

export default CartItem;
