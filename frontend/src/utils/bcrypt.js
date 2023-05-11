import bcrypt from 'bcryptjs';

export default function hashFunction(text = 'secret') {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(text, salt);
	return hash;
}
