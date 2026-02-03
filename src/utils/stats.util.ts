 export const calculateStats = (repos: any[]) => {
    let totalStars = 0;
    let totalForks = 0;
    const topLanguages: Record<string, number> = {};
    const uniqueLanguages = new Set<string>()
    
    for (const repo of repos) {
      totalStars += repo.stars;
      totalForks += repo.forks;
      
    if (repo.language) {
        uniqueLanguages.add(repo.language);
        topLanguages[repo.language] =
          (topLanguages[repo.language] || 0) + 1;
      }
    }

    return {
       totalStars,
       totalForks, 
       topLanguages,
       totalLanguageUsed: uniqueLanguages.size, 
      };
  };