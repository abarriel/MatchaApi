import * as valid from './inputValidators';

export const register = (data) => {
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

export const login = (data) => {
  if (valid.postCheckEmptyAndKey(['login',
    'password',
  ], data)) { return { err: 'Unauthorized post action - login' }; }
  if (valid.password(data.password)) { return { err: 'Wrong format password' }; }
  if (valid.login(data.login)) { return { err: 'Wrong format login' }; }
  return false;
};

export const confirmUserMail = (data) => {
  if (valid.postCheckEmptyAndKey(['login',
    'token',
  ], data)) { return { err: 'Unauthorized post action - confirmUserMail' }; }
  if (valid.login(data.login)) { return { err: 'Wrong format login' }; }
  if (valid.token(data.token)) { return { err: 'Wrong format token' }; }
  return false;
};

export const resetPassword = (data) => {
  if (valid.postCheckEmptyAndKey(['email'],
  data)) { return { err: 'Unauthorized post action - ResetPassword' }; }
  if (valid.mail(data.email)) { return { err: 'Wrong format email' }; }
  return false;
};
