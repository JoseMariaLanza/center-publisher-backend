const axios = require('axios');
const { jwtEncoder } = require('../../../services/jwtEncoder')

class AuthRepository {
  async createUser(payload, res) {
    // const modelName = new Auth();

    // Code here...

    //return 0
  }

  async getToken(payload, res) {
    try {
      const { data: authToken } = await axios.post(`${process.env.CS_API}user/token/`, payload);
      const { token } = authToken;

      const { data: userData } = await axios.get(`${process.env.CS_API}user/my-account/`, {
        headers: {
          'Authorization': `token ${token}`
        }
      });

      const data = {
        token,
        ...userData,
      };

      const encriptedData = jwtEncoder(data);

      return res.status(200).json({
        ok: true,
        message: 'User authenticated',
        data: encriptedData
      });
    } catch (error) {
      console.log('ERROR IN REPOSITORY!: ', error);
      return res.status(error.response.status).json({
        ok: false,
        error: error.response.data
      });
    }
  }

  async getUserAccountData(token, res) {
    try {
      // const { data } = await axios.get(`${process.env.CS_API}user/profile/`, {
      const { data } = await axios.get(`${process.env.CS_API}user/my-account/`, {
        headers: {
          'Authorization': token
        }
      });
      const encriptedData = jwtEncoder(data);

      return res.status(200).json({
        ok: true,
        message: 'User profile retrieved successfuly.',
        data: encriptedData
      });
    } catch (error) {
      console.log(error);
      return res.status(error.response.status).json({
        ok: false,
        error: error.response.data
      });
    }
  }

  async updateUserprofile(payload, res) {
    // const modelName = new Auth();

    // Code here...

    //return 0
  }

  async destroy(id, res) {
    // const modelName = new Auth();

    // Code here...

    //return 0
  }
}

module.exports = AuthRepository;
