import { PageTransition } from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye, EyeOff, Trash2, Save, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Journal {
  id: number;
  title: string;
  updatedAt: string;
  isPublic: boolean;
  content: string;
}

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<'grid' | 'editor'>('grid');
  const [journals, setJournals] = useState<Journal[]>([]);
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Editor state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editIsPublic, setEditIsPublic] = useState(false);
  
  // Computed auth header
  const authHeader = isAuthenticated ? `Basic ${btoa(username + ':' + password)}` : '';

  useEffect(() => {
    if (isAuthenticated) fetchAdminJournals();
  }, [isAuthenticated]);

  const fetchAdminJournals = async () => {
    try {
      const res = await fetch('/api/journals/admin/all', {
        headers: {
          'Authorization': authHeader
        }
      });
      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          setLoginError('Session expired. Please log in again.');
        }
        throw new Error('Failed to fetch');
      }
      const data = await res.json();
      setJournals(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    // Test auth first
    fetch('/api/journals/admin/all', {
      headers: {
        'Authorization': `Basic ${btoa(username + ':' + password)}`
      }
    }).then(res => {
      if (res.ok) {
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        setLoginError('Invalid transmission codes.');
      }
    }).catch(() => {
      setLoginError('Failed to establish connection.');
    });
  };

  const openEditor = (journal?: Journal) => {
    if (journal) {
      setEditingId(journal.id);
      setEditTitle(journal.title);
      setEditContent(journal.content);
      setEditIsPublic(journal.isPublic);
    } else {
      setEditingId(null);
      setEditTitle('');
      setEditContent('');
      setEditIsPublic(false);
    }
    setActiveTab('editor');
  };

  const saveJournal = async () => {
    if (!editTitle) return;
    
    const url = editingId ? `/api/journals/admin/${editingId}` : '/api/journals/admin/new';
    const method = editingId ? 'PATCH' : 'POST';
    const payload = {
      title: editTitle,
      content: editContent,
      isPublic: editIsPublic
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchAdminJournals();
        setActiveTab('grid');
      }
    } catch (err) {
      console.error('Failed to save', err);
    }
  };

  const deleteJournal = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this record?')) return;
    
    try {
      const res = await fetch(`/api/journals/admin/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': authHeader
        }
      });
      if (res.ok) {
        setJournals(journals.filter(j => j.id !== id));
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm glass p-8 md:p-12 space-y-8"
          >
            <div className="text-center">
              <h1 className="text-2xl font-light tracking-tight text-white/90">Authentication</h1>
              <p className="text-white/40 mt-2 text-xs tracking-widest uppercase">Admin Terminal</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 placeholder-white/30 outline-none focus:border-white/30 focus:bg-white/10 transition-all text-sm tracking-wide"
              />
              <input 
                type="password" 
                placeholder="Passcode" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 placeholder-white/30 outline-none focus:border-white/30 focus:bg-white/10 transition-all text-sm tracking-wide"
              />
              
              {loginError && <p className="text-red-400/80 text-xs text-center">{loginError}</p>}
              
              <button type="submit" className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-lg px-4 py-3 text-xs tracking-widest uppercase transition-all">
                Authenticate
              </button>
            </form>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="flex flex-col space-y-12 pb-24">
        <header className="flex justify-between items-end mb-8 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white/90">
              Command
            </h1>
            <p className="text-white/40 mt-4 text-xs tracking-widest uppercase flex items-center gap-4">
              Author Dashboard
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="hover:text-white transition-colors underline"
              >
                Disconnect
              </button>
            </p>
          </div>
          
          <div className="flex border border-white/10 rounded-full p-1 glass">
            <button 
              onClick={() => setActiveTab('grid')}
              className={`text-xs md:text-sm tracking-wider px-4 py-2 transition-colors rounded-full ${activeTab === 'grid' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
            >
              Entries
            </button>
            <button 
              onClick={() => openEditor()}
              className={`text-xs md:text-sm tracking-wider px-4 py-2 transition-colors rounded-full ${activeTab === 'editor' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
            >
              Draft
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'grid' ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => openEditor()}
                className="glass p-8 flex flex-col justify-center items-center cursor-pointer group border-dashed border-white/20 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all min-h-[160px]"
              >
                <Plus className="w-8 h-8 text-white/30 group-hover:text-white/80 transition-colors mb-4" />
                <span className="text-white/50 tracking-wider text-xs md:text-sm uppercase group-hover:text-white/80 transition-colors">Create New</span>
              </motion.div>

              {journals.map((journal, i) => (
                <motion.div
                  key={journal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => openEditor(journal)}
                  className="glass p-6 md:p-8 cursor-pointer group hover:border-white/[0.1] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <h3 className="text-lg font-medium text-white/80 group-hover:text-white transition-colors truncate">
                      {journal.title}
                    </h3>
                    <div className="flex items-center space-x-2 bg-white/5 px-3 py-1 rounded-full border border-white/5 shrink-0">
                      {journal.isPublic ? (
                        <Eye className="w-3 h-3 text-[var(--color-accent-glow)] text-blue-300/50" />
                      ) : (
                        <EyeOff className="w-3 h-3 text-white/40" />
                      )}
                      <span className="text-[10px] text-white/50 uppercase tracking-widest hidden sm:inline">
                        {journal.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-white/30 font-mono tracking-wider">
                      {new Date(journal.updatedAt).toLocaleDateString()}
                    </span>
                    <button 
                      onClick={(e) => deleteJournal(e, journal.id)}
                      className="p-2 text-white/20 hover:text-red-400 hover:bg-white/5 rounded-full transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="editor"
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-8"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 pb-4 border-b border-white/5">
                <input 
                  type="text" 
                  placeholder="Title..." 
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="w-full bg-transparent text-3xl md:text-5xl font-light text-white/90 placeholder-white/20 outline-none border-none focus:ring-0"
                />
                <button 
                  onClick={() => setEditIsPublic(!editIsPublic)}
                  className={`flex items-center space-x-2 shrink-0 px-4 py-2 rounded-full border transition-all ${editIsPublic ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-white/10 text-white/50 hover:bg-white/5'}`}
                >
                  {editIsPublic ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span className="text-xs tracking-wider uppercase">{editIsPublic ? 'Public' : 'Private Draft'}</span>
                </button>
              </div>

              <textarea 
                placeholder="Your unwritten thoughts belong here..."
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                className="w-full min-h-[50vh] bg-transparent text-white/70 placeholder-white/20 text-lg md:text-xl leading-loose font-light outline-none border-none focus:ring-0 resize-none"
              />
              <div className="flex justify-end space-x-4 pt-8 border-t border-white/5">
                <button 
                  onClick={() => setActiveTab('grid')}
                  className="flex items-center space-x-2 px-6 py-2 text-sm text-white/50 hover:text-white transition-colors tracking-wider uppercase"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button 
                  onClick={saveJournal}
                  className="flex items-center space-x-2 px-8 py-2 text-xs tracking-wider uppercase bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md border border-white/10 glass"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Record</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};
