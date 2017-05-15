import debug from 'debug';
import _ from 'lodash';

const logger = debug('matcha:./users/inputValidators.js');

function isEmpty(string) {
  return (!string || /^\s*$/.test(string));
}

function isSpecialChar(string) {
  return (/\W+/.test(string));
}

// Match all post which the expected one didn't catch the err yet
const postCheckEmptyAndKey = (fixedElm, body) => {
  const error = [];
  _.forEach(body, (val, key) => {
    if (typeof val === 'object') { return error.push('More than one value'); }
    if (fixedElm.indexOf(key) === -1) { return error.push('Unknown post method'); }
    return (true);
  });
  _.forEach(fixedElm, (val) => {
    if (body[val] === undefined || isEmpty(body[val])) { return error.push('Empty values'); }
    return (true);
  });
  if (Object.keys(error).length === 0) return (false);
  logger(`Error = ${error}`);
  return (true);
};

const mail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) return (true);
  return (false);
};

const name = (nom) => {
  if (!/^[A-Za-z ]{2,30}$/.test(nom)) return (true);
  return (false);
};

const password = (passwd) => {
  if (!/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).{6,}$/.test(passwd)) return (true);
  return (false);
};

const login = (username) => {
  if (isSpecialChar(username) || !/^.{5,25}$/.test(username)) return (true);
  return (false);
};

export {
  mail,
  name,
  login,
  password,
  postCheckEmptyAndKey };
