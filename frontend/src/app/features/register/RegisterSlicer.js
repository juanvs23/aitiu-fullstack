import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../utils/axios';
/**
firstname,
lastname,
email,
mobile,
curp,
rfc,
birthdate,
documentURL,
documentNumber,
expiredDocument,
 */

const initialState = {
	errors: null,
	loading: false,
	emailVerified: false,
	step: 1,
	process: {
		profile: false,
		information: false,
		document: false,
		confirmation: false,
	},
	formData: {
		firstname: '',
		lastname: '',
		email: '',
		mobile: '',
		curp: '',
		rfc: '',
		birthdate: '',
		documentURL: '',
		documentNumber: '',
		expiredDocument: '',
	},
};

export const uploadImage = createAsyncThunk(
	'register/uploadImage',
	async (imageFile, { rejectWithValue }) => {
		try {
			const formData = new FormData();
			formData.append('document', imageFile);

			const response = await client.post(`/upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);
export const emailVerifity = createAsyncThunk(
	'register/emailVerifity',
	async (data, { rejectWithValue }) => {
		try {
			const response = await client.post('/get-register', { email: data });

			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);
export const senData = createAsyncThunk('register/senData', async (data, { rejectWithValue }) => {
	try {
		const response = await client.post('/save-register', data);
		return response;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		setStep: (state, action) => {
			state.step = action.payload;
		},
		resetRegister: state => {
			state = initialState;
		},
		incrementStep: state => {
			state.step += 1;
		},
		decrementStep: state => {
			state.step -= 1;
		},
		getVerified: state => {
			const access = JSON.parse(localStorage.getItem('access-home'));
			if (access) {
				state.emailVerified = access.emailVerified;
				state.step = 4;
				state.process = { ...state.process, confirmation: true };
				state.formData = {
					...state.formData,
					email: access.email,
					firstname: access.firstname,
					lastname: access.lastname,
				};
			}
		},
		setFormData: (state, action) => {
			console.log(action.payload);
			state.errors = null;
			state.formData = { ...state.formData, ...action.payload };
		},
		setProcess: (state, action) => {
			console.log(action.payload);
			state.errors = null;
			state.process = { ...state.process, ...action.payload };
		},
	},

	extraReducers: builder => {
		builder
			.addCase(emailVerifity.pending, state => {
				state.loading = true;
			})
			.addCase(emailVerifity.fulfilled, (state, action) => {
				const {
					data: { data, step },
				} = action.payload;
				state.loading = false;
				state.emailVerified = data !== null ? true : false;

				if (data !== null) {
					state.step = 1;
					const { firstname, lastname, email } = data;
					console.log(data);
					localStorage.setItem(
						'access-home',
						JSON.stringify({ firstname, lastname, email, emailVerified: true })
					);
					state.formData = { ...state.formData, ...data };
				} else {
					state.loading = false;
					state.emailVerified = false;
				}
			})
			.addCase(emailVerifity.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(senData.pending, state => {
				state.loading = true;
			})
			.addCase(senData.fulfilled, (state, action) => {
				state.loading = false;
				state.step = 4;
				state.errors = null;
				if (action.payload.data.status === 200) {
					state.process = { ...state.process, confirmation: true };
					const { step, data } = action.payload.data.data;
					state.formData = data;
					state.step = step;
					const { firstname, lastname, email } = data;
					localStorage.setItem(
						'access-home',
						JSON.stringify({ firstname, lastname, email, emailVerified: true })
					);
				} else {
					state.errors = action.payload.data.errors;
				}
			})
			.addCase(senData.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(uploadImage.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(uploadImage.fulfilled, (state, action) => {
				state.loading = false;
				const { data, status } = action.payload;
				if (status === 200) {
					const { url } = data;
					state.formData.documentURL = url;
				}
			})
			.addCase(uploadImage.rejected, (state, action) => {});
	},
});

// Action creators are generated for each case reducer function
export const {
	setStep,
	incrementStep,
	decrementStep,
	setFormData,
	setProcess,
	getVerified,
	resetRegister,
} = registerSlice.actions;

export default registerSlice.reducer;
