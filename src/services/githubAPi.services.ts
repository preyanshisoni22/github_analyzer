import axios from "axios";
import { createError } from "../utils/app.errors.js";

const BASE_URL = "https://api.github.com";

export async function fetchGithubUser(username: string) {
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  try {
    const [profile, repos] = await Promise.all([
      axios.get(`${BASE_URL}/users/${username}`, { headers }),
      axios.get(`${BASE_URL}/users/${username}/repos?per_page=100`, { headers }),
    ]);
    const repoDetails = repos.data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
    }));
    return {
      githubId: profile.data.id,
      username: profile.data.login,
      name: profile.data.name,
      followers: profile.data.followers,
      following: profile.data.following,
      repos: profile.data.public_repos,
      avatarUrl: profile.data.avatar_url,
      profileUrl: profile.data.html_url,
      repository:repoDetails,
      githubCreatedAt: profile.data.created_at,
      githubUpdatedAt: profile.data.updated_at,
    };

  } catch (error: any) {
    if (error.response?.status === 404) {
      throw createError("User not found", 404);
    }

    throw createError("Failed to fetch GitHub data", 500);
  }
}