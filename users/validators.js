import debug from 'debug';
import _ from 'lodash';

const logger = debug('matcha:./users/validators.js');

function isEmpty(string) {
  return (!string || /^\s*$/.test(string));
}

function isSpecialChar(string) {
  return (/\W+/.test(string));
}

const postCheckEmptyAndKey = (fixedElm, body) => {
  const error = [];
  _.forEach(body, (val, key) => {
    if (typeof val === 'object')
      console.log(val);
    if (fixedElm.indexOf(key) === -1) { return error.push('not good action'); }
    return (true);
  });
  _.forEach(fixedElm, (val, key) => {
    if (body[val] === undefined || isEmpty(body[val])) { return error.push('empty values'); }
    return (true);
  })
  logger(`Error = ${error}`);
  // logger(`Body = ${body}`);
  logger(`Values = ${fixedElm}\n`);
};

const mail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) return (logger('Email is Invalid'));
  return (logger('valid email'));
};

const name = (nom) => {
  logger(nom);
  if (isSpecialChar(nom)) return (logger('Name has a special Chars'));
  return (logger('good name'));
};

const password = (password) => {
  // if(isEmpty(nom) return)
}
export { mail, name, postCheckEmptyAndKey };
