import { Routes, Route } from 'react-router';
import { Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Products from './pages/Products';
import { Provider } from 'react-redux';
import {store} from './store/store';

export default function App() {
	return (
		<Provider store={store}>
			<Routes>
				<Route path='/' element={<Main />}>
					<Route path='products' element={<Products />} />
				</Route>
			</Routes>
		</Provider>
	);
}

