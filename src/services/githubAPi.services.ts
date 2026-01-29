import axios from "axios";

const BASE_URL = "https://api.github.com";

export async function fetchGithubUser(username: string) {
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  const [profile, repos] = await Promise.all([
    axios.get(`${BASE_URL}/users/${username}`, { headers }),
    axios.get(`${BASE_URL}/users/${username}/repos?per_page=100`, { headers }),
  ]);

  return {
    githubId: profile.data.id,
    username: profile.data.login,
    name: profile.data.name,
    followers: profile.data.followers,
    following: profile.data.following,
    repos: profile.data.public_repos,
    avatarUrl: profile.data.avatar_url,
    profileUrl: profile.data.html_url,
  };
}
