import { Request, Response, NextFunction } from "express";
import { getGithubUser } from "../services/github.service.js";

function serializeBigInt(data: any) {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function getUser(req : Request<{username:string}>,res : Response,next: NextFunction) {
  try {
    const {username} = req.params;
    const data = await getGithubUser(username);
    res.status(200).json(serializeBigInt(data));
  } catch (err) {
    next(err);
  }
}