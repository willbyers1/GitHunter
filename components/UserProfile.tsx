
import React from 'react';
import { GitHubUser, GitHubRepo } from '../types';
import { RepoCard } from './RepoCard';

interface UserProfileProps {
  user: GitHubUser;
  repos: GitHubRepo[];
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, repos }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Profile Section */}
      <div className="glass rounded-xl overflow-hidden border-t-2 border-cyber-purple shadow-[0_0_20px_rgba(188,19,254,0.15)]">
        <div className="md:flex">
          <div className="md:w-1/3 bg-cyber-dark/50 p-8 flex flex-col items-center justify-center border-r border-white/5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-cyber-purple rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
              <img 
                src={user.avatar_url} 
                alt={user.login} 
                className="relative w-40 h-40 rounded-full border-2 border-cyber-purple object-cover"
              />
            </div>
            <h2 className="mt-6 text-2xl font-orbitron font-bold text-white tracking-tighter">
              {user.name || user.login}
            </h2>
            <p className="text-cyber-purple font-mono text-sm">@{user.login}</p>
            
            <div className="mt-6 flex gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-cyber-blue">{user.followers}</p>
                <p className="text-[10px] uppercase text-gray-500 tracking-tighter">Followers</p>
              </div>
              <div className="w-px h-8 bg-white/10 mt-1"></div>
              <div>
                <p className="text-xl font-bold text-cyber-blue">{user.public_repos}</p>
                <p className="text-[10px] uppercase text-gray-500 tracking-tighter">Repos</p>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2 font-bold">Biography</h3>
                <p className="text-gray-300 leading-relaxed italic border-l-2 border-cyber-blue pl-4">
                  {user.bio || "No data stream available for this subject's history."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                   <svg className="w-5 h-5 text-cyber-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                   <span>{user.location || "Unknown Sector"}</span>
                </div>
                {user.blog && (
                  <div className="flex items-center space-x-3 text-sm text-gray-400">
                    <svg className="w-5 h-5 text-cyber-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" className="hover:text-cyber-green transition-colors truncate">
                      {user.blog}
                    </a>
                  </div>
                )}
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                   <svg className="w-5 h-5 text-cyber-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                   <span>Incepted: {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-transparent border border-cyber-purple text-cyber-purple font-bold text-sm tracking-widest hover:bg-cyber-purple hover:text-white transition-all duration-300"
                >
                  ACCESS GITHUB PROFILE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repositories Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-orbitron font-bold text-white flex items-center space-x-3">
          <span className="w-8 h-[2px] bg-cyber-green"></span>
          <span className="neon-text-green uppercase tracking-tighter">Latest Projects</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {repos.length > 0 ? (
            repos.map(repo => <RepoCard key={repo.id} repo={repo} />)
          ) : (
            <div className="col-span-3 text-center py-10 glass rounded-xl border border-dashed border-white/10 text-gray-500">
              No active data streams found in this terminal.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
