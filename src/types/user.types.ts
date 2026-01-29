export interface GithubUserDTO {
  githubId: number;
  username: string;
  name: string | null;
  followers: number;
  following: number;
  repos: number;
  avatarUrl: string;
  profileUrl: string;
}
