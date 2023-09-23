import { useEffect } from 'react';
import CartItem from '../components/Cart/CartItem';
import { useAppDispatch, useAppSelector } from '../redux-types/hooks';
import { setCartData } from '../store/productSlice';

const Cart: React.FC = () => {
	const { cartData, totalAmount } = useAppSelector((state) => state.product);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setCartData({}));
	}, [dispatch])

	return (
		<section className='padding max-container'>
			<p className='font-bold font-palanquin'>Shopping Cart</p>
			<div
				className='
        padding-x max-sm:pl-0 
        py-8 flex flex-col gap-5
        '
			>
				{cartData.map((item) => (
					<CartItem key={item.id} productData={item} />
				))}
				{cartData.length > 0 && (
					<div
						className='
						flex justify-center
						border-t-2 mt-8 
						max-w-sm border-gray-400
						'
					>
						<div className='flex gap-3 sm:m-4 max-sm:m-8'>
							<h2 className='font-palanquin font-bold'>Total Amount</h2>
							<p className='font-montserrat font-semibold text-gray-700'>
								Rs. {totalAmount}
							</p>
						</div>
					</div>
				)}
				{cartData.length <= 0 && (
					<p className='font-palanquin text-lg'>Cart was empty!</p>
				)}
			</div>
		</section>
	);
};

export default Cart;
