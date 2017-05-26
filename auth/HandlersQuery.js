import debug from 'debug';
import jwt from 'jsonwebtoken';
import { Err } from '../modules/error';
import { resetToken, secretSentence } from '../modules/authToken';
import { sendMail } from '../modules/mail';
import { cryptPassword } from '../modules/password';
import * as parse from './Parser';
import * as prepare from './prepareQueries';

const logger = debug('matcha:auth/HandlersQuery.js:');

export const checkAuthenticate = (req, res) => {
  if (req.decoded) res.send({ status: 'success' });
};

export const register = (req, res) => {
  const Parser = parse.register(req.body);
  if (Parser) {
    res.send({ status: 'failed', details: Parser.err });
  } else {
    req.dUsers
      .findOne({ $or: [{ login: req.body.login }, { email: req.body.email }] })
      .then((data) => {
        if (data) throw Err('Already Registered');
        return prepare.Register(req);
      })
      .then(() => res.send({ status: 'success' }))
      .catch(err => res.send({ status: 'failed', details: err.details }));
  }
};

export const login = (req, res) => {
  const Parser = parse.login(req.body);
  if (Parser) {
    res.send({ status: 'failed', details: Parser.err });
  } else {
    req.dUsers
      .findOne({ login: req.body.login })
      .then((data) => {
        if (!data) throw Err('No Account Found - login!');
        if (!data.confirmed) throw Err('Account not confirmed - login');
        return prepare.Login(req.body.password, data);
      })
      .then(respToken => res.send({ status: 'success', token: respToken }))
      .catch(err => res.send({ status: 'failed', details: err.details }));
  }
};

export const confirmUserMail = (req, res) => {
  const Parser = parse.confirmUserMail(req.body);
  if (Parser) {
    res.send({ status: 'failed', details: Parser.err });
  } else {
    req.dUsers
      .findOne({ login: req.body.login })
      .then((data) => {
        if (!data) throw Err('No Account Found! - confirm');
        if (data.confirmed) throw Err('Account Already Registered');
        return prepare.confirmUserMail(req);
      })
      .then(() => res.send({ status: 'success' }))
      .catch(err => res.send({ status: 'failed', details: err.details }));
  }
};

export const forgetPassword = (req, res) => {
  const Parser = parse.forgetPassword(req.body);
  if (Parser) {
    res.send({ status: 'failed', details: Parser.err });
  } else {
    req.dUsers
      .findOne({ email: req.body.email })
      .then((data) => {
        if (!data) throw Err('No Account Found with this email');
        const token = resetToken(req.body.email);
        sendMail(
          req.body.email,
          'Reset Password - Matcha',
          `Please Reset Your password following this link
            http://localhost:3000/auth/resetpassword?token=${token}`,
        );
        res.send({ status: 'success', detais: 'Email was been send' });
      })
      .catch(err => res.send({ status: 'failed', details: err.details }));
  }
};

export const resetPassword = (req, res) => {
  const Parser = parse.resetPassword(req.body);
  if (Parser) {
    res.send({ status: 'failed', details: Parser.err });
  } else {
    logger(req.body.token);
    jwt.verify(req.body.token, secretSentence, (error, decoded) => {
      if (error) {
        res.send({ status: 'failed', details: 'Check user failed' });
      } else {
        logger(decoded);
        cryptPassword(req.body.password)
          .then(password => req.dUsers.update({ email: decoded.data }, { $set: { password } }))
          .then(() => res.send({ status: 'success' }))
          .catch(() => res.send({ status: 'failed', details: 'failed to change password' }));
      }
    });
  }
};
