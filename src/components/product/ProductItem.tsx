import { useAppDispatch } from '../../redux-types/hooks';
import { productDataInterface, addToCart } from '../../store/productSlice';

const ProductItem: React.FC<{ item: productDataInterface }> = ({ item }) => {
	const dispatch = useAppDispatch();
	const addToCartHandler: () => void = () => {
		dispatch(addToCart({ id: item.id }));
	};

	return (
		<div
			className='
      mx-5 pt-2 pb-10
      shadow-md 
      h-60 w-52 relative
    '
		>
			<p
				className='
        text-md font-palanquin font-bold left-2 top-1 absolute
      '
			>
				{item.name}
			</p>
			<div className='border m-5 border-slate-gray'>
				<img
					className='object-contain h-150 w-max'
					src={item.imageURL}
					alt={item.name}
				/>
			</div>
			<div
				className='
        px-2 relative
        '
			>
				<p
					className='
          text-lg font-semibold 
        '
				>
					Rs {item.price}
				</p>
				<button
					onClick={addToCartHandler}
					className='
          text-base font-palanquin leading-none
          text-white bg-gray-800
          rounded-md border border-gray-800
          px-2 py-1 bottom-1 right-2 absolute
        '
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default ProductItem;
