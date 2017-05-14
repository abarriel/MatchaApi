import debug from 'debug';
import * as valid from './validators';

const logger = debug('matcha:./users/parsers.js');

const register = (data) => {
  if (valid.postCheckEmptyAndKey(['login', 'email', 'password', 'firstname', 'lastname'], data)) logger('return wrong method applications');
  if (valid.mail(data.email)) logger('return 1 mail');
  if (valid.name(data.firstname)) logger('return 1 name');
  if (valid.name(data.lastname)) logger('return 1 wrong last');
  else {
    logger('return 0 WRONG mail or email');
  }
};

const login = () => {
  // check.mail(data.email);
};

export { register, login };
