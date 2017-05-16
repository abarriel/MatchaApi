import bcrypt from 'bcrypt';

export const cryptPassword = pass => bcrypt.hash(pass, 10).then(hash => hash);
export const comparePassword = pass => bcrypt.hash(pass, 10).then(hash => hash);
