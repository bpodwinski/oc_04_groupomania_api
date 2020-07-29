import { Request, Response, NextFunction } from "express";

import Error from "../exceptions/app";
import AuthError from "../exceptions/auth";

import * as config from "../config/config";
import * as jwt from "jsonwebtoken";

export default class Auth {
  public auth(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader: any = req.headers["authorization"];
      const token: any = authHeader && authHeader.split(" ")[1];

      if (token === null) throw new Error(401, "There isn't token");

      const decodedToken: any = jwt.verify(token, config.TOKEN);
      const userId: string = decodedToken.userId;

      if (req.body.userId && req.body.userId !== userId) {
        throw new Error(401, "Invalid user ID");
      } else {
        next();
      }
    } catch (error) {
      next(new AuthError(error.message));
    }
  }
}
