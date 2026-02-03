export function getRepoCreationActivity(repos: { repoCreatedAt: Date }[]) {
  const activity: Record<string, number> = {};

    const sortedRepos = [...repos].sort(
    (a, b) =>
      new Date(a.repoCreatedAt).getTime() -
      new Date(b.repoCreatedAt).getTime()
  );

  for (const repo of sortedRepos) {
    const date = new Date(repo.repoCreatedAt);
    const label = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    }); 

    activity[label] = (activity[label] || 0) + 1;
  }

  return activity;
}
