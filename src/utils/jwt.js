import pkg from 'jsonwebtoken';
// const jwt = require('jsonwebtoken');
import 'dotenv/config';

export const secret = process.env.JWT_SECRET || '';

const accessExp = Number(process.env.ACCESS_EXP) || 10;
const refreshExp = Number(process.env.REFRESH_EXP) || 24;

export function setAccessToken(user) {
  const accessToken = pkg.sign(user, secret, { expiresIn: `${accessExp}m` });
  return accessToken;
}

export function setRefreshToken() {
  const refreshToken = pkg.sign({}, secret, { expiresIn: `${refreshExp}h` });
  return refreshToken;
}

// export function getDataFromToken(token: string): any {
//   // try {
//   //   const data = jwt.verify(token, secret);
//   //   return data;
//   // } catch (e) {
//   //   return null;
//   // }
//   const data = jwt.verify(token, secret);
//   return data;
// }
