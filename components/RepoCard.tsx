
import React from 'react';
import { GitHubRepo } from '../types';

interface RepoCardProps {
  repo: GitHubRepo;
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <a 
      href={repo.html_url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block glass p-4 rounded-lg border-l-4 border-cyber-green hover:bg-white/10 transition-all duration-300 group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-cyber-green font-bold text-lg group-hover:neon-text-green transition-all">
          {repo.name}
        </h3>
        <div className="flex items-center space-x-1 text-xs text-cyber-blue">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{repo.stargazers_count}</span>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mb-3 line-clamp-2 italic">
        {repo.description || "No transmission recorded for this repository."}
      </p>
      
      <div className="flex items-center space-x-2">
        {repo.language && (
          <span className="text-[10px] px-2 py-0.5 border border-cyber-blue text-cyber-blue rounded uppercase tracking-widest">
            {repo.language}
          </span>
        )}
        <span className="text-[10px] text-gray-500 uppercase">
          Updated: {new Date(repo.updated_at).toLocaleDateString()}
        </span>
      </div>
    </a>
  );
};
