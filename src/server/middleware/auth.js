import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const secret = process.env.JWT_SECRET;

export const authorize = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({ success: false, message: "Unauthorized!" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ success: false, message: "Unauthorized!" });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Unauthorized!" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    console.log("ERROR => ", error);
    return res.status(401).send({ success: false, message: "Unauthorized!" });
  }
};

export const checkToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next();
      return;
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      next();
      return;
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        next();
        return;
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    console.log("ERROR => ", error);
    next();
    return;
  }
};
