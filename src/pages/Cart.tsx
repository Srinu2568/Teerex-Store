import CartItem from '../components/Cart/CartItem';
import { useAppDispatch, useAppSelector } from '../redux-types/hooks';

const Cart: React.FC = () => {
	const { cartData } = useAppSelector((state) => state.product);
	const dispatch = useAppDispatch();

	return (
		<section className='padding max-container'>
			<p className='font-bold font-palanquin'>Shopping Cart</p>
			<div className='
        padding-x max-sm:pl-0 
        py-8 flex flex-col gap-5
        '>
				{cartData.map((item) => (
					<CartItem key={item.id} productData={item} />
				))}
			</div>
		</section>
	);
};

export default Cart;
