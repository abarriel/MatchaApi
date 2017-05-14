// import debug from 'debug';
import * as valid from './validators';

// const logger = debug('matcha:./users/parsers.js');

const register = (data) => {
  if (valid.postCheckEmptyAndKey(['login',
    'email',
    'password',
    'firstname',
    'lastname',
    'repassword'], data)) { return { err: 'Unauthorized post action' }; }
  if (valid.mail(data.email)) { return { err: 'Wrong format mail' }; }
  if (valid.password(data.password)) { return { err: 'Wrong format password' }; }
  if (valid.login(data.login)) { return { err: 'Wrong format login' }; }
  if (valid.name(data.firstname)) { return { err: 'Wrong format firstname' }; }
  if (valid.name(data.lastname)) { return { err: 'Wrong format lastname' }; }
  if (data.password !== data.repassword) { return { err: 'Can\'t be Password != Repeat-Password' }; }
  if (data.login === data.password) { return { err: 'Login and password cannot be the same' }; }
  return false;
};

const login = () => {
  // check.mail(data.email);
};

export { register, login };
