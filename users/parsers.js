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
  if (valid.password(data.password)) logger('return 1 password');
  if (valid.login(data.login)) logger('return 1 login');
  if (valid.name(data.firstname)) logger('return 1 name');
  if (valid.name(data.lastname)) logger('return 1 wrong last');
  if (data.password !== data.repassword) logger('not good repassword');
  if (data.login === data.password) logger('Cant login=password');
};

const login = () => {
  // check.mail(data.email);
};

export { register, login };
