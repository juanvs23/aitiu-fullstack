export { store } from './store';
// export { stepSlice } from './features/steps/stepSlicer';
export {
	setStep,
	incrementStep,
	decrementStep,
	emailVerifity,
	senData,
	registerSlice,
	setFormData,
	setProcess,
	getVerified,
	uploadImage,
} from './features/register/RegisterSlicer';
export { default as useRegister } from './features/register/useRegister';
