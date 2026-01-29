import prisma from "../db/prisma.js";
import { GithubUserDTO} from "../types/user.types.js";

export async function findCachedUser(username: string) {
  return prisma.githubUser.findUnique({
    where: { username },
    include: {
      repositories: true,
      stats: true,
    },
  });
}

export const upsertGithubUser = async (
  user: GithubUserDTO,
) => {
  return prisma.githubUser.upsert({
    where: { githubId: user.githubId },
    update: {
      followers: user.followers,
      following: user.following,
      publicRepos: user.repos,
      avatarUrl: user.avatarUrl,
      lastSyncedAt: new Date(),
    },
    create: {
      githubId: BigInt(user.githubId),
      username: user.username,
      followers: user.followers,
      following: user.following,
      publicRepos: user.repos,
      avatarUrl: user.avatarUrl,
      lastSyncedAt: new Date(),

    },
  });
};
