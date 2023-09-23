import { Routes, Route } from 'react-router';
import Main from './pages/Main';
import Products from './pages/Products';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Cart from './pages/Cart';

export default function App() {
	return (
		<Provider store={store}>
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
		</Provider>
	);
}

