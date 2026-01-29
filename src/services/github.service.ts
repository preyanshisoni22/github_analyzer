
import  prisma from "../db/prisma.js";
import {upsertGithubUser} from "./github.repository.js"
import { fetchGithubUser } from "./githubAPi.services.js";


const STALE_TIME = 6 * 60 * 60 * 1000;

export async function getGithubUser(username:string) {
const cached = await prisma.githubUser?.findUnique({where:{username}});

  if (cached && Date.now() - cached.lastSyncedAt.getTime() < STALE_TIME) {
    return cached;
  }
    
 const data = await fetchGithubUser(username);
  return upsertGithubUser(data);
}