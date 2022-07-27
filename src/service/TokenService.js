import jwt from 'jsonwebtoken'

class Token {
  constructor() {
  }

  async generateToken(params = {}) {
    const token = await jwt.sign(params, process.env.JWT_SECRET, { expiresIn: '8h' });
    return token;
  }

  async decodeToken(token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new Token();