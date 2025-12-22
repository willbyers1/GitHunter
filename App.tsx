
import React, { useState, useEffect } from 'react';
import { SearchState } from './types';
import { githubService } from './services/githubService';
import { UserProfile } from './components/UserProfile';

const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [state, setState] = useState<SearchState>({
    loading: false,
    user: null,
    repos: [],
    error: null,
  });

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!username.trim()) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const user = await githubService.fetchUser(username);
      const repos = await githubService.fetchRepos(username);
      setState({
        loading: false,
        user,
        repos,
        error: null,
      });
    } catch (err: any) {
      setState({
        loading: false,
        user: null,
        repos: [],
        error: err.message || 'System failure. Please reboot search.',
      });
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1 className="text-6xl md:text-8xl font-black font-orbitron tracking-tighter italic mb-2 relative inline-block">
          <span className="text-white">GIT</span>
          <span className="text-cyber-purple neon-text-purple">HUNTER</span>
          <div className="absolute -bottom-2 right-0 text-[10px] tracking-[0.5em] text-cyber-blue font-bold uppercase">
            User Discovery v3.0
          </div>
        </h1>
        <p className="text-cyber-green text-sm mt-6 font-mono tracking-widest uppercase">
          Scan the global network for developer profiles
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-2xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="relative group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ENTER_USERNAME_TO_SCAN..."
            className="w-full bg-cyber-dark/80 border-2 border-white/10 p-6 pr-24 rounded-none focus:outline-none focus:neon-border-green focus:bg-black transition-all duration-300 font-mono text-xl text-cyber-green placeholder:text-white/10"
          />
          <button
            type="submit"
            disabled={state.loading}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-cyber-green text-black font-bold uppercase tracking-tighter hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.loading ? '...' : 'SCAN'}
          </button>
        </form>
        <div className="mt-2 text-[10px] text-gray-500 flex justify-between uppercase font-bold tracking-widest">
           <span>Status: {state.loading ? 'Scanning...' : 'Online'}</span>
           <span>Latency: 12ms</span>
        </div>
      </div>

      {/* Content Rendering */}
      <div className="max-w-5xl mx-auto min-h-[400px] flex items-start justify-center">
        {state.loading && (
          <div className="flex flex-col items-center space-y-4 py-20">
            <div className="w-16 h-16 border-4 border-cyber-purple border-t-transparent rounded-full animate-spin"></div>
            <p className="text-cyber-purple font-mono animate-pulse uppercase tracking-[0.3em]">Bypassing Firewalls...</p>
          </div>
        )}

        {!state.loading && state.error && (
          <div className="w-full max-w-xl glass p-10 border-cyber-purple border-b-4 text-center animate-in zoom-in duration-300">
            <div className="text-5xl mb-4 text-cyber-purple">⚠</div>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-2 uppercase">Critical Error</h2>
            <p className="text-cyber-purple font-mono mb-6">{state.error}</p>
            <button 
              onClick={() => { setState(prev => ({ ...prev, error: null })); setUsername(''); }}
              className="px-6 py-2 border border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-white transition-all"
            >
              CLEAR CACHE
            </button>
          </div>
        )}

        {!state.loading && !state.error && state.user && (
          <UserProfile user={state.user} repos={state.repos} />
        )}

        {!state.loading && !state.error && !state.user && (
          <div className="text-center opacity-30 select-none pointer-events-none mt-20">
            <div className="text-9xl font-black font-orbitron text-white/5">SEARCH</div>
            <p className="text-sm tracking-[1em] text-white/20 mt-[-2rem]">AWAITING COMMANDS</p>
          </div>
        )}
      </div>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-purple to-transparent opacity-20"></div>
    </div>
  );
};

export default App;
