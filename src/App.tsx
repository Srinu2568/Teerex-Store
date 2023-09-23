import React, { Suspense } from 'react';

import { Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store/store';

import Loader from './components/UI/Loader';

// Lazy imports
const Main = React.lazy(() => import('./pages/Main'));
const Products = React.lazy(() => import('./pages/Products'));
const Cart = React.lazy(() => import('./pages/Cart'));

export default function App() {
	return (
		<Provider store={store}>
			<Suspense
				fallback={
					<div
						className='flex justify-center 
						absolute
						items-center h-[100%] w-[100%]
					'
					>
						<Loader></Loader>
					</div>
				}
			>
				<Routes>
					<Route path='/' element={<Main />}>
						<Route path='products' element={<Products />} />
						<Route path='cart' element={<Cart />} />
						<Route
							path='*'
							element={
								<section className='padding text-2xl font-palanquin flex justify-center font-bold items-center'>
									404 Not Found
								</section>
							}
						/>
					</Route>
				</Routes>
			</Suspense>
		</Provider>
	);
}

