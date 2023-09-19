import { Routes, Route } from 'react-router';
import { Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Products from './pages/Products';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
	return (
		<Provider store={store}>
			<Routes>
				<Route path='/' element={<Main />}>
					<Route path='products' element={<Products />} />
					<Route path='cart' element={<h2>in cart</h2>} />
					<Route path='*' element={<h2>404 Not Found</h2>} />
				</Route>
			</Routes>
		</Provider>
	);
}

