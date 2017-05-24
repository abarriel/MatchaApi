import bcrypt from 'bcrypt';

export const cryptPassword = pass => bcrypt.hash(pass, 10).then(hash => hash);
export const comparePassword = (pass, passdb) => bcrypt.compare(pass, passdb).then(hash => hash);
