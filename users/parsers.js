import debug from 'debug';
import * as valid from './validators';

const logger = debug('matcha:./users/parsers.js');

const register = (data) => {
  if (valid.postCheckEmptyAndKey(['login',
    'email',
    'password',
    'firstname',
    'lastname',
    'repassword'], data)) logger('return wrong method applications');
  if (valid.mail(data.email)) logger('return 1 mail');
  if (valid.name(data.firstname)) logger('return 1 name');
  if (valid.name(data.lastname)) logger('return 1 wrong last');
  if (valid.password(data.password)) logger('return 1 password');
  if (valid.login(data.login)) logger('return 1 login');
};

const login = () => {
  // check.mail(data.email);
};

export { register, login };
