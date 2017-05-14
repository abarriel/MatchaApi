import debug from 'debug';
import _ from 'lodash';

const logger = debug('matcha:./users/validators.js');

function isEmpty(string) {
  return (!string || /^\s*$/.test(string));
}

function isSpecialChar(string) {
  return (/\W+/.test(string));
}
// match all post which the expected one
const postCheckEmptyAndKey = (fixedElm, body) => {
  const error = [];
  _.forEach(body, (val, key) => {
    if (typeof val === 'object') { return error.push('more than one values'); }
    if (typeof val === 'object') { return error.push('not good '); }
    if (fixedElm.indexOf(key) === -1) { return error.push('not good action'); }
    return (true);
  });
  _.forEach(fixedElm, (val) => {
    if (body[val] === undefined || isEmpty(body[val])) { return error.push('empty values'); }
    return (true);
  });
  logger(`Error = ${error}`);
  // logger(`Values = ${fixedElm}\n`);
};

const mail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) return (logger('Email is Invalid'));
  return (logger('valid email'));
};

const name = (nom) => {
  logger(nom);
  if (!/^[A-Za-z ]{2,30}$/.test(nom)) return (logger('Name has a special Chars'));
  return (logger('good name'));
};

const password = (passwd) => {
  if (!/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).{6,}$/.test(passwd)) return (logger('Not Good Password'));
  return (logger('good password'));
};

const login = (username) => {
  if (isSpecialChar(username) || !/^.{5,25}$/.test(username)) return (false);
  return (true);
};

export {
  mail,
  name,
  login,
  password,
  postCheckEmptyAndKey };
