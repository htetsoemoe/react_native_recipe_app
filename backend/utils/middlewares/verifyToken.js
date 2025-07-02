import jwt from "jsonwebtoken";
import { logger } from "../../config/index.js";

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(401).send("Unauthorized: no token provided");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).send("Unauthorized");
        }
        logger.info(`decoded: ${JSON.stringify(decoded)}`);

        req.userId = decoded._id;
        req.name = decoded.name;
        req.username = decoded.username;
        req.email = decoded.email;
        req.isAccountVerified = decoded.isAccountVerified;
        next();
    } catch (error) {
        logger.error(`Error in verifyToken: ${error.message}`);
        return res.status(401).send("Unauthorized");
    }
};