
import  prisma from "../db/prisma.js";
import {upsertGithubUser, findCachedUser} from "./github.repository.js"
import { fetchGithubUser } from "./githubAPi.services.js";
import { createError } from "../utils/app.errors.js";

const STALE_TIME = 6 * 60 * 60 * 1000;

export async function getGithubUser(username:string) {
  if (!username) {
    throw createError("Username required", 400);
  }

  try {
    const cached = await findCachedUser(username);
    if (Date.now() - cached.lastSyncedAt.getTime() < STALE_TIME) {
      return cached;
    }
  } catch (err) {
  }

  const data = await fetchGithubUser(username);
  return upsertGithubUser(data);
} 