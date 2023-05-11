import { createSlice } from '@reduxjs/toolkit';

export const stepSlice = createSlice({
	name: 'step',
	initialState: {
		step: 1,
	},
	reducers: {
		setStep: (state, action) => {
			state.step = action.payload;
		},
		incrementStep: state => {
			state.step += 1;
		},
		decrementStep: state => {
			state.step -= 1;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setStep, incrementStep, decrementStep } = stepSlice.actions;

export default stepSlice.reducer;
