const express = require('express');
const axios = require('axios');


const login = async (req, res = express.response) => {
    try {
        const { data } = await axios.get('http://localhost:8000/api/1.1/user/profile/', {
            headers: {
                'Authorization': req.headers.authorization
            }
        });

        return res.status(200).json({
            ok: true,
            message: 'User authenticated',
            data
        });
    } catch (error) {
        return res.status(error.response.status).json({
            ok: false,
            error: error.response.data
        });
    }
}

module.exports = { login }