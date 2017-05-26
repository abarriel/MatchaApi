export class Errr {
  constructor(msg) {
    const error = { details: msg };
    return error;
  }
}

export const Err = (msg) => {
  const tmp = new Errr(msg);
  return tmp;
};
