import geoip from 'geoip-lite';
import debug from 'debug';
import NodeGeocoder from 'node-geocoder';
import _ from 'lodash';

const logger = debug('matcha:auth/getAddress.js:');

const options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyC9NS3pHxPN1tr8P1bh0IlMdqfVbbe-XsA', // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

// DIDNT CATCH ANY ERR -- IF IP IS NOT PROVIDE FOR EXEMPLE
const getAddress = req =>
  new Promise((resolve) => {
    const ip = req.body.ip || req.header('x-forwarded-for') || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);
    const range = { lat: geo.ll[0], lon: geo.ll[1] };
    const geocoder = NodeGeocoder(options);
    geocoder.reverse(range, (err, res) => {
      // logger(res.formattedAddress);
      const info = _.pick(res[0], [
        'streetNumber',
        'streetName',
        'city',
        'country',
        'countryCode',
        'zipcode',
      ]);
      const resp = _.assign(info, range);
      resolve(resp);
    });
  });

export default getAddress;
