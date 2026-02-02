import prisma from "../db/prisma.js";
import { GithubUserDTO} from "../types/user.types.js";
import { createError } from "../utils/app.errors.js";

export async function findCachedUser(username: string) {
  const user = await prisma.githubUser.findUnique({
    where: { username },
    include: {
      repositories: true,
      stats: true,
    },
  });
if(!user){
  throw createError("User not found in db",404);
}
return user;
}

export const upsertGithubUser = async (
  user: GithubUserDTO,
) => {
  const repositoriesData = (user.repository || []).map((repo: any) => ({
    githubRepoId: repo.id,
    name: repo.name,
    language: repo.language,
    stars: repo.stars,
    forks: repo.forks,
  }));
  return prisma.githubUser.upsert({
    where: { githubId: user.githubId },
    update: {
      followers: user.followers,
      following: user.following,
      publicRepos: user.repos,
      avatarUrl: user.avatarUrl,
      lastSyncedAt: new Date(),
      repositories: {
        deleteMany: {},
        create: repositoriesData,
      },
    },
    create: {
      lastSyncedAt: new Date(),
      githubId: BigInt(user.githubId),
      username: user.username,
      followers: user.followers,
      following: user.following,
      publicRepos: user.repos,
      avatarUrl: user.avatarUrl,

      repositories: {
        create: repositoriesData,
      },
    },
    include: {
      repositories: true,
      stats: true,
    },
  });
};
