const jwt = require("jsonwebtoken");

const generateTokens = async (user) => {
    try {
        const payload = { id: user.id, email: user.email };
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: process.env.ACCESS_TOKEN_LIFE }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: process.env.REFRESH_TOKEN_LIFE }
        );

        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

module.exports = {
    generateTokens
};
