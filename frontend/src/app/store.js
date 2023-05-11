import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './features/register/RegisterSlicer';

export const store = configureStore({
	reducer: {
		register: registerSlice,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
