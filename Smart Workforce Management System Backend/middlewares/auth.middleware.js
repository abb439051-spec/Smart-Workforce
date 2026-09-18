const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config/jwt");

const authMiddleware = (req, res, next) => {

    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            success: false,
            message: "Access Denied",
        });
    }

    try {
        const [scheme, tokenValue] = authorization.split(" ");
        const token = scheme.toLowerCase() === "bearer"
            ? tokenValue
            : authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format",
            });
        }

        const verified = jwt.verify(token, JWT_SECRET);

        req.user = verified;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid Token",
        });

    }

};

module.exports = authMiddleware;