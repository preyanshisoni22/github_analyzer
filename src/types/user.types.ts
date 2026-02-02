export interface GithubUserDTO {
  githubId: number;
  username: string;
  name: string | null;
  followers: number;
  following: number;
  repos: number;
  avatarUrl: string;
  profileUrl: string;
  githubCreatedAt:string,
  githubUpdatedAt:string
  
  repository?: {
    id: number;
    name: string;
    url: string;
    description: string | null;
    language: string | null;
    stars: number;
    forks: number;
  }[];

  stats?:{
  id:number,
  totalStars:number,  
  totalForks:number,
  totalLanguageUsed:number,
  topLanguages:Record<string, number>;
  }
}
