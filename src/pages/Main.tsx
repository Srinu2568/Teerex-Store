import { Link, Outlet } from 'react-router-dom';

const Main:React.FC = () => {
	return (
		<main >
			<header className='
				padding-x py-8 fixed 
				z-10 w-full
				bg-[#e5e2e2]
				'>
					<nav className='
						flex justify-between 
						font-palanquin text-lg
						leading-none max-container
						'>
						<Link to='/' className='font-bold'>TeeRex Store</Link>
						<div className='flex justify-between gap-4'>
							<Link to='/products' className='max-sm:hidden'>Products</Link>
							<div><Link to='/cart'>Cart</Link></div>
						</div>
					</nav>
			</header>
			<Outlet />
		</main>
	);
};

export default Main;
