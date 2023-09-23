import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import cartLogo from '../assets/cartLogo.png';
import { useEffect } from 'react';
import { useAppSelector } from '../redux-types/hooks';

const Main: React.FC = () => {
	const { totalQuantity } = useAppSelector((state) => state.product);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	useEffect(() => {
		if (pathname === '/') {
			navigate('/products', { replace: true });
		}
	}, [navigate, pathname]);

	return (
		<main>
			<header
				className='
				padding-x py-5 max-sm:py-7 fixed 
				z-10 w-full
				bg-[#e5e2e2]
				'
			>
				<nav
					className='
						flex justify-between 
						font-palanquin text-lg
						leading-none max-container
						'
				>
					<Link to='/products' className='font-bold'>
						TeeRex Store
					</Link>
					<div className='flex justify-between gap-4'>
						<div>
							<Link to='/products' className='max-sm:hidden '>
								<p
									className={`${
										pathname === '/products'
											? `border-b border-black 
											pb-2 transition 
											ease-in-out duration-150
											delay-100
											`
											: ''
									}`}
								>
									Products
								</p>
							</Link>
						</div>
						<div className='relative'>
							<Link to='/cart'>
								<img src={cartLogo} alt='cartLogo' height={30} width={30} />
							</Link>
							<p
								className='
								font-bold sm:text-sm font-palanquin 
								absolute bottom-[90%] left-[100%]
							'
							>
								{totalQuantity !== 0 && totalQuantity}
							</p>
						</div>
					</div>
				</nav>
			</header>
			<Outlet />
		</main>
	);
};

export default Main;
