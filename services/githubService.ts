
import { GitHubUser, GitHubRepo } from '../types';

/**
 * Service to fetch data from GitHub API
 */
export const githubService = {
  async fetchUser(username: string): Promise<GitHubUser> {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (response.status === 404) {
      throw new Error('User not found in the grid.');
    }
    
    if (!response.ok) {
      throw new Error('Signal lost. Failed to fetch user.');
    }
    
    return response.json();
  },

  async fetchRepos(username: string): Promise<GitHubRepo[]> {
    // Sort by updated and limit to 3 as per requirements
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
    
    if (!response.ok) {
      return []; // Return empty if repos can't be fetched
    }
    
    return response.json();
  }
};
