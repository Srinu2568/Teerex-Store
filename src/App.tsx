import { Routes, Route } from 'react-router';

export default function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<h1 className='m-4 text-2xl text-center p-3 px-2 font-bold underline'>
						Hello world!
					</h1>
				}
			></Route>
		</Routes>
	);
}

