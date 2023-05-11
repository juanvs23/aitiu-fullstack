import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useRegister(action, value) {
	const dispatch = useDispatch();
	const selector = useSelector(state => state.register);
	console.log(action, value);
	return useMemo(
		() => ({
			...selector,
			...value,
		}),
		[step]
	);
}
