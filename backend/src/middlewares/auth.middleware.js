const jwt = require('jsonwebtoken');
const { createError } = require('../utils/helper.util');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        createError(401, 'Không có quyền truy cập.');
    }

    try {
        const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = { id: verifiedUser.id, isAdmin: verifiedUser.isAdmin };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            createError(401, 'Token hết hạn.');
        }

        createError(403, 'Token không hợp lệ.');
    }
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            createError(403, 'Không phải admin.');
        }
    });
};

module.exports = {
    verifyToken,
    verifyAdmin
};