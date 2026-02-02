import prisma from "../db/prisma.js";
import { GithubUserDTO } from "../types/user.types.js";
import { createError } from "../utils/app.errors.js";
import { calculateStats } from "../utils/stats.util.js";


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
  const stats = calculateStats(user.repository || []);
  const repositoriesData = (user.repository || []).map((repo: any) => ({
    githubRepoId: BigInt(repo.id),
    name: repo.name,
    language: repo.language,
    description: repo.description,
    repoUrl :  repo.repoUrl,
    stars: repo.stars,
    forks: repo.forks,
  }));
  return prisma.githubUser.upsert({
    where: { githubId: BigInt(user.githubId) },
    update: {
      followers: user.followers,
      following: user.following,
      publicRepos: user.repos,
      avatarUrl: user.avatarUrl,
      gitProfileUrl: user.profileUrl,
      lastSyncedAt: new Date(),
      gitProfileCreated_at: new Date(user.githubCreatedAt),
      gitProfileUpdated_at: new Date(user.githubUpdatedAt),
      repositories: {
        deleteMany: {},
        create: repositoriesData,
      },
      stats: {
        upsert: {
          update: {
            totalStars: stats.totalStars,
            totalForks: stats.totalForks,
            topLanguages: stats.topLanguages,
          },
          create: {
            totalStars: stats.totalStars,
            totalForks: stats.totalForks,
             totalLanguageUsed:stats.totalLanguageUsed,
            topLanguages: stats.topLanguages,
          },
        },
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
      gitProfileCreated_at: new Date(user.githubCreatedAt),
      gitProfileUpdated_at: new Date(user.githubUpdatedAt),
      gitProfileUrl: user.profileUrl,

      repositories: {
        create: repositoriesData,
      },
      stats: {
        create: {
          totalStars: stats.totalStars,
          totalForks: stats.totalForks,
          totalLanguageUsed:stats.totalLanguageUsed,
          topLanguages: stats.topLanguages
        },
      },
    },
    include: {
      repositories: true,
      stats: true,
    },
  });
};
